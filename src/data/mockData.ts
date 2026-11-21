import { ProgramOverview, Project, Achievement, Hackathon, ProblemStatement, Announcement } from "@/types";

export const initialProgramData: ProgramOverview = {
  title: "The Four-Week Builder Program",
  tagline: "From learning the tools to building your own project.",
  duration: "4 Weeks",
  totalDays: 12,
  onlineDays: 11,
  offlineHackathonDays: 1,
  sessionDuration: "90 Minutes per Day",
  mainSessionDuration: "60 mins (Guided learning & hands-on activity)",
  doubtSessionDuration: "30 mins (Dedicated doubt resolution & mentoring)",
  targetAudience: "School Students (Class 9 onwards) & Aspiring Young Builders",
  eligibility: "No prior coding experience required. Curiosity and passion to build is all you need.",
  overviewDescription:
    "A structured, hands-on learning cohort designed to take school students on a transformational journey from curious tech users to confident creators. Through 11 intensive online builder sessions and 1 grand offline hackathon showcase, students learn practical development, artificial intelligence, UI prototyping, and collaborative problem-solving.",
  weeks: [
    {
      weekNumber: 1,
      id: "week-1",
      title: "EXPLORE",
      badge: "Week 01 • Foundation",
      subtitle: "Discovering Technology & The Builder Mindset",
      onlineDays: 3,
      offlineDays: 0,
      sessionFormat: "3 Online Days (90 mins/day: 60m Live + 30m Doubt Solving)",
      focus:
        "Introduction to technology, AI, digital tools, computational thinking, understanding how modern technology products work, discovering real-world problems and developing the builder mindset.",
      description:
        "Students break down the black box of modern tech. Instead of merely playing games and browsing social feeds, students discover how applications, databases, AI models, and websites actually function under the hood.",
      learningObjectives: [
        "Shift perspective from consumer to digital builder",
        "Understand internet architecture: browsers, servers, APIs & databases",
        "Discover modern Artificial Intelligence & how generative tools actually work",
        "Learn computational thinking and algorithmic problem deconstruction",
        "Identify daily friction points and turn them into project opportunities"
      ],
      days: [
        {
          dayNumber: 1,
          title: "The Anatomy of Digital Products & Computational Thinking",
          description: "Deconstructing popular apps (Google, YouTube, Spotify) and understanding computational logic.",
          topics: [
            "How digital products are designed and built",
            "Front-end vs Back-end vs Cloud basics",
            "Breaking complex systems into modular algorithms",
            "Setting up your digital builder workspace"
          ]
        },
        {
          dayNumber: 2,
          title: "Demystifying Artificial Intelligence & Modern Developer Tools",
          description: "Understanding LLMs, machine intelligence, prompts, and modern builder tooling.",
          topics: [
            "How AI models actually process text and patterns",
            "Prompt engineering for coding and creative ideation",
            "Responsible AI usage, ethics and verification",
            "Hands-on AI-assisted problem modeling"
          ]
        },
        {
          dayNumber: 3,
          title: "Real-World Problem Discovery & The Builder Mindset",
          description: "Spotting problems around your school, neighborhood, and personal workflows.",
          topics: [
            "Observation techniques: identifying genuine student pain points",
            "Categorizing problems: education, environment, productivity, health",
            "Evaluating problem feasibility for a 4-week build",
            "Formulating initial problem pitch notes"
          ]
        }
      ],
      practicalActivities: [
        "Product teardown of a favorite application",
        "Writing your first algorithmic flowchart",
        "AI prompt sandbox session for workflow acceleration",
        "Problem discovery journal entry"
      ],
      expectedOutputs: [
        "Personal Builder Workspace configured",
        "Problem Discovery Canvas with 3 verified student problem areas",
        "Understanding of core web & AI fundamentals"
      ],
      toolsTechnologies: ["GitHub", "ChatGPT / Gemini", "Figma FigJam", "Visual Studio Code"],
      icon: "Compass"
    },
    {
      weekNumber: 2,
      id: "week-2",
      title: "IDEATE & DESIGN",
      badge: "Week 02 • Architecture",
      subtitle: "Problem Statements, User Empathy & Solution Workflows",
      onlineDays: 3,
      offlineDays: 0,
      sessionFormat: "3 Online Days (90 mins/day: 60m Live + 30m Doubt Solving)",
      focus:
        "Problem identification, refining problem statements, brainstorming, solution ideation, understanding users, planning project architecture, designing solution workflows and preparing prototypes.",
      description:
        "Great projects start with clear empathy for real users. Students master the transition from a messy problem to a structured solution workflow, wireframe, and clickable UI prototype.",
      learningObjectives: [
        "Formulate precise, measurable problem statements",
        "Conduct user empathy mapping and define user personas",
        "Brainstorm divergent solution concepts and converge on viable MVPs",
        "Design wireframes, user journeys, and component architecture in Figma",
        "Create an actionable project blueprint and task timeline"
      ],
      days: [
        {
          dayNumber: 4,
          title: "Problem Statement Synthesis & User Persona Mapping",
          description: "Sharpening ambiguous challenges into actionable, clear problem statements.",
          topics: [
            "Who is the user? Pain points, needs, and emotional triggers",
            "Writing clear 'How Might We' (HMW) challenge questions",
            "Defining project constraints and MVP scope",
            "Peer review of problem statements"
          ]
        },
        {
          dayNumber: 5,
          title: "UI/UX Design Fundamentals & Wireframing",
          description: "Visual hierarchy, typography, color harmony, and wireframe layouts.",
          topics: [
            "Core principles of visual communication and clean UX",
            "Designing low-fidelity paper and digital wireframes",
            "Information architecture: navigation, inputs, and feedback states",
            "Hands-on Figma layout techniques"
          ]
        },
        {
          dayNumber: 6,
          title: "Interactive Prototyping & Project Solution Workflows",
          description: "Connecting design screens into clickable prototypes and defining data flow.",
          topics: [
            "Figma component variants and clickable prototype connections",
            "Mapping step-by-step user workflows and error states",
            "Building the Minimum Viable Prototype (MVP) specification",
            "Preparing the build architecture document for Week 3"
          ]
        }
      ],
      practicalActivities: [
        "Conducting a peer user interview",
        "Creating a Figma UI design system with colors and typography",
        "Building a 4-screen interactive mobile/web prototype",
        "Submitting the formal Project Specification Blueprint"
      ],
      expectedOutputs: [
        "Clear 1-page Project Specification Sheet",
        "Complete Clickable Figma Prototype",
        "Defined User Journey Flowchart"
      ],
      toolsTechnologies: ["Figma", "FigJam", "Miro", "Notion"],
      icon: "Palette"
    },
    {
      weekNumber: 3,
      id: "week-3",
      title: "BUILD & DEVELOP",
      badge: "Week 03 • Engineering",
      subtitle: "Hands-on Code, AI-Assisted Development & Functional MVPs",
      onlineDays: 3,
      offlineDays: 0,
      sessionFormat: "3 Online Days (90 mins/day: 60m Live + 30m Doubt Solving)",
      focus:
        "Practical building, modern development tools, website/app creation, AI-assisted development, prototypes, testing, debugging and tangible project progress.",
      description:
        "Theory turns into reality. Students write code, connect interactive components, test edge cases, and witness their designs come alive as real functional software.",
      learningObjectives: [
        "Build modern responsive web layouts using HTML, CSS, and modern web frameworks",
        "Implement interactive state, dynamic user inputs, and event handling",
        "Leverage AI coding companions to accelerate development and debug errors",
        "Connect external APIs or lightweight databases for real data storage",
        "Master systematic debugging techniques and version control"
      ],
      days: [
        {
          dayNumber: 7,
          title: "Frontend Foundations & Component Construction",
          description: "Translating Figma designs into clean, responsive interface code.",
          topics: [
            "Semantic structure, modern layout models (Flexbox & Grid)",
            "Responsive styling: building mobile-first interfaces",
            "Component reusability and styling consistency",
            "Live code-along: building the project hero and core dashboard"
          ]
        },
        {
          dayNumber: 8,
          title: "Interactivity, State Management & AI-Assisted Coding",
          description: "Making pages come alive with user input handling and logic.",
          topics: [
            "Handling user actions, clicks, input validation, and forms",
            "Local storage and dynamic client state",
            "Effective debugging strategies: browser console and network tools",
            "Using AI companions to generate, review, and refactor code safely"
          ]
        },
        {
          dayNumber: 9,
          title: "Integrating Real Data, APIs & Prototype Polishing",
          description: "Fetching dynamic data and connecting intelligent capabilities.",
          topics: [
            "Understanding REST APIs and JSON data format",
            "Integrating mock or live data feeds (weather, maps, AI responses)",
            "Handling loading states, empty states, and errors gracefully",
            "Code freeze & project readiness checklist"
          ]
        }
      ],
      practicalActivities: [
        "Code-along builder session: building a responsive dashboard",
        "Live debugging challenge: finding and fixing 5 common bugs",
        "Connecting live API data to your project interface",
        "Code review session with KRE8ECH mentors"
      ],
      expectedOutputs: [
        "Working, functional web/app project deployed on the web",
        "Clean GitHub repository with commit history",
        "Responsive, mobile-friendly interface"
      ],
      toolsTechnologies: ["HTML/CSS/Tailwind", "JavaScript / React", "Vercel / Netlify", "GitHub"],
      icon: "Code"
    },
    {
      weekNumber: 4,
      id: "week-4",
      title: "FINALIZE & COMPETE",
      badge: "Week 04 • The Grand Finale",
      subtitle: "Pitch Preparation, Team Collaboration & The Offline Hackathon",
      onlineDays: 2,
      offlineDays: 1,
      sessionFormat: "2 Online Sessions (90m each) + 1 Full-Day In-Person Hackathon",
      focus:
        "Final learning, project polish, presentation storytelling, hackathon readiness, culminating in a high-energy offline hackathon with live team demos and jury evaluation.",
      description:
        "Building is only half the battle; communicating value is the superpower. Students polish their code, craft compelling 3-minute project pitches, and present their innovations live on stage at our concluding offline hackathon day.",
      learningObjectives: [
        "Conduct thorough quality assurance, cross-browser and mobile testing",
        "Craft a high-impact 3-minute elevator pitch with structured storytelling",
        "Design an engaging presentation slide deck demonstrating problem-solution fit",
        "Collaborate in fast-paced hackathon sprint conditions",
        "Present live demo to a jury of tech mentors, parents, and industry judges"
      ],
      days: [
        {
          dayNumber: 10,
          title: "Online Session: Project Hardening, Polish & User Testing",
          description: "Refining details, fixing edge cases, and verifying user experience.",
          topics: [
            "Speed, accessibility, and visual micro-interactions",
            "Cross-device mobile testing",
            "Preparing reliable demo backups and offline video recordings",
            "Mentor 1-on-1 rapid feedback rounds"
          ]
        },
        {
          dayNumber: 11,
          title: "Online Session: The Art of the Tech Pitch & Demo Mastery",
          description: "Transforming technical specs into an inspiring human story.",
          topics: [
            "The 3-Minute Hackathon Pitch Formula (Hook, Problem, Solution, Demo, Impact)",
            "How to conduct a flawless live software demonstration",
            "Anticipating tough jury questions and handling feedback",
            "Final hackathon day briefing and logistics"
          ]
        },
        {
          dayNumber: 12,
          title: "OFFLINE DAY: The KRE8ECH Builder Hackathon & Innovation Showcase",
          description: "The grand in-person finale! Collaboration, live building sprints, stage demos, and awards.",
          isHackathonDay: true,
          topics: [
            "09:00 AM - Check-in, Team Stations & Welcome Keynote",
            "10:00 AM - Rapid Innovation Sprint & Final Mentor Guidance",
            "01:00 PM - Lunch & Networking",
            "02:00 PM - Stage Pitch Presentations & Live Jury Demos",
            "04:30 PM - Jury Deliberation & Innovation Exhibition",
            "05:15 PM - Awards Ceremony, Winner Announcements & Certificates"
          ]
        }
      ],
      practicalActivities: [
        "Peer pitch dry-run with mentor feedback timer",
        "Slide deck creation following the KRE8ECH pitch template",
        "Live on-stage demo presentation at the offline hackathon",
        "Showcasing prototypes to peers and visiting guests"
      ],
      expectedOutputs: [
        "Production-ready deployed digital project",
        "5-Slide polished Pitch Deck",
        "Live presentation experience in front of an audience",
        "Official KRE8ECH Builder Certification & Awards"
      ],
      toolsTechnologies: ["Vercel", "Canva / Google Slides", "Loom", "Live Stage Presentation"],
      icon: "Trophy"
    }
  ]
};

export const initialAchievements: Achievement[] = [
  {
    id: "saksham-2026",
    title: "1st Position & Overall Champions",
    eventName: "Agentic AI Saksham Hackathon",
    position: "Overall 1st Position Winners",
    featuredHeadline: "3rd Hackathon. First Win. First Position.",
    date: "2026",
    venue: "Saksham Innovation Arena",
    summary:
      "Our team built OutreachIQ for the problem statement 'Personalized Multi-Touch Sales Outreach Agent' (Track D: Sales, Growth & Revenue Agents), securing the Overall 1st Position.",
    story:
      "At the Agentic AI Saksham Hackathon, our team built OutreachIQ for the problem statement 'Personalized Multi-Touch Sales Outreach Agent' (Track D: Sales, Growth & Revenue Agents). Sales teams send thousands of generic cold emails that get ignored, because researching every lead by hand takes too much time. OutreachIQ is a multi-agent AI system that researches each lead, writes personalized messages, plans a multi-touch sequence, understands the lead's reply, and decides the next step on its own: continue, pause, stop, or escalate to a human. We secured the Overall 1st Position.",
    learnings: [
      "Real-world problems require deep user empathy before writing a single line of code",
      "Autonomous agent systems excel when given clear constraints and verification loops",
      "Compelling technical storytelling and live demos make the difference between a project and a winning product",
      "Resilience under time pressure and seamless team role distribution are essential superpowers",
      "Agents become trustworthy when they are grounded in real sources and know when to hand over to a human."
    ],
    mainImage: "/images/saksham-winners.jpg",
    additionalImages: ["/images/kre8ech-logo-light.png"],
    awards: [
      "🏆 Overall First Position Champions (Saksham Hackathon)",
      "💡 Ideation Track Excellence Recognition",
      "🚀 Promothon Special Category Award",
      "💡 Ideathon First Position"
    ],
    teamMembers: ["KRE8ECH Founding Team & Student Builders"],
    verified: true
  },
  {
    id: "ideathon-2026",
    title: "Ideathon 1st Position",
    eventName: "",
    position: "1st Position",
    featuredHeadline: "Ideathon Win",
    date: "",
    venue: "",
    summary: "A KRE8ECH team member secured the 1st Position at the Ideathon.",
    story: "A KRE8ECH team member secured the 1st Position.",
    learnings: [],
    mainImage: "/images/ideathon-winner.jpg",
    additionalImages: [],
    awards: ["💡 Ideathon First Position"],
    teamMembers: ["KRE8ECH Team Member"],
    verified: true
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "EcoSense: Smart Campus Resource Monitor",
    slug: "ecosense-smart-campus",
    category: "AI Applications",
    shortDescription:
      "An intelligent computer vision and telemetry prototype helping schools track energy usage, detect classroom wastage, and suggest green optimizations.",
    fullDescription:
      "EcoSense combines lightweight edge sensors with computer vision to audit energy and water consumption across educational institutions. Built during an exploratory weekend sprint, it provides administrators with a live dashboard highlighting idle electricity usage and actionable sustainability recommendations.",
    status: "Live Demo",
    technologies: ["Next.js", "Python", "Computer Vision", "Tailwind CSS", "Chart.js"],
    teamMembers: ["Student Builder Cohort"],
    demoUrl: "https://ecosense-demo.vercel.app",
    githubUrl: "https://github.com/kre8ech/ecosense-prototype",
    featured: true,
    builtDuring: "KRE8ECH Builder Cohort"
  },
  {
    id: "proj-2",
    title: "StudyLoop: Peer Doubt Resolution Engine",
    slug: "studyloop-peer-engine",
    category: "Web Development",
    shortDescription:
      "A distraction-free web platform where high school students break down complex STEM concepts through structured visual peer explanations.",
    fullDescription:
      "Recognizing how traditional forums become cluttered and intimidating, students built StudyLoop to gamify conceptual clarity. Features include AI-assisted question structuring, step-by-step LaTeX formula previews, and timed mentor voice-note explanations.",
    status: "Prototype",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase", "KaTeX"],
    teamMembers: ["Class 10 Innovators"],
    demoUrl: "https://studyloop.vercel.app",
    githubUrl: "https://github.com/kre8ech/studyloop-app",
    featured: true,
    builtDuring: "Ideate & Build Sprint"
  },
  {
    id: "proj-3",
    title: "Agentic Tutor: Autonomous Math Step Verifier",
    slug: "agentic-tutor-math",
    category: "AI Applications",
    shortDescription:
      "An intelligent step-by-step math solver that doesn't just give answers, but guides the student with hints using multi-agent reasoning.",
    fullDescription:
      "Built on modern agentic AI design patterns inspired by our Saksham Hackathon winning project. Instead of generating ready solutions, Agentic Tutor acts like a Socratic mentor: pinpointing arithmetic slip-ups, asking guiding questions, and reinforcing problem-solving perseverance.",
    status: "Live Demo",
    technologies: ["Gemini AI API", "Next.js", "TypeScript", "Tailwind CSS"],
    teamMembers: ["Saksham Hackathon Team"],
    demoUrl: "https://agentic-tutor.vercel.app",
    githubUrl: "https://github.com/kre8ech/agentic-tutor",
    featured: true,
    builtDuring: "Saksham Hackathon 2026"
  },
  {
    id: "proj-4",
    title: "K8 QuickTask: Voice-Activated Student Planner",
    slug: "k8-quicktask-planner",
    category: "Mobile Applications",
    shortDescription:
      "A fast, distraction-free voice planner designed specifically for Indian school timetables, exam countdowns, and homework tracking.",
    fullDescription:
      "Designed for students who juggle tuition schedules, school project deadlines, and hobby classes. Using natural voice commands, students can create reminders and auto-balance study hours without opening distracting social media apps.",
    status: "Prototype",
    technologies: ["React Native", "Web Speech API", "SQLite", "Tailwind CSS"],
    teamMembers: ["Mobile Dev Track"],
    demoUrl: "",
    githubUrl: "https://github.com/kre8ech/quicktask-mobile",
    featured: false,
    builtDuring: "Four-Week Builder Program"
  },
  {
    id: "proj-5",
    title: "SmartLocker: RFID & PIN Attendance Prototype",
    slug: "smartlocker-rfid",
    category: "Smart Technology",
    shortDescription:
      "An IoT hardware and software prototype for secure physical lab access and equipment check-in for school robotics clubs.",
    fullDescription:
      "Combines microcontroller hardware with a cloud management portal. Students tap their school ID card to borrow lab kits, instantly updating inventory logs in real time and notifying lab instructors.",
    status: "Prototype",
    technologies: ["Arduino / ESP32", "C++", "Next.js Web Portal", "REST APIs"],
    teamMembers: ["Hardware Innovation Club"],
    demoUrl: "",
    githubUrl: "https://github.com/kre8ech/smartlocker-iot",
    featured: false,
    builtDuring: "Hardware Explorer Track"
  },
  {
    id: "proj-6",
    title: "PromptCraft: Visual Prompt Engineering Sandbox",
    slug: "promptcraft-sandbox",
    category: "Innovation Projects",
    shortDescription:
      "An educational playground teaching school students how to construct multi-step prompts, test system instructions, and understand token limits.",
    fullDescription:
      "Created to demystify generative AI for beginners. Students compare outputs across different prompt engineering strategies side-by-side with visual heatmaps highlighting prompt precision and hallucination risks.",
    status: "Live Demo",
    technologies: ["Next.js", "AI SDK", "Tailwind CSS", "TypeScript"],
    teamMembers: ["KRE8ECH Mentors"],
    demoUrl: "https://promptcraft-edu.vercel.app",
    githubUrl: "https://github.com/kre8ech/promptcraft",
    featured: true,
    builtDuring: "AI Literacy Initiative"
  }
];

export const initialHackathons: Hackathon[] = [
  {
    id: "kre8-hack-2026",
    title: "KRE8ECH Grand Offline Builder Hackathon 2026",
    slug: "kre8-grand-builder-hackathon-2026",
    bannerImage: "/images/kre8ech-logo-full.png",
    description:
      "The flagship concluding event of our Builder Program. A full-day, in-person celebration where young student innovators pitch prototypes, collaborate under mentorship, and compete for trophies and seed support.",
    date: "Closing Day of Builder Cohort 1",
    venue: "Main Campus Auditorium & Tech Hub (In-Person)",
    registrationDeadline: "Cohort Enrollment Window",
    eligibility: "Open to enrolled students of the Four-Week Builder Program and invited partner schools (Class 9 - 12)",
    teamSize: "2 - 4 Members per Team",
    tracks: [
      "AI & Intelligent Assistants",
      "Campus & EdTech Solutions",
      "Sustainable & Green Tech",
      "Open Innovation & Creative Code"
    ],
    rules: [
      "All projects must be conceived, built, or significantly extended during the Builder Program journey",
      "Teams must consist of 2 to 4 student participants",
      "External open-source libraries and AI coding assistants are encouraged with proper attribution",
      "Final presentations are strictly 3 minutes + 2 minutes jury Q&A",
      "Live demonstration of a working prototype is mandatory"
    ],
    schedule: [
      { time: "09:00 AM", activity: "Reporting, Registration & Team Kit Handout" },
      { time: "09:45 AM", activity: "Opening Address & Problem Statement Clarification" },
      { time: "10:30 AM", activity: "Hackathon Sprint Session 1 & Mentor Walkthrough" },
      { time: "01:00 PM", activity: "Builder Lunch & Team Strategy Sync" },
      { time: "02:00 PM", activity: "Sprint Session 2: Code Freeze & Pitch Slide Prep" },
      { time: "03:15 PM", activity: "The Grand Stage: 3-Minute Live Project Demos" },
      { time: "05:00 PM", activity: "Jury Deliberation & Guest Keynote" },
      { time: "05:30 PM", activity: "Awards Ceremony, Certificates & Celebration" }
    ],
    status: "Registration Open",
    prizes: "Trophies, Builder Certificates, Hardware Starter Kits & Mentorship Access",
    problemStatementIds: ["ps-1", "ps-2", "ps-3", "ps-4"]
  },
  {
    id: "mini-hack-ideate",
    title: "K8 Sprint: 48-Hour Weekend Ideathon",
    slug: "k8-weekend-ideathon",
    bannerImage: "/images/kre8ech-logo-full.png",
    description:
      "An online weekend sprint focused purely on discovering real-world school problems, designing clickable wireframes in Figma, and writing crisp technical specs.",
    date: "Upcoming (Next Month)",
    venue: "Online (Discord & Google Meet)",
    registrationDeadline: "Announced soon",
    eligibility: "Students from Class 9 to College 1st Year",
    teamSize: "1 - 3 Members",
    tracks: ["School Productivity", "Gamified Learning", "Smart Community"],
    rules: [
      "Submission requires a problem statement, user persona, and interactive Figma prototype",
      "No coding necessary - evaluated purely on user empathy, originality, and clarity of design",
      "Original work only"
    ],
    schedule: [
      { time: "Friday 06:00 PM", activity: "Kickoff & Problem Release" },
      { time: "Saturday 11:00 AM", activity: "Figma Mentorship Clinic" },
      { time: "Sunday 04:00 PM", activity: "Submission Deadline" },
      { time: "Sunday 06:00 PM", activity: "Live Pitch & Results" }
    ],
    status: "Upcoming",
    prizes: "Excellence Badges, Cohort Scholarships & Featured Showcase Spot",
    problemStatementIds: ["ps-5", "ps-6"]
  }
];

export const initialProblemStatements: ProblemStatement[] = [
  {
    id: "ps-1",
    code: "PS-AI-01",
    title: "Personalized AI Study Guide for Mixed-Pace Classrooms",
    category: "AI Applications",
    difficulty: "Intermediate",
    hackathonId: "kre8-hack-2026",
    hackathonName: "KRE8ECH Grand Offline Builder Hackathon 2026",
    status: "Open",
    summary:
      "Design an AI-assisted companion that breaks down complex science or math syllabus chapters into bite-sized analogies matching the student's personal learning speed.",
    background:
      "In standard classrooms, teachers must cater to 40+ students at once. Fast learners get bored, while students who need more time feel left behind. Traditional AI chatbots overwhelm students with walls of text.",
    requirements: [
      "Allow student to input a concept topic or chapter question",
      "Generate explanations adapted to 3 difficulty levels (Beginner, Intermediate, Challenge)",
      "Provide 2 interactive self-check quiz questions with immediate hints",
      "Clean, distraction-free visual interface"
    ],
    expectedDeliverables: [
      "Working web/app prototype with live test inputs",
      "Brief video or live demo showing adaptive explanations",
      "GitHub repository with setup instructions"
    ]
  },
  {
    id: "ps-2",
    code: "PS-ED-02",
    title: "Collaborative Student Project Hub & Asset Repository",
    category: "Web Development",
    difficulty: "Beginner",
    hackathonId: "kre8-hack-2026",
    hackathonName: "KRE8ECH Grand Offline Builder Hackathon 2026",
    status: "Open",
    summary:
      "Build a simple, responsive portal where student teams can track milestone tasks, share research links, and store code snippets without complex enterprise tools like Jira.",
    background:
      "Student group projects frequently collapse due to fragmented communication across WhatsApp, lost drive links, and unequal division of work.",
    requirements: [
      "Kanban board or milestone checklist (To Do, Doing, Done)",
      "Shared resource link list with title and tags",
      "Team member role tags and task assignment",
      "Clean responsive layout optimized for mobile and laptop"
    ],
    expectedDeliverables: [
      "Functional interactive web application",
      "Local storage or lightweight database integration",
      "Responsive UI walkthrough"
    ]
  },
  {
    id: "ps-3",
    code: "PS-ECO-03",
    title: "Campus Energy & Paper Waste Visualizer",
    category: "Smart Technology",
    difficulty: "Intermediate",
    hackathonId: "kre8-hack-2026",
    hackathonName: "KRE8ECH Grand Offline Builder Hackathon 2026",
    status: "Open",
    summary:
      "Create a gamified dashboard that tracks estimated energy consumption and printing paper metrics across school departments to encourage sustainable habits.",
    background:
      "Schools consume substantial electrical energy through forgotten fans, ACs, and redundant paper worksheets. Making waste visible inspires collective accountability.",
    requirements: [
      "Interactive data charts showing daily/weekly campus metrics",
      "Department leaderboard for highest conservation score",
      "Actionable student tip cards and challenge generator",
      "Easy data entry form for class eco-monitors"
    ],
    expectedDeliverables: [
      "Live interactive web dashboard with simulated or real data",
      "Presentation slide deck illustrating campus impact",
      "Source code with README documentation"
    ]
  },
  {
    id: "ps-4",
    code: "PS-AUTO-04",
    title: "Intelligent Timetable Conflict & Exam Prep Scheduler",
    category: "Automation",
    difficulty: "Advanced",
    hackathonId: "kre8-hack-2026",
    hackathonName: "KRE8ECH Grand Offline Builder Hackathon 2026",
    status: "Open",
    summary:
      "Develop an automated calendar algorithm that accepts exam dates and syllabus chapters, then generates an optimized daily study schedule with spaced repetition slots.",
    background:
      "High school students often cram 48 hours before exams. A smart tool that spaces out revisions according to chapter weightage can transform academic outcomes.",
    requirements: [
      "Form input for exam dates, subject names, and self-assessed difficulty (1-5)",
      "Algorithmic distribution of revision blocks across remaining calendar days",
      "Automated reminder triggers or exportable calendar file (iCal/CSV)",
      "Daily progress tracker with completion checkboxes"
    ],
    expectedDeliverables: [
      "Deployed working web app with algorithmic scheduling engine",
      "Test dataset showing schedule generation for 5 subjects",
      "Source code with documentation"
    ]
  },
  {
    id: "ps-5",
    code: "PS-IDEA-05",
    title: "Accessible Digital Notes for Visually Impaired Students",
    category: "Innovation Projects",
    difficulty: "Intermediate",
    hackathonId: "mini-hack-ideate",
    hackathonName: "K8 Sprint: 48-Hour Weekend Ideathon",
    status: "Open",
    summary:
      "Design an audio-first interface and high-contrast reader that converts whiteboard photos and handwriting into clear audio narrations.",
    background:
      "Classroom blackboards and printed sheets remain inaccessible to students with low vision or reading difficulties.",
    requirements: [
      "Figma interactive prototype of mobile reader interface",
      "User journey mapping for audio playback controls and voice commands",
      "High-contrast color scheme adhering to WCAG AAA standards"
    ],
    expectedDeliverables: [
      "Figma link with low and high-fidelity wireframes",
      "3-minute video walkthrough of prototype user flow"
    ]
  },
  {
    id: "ps-6",
    code: "PS-IDEA-06",
    title: "Community Micro-Volunteering & Neighborhood Tech Help",
    category: "Prototypes & MVPs",
    difficulty: "Beginner",
    hackathonId: "mini-hack-ideate",
    hackathonName: "K8 Sprint: 48-Hour Weekend Ideathon",
    status: "Closed",
    summary:
      "A prototype connecting tech-savvy high schoolers with senior citizens in their neighborhood who need help setting up digital payments or smartphones.",
    background:
      "Elderly citizens often struggle with smartphone security and government digital portals, while students are looking for meaningful local community service.",
    requirements: [
      "Verified student profile signup and request matching system",
      "Safety guidelines and appointment scheduling workflow",
      "Senior-friendly large-typography UI"
    ],
    expectedDeliverables: [
      "Detailed UX research doc and wireframe flow",
      "Prototype walkthrough video"
    ]
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Registration Open: Four-Week Builder Program Cohort 1",
    date: "Current Enrollment",
    tag: "Program",
    content:
      "Applications are now live for school students (Class 9 onwards). Experience 11 online interactive sessions and our premier concluding offline builder hackathon!",
    isPinned: true
  },
  {
    id: "ann-2",
    title: "Celebration: Team KRE8ECH Secures 1st Position at Saksham Hackathon",
    date: "Milestone",
    tag: "Urgent",
    content:
      "Proud milestone for our community! Our student builders clinched the 1st position overall, along with Ideation and Promothon track honors at the Agentic AI Saksham Hackathon.",
    isPinned: true
  },
  {
    id: "ann-3",
    title: "New Problem Statements Published for Upcoming Hackathon",
    date: "Challenge Update",
    tag: "Hackathon",
    content:
      "Explore 6 curated real-world problem statements across AI, Campus Sustainability, and Automation. Check the Problem Statements tab to pick your challenge early.",
    isPinned: false
  }
];
