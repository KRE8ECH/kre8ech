export interface WeekCurriculum {
  weekNumber: number;
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  onlineDays: number;
  offlineDays: number;
  sessionFormat: string;
  focus: string;
  description: string;
  learningObjectives: string[];
  days: {
    dayNumber: number;
    title: string;
    description: string;
    topics: string[];
    isHackathonDay?: boolean;
  }[];
  practicalActivities: string[];
  expectedOutputs: string[];
  toolsTechnologies: string[];
  icon: string;
}

export interface ProgramOverview {
  title: string;
  tagline: string;
  duration: string;
  totalDays: number;
  onlineDays: number;
  offlineHackathonDays: number;
  sessionDuration: string;
  mainSessionDuration: string;
  doubtSessionDuration: string;
  targetAudience: string;
  eligibility: string;
  overviewDescription: string;
  weeks: WeekCurriculum[];
}

export type ProjectCategory =
  | "All"
  | "AI Applications"
  | "Web Development"
  | "Mobile Applications"
  | "Automation"
  | "Smart Technology"
  | "Prototypes & MVPs"
  | "Hackathon Projects"
  | "Innovation Projects";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  coverImage?: string;
  status: "Completed" | "Prototype" | "Live Demo" | "In Progress";
  technologies: string[];
  teamMembers?: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  builtDuring?: string;
}

export interface Achievement {
  id: string;
  title: string;
  eventName: string;
  position: string;
  featuredHeadline: string;
  date: string;
  venue?: string;
  summary: string;
  story: string;
  learnings: string[];
  mainImage: string;
  additionalImages?: string[];
  awards: string[];
  teamMembers: string[];
  verified: boolean;
}

export type HackathonStatus = "Upcoming" | "Registration Open" | "Ongoing" | "Completed";

export interface Hackathon {
  id: string;
  title: string;
  slug: string;
  bannerImage: string;
  description: string;
  date: string;
  venue: string;
  registrationDeadline: string;
  eligibility: string;
  teamSize: string;
  tracks: string[];
  rules: string[];
  schedule: { time: string; activity: string }[];
  status: HackathonStatus;
  prizes?: string;
  problemStatementIds?: string[];
}

export interface ProblemStatement {
  id: string;
  code: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  hackathonId?: string;
  hackathonName?: string;
  status: "Open" | "Closed";
  summary: string;
  description?: string;
  background: string;
  requirements: string[];
  expectedDeliverables: string[];
}

export interface StudentRegistration {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  schoolCollege: string;
  classYear: string;
  city: string;
  techInterests: string[];
  registeredProgram?: string;
  status: "Pending" | "Confirmed" | "Shortlisted" | "Contacted";
  registeredAt: string;
  notes?: string;
  // Optional college/hackready specific fields if stored together
  rollNo?: string;
  branch?: string;
  semester?: string;
}

export interface HackreadyRegistration {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  rollNo: string;
  branch: string;
  semester: string;
  collegeName?: string;
  registeredAt: string;
  status: "Pending" | "Confirmed" | "Shortlisted" | "Contacted";
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  tag: "Program" | "Hackathon" | "Update" | "Urgent";
  content: string;
  isPinned?: boolean;
}
