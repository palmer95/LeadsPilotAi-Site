# api/chat.py

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

# --- 1. CORE INITIALIZATION ---
# Vercel handles environment variables automatically
MONGO_URI = os.environ.get("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client['leadsPilotAI']
conversations_collection = db["conversations"]
custom_training_collection = db['custom_training']

llm = ChatOpenAI(temperature=0.3, model="gpt-3.5-turbo", request_timeout=30)
CONFIG_BASE_URL = "https://www.leadspilotai.com"

# In-memory caches will reset on each request in serverless, which is fine for now
_config_cache = {}
_vectorstore_cache = {}
_session_memory = {}

# --- Helper Functions ---
def get_config(company: str) -> dict:
    if company in _config_cache:
        return _config_cache[company]
    url = f"{CONFIG_BASE_URL}/client-configs/{company}.json"
    import requests
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    config = resp.json()
    _config_cache[company] = config
    return config

def get_vectorstore(company: str) -> Chroma:
    if company in _vectorstore_cache:
        return _vectorstore_cache[company]
    # In Vercel, the root is /var/task/
    dirpath = os.path.join("/var/task/vectorstores", f"{company}_chroma")
    vectorstore = Chroma(persist_directory=dirpath, embedding_function=OpenAIEmbeddings())
    _vectorstore_cache[company] = vectorstore
    return vectorstore

# --- THE MAIN HANDLER ---
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            company_slug = data.get("company")
            query = data.get("query", "").strip()
            session_id = data.get("session_id", "default")

            if not company_slug or not query:
                # Handle error
                return

            # --- Your existing LangChain Logic ---
            CONFIG = get_config(company_slug)
            vectorstore = get_vectorstore(company_slug)
            custom_training_data = list(custom_training_collection.find({"client_slug": company_slug}))
            # ... (Build your system_prompt here as before)

            memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
            # In a real serverless app, you'd load/save history from a DB like Redis
            
            prompt = ChatPromptTemplate.from_messages([...]) # Your prompt template
            retriever = vectorstore.as_retriever()
            docs = retriever.get_relevant_documents(query)
            context = "\n".join([doc.page_content for doc in docs])
            
            conversation_chain = LLMChain(llm=llm, prompt=prompt, memory=memory)
            result = conversation_chain.invoke({"question": query, "context": context})
            response_text = result.get("text", "An error occurred.").strip()
            
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