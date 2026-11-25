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

const getLocalData = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalData = <T>(key: string, data: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage quota / private mode failures
  }
};

const escapeCsvField = (value: unknown): string => {
  const str = String(value ?? "").replace(/"/g, '""');
  return `"${str}"`;
};

const downloadCsv = (filenamePrefix: string, headers: string[], rows: unknown[][]): void => {
  const csvLines = [
    headers.map(escapeCsvField).join(","),
    ...rows.map((row) => row.map(escapeCsvField).join(","))
  ];
  const blob = new Blob(["\uFEFF" + csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filenamePrefix}_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Program Data
export const getProgramData = (): ProgramOverview => {
  return getLocalData<ProgramOverview>(KEYS.PROGRAM, initialProgramData);
};

export const saveProgramData = (data: ProgramOverview): void => {
  setLocalData(KEYS.PROGRAM, data);
};

// Projects
export const getProjects = (): Project[] => {
  return getLocalData<Project[]>(KEYS.PROJECTS, initialProjects);
};

export const saveProjects = (projects: Project[]): void => {
  setLocalData(KEYS.PROJECTS, projects);
};

export const addProject = (project: Project): void => {
  saveProjects([project, ...getProjects()]);
};

export const updateProject = (updated: Project): void => {
  saveProjects(getProjects().map((p) => (p.id === updated.id ? updated : p)));
};

export const deleteProject = (id: string): void => {
  saveProjects(getProjects().filter((p) => p.id !== id));
};

// Achievements
export const getAchievements = (): Achievement[] => {
  return getLocalData<Achievement[]>(KEYS.ACHIEVEMENTS, initialAchievements);
};

export const saveAchievements = (achievements: Achievement[]): void => {
  setLocalData(KEYS.ACHIEVEMENTS, achievements);
};

export const addAchievement = (achievement: Achievement): void => {
  saveAchievements([achievement, ...getAchievements()]);
};

export const updateAchievement = (updated: Achievement): void => {
  saveAchievements(getAchievements().map((a) => (a.id === updated.id ? updated : a)));
};

// Hackathons
export const getHackathons = (): Hackathon[] => {
  return getLocalData<Hackathon[]>(KEYS.HACKATHONS, initialHackathons);
};

export const saveHackathons = (hackathons: Hackathon[]): void => {
  setLocalData(KEYS.HACKATHONS, hackathons);
};

export const addHackathon = (hackathon: Hackathon): void => {
  saveHackathons([hackathon, ...getHackathons()]);
};

export const updateHackathon = (updated: Hackathon): void => {
  saveHackathons(getHackathons().map((h) => (h.id === updated.id ? updated : h)));
};

// Problem Statements
export const getProblemStatements = (): ProblemStatement[] => {
  return getLocalData<ProblemStatement[]>(KEYS.PROBLEM_STATEMENTS, initialProblemStatements);
};

export const saveProblemStatements = (statements: ProblemStatement[]): void => {
  setLocalData(KEYS.PROBLEM_STATEMENTS, statements);
};

export const addProblemStatement = (statement: ProblemStatement): void => {
  saveProblemStatements([statement, ...getProblemStatements()]);
};

export const updateProblemStatement = (updated: ProblemStatement): void => {
  saveProblemStatements(getProblemStatements().map((ps) => (ps.id === updated.id ? updated : ps)));
};

export const deleteProblemStatement = (id: string): void => {
  saveProblemStatements(getProblemStatements().filter((ps) => ps.id !== id));
};

// Student Registrations
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
  saveStudentRegistrations(getStudentRegistrations().map((r) => (r.id === updated.id ? updated : r)));
};

export const deleteStudentRegistration = (id: string): void => {
  saveStudentRegistrations(getStudentRegistrations().filter((r) => r.id !== id));
};

export const registerStudent = (
  student: Omit<StudentRegistration, "id" | "registeredAt" | "status">
): StudentRegistration => {
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

// Admin Auth State (session-scoped so tab close locks access automatically)
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
    // ignore
  }
};

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
  downloadCsv("kre8ech_student_records", headers, rows);
};

// Hackready Workshop Registrations
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
  saveHackreadyRegistrations(getHackreadyRegistrations().map((r) => (r.id === updated.id ? updated : r)));
};

export const deleteHackreadyRegistration = (id: string): void => {
  saveHackreadyRegistrations(getHackreadyRegistrations().filter((r) => r.id !== id));
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
  } catch {
    // ignore secondary sync failure
  }

  return newRecord;
};

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
  downloadCsv("kre8ech_hackready_workshop_students", headers, rows);
};
