# KRE8ECH — Student Technology & Builder Initiative

> **Learn • Build • Innovate**  
> *Helping school and college students transition from technology consumers to technology creators.*

Built with **Next.js 14 (App Router, static export)**, **TypeScript**, and **Tailwind CSS**.

---

## Pages & Structure

| Route | Purpose |
|---|---|
| `/` | Lean landing hub with track explorer, dedicated section directory, and featured outcomes |
| `/builder-program` (`/curriculum`) | Interactive 4-week, 12-day roadmap (60m guided + 30m doubt solving + offline hackathon) & FAQs |
| `/mission` | Consumer → Explorer → Builder → Innovator framework and principles |
| `/experience` | Interactive builder playground and the 3 pillars (Learn, Build, Innovate) |
| `/projects` & `/projects/[id]` | Filterable student build showcase and specifications |
| `/achievements` | Agentic AI Saksham Hackathon 1st Position & Ideathon story |
| `/hackathons` & `/hackathons/[id]` | Competitions, schedules, tracks, and rules |
| `/problem-statements` | Searchable challenge briefs filterable by difficulty and status |
| `/register` | School & general cohort registration form |
| `/register/hackready` | College & B.Tech Hackready Workshop registration form |
| `/contact` | Student, school, and mentor enquiry form |
| `/login` & `/dashboard` | Student portal login and progress view |

---

## Live Google Sheets / Excel Integration

Student registrations from `/register`, `/register/hackready`, and enquiries from `/contact` automatically append rows to Google Sheets via `google-apps-script/Code.gs` (which you can download or open directly in Microsoft Excel `.xlsx`).

### Setup Steps
1. Open Google Sheets and create a new spreadsheet (e.g., `KRE8ECH Student Registrations`).
2. Go to **Extensions → Apps Script**, paste the contents of `google-apps-script/Code.gs`, and save.
3. Click **Deploy → New deployment → Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Copy the `/exec` Web App URL and add it as a GitHub Actions Repository Variable:
   - Go to **GitHub Repo → Settings → Secrets and variables → Actions → Variables**
   - Create variable `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL` with your `/exec` URL.
5. Re-run the GitHub Pages workflow (or push a commit to `main`). All future registrations will stream into the `Student Registrations`, `Hackready Workshop`, and `Contact Enquiries` tabs automatically.

---

## Running Locally

```bash
npm install
npm run dev
```

Build static export:

```bash
npm run build
```

---

## Admin Access

Public Admin links and one-click bypasses have been removed from the navigation and footer. For restricted management on `/admin`, optionally override the passcode SHA-256 hash using `NEXT_PUBLIC_ADMIN_PASSCODE_HASH` in `.env.local` or GitHub Actions Variables.
