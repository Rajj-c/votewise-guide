<div align="center">

<img src="public/android-chrome-192x192.png" alt="VoteWise Logo" width="120" height="120" />

<h1>
  <br/>
  🗳️ VoteWise Guide
  <br/>
</h1>

<p><strong>An AI-Powered Smart Election Guide for Indian Voters</strong></p>

<p>
  <img src="https://img.shields.io/badge/Built%20With-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/AI%20Engine-Gemini%202.5%20Pro-4285F4?style=for-the-badge&logo=google" />
  <img src="https://img.shields.io/badge/Framework-Genkit-FF6F00?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge" />
</p>

<p>
  <strong>Educate · Empower · Elect</strong><br/>
  <em>Making every Indian voter informed, confident, and ready.</em>
</p>

---

</div>

## 📌 Chosen Vertical

> **Election Process Education**
>
> *"Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way."*

India is home to the **world's largest democracy** with over **970 million registered voters** as of 2024. Yet, millions — especially first-time voters, rural citizens, and NRIs — remain confused about the registration process, booth locations, ID requirements, and the actual act of voting.

**VoteWise Guide** directly solves this problem by combining an AI-powered conversational assistant with immersive, interactive UI experiences that remove every barrier to informed participation.

---

## 🧠 Approach & Logic

Our solution is built on **three pillars**:

### 1. 🤖 Conversational AI Agent (RAJ)

The heart of the platform is **RAJ** — an intelligent conversational agent powered by Google Gemini 2.5 Pro via Firebase Genkit. RAJ is designed with a strict, carefully engineered system prompt that ensures:

- ✅ **Neutral & Non-partisan** — Never promotes any political party or candidate
- ✅ **Factual-only** — Refuses to hallucinate; directs users to official sources when unsure
- ✅ **Adaptive** — Detects user knowledge level and adjusts language complexity
- ✅ **Multi-step Guidance** — Breaks down complex processes into numbered, easy steps
- ✅ **Multilingual** — Responds in Hindi, Telugu, Tamil, and other Indian languages on request

### 2. 🗺️ Interactive Voter Journey Map

Instead of a passive text guide, we built an animated, subway-map-style **React Flow canvas** where each step of the voting process is a visual node. Hovering reveals contextual tooltips with bullet-point info. Clicking "Ask RAJ" on any node **auto-fires a targeted AI query** into the chatbot — creating a seamless information loop between the UI and the AI.

### 3. 🗳️ Realistic EVM Simulator

A pixel-faithful replica of India's Electronic Voting Machine and VVPAT (Voter Verifiable Paper Audit Trail). Users can:
- Click the blue EVM button next to a real political party (BJP, Congress, DMK, TDP, YSRCP, TVK)
- Hear the **authentic 3-second EVM beep** generated via Web Audio API
- Watch the VVPAT paper slip **slide down** with candidate details visible for exactly **7 seconds** before dropping

This removes anxiety for first-time voters by letting them "practice" in a zero-stakes environment.

---

## ⚙️ How the Solution Works

```
┌──────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
│                                                          │
│  ┌──────────┐   ┌─────────────────┐   ┌──────────────┐  │
│  │  Voter   │   │ EVM Simulator   │   │  RAJ Chatbot │  │
│  │ Journey  │   │ (Web Audio API) │   │   Widget     │  │
│  │ Map      │   │ (CSS Animation) │   │              │  │
│  └────┬─────┘   └─────────────────┘   └──────┬───────┘  │
│       │    "Ask RAJ" CustomEvent              │          │
│       └──────────────────────────────────────┘          │
│                        │                                 │
│              POST /api/smartElectionAgent                │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│              GENKIT FLOW SERVER (Port 3400)               │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  smartElectionAgent Flow                           │  │
│  │                                                    │  │
│  │  • System Prompt: Non-partisan election guide      │  │
│  │  • Temperature: 1.0  |  Top-P: 0.95               │  │
│  │  • Model: Gemini 2.5 Pro                          │  │
│  └────────────────────────────────────────────────────┘  │
│                          │                               │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
            Google Gemini 2.5 Pro API
```

### Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | Fast, reactive UI |
| Styling | Tailwind CSS | Utility-first design system |
| AI Agent | Firebase Genkit | Flow definition & orchestration |
| LLM | Gemini 2.5 Pro | Intelligent election Q&A |
| Flow Visualization | React Flow (@xyflow/react) | Subway-map voter journey |
| Audio | Web Audio API | Authentic EVM beep sound |
| Internationalisation | Custom i18n context | English, Hindi, Telugu |
| Routing | React Router | SPA navigation |

---

## 🌟 Key Features

| Feature | Description |
|---|---|
| 🤖 **RAJ Chatbot** | AI-powered election assistant with strict neutral guardrails |
| 🗺️ **Voter Journey Map** | Interactive React Flow subway map with hover tooltips |
| 🗳️ **EVM Simulator** | Realistic voting machine with authentic sound & VVPAT animation |
| ✅ **Eligibility Checker** | 2-question instant eligibility assessment |
| 📅 **Election Timeline** | Live countdown to key election dates |
| 📚 **Learn Section** | Plain-language explainers: EVM, NOTA, VVPAT, counting process |
| 🌐 **Multilingual UI** | English, Hindi, and Telugu language support |
| 📱 **Fully Responsive** | Optimised for mobile, tablet, and desktop |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/votewise-guide.git
cd votewise-guide

# 2. Install dependencies
npm install

# 3. Create your environment file
echo "GEMINI_API_KEY=your_key_here" > .env

# 4. Start the frontend (localhost:8080)
npm run dev

# 5. In a second terminal, start the AI agent server (localhost:3400)
npm run genkit
```

> ⚠️ Both servers must be running simultaneously for the chatbot to work.

---

## 💡 Assumptions Made

1. **Target Users**: The platform is primarily designed for Indian citizens aged 18–35 who are first-time or infrequent voters. The language is intentionally kept at a conversational reading level.

2. **Neutral Political Stance**: The system prompt strictly prohibits the AI from expressing opinions on parties, candidates, or policies. The EVM simulator uses real party names purely for educational familiarity, not political promotion.

3. **Offline-first AI Limitation**: The AI agent requires a running Genkit server. In this prototype, it runs locally. For production, it would be deployed to **Google Cloud Run** as a containerized service.

4. **Verified Information Scope**: The AI is instructed to reference only verifiable election facts and redirect users to the **Election Commission of India's** official website (eci.gov.in) for confirmation on procedural matters.

5. **EVM Accuracy**: The EVM simulator is a teaching tool and not an exact government-specification replica. Candidate names are generic placeholders ("BJP Candidate") to avoid any implication of real candidate endorsement.

6. **Election Data**: Timeline dates shown are based on General Election patterns and may not reflect the exact upcoming election schedule, as that is dynamically announced by the ECI.

---

## 🏗️ Project Structure

```
votewise-guide/
├── public/               # Favicon, icons, web manifest
├── src/
│   ├── agent.ts          # 🤖 Genkit AI flow + Express API server
│   ├── app/
│   │   ├── components/   # Navbar, Hero
│   │   └── sections/     # GuideSection, TimelineSection, EligibilitySection, LearnSection
│   ├── components/
│   │   ├── Chatbot.tsx   # Floating AI chat widget
│   │   ├── Chatbot.css   # Animated "Ask RAJ" button styles
│   │   ├── EvmSimulator.tsx  # Interactive EVM + VVPAT
│   │   ├── VoterJourney.tsx  # React Flow subway map
│   │   └── VoterJourney.css  # Animated hint/tooltip styles
│   ├── i18n/             # Multilingual string definitions
│   └── pages/
│       └── Index.tsx     # Main page composition
├── .env                  # 🔑 API keys (never commit!)
└── vite.config.ts        # Dev server + API proxy config
```

---

## 🛡️ Responsible AI Principles

This project was built with the following commitments:

- **Non-partisan**: The AI explicitly refuses political opinions and will not promote any party, ideology, or candidate.
- **Factual**: The model is instructed to say "I don't know" rather than hallucinate answers.
- **Transparent**: Users are always told to verify with official ECI sources for critical decisions.
- **Private**: No user conversations are stored or logged.

---

## 📄 License

This project is built for educational and civic purposes as part of a hackathon. All election information is sourced from publicly available ECI guidelines.

---

<div align="center">

**Made with ❤️ for Indian Voters**

*Non-partisan · Educational Use · Built for Democracy*

</div>
