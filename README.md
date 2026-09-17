# EcoWise — Small Actions. A Greener Tomorrow. 🌱

A modern, full-featured sustainability web application built for college hackathons and civic impact. EcoWise helps individuals segregate waste correctly, build green habits, test eco-knowledge through gamified quizzes, and receive intelligent advice from an AI assistant.

---

## 🌟 Key Features

1. **Smart Waste Guide (`/waste-guide`) [Primary Feature]**
   - Instant search across hundreds of household items with aliases and tags.
   - Comprehensive category tagging: *Wet Waste*, *Dry Waste*, *Recyclable*, *E-Waste*, *Donate / Reuse*, and *Hazardous Disposal*.
   - Clear recommended disposal actions, breakdown explanations, and pro-tips.
   - Responsible municipal disclaimer for hazardous goods and optional photo analysis UI.

2. **Weekly Eco Challenges (`/challenges`)**
   - 5 habit-forming sustainability quests (Refillable Bottle, Plastic-Free, Public Transit, Light Conservation, Planting).
   - Interactive progress bars, point rewards, and complete states stored in LocalStorage.

3. **EcoSort Game (`/ecosort`)**
   - 10-question interactive waste-sorting trivia game covering critical household items.
   - Real-time educational feedback, explanation notes, +20 points per correct answer, and celebratory certificate modal.

4. **EcoAI Chatbot (`/ecoai` & Floating Button)**
   - Persistent bottom-right floating circular chatbot button accessible across pages.
   - Full conversational interface with suggested question chips.
   - Secure Node.js backend integration with Google Gemini 3.6 Flash.
   - Built-in resilient Demo Mode with verified local eco knowledge base when offline or key is unconfigured.

5. **Gamification & Profile (`/profile`)**
   - Real-time Eco Score tracker, Tier badges (*Eco Beginner*, *Waste Warrior*, *Green Explorer*, *Green Guardian*, *Planet Protector*).
   - Historical activity log tracking points earned across challenges, sorting, and quizzes.
   - Shareable progress status generator.

6. **Interactive Dashboard (`/home`)**
   - Soft eco hero section with dynamic celestial & nature icons.
   - Highlighted primary CTA for Waste Identification.
   - Visual 5-step circular lifecycle: **01 Identify → 02 Learn → 03 Act → 04 Earn → 05 Improve**.
   - UN Sustainable Development Goals alignment cards for **SDG 11**, **SDG 12**, and **SDG 13**.

---

## 🛠️ Tech Stack & Color System

- **Frontend:** React 18, Vite, React Router v6, Lucide React Icons
- **Backend:** Express.js, CORS, dotenv
- **State & Persistence:** LocalStorage API
- **AI Integration:** Google Gemini REST API via secure backend endpoint (`/api/chat`)
- **Color Palette:**
  - Primary Green: `#16A34A`
  - Dark Green: `#166534` | Very Dark Green: `#14532D`
  - Soft Green: `#F0FDF4` | Light Green: `#DCFCE7`
  - Page Background: `#F8FAFC`
  - Blue Accents: `#0EA5E9` | `#E0F2FE`
  - Purple Accents: `#8B5CF6` | `#F3E8FF`
  - Amber Accents: `#F59E0B` | `#FEF3C7`

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env` and add your Gemini API Key if live AI responses are desired:
```bash
cp .env.example .env
```
*(If no API key is provided, EcoWise automatically operates in offline Demo Mode with verified sustainability intelligence).*

### 3. Run Application
Run both backend server (port 5000) and frontend client (port 5173) concurrently:
```bash
npm run dev
```

Or run them individually in separate terminals:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

Open `http://localhost:5173` in your browser.
