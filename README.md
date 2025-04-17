<<<<<<< HEAD
# 🧠 Leads Pilot AI 

**The AI Sales Agent That Works While You Sleep**

PromptlyAI is a fully branded, AI-powered chatbot that installs on any website and turns visitors into leads — and leads into bookings. Custom-built per client, it engages in real-time, answers customer questions, and books jobs automatically.

---

## 🔧 Built For

- Real estate media companies
- Home service providers
- Agencies with high inbound interest
- Any business that needs fast, intelligent response on their website

---

## ⚙️ Features

### ✅ Core Capabilities
- **Contextual Q&A** powered by OpenAI + LangChain
- **Vector-based memory** using FAISS for ultra-fast, accurate answers
- **GPT fallback** when custom site data isn’t enough
- **Conversation memory** for smooth follow-up questions
- **Instant reset** to clear chat history

### 🎨 Customization & Branding
- Client-specific logo and color theming
- Static brand context for GPT tone/pitch alignment
- Custom CSS support (per-client)

### 📦 Delivery & Installation
- Installs via a single `<script>` tag
- Lightweight, fast-loading React UI
- Backend served via Flask

### 🔌 Optional Add-ons (Coming Soon)
- Auto-booking integration (Calendly, native form, or API)
- SMS or Discord notifications on booking confirmation
- Per-client admin dashboard with usage/fallback stats
- FAQ button injection for guided experiences

---

## 🚀 How It Works (MVP Flow)

1. **Ingest Client Website**  
   Scrapes key pages like `/services`, `/about`, `/contact`  
2. **Embed + Store Context**  
   Text is chunked, embedded, and stored in FAISS
3. **Serve via API**  
   Flask backend handles chat requests and invokes LangChain
4. **React Frontend**  
   User chat is handled in a modern interface with memory, loading state, FAQ buttons, and branding
5. **Deploy**  
   Client adds one line of code to their site to embed the bot

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite (UI)
- **Backend**: Flask + LangChain + OpenAI
- **Vectorstore**: FAISS
- **Styling**: Custom CSS per client
- **Hosting**: Vercel (frontend) + Render (backend)

---

## 👥 Team & Credits

**Built by:** [@palmer95](https://github.com/palmer95)  
**Sales Partner & First Client:** [Virtour Media](https://virtourmedia.com)  
**Logo/Branding/Marketing Support:** [LeadsPilotAi Marketing Team (WIP)]  

---

## 🔐 Status

This is an **early-stage private MVP**, actively in development.  
🚧 Features are being added daily.  
🛠️ Internal use only — please do not share without permission.

---

## 📬 Want to use PromptlyAI on your website?

We're currently onboarding early clients.  
Email us at **sales@leadspilotai.com** or join the waitlist [coming soon].

=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 7c73d0b (Initial commit from Create Next App)
