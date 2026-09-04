# SwaRuchi – AI-Enabled Skill Intelligence & Learning Platform


[![MoSPI / NSSTA](https://img.shields.io/badge/Organization-MoSPI%2FNSSTA-emerald.svg)](https://mospi.gov.in)
[![Framework](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20TailwindCSS-purple.svg)](https://vitejs.dev)
[![AI Engine](https://img.shields.io/badge/LLM-Meta%20Llama%203.3%2070B-amber.svg)](https://meta.com)

**SwaRuchi** is an AI-powered Skill Intelligence and Learning Platform developed for **India's Official Statistical System (Ministry of Statistics and Programme Implementation - MoSPI / National Statistical Systems Training Academy - NSSTA)**.

It seamlessly integrates with the **iGOT Karmayogi** digital learning ecosystem and **NSSTA TPAC** training programs to assess competencies across MoSPI's FRAC (Framework for Roles, Activities, and Competencies) pillars, perform automated skill-gap deficit analysis, recommend personalized dual-stream learning pathways, host interactive practical labs, generate source-cited MCQs/quizzes from uploaded manuals, and provide an AI statistical tutor powered by **Meta Llama 3**.

---

## Key Features & Capabilities

### 1. Deterministic FRAC Competency Assessment & Baseline Diagnostics
- **4 MoSPI FRAC Pillars**:
  - **Statistical Competencies**: Survey Design, Stratified Sampling, SNA 2008 National Accounts, CPI/WPI Price Statistics, Labour & Agricultural Statistics, SDG Indicators.
  - **Technical Competencies**: Python, R, SQL, Stata, GIS Spatial Frame Mapping, Cloud Computing (MeghRaj), Open Data APIs.
  - **Digital Governance**: Cybersecurity, Data Privacy (DPDP Act 2023), Digital Signatures, DPI.
  - **Behavioural & Managerial**: Evidence-Based Policy Leadership, Data Storytelling, Project Management, Ethics.
- **MoSPI Role Benchmarks**: Pre-configured target vectors for *Senior Statistical Officer (SSO)*, *Assistant Director - National Accounts*, *Data Analyst - CPI*, *Field Investigator Supervisor*, and *Director - IT & Analytics*.
- **FRAC Competency Radar Chart**: SVG visualization plotting an official's baseline scores against target role benchmarks.

### 2. Dual-Stream Recommendation Pathways (iGOT + NSSTA)
- **iGOT Karmayogi Digital Micro-Learning**: Self-paced theoretical modules with digital micro-certifications.
- **NSSTA TPAC Physical Cohorts**: On-site residential workshops at NSSTA Greater Noida complex and Regional Training Centres (RTCs).
- **Deficit-Based Precision Learning**: Eliminates redundant training by assigning only modules needed to close identified skill gaps.

### 3. Interactive Virtual Practical Labs
- **Python Data Lab**: In-browser Python sandbox for executing survey unit-level microdata analysis (computing weighted sample means, Gini coefficient).
- **SQL Query Lab**: SQLite sandbox querying sample household expenditure and enterprise survey databases.
- **R & Open Data API Lab**: Interactive command execution and MoSPI metadata JSON testing.

### 4. Multimodal RAG AI Question Bank Generator
- **Manual Ingestion**: Ingests official manuals (*NSSO 78th Round Manual*, *SNA 2008 Handbook*, *CPI Revision Guidelines*) or custom text uploads.
- **Source-Cited MCQs**: Auto-generates structured MCQs with distractors, correct answers, and **deep-linked source citations** (Section & Page numbers).
- **Interactive Quiz Runner**: Features progress indicators, instant evaluation, explanations, and score synchronization.

### 5. SwaRuchi Mitra AI Statistical Assistant (Meta Llama 3)
- **Llama LLM Architecture Switcher**: Integrated model selector:
  - **Meta Llama 3.3 70B** *(MoSPI Fine-Tuned Model)*
  - **Meta Llama 3.1 8B** *(Ultra-Fast Statistical Tutor)*
  - **Ollama Local Host** *(Offline Data Privacy via `http://localhost:11434`)*
  - **Meta Llama Guard** *(DPDP Act 2023 Data Privacy Audit)*
- **Rich Output Renderer**: Formats statistical tutor outputs into section headers, highlighted math formula callout boxes, checkmark lists, and clickable course badges.

### 6. Executive HR Workforce Analytics Dashboard
- **National Workforce Matrix**: Tracks 24,850+ statistical workforce members across 28 States/UTs.
- **Department Heatmap**: Identifies skill gap deficits across CSO, NSSO, ESD, and DES.
- **NSSTA Cohort Scheduling Workbench**: Workshop calendar publishing and seat reservation management.

---

## Tech Stack

- **Frontend**: React 18, Vite 5, TailwindCSS v4
- **UI Components & Icons**: Lucide React Icons, Canvas Confetti
- **Analytics & Data**: SVG Radar Chart Engine, In-Browser Python/SQL Execution Engines
- **AI & NLP**: Meta Llama 3 LLM Architecture, Multimodal RAG Question Generator

---

## Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/Anushadhirde/Swaruchi.git
cd Swaruchi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## Project Structure

```
Swaruchi/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   ├── fracFramework.js       # FRAC pillars, MoSPI role targets & diagnostic questions
│   │   ├── igotCourses.js         # iGOT Karmayogi course dataset
│   │   ├── nsstaWorkshops.js      # NSSTA physical classroom cohort dataset
│   │   ├── mockDocuments.js       # MoSPI sample manuals for RAG engine
│   │   └── defaultProfiles.js     # Default user profile state
│   ├── components/
│   │   ├── Header.jsx             # Top navigation header & role switcher
│   │   ├── Sidebar.jsx            # Navigation sidebar with Llama AI widget
│   │   ├── FRACRadarChart.jsx     # SVG Radar chart component
│   │   ├── QuizRunner.jsx         # Interactive test runner with source citations
│   │   └── AIAssistantModal.jsx   # SwaRuchi Llama 3 AI Statistical Assistant
│   ├── pages/
│   │   ├── LearnerDashboard.jsx   # Individual official overview & FRAC gap analysis
│   │   ├── SkillGapAssessment.jsx # Baseline diagnostic test & role profiler
│   │   ├── LearningPathways.jsx   # iGOT digital + NSSTA physical dual-stream view
│   │   ├── VirtualLabs.jsx        # Python, SQL, R interactive sandbox
│   │   ├── QuizGenerator.jsx      # Multimodal RAG MCQ generator
│   │   └── AdminDashboard.jsx     # Workforce skill heatmap & cohort manager
│   └── utils/
│       ├── fracCalculator.js      # Competency deficit scoring algorithm
│       └── ragQuizEngine.js       # RAG AI question bank generator
└── README.md
```

---

- **Team Name**: Code_Cadets

