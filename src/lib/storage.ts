"use client";

import {
  ProgramOverview,
  Project,
  Achievement,
  Hackathon,
  ProblemStatement,
  StudentRegistration,
  HackreadyRegistration,
  Announcement
} from "@/types";
import {
  initialProgramData,
  initialProjects,
  initialAchievements,
  initialHackathons,
  initialProblemStatements,
  initialAnnouncements
} from "@/data/mockData";

const KEYS = {
  PROGRAM: "kre8ech_program_data",
  PROJECTS: "kre8ech_projects",
  ACHIEVEMENTS: "kre8ech_achievements",
  HACKATHONS: "kre8ech_hackathons",
  PROBLEM_STATEMENTS: "kre8ech_problem_statements",
  REGISTRATIONS: "kre8ech_student_registrations",
  HACKREADY: "kre8ech_hackready_registrations",
  ANNOUNCEMENTS: "kre8ech_announcements",
  ADMIN_AUTH: "kre8ech_admin_auth",
  STUDENT_USER: "kre8ech_student_user",
  WEBHOOK: "kre8ech_webhook_url",
};

// Safe storage access
const getLocalData = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const setLocalData = <T>(key: string, data: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

// Program Data Access
export const getProgramData = (): ProgramOverview => {
  return getLocalData<ProgramOverview>(KEYS.PROGRAM, initialProgramData);
};

export const saveProgramData = (data: ProgramOverview): void => {
  setLocalData(KEYS.PROGRAM, data);
};

// Projects Access
export const getProjects = (): Project[] => {
  return getLocalData<Project[]>(KEYS.PROJECTS, initialProjects);
};

export const saveProjects = (projects: Project[]): void => {
  setLocalData(KEYS.PROJECTS, projects);
};

export const addProject = (project: Project): void => {
  const current = getProjects();
  saveProjects([project, ...current]);
};

export const updateProject = (updated: Project): void => {
  const current = getProjects();
  const next = current.map((p) => (p.id === updated.id ? updated : p));
  saveProjects(next);
};

export const deleteProject = (id: string): void => {
  const current = getProjects();
  saveProjects(current.filter((p) => p.id !== id));
};

// Achievements Access
export const getAchievements = (): Achievement[] => {
  return getLocalData<Achievement[]>(KEYS.ACHIEVEMENTS, initialAchievements);
};

export const saveAchievements = (achievements: Achievement[]): void => {
  setLocalData(KEYS.ACHIEVEMENTS, achievements);
};

export const addAchievement = (achievement: Achievement): void => {
  const current = getAchievements();
  saveAchievements([achievement, ...current]);
};

export const updateAchievement = (updated: Achievement): void => {
  const current = getAchievements();
  saveAchievements(current.map((a) => (a.id === updated.id ? updated : a)));
};

// Hackathons Access
export const getHackathons = (): Hackathon[] => {
  return getLocalData<Hackathon[]>(KEYS.HACKATHONS, initialHackathons);
};

export const saveHackathons = (hackathons: Hackathon[]): void => {
  setLocalData(KEYS.HACKATHONS, hackathons);
};

export const addHackathon = (hackathon: Hackathon): void => {
  const current = getHackathons();
  saveHackathons([hackathon, ...current]);
};

export const updateHackathon = (updated: Hackathon): void => {
  const current = getHackathons();
  saveHackathons(current.map((h) => (h.id === updated.id ? updated : h)));
};

// Problem Statements Access
export const getProblemStatements = (): ProblemStatement[] => {
  return getLocalData<ProblemStatement[]>(KEYS.PROBLEM_STATEMENTS, initialProblemStatements);
};

export const saveProblemStatements = (statements: ProblemStatement[]): void => {
  setLocalData(KEYS.PROBLEM_STATEMENTS, statements);
};

export const addProblemStatement = (statement: ProblemStatement): void => {
  const current = getProblemStatements();
  saveProblemStatements([statement, ...current]);
};

export const updateProblemStatement = (updated: ProblemStatement): void => {
  const current = getProblemStatements();
  saveProblemStatements(current.map((ps) => (ps.id === updated.id ? updated : ps)));
};

export const deleteProblemStatement = (id: string): void => {
  const current = getProblemStatements();
  saveProblemStatements(current.filter((ps) => ps.id !== id));
};

// Student Registrations Access
export const getStudentRegistrations = (): StudentRegistration[] => {
  const initialRegistrations: StudentRegistration[] = [
    {
      id: "reg-1",
      fullName: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phoneNumber: "+91 98765 43210",
      schoolCollege: "Delhi Public School, R.K. Puram",
      classYear: "Class 10",
      city: "New Delhi",
      techInterests: ["AI & Machine Learning", "Web Development"],
      registeredProgram: "Four-Week Builder Program Cohort 1",
      status: "Confirmed",
      registeredAt: "2026-11-18",
      notes: "Selected Track D: AI Automation"
    },
    {
      id: "reg-2",
      fullName: "Ananya Iyer",
      email: "ananya.iyer@example.com",
      phoneNumber: "+91 98112 34567",
      schoolCollege: "The Mother's International School",
      classYear: "Class 11",
      city: "New Delhi",
      techInterests: ["Smart IoT & Robotics", "UI/UX Prototyping"],
      registeredProgram: "Four-Week Builder Program Cohort 1",
      status: "Confirmed",
      registeredAt: "2026-11-19",
      notes: "Wants to lead hardware prototyping"
    },
    {
      id: "reg-3",
      fullName: "Rohan Patel",
      email: "rohan.patel@example.com",
      phoneNumber: "+91 99001 23456",
      schoolCollege: "National Public School",
      classYear: "Class 9",
      city: "Bengaluru",
      techInterests: ["Web Development", "Game Dev & Creative Code"],
      registeredProgram: "Four-Week Builder Program Cohort 1",
      status: "Shortlisted",
      registeredAt: "2026-11-20",
      notes: "Parent inquired about weekend timings"
    }
  ];
  return getLocalData<StudentRegistration[]>(KEYS.REGISTRATIONS, initialRegistrations);
};

export const saveStudentRegistrations = (registrations: StudentRegistration[]): void => {
  setLocalData(KEYS.REGISTRATIONS, registrations);
};

export const updateStudentRegistration = (updated: StudentRegistration): void => {
  const current = getStudentRegistrations();
  const next = current.map((r) => (r.id === updated.id ? updated : r));
  saveStudentRegistrations(next);
};

export const deleteStudentRegistration = (id: string): void => {
  const current = getStudentRegistrations();
  saveStudentRegistrations(current.filter((r) => r.id !== id));
};

export const registerStudent = (student: Omit<StudentRegistration, "id" | "registeredAt" | "status">): StudentRegistration => {
  const current = getStudentRegistrations();
  const newRecord: StudentRegistration = {
    ...student,
    id: `reg-${Date.now()}`,
    registeredAt: new Date().toISOString().split("T")[0],
    status: "Confirmed"
  };
  setLocalData(KEYS.REGISTRATIONS, [newRecord, ...current]);
  return newRecord;
};

// Webhook config
export const getWebhookUrl = (): string => {
  return getLocalData<string>(KEYS.WEBHOOK, "");
};

export const saveWebhookUrl = (url: string): void => {
  setLocalData(KEYS.WEBHOOK, url);
};

// Announcements
export const getAnnouncements = (): Announcement[] => {
  return getLocalData<Announcement[]>(KEYS.ANNOUNCEMENTS, initialAnnouncements);
};

export const saveAnnouncements = (announcements: Announcement[]): void => {
  setLocalData(KEYS.ANNOUNCEMENTS, announcements);
};

// Student Auth Session
export interface StudentSession {
  fullName: string;
  email: string;
  schoolCollege: string;
  classYear: string;
  city: string;
  techInterests: string[];
  registeredProgram: string;
}

export const getStudentSession = (): StudentSession | null => {
  return getLocalData<StudentSession | null>(KEYS.STUDENT_USER, null);
};

export const setStudentSession = (session: StudentSession | null): void => {
  setLocalData(KEYS.STUDENT_USER, session);
};

// Admin Auth State (session-scoped so closing the tab locks access)
export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(KEYS.ADMIN_AUTH) === "true";
  } catch {
    return false;
  }
};

export const setAdminAuthenticated = (isAuth: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    if (isAuth) {
      sessionStorage.setItem(KEYS.ADMIN_AUTH, "true");
    } else {
      sessionStorage.removeItem(KEYS.ADMIN_AUTH);
    }
    localStorage.removeItem(KEYS.ADMIN_AUTH);
  } catch {
    // ignore storage errors
  }
};

const escapeCsvCell = (value: unknown): string => {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
};

const downloadCsvFile = (filename: string, headers: string[], rows: unknown[][]): void => {
  const lines = [headers.map(escapeCsvCell).join(","), ...rows.map((row) => row.map(escapeCsvCell).join(","))];
  // \uFEFF Byte Order Mark ensures Microsoft Excel opens UTF-8 encoded text properly
  const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", objectUrl);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
};

// Export CSV (compatible with Excel via UTF-8 BOM)
export const exportRegistrationsToCSV = (registrations: StudentRegistration[]): void => {
  const headers = [
    "ID",
    "Full Name",
    "Email",
    "Phone Number",
    "School/College",
    "Class/Year",
    "City",
    "Interests",
    "Program",
    "Status",
    "Date",
    "Notes"
  ];
  const rows = registrations.map((r) => [
    r.id,
    r.fullName || "",
    r.email || "",
    r.phoneNumber || "",
    r.schoolCollege || "",
    r.classYear || "",
    r.city || "",
    (r.techInterests || []).join(", "),
    r.registeredProgram || "N/A",
    r.status || "Confirmed",
    r.registeredAt || "",
    r.notes || ""
  ]);

  downloadCsvFile(
    `kre8ech_student_records_${new Date().toISOString().split("T")[0]}.csv`,
    headers,
    rows
  );
};

// ==========================================
// Hackready Workshop Registrations Access
// ==========================================
export const getHackreadyRegistrations = (): HackreadyRegistration[] => {
  const initialHackready: HackreadyRegistration[] = [
    {
      id: "hr-1",
      fullName: "Rohan Verma",
      email: "rohan.verma@gmail.com",
      phoneNumber: "+91 98757 21958",
      rollNo: "220101045",
      branch: "Computer Science & Engineering (CSE)",
      semester: "5th Semester",
      collegeName: "Global Institute of Technology & Management (GITM)",
      status: "Confirmed",
      registeredAt: "2026-11-21",
      notes: "Interested in Full Stack & AI agent development"
    },
    {
      id: "hr-2",
      fullName: "Priya Nair",
      email: "priya.nair@gmail.com",
      phoneNumber: "+91 98112 34567",
      rollNo: "230102018",
      branch: "Information Technology (IT)",
      semester: "3rd Semester",
      collegeName: "Delhi Technological University (DTU)",
      status: "Confirmed",
      registeredAt: "2026-11-22",
      notes: "Looking to build multi-agent automation"
    },
    {
      id: "hr-3",
      fullName: "Aman Singh",
      email: "aman.singh@gmail.com",
      phoneNumber: "+91 99001 23456",
      rollNo: "210103092",
      branch: "Electronics & Communication (ECE)",
      semester: "7th Semester",
      collegeName: "Guru Gobind Singh Indraprastha University (GGSIPU)",
      status: "Shortlisted",
      registeredAt: "2026-11-23",
      notes: "Smart IoT & Embedded track participant"
    }
  ];
  return getLocalData<HackreadyRegistration[]>(KEYS.HACKREADY, initialHackready);
};

export const saveHackreadyRegistrations = (registrations: HackreadyRegistration[]): void => {
  setLocalData(KEYS.HACKREADY, registrations);
};

export const updateHackreadyRegistration = (updated: HackreadyRegistration): void => {
  const current = getHackreadyRegistrations();
  const next = current.map((r) => (r.id === updated.id ? updated : r));
  saveHackreadyRegistrations(next);
};

export const deleteHackreadyRegistration = (id: string): void => {
  const current = getHackreadyRegistrations();
  saveHackreadyRegistrations(current.filter((r) => r.id !== id));
};

export const registerHackreadyStudent = (
  student: Omit<HackreadyRegistration, "id" | "registeredAt" | "status">
): HackreadyRegistration => {
  const current = getHackreadyRegistrations();
  const today = new Date().toISOString().split("T")[0];
  const newRecord: HackreadyRegistration = {
    ...student,
    id: `hr-${Date.now()}`,
    registeredAt: today,
    status: "Confirmed"
  };
  setLocalData(KEYS.HACKREADY, [newRecord, ...current]);

  // Also sync into main StudentRegistration list so it shows up in global records
  try {
    const mainList = getStudentRegistrations();
    const syncedStudent: StudentRegistration = {
      id: newRecord.id,
      fullName: newRecord.fullName,
      email: newRecord.email,
      phoneNumber: newRecord.phoneNumber,
      schoolCollege: newRecord.collegeName || "College",
      classYear: `${newRecord.branch} (${newRecord.semester})`,
      city: "College Campus",
      techInterests: ["Hackathon Preparation", "Prototype Building"],
      registeredProgram: "Hackready Workshop",
      status: "Confirmed",
      registeredAt: today,
      notes: `Roll No: ${newRecord.rollNo} | Branch: ${newRecord.branch} | Sem: ${newRecord.semester}`
    };
    saveStudentRegistrations([syncedStudent, ...mainList.filter((s) => s.id !== newRecord.id)]);
  } catch (e) {
    // fallback
  }

  return newRecord;
};

// Export Hackready to CSV (compatible with Excel via BOM)
export const exportHackreadyToCSV = (registrations: HackreadyRegistration[]): void => {
  const headers = [
    "Roll No",
    "Student Name",
    "Branch",
    "Semester",
    "Gmail / Email",
    "Phone Number",
    "Status",
    "Registration Date",
    "Notes"
  ];

  const rows = registrations.map((r) => [
    r.rollNo || "",
    r.fullName || "",
    r.branch || "",
    r.semester || "",
    r.email || "",
    r.phoneNumber || "",
    r.status || "Confirmed",
    r.registeredAt || "",
    r.notes || ""
  ]);

  downloadCsvFile(
    `kre8ech_hackready_workshop_students_${new Date().toISOString().split("T")[0]}.csv`,
    headers,
    rows
  );
};
