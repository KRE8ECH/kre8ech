# KRE8ECH — Student Technology & Builder Initiative

> **LEARN • BUILD • INNOVATE**  
> *Helping school students transition from technology consumers to technology creators.*

A premium, modern, fully responsive web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed specifically around the white-and-yellow Capabl-inspired visual aesthetic with custom flat-vector technology sticker illustrations, bold typography, and interactive student and admin workflows.

---

## 🎨 Brand & Design System

- **Primary Yellow Accent:** `#F6C900`
- **Warm Cream Background:** `#FFF9E8`
- **Charcoal Typography:** `#202124`
- **Dark Elements & Borders:** `#121316` / `#202124`
- **Light Grey / Neutral:** `#F5F5F5` / `#707070`
- **Original Logo Assets:** Utilizes the authentic supplied KRE8ECH wordmark (`/public/images/kre8ech-logo-full.png`) and K8 icon (`/public/images/kre8ech-logo-mark.png`).

---

## 🚀 Key Features & Pages

| Route | Description |
|---|---|
| `/` | **Homepage**: Hero with interactive technology stickers, Mission (User → Explorer → Builder → Innovator), 3 Pillars (Learn, Build, Innovate), Four-Week Builder Program spotlight, Saksham Hackathon win story, and featured builds. |
| `/builder-program` / `/curriculum` | **The Four-Week Builder Program**: Interactive week-by-week roadmap (Weeks 1 to 4, 12 total days). Daily 90-minute structure (60m guided live + 30m dedicated doubt solving), expected student outputs, tools, offline hackathon spotlight, and FAQs. |
| `/projects` | **Projects & Build Showcase**: Student prototypes with category filters, technology tags, live demo/GitHub links, and deep-dive specification modals. |
| `/achievements` | **Achievements & Our Story**: Spotlight on securing **1st Position / Overall Champions** at the *Agentic AI Saksham Hackathon*, plus Ideation and Promothon track honors. Includes team story and key learnings. |
| `/hackathons` | **Hackathons & Challenges**: Organized by status (*Registration Open, Upcoming, Ongoing, Completed*), rules, schedule, prizes, and team registration. |
| `/problem-statements` | **Problem Statements Bank**: Searchable challenge briefs filterable by category, difficulty (*Beginner, Intermediate, Advanced*), and status (*Open/Closed*). |
| `/register` | **Student Onboarding**: Real form validation capturing name, email, school, class level, city, and technology interests. Automatically creates an active student session. |
| `/login` | **Student Login**: Instant access to the Student Portal with one-click demo credentials. |
| `/dashboard` | **Student Portal Dashboard**: Displays personalized student profile, weekly curriculum progress, cohort announcements, problem statements, and hackathon participation status. |
| `/admin` | **Protected Admin Control Center (CMS)**: Passcode-protected (`kre8ech2026`). Live content management for Curriculum daily topics, Projects, Achievements, Hackathons, Problem Statements, Announcements, and **Student Registrations with CSV Export**. |
| `/about` | **About KRE8ECH**: Company genesis, mission, core values, and school partnership programs. |
| `/contact` | **Contact & School Collaboration**: Multi-category enquiry form for students, schools, and mentors. |

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom stickers, borders, and animations
- **Icons:** Lucide React & Handcrafted Vector Sticker SVGs
- **Data Persistence:** Client-side synchronized storage (`src/lib/storage.ts`) with live editing across Admin and Student views

---

## 💻 Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Serve
```bash
npm run build
npm run start
```

### Admin Access
- Navigate to `/admin`
- Enter default team passcode: `kre8ech2026`
