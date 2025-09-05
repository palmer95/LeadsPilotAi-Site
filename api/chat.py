# api/chat.py (The Final, Vercel-Optimized Version with Conversation Saving)

from http.server import BaseHTTPRequestHandler
import json
import os
from pymongo import MongoClient
from datetime import datetime

# LangChain & AI Imports
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# --- CORE INITIALIZATION ---
MONGO_URI = os.environ.get("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['leadsPilotAI']
conversations_collection = db["conversations"]
clients_collection = db["clients"]
custom_training_collection = db['custom_training']

llm = ChatOpenAI(temperature=0.3, model="gpt-3.5-turbo", request_timeout=30)
CONFIG_BASE_URL = "https://www.leadspilotai.com"

# In-memory caches are ephemeral in a serverless environment, which is fine for this use case.
_config_cache = {}
_vectorstore_cache = {}

# --- Helper Functions ---
def get_config(company: str) -> dict:
    if company in _config_cache:
        return _config_cache[company]
    import requests
    url = f"{CONFIG_BASE_URL}/client-configs/{company}.json"
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    config = resp.json()
    _config_cache[company] = config
    return config

def get_vectorstore(company: str) -> Chroma:
    if company in _vectorstore_cache:
        return _vectorstore_cache[company]
    # Vercel copies your project files to /var/task/, which is the current working directory.
    dirpath = os.path.join(os.getcwd(), "vectorstores", f"{company}_chroma")
    vectorstore = Chroma(persist_directory=dirpath, embedding_function=OpenAIEmbeddings())
    _vectorstore_cache[company] = vectorstore
    return vectorstore

# --- THE MAIN HANDLER ---
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        response_payload = {}
        status_code = 500
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            company_slug = data.get("company")
            query = data.get("query", "").strip()
            session_id = data.get("session_id", "default")

            if not company_slug or not query:
                raise ValueError("Missing company or query")

            # --- Your existing LangChain Logic ---
            client_doc = clients_collection.find_one({"slug": company_slug})
            if not client_doc:
                raise ValueError(f"Client configuration not found for slug: {company_slug}")
            client_id = client_doc['_id']
            
            CONFIG = get_config(company_slug)
            vectorstore = get_vectorstore(company_slug)
            custom_training_data = list(custom_training_collection.find({"client_slug": company_slug}))
            
            system_prompt_template = f"You are Clyde, a helpful AI assistant for {CONFIG.get('business_name')}..." # Your full prompt
            
            prompt = ChatPromptTemplate.from_messages([
                SystemMessagePromptTemplate.from_template(system_prompt_template),
                MessagesPlaceholder(variable_name="chat_history"),
                HumanMessagePromptTemplate.from_template("{question}")
            ])
            
            memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
            
            retriever = vectorstore.as_retriever()
            docs = retriever.get_relevant_documents(query)
            context = "\n".join([doc.page_content for doc in docs])
            
            conversation_chain = LLMChain(llm=llm, prompt=prompt, memory=memory)
            result = conversation_chain.invoke({"question": query, "context": context})
            response_text = result.get("text", "An error occurred.").strip()
            
            # --- THE FIX IS HERE ---
            # Save the complete conversation turn to the database
            conversations_collection.update_one(
                {"session_id": session_id, "company": company_slug},
                {
                    "$set": {"client_id": client_id}, # For future analytics
                    "$push": {
                        "messages": {
                            "timestamp": datetime.utcnow(),
                            "user": query,
                            "bot": response_text
                        }
                    }
                },
                upsert=True
            )
            # --- END OF FIX ---
            
            response_payload = {"response": response_text}
            status_code = 200

        except Exception as e:
            response_payload = {"error": f"Internal Server Error: {str(e)}"}
            status_code = 500

        # Send the response
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response_payload).encode('utf-8'))
        return