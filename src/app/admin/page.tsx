"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Layers,
  Code,
  Trophy,
  Calendar,
  FileText,
  Users,
  Bell,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Download,
  Upload,
  Search,
  Save,
  ArrowRight,
  Phone,
  Mail,
  Eye,
  X,
  Building,
  GraduationCap,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Link as LinkIcon,
  HelpCircle,
  Clock,
  Send,
  AlertCircle,
  Hash
} from "lucide-react";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";
import {
  isAdminAuthenticated,
  setAdminAuthenticated,
  getProgramData,
  saveProgramData,
  getProjects,
  saveProjects,
  addProject,
  deleteProject,
  getAchievements,
  saveAchievements,
  getHackathons,
  saveHackathons,
  addHackathon,
  getProblemStatements,
  saveProblemStatements,
  addProblemStatement,
  deleteProblemStatement,
  getStudentRegistrations,
  saveStudentRegistrations,
  updateStudentRegistration,
  deleteStudentRegistration,
  exportRegistrationsToCSV,
  getHackreadyRegistrations,
  saveHackreadyRegistrations,
  updateHackreadyRegistration,
  deleteHackreadyRegistration,
  exportHackreadyToCSV,
  getWebhookUrl,
  saveWebhookUrl,
  getAnnouncements,
  saveAnnouncements
} from "@/lib/storage";
import {
  getActiveSheetsEndpoint,
  isGlobalSheetsSyncConfigured,
  syncToGoogleSheet
} from "@/lib/sheetsSync";
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

type AdminTab =
  | "registrations"
  | "hackready"
  | "curriculum"
  | "projects"
  | "achievements"
  | "hackathons"
  | "problemStatements"
  | "announcements";

const EXPECTED_PASSCODE_HASH = (
  process.env.NEXT_PUBLIC_ADMIN_PASSCODE_HASH ||
  "08c6a861da44b39b86f41fa39fb33dc83fe6c741b19bc0789ed68a9bb44cd5ab"
).toLowerCase();

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const availableInterestOptions = [
  "Artificial Intelligence & LLMs",
  "Web Development & Frontend",
  "Mobile Apps (Android / iOS)",
  "Smart IoT & Robotics",
  "UI/UX Design & Prototyping",
  "Automation & Scripts",
  "Competitive Hackathons"
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("registrations");

  // State data
  const [program, setProgram] = useState<ProgramOverview | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Feedback banner
  const [feedback, setFeedback] = useState<string | null>(null);

  // Registrations Filter & Search
  const [regSearch, setRegSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [programFilter, setProgramFilter] = useState<string>("All");

  // Hackready Workshop state
  const [hackreadyList, setHackreadyList] = useState<HackreadyRegistration[]>([]);
  const [hackSearch, setHackSearch] = useState("");
  const [hackStatusFilter, setHackStatusFilter] = useState<string>("All");
  const [hackBranchFilter, setHackBranchFilter] = useState<string>("All");
  const [selectedHackready, setSelectedHackready] = useState<HackreadyRegistration | null>(null);
  const [editHackNotes, setEditHackNotes] = useState("");
  const [isAddHackOpen, setIsAddHackOpen] = useState(false);
  const [manualHackForm, setManualHackForm] = useState({
    fullName: "",
    rollNo: "",
    branch: "Computer Science & Engineering (CSE)",
    semester: "5th Semester",
    email: "",
    phoneNumber: "",
    collegeName: "",
    status: "Confirmed" as HackreadyRegistration["status"],
    notes: ""
  });

  // Dossier Modal
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null);
  const [editNotes, setEditNotes] = useState("");

  // Add Student Modal
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    schoolCollege: "",
    classYear: "Class 9",
    city: "",
    registeredProgram: "Four-Week Builder Program Cohort 1",
    techInterests: ["Artificial Intelligence & LLMs"],
    status: "Confirmed" as StudentRegistration["status"],
    notes: ""
  });

  // Webhook Sync Modal / Panel
  const [isWebhookOpen, setIsWebhookOpen] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState("");
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);

  // Backup / JSON Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [jsonImportText, setJsonImportText] = useState("");

  useEffect(() => {
    const isAuth = isAdminAuthenticated();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadAllData();
    }
  }, []);

  const loadAllData = () => {
    setProgram(getProgramData());
    setProjects(getProjects());
    setAchievements(getAchievements());
    setHackathons(getHackathons());
    setProblemStatements(getProblemStatements());
    const regs = getStudentRegistrations();
    setRegistrations(regs);
    setHackreadyList(getHackreadyRegistrations());
    setAnnouncements(getAnnouncements());
    setWebhookUrlInput(getWebhookUrl() || getActiveSheetsEndpoint().url);
  };

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const enteredHash = await sha256Hex(passcode.trim());
      if (enteredHash === EXPECTED_PASSCODE_HASH) {
        setAdminAuthenticated(true);
        setIsAuthenticated(true);
        setPasscode("");
        loadAllData();
      } else {
        setLoginError("Invalid passcode.");
      }
    } catch {
      setLoginError("Unable to verify passcode in this browser.");
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  // --- Registration Actions ---
  const handleOpenDossier = (student: StudentRegistration) => {
    setSelectedStudent(student);
    setEditNotes(student.notes || "");
  };

  const handleCloseDossier = () => {
    setSelectedStudent(null);
  };

  const handleStatusChange = (id: string, newStatus: StudentRegistration["status"]) => {
    const target = registrations.find((r) => r.id === id);
    if (!target) return;
    const updated: StudentRegistration = { ...target, status: newStatus };
    updateStudentRegistration(updated);
    const refreshed = getStudentRegistrations();
    setRegistrations(refreshed);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(updated);
    }
    showFeedback(`Student status updated to "${newStatus}"!`);
  };

  const handleSaveNotes = () => {
    if (!selectedStudent) return;
    const updated: StudentRegistration = { ...selectedStudent, notes: editNotes };
    updateStudentRegistration(updated);
    setSelectedStudent(updated);
    setRegistrations(getStudentRegistrations());
    showFeedback("Admin notes saved successfully!");
  };

  const handleDeleteRegistration = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the registration record for "${name}"?`)) {
      deleteStudentRegistration(id);
      setRegistrations(getStudentRegistrations());
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
      }
      showFeedback(`Record for ${name} removed.`);
    }
  };

  const handleManualAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName.trim() || !manualForm.email.trim() || !manualForm.phoneNumber.trim()) {
      alert("Please fill in Student Name, Phone, and Email.");
      return;
    }

    const newRecord: StudentRegistration = {
      id: `reg-${Date.now()}`,
      fullName: manualForm.fullName.trim(),
      email: manualForm.email.trim(),
      phoneNumber: manualForm.phoneNumber.trim(),
      schoolCollege: manualForm.schoolCollege.trim() || "Independent",
      classYear: manualForm.classYear,
      city: manualForm.city.trim() || "India",
      registeredProgram: manualForm.registeredProgram,
      techInterests: manualForm.techInterests,
      status: manualForm.status,
      registeredAt: new Date().toISOString().split("T")[0],
      notes: manualForm.notes.trim()
    };

    const next = [newRecord, ...registrations];
    saveStudentRegistrations(next);
    setRegistrations(next);
    setIsAddStudentOpen(false);
    showFeedback(`Record added for ${newRecord.fullName}!`);

    // Reset manual form
    setManualForm({
      fullName: "",
      email: "",
      phoneNumber: "",
      schoolCollege: "",
      classYear: "Class 9",
      city: "",
      registeredProgram: "Four-Week Builder Program Cohort 1",
      techInterests: ["Artificial Intelligence & LLMs"],
      status: "Confirmed",
      notes: ""
    });
  };

  // --- Hackready Actions ---
  const handleOpenHackDossier = (record: HackreadyRegistration) => {
    setSelectedHackready(record);
    setEditHackNotes(record.notes || "");
  };

  const handleCloseHackDossier = () => {
    setSelectedHackready(null);
  };

  const handleHackStatusChange = (id: string, newStatus: HackreadyRegistration["status"]) => {
    const target = hackreadyList.find((h) => h.id === id);
    if (!target) return;
    const updated: HackreadyRegistration = { ...target, status: newStatus };
    updateHackreadyRegistration(updated);
    const refreshed = getHackreadyRegistrations();
    setHackreadyList(refreshed);
    if (selectedHackready && selectedHackready.id === id) {
      setSelectedHackready(updated);
    }
    showFeedback(`Hackready status updated to "${newStatus}"!`);
  };

  const handleSaveHackNotes = () => {
    if (!selectedHackready) return;
    const updated: HackreadyRegistration = { ...selectedHackready, notes: editHackNotes };
    updateHackreadyRegistration(updated);
    setSelectedHackready(updated);
    setHackreadyList(getHackreadyRegistrations());
    showFeedback("Hackready internal notes saved successfully!");
  };

  const handleDeleteHack = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the Hackready Workshop record for "${name}"?`)) {
      deleteHackreadyRegistration(id);
      setHackreadyList(getHackreadyRegistrations());
      if (selectedHackready && selectedHackready.id === id) {
        setSelectedHackready(null);
      }
      showFeedback(`Record for ${name} removed.`);
    }
  };

  const handleManualAddHack = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !manualHackForm.fullName.trim() ||
      !manualHackForm.rollNo.trim() ||
      !manualHackForm.email.trim() ||
      !manualHackForm.phoneNumber.trim()
    ) {
      alert("Please fill in Student Name, Roll No, Gmail, and Phone Number.");
      return;
    }

    const newRecord: HackreadyRegistration = {
      id: `hr-${Date.now()}`,
      fullName: manualHackForm.fullName.trim(),
      rollNo: manualHackForm.rollNo.trim(),
      branch: manualHackForm.branch.trim(),
      semester: manualHackForm.semester.trim(),
      email: manualHackForm.email.trim(),
      phoneNumber: manualHackForm.phoneNumber.trim(),
      collegeName: manualHackForm.collegeName.trim() || "Engineering College",
      status: manualHackForm.status,
      registeredAt: new Date().toISOString().split("T")[0],
      notes: manualHackForm.notes.trim()
    };

    const next = [newRecord, ...hackreadyList];
    saveHackreadyRegistrations(next);
    setHackreadyList(next);
    setIsAddHackOpen(false);
    showFeedback(`Hackready record added for ${newRecord.fullName}!`);

    setManualHackForm({
      fullName: "",
      rollNo: "",
      branch: "Computer Science & Engineering (CSE)",
      semester: "5th Semester",
      email: "",
      phoneNumber: "",
      collegeName: "",
      status: "Confirmed",
      notes: ""
    });
  };

  const globalSheetsConfigured = isGlobalSheetsSyncConfigured();

  const handleSaveWebhook = () => {
    saveWebhookUrl(webhookUrlInput.trim());
    showFeedback("Browser-local Google Sheets URL saved for testing!");
  };

  const handleTestWebhook = async () => {
    const targetUrl = webhookUrlInput.trim() || getActiveSheetsEndpoint().url;
    if (!targetUrl) {
      alert("Please enter a valid Webhook URL first (or set NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL).");
      return;
    }
    setIsTestingWebhook(true);
    try {
      const sample = {
        id: `test-ping-${Date.now()}`,
        fullName: "Test Lead (KRE8ECH Verification)",
        email: "kre8ech@gmail.com",
        phoneNumber: "+91 98757 21958",
        schoolCollege: "KRE8ECH Innovation Lab",
        classYear: "Class 10",
        city: "Delhi NCR",
        registeredProgram: "Four-Week Builder Program Cohort 1",
        techInterests: ["AI & LLMs", "Hackathons"],
        status: "Confirmed",
        registeredAt: new Date().toISOString().split("T")[0],
        notes: "Test webhook verification ping sent from Admin Dashboard"
      };

      const res = await syncToGoogleSheet("Student Registrations", sample, targetUrl);
      if (res.synced) {
        showFeedback("Test payload dispatched to Google Sheets!");
      } else {
        alert("Error sending test payload: " + (res.error || "Unknown error"));
      }
    } catch (e) {
      alert("Error sending test payload: " + (e as Error).message);
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(registrations, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `kre8ech_student_records_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonImportText);
      if (!Array.isArray(parsed)) {
        alert("Invalid format: JSON must be an array of student registration records.");
        return;
      }
      saveStudentRegistrations(parsed);
      setRegistrations(parsed);
      setIsImportModalOpen(false);
      setJsonImportText("");
      showFeedback(`Successfully restored ${parsed.length} student records!`);
    } catch (e) {
      alert("Failed to parse JSON: " + (e as Error).message);
    }
  };

  // --- Curriculum Actions ---
  const handleSaveCurriculum = () => {
    if (program) {
      saveProgramData(program);
      showFeedback("Curriculum updated and published live!");
    }
  };

  // --- Projects Actions ---
  const handleCreateProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "New Student Innovation Prototype",
      slug: `project-${Date.now()}`,
      category: "AI Applications",
      shortDescription: "A practical student prototype built during the sprint.",
      fullDescription: "Detailed architecture and implementation specifications.",
      status: "Prototype",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      builtDuring: "KRE8ECH Builder Cohort"
    };
    addProject(newProj);
    setProjects(getProjects());
    showFeedback("New project added to showcase!");
  };

  const handleDeleteProj = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
      setProjects(getProjects());
      showFeedback("Project removed.");
    }
  };

  // --- Problem Statement Actions ---
  const handleCreatePS = () => {
    const newPS: ProblemStatement = {
      id: `ps-${Date.now()}`,
      code: `PS-NEW-${Date.now().toString().slice(-3)}`,
      title: "New Challenge Brief Title",
      category: "AI Applications",
      difficulty: "Intermediate",
      status: "Open",
      summary: "Short challenge brief summary for student participants.",
      description: "Detailed description of the challenge problem statement.",
      background: "Context on why this problem matters for schools or communities.",
      requirements: ["Feature 1 requirement", "Responsive UI"],
      expectedDeliverables: ["Functional web prototype", "GitHub repository"]
    };
    addProblemStatement(newPS);
    setProblemStatements(getProblemStatements());
    showFeedback("New Problem Statement published!");
  };

  const handleDeletePS = (id: string) => {
    if (confirm("Delete this problem statement?")) {
      deleteProblemStatement(id);
      setProblemStatements(getProblemStatements());
      showFeedback("Problem statement deleted.");
    }
  };

  // --- Announcement Actions ---
  const handleCreateAnnouncement = () => {
    const title = prompt("Enter announcement title:");
    if (!title) return;
    const content = prompt("Enter announcement message:");
    if (!content) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      date: "Just Now",
      tag: "Update",
      isPinned: true
    };
    const next = [newAnn, ...announcements];
    saveAnnouncements(next);
    setAnnouncements(next);
    showFeedback("Announcement broadcasted to students!");
  };

  // Filter registrations
  const filteredRegs = registrations.filter((r) => {
    const q = regSearch.toLowerCase();
    const matchesSearch =
      !q ||
      r.fullName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.phoneNumber || "").toLowerCase().includes(q) ||
      r.schoolCollege.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      (r.registeredProgram || "").toLowerCase().includes(q) ||
      (r.notes || "").toLowerCase().includes(q);

    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    const matchesProgram = programFilter === "All" || r.registeredProgram === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Filter Hackready
  const filteredHackready = hackreadyList.filter((h) => {
    const q = hackSearch.toLowerCase();
    const matchesSearch =
      !q ||
      h.fullName.toLowerCase().includes(q) ||
      h.rollNo.toLowerCase().includes(q) ||
      h.branch.toLowerCase().includes(q) ||
      h.semester.toLowerCase().includes(q) ||
      h.email.toLowerCase().includes(q) ||
      h.phoneNumber.toLowerCase().includes(q) ||
      (h.collegeName || "").toLowerCase().includes(q) ||
      (h.notes || "").toLowerCase().includes(q);

    const matchesStatus = hackStatusFilter === "All" || h.status === hackStatusFilter;
    const matchesBranch =
      hackBranchFilter === "All" ||
      h.branch === hackBranchFilter ||
      h.branch.toLowerCase().includes(hackBranchFilter.toLowerCase()) ||
      hackBranchFilter.toLowerCase().includes(h.branch.toLowerCase());

    return matchesSearch && matchesStatus && matchesBranch;
  });

  const totalHackready = hackreadyList.length;
  const confirmedHackready = hackreadyList.filter((h) => h.status === "Confirmed").length;
  const uniqueBranches = new Set(hackreadyList.map((h) => h.branch).filter(Boolean)).size;
  const uniqueSemesters = new Set(hackreadyList.map((h) => h.semester).filter(Boolean)).size;

  // Calculate Metrics
  const totalStudents = registrations.length;
  const confirmedStudents = registrations.filter((r) => r.status === "Confirmed").length;
  const pendingStudents = registrations.filter((r) => r.status === "Pending" || !r.status).length;
  const uniqueCities = new Set(registrations.map((r) => (r.city || "").trim().toLowerCase()).filter(Boolean)).size;
  const uniqueSchools = new Set(registrations.map((r) => (r.schoolCollege || "").trim().toLowerCase()).filter(Boolean)).size;

  // Authentication Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#121316] text-[#F6C900] mx-auto flex items-center justify-center border border-gray-800 shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-[#202124]">KRE8ECH Admin Records</h1>
            <p className="text-xs text-gray-500">
              Access live applicant records, student dossiers, cohort management, and curriculum controls.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Admin Master Passcode
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124]"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#202124] text-white font-bold text-sm hover:bg-black transition-colors shadow-sm"
            >
              <span>Unlock Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#121316] text-white rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F6C900] text-[#202124] text-xs font-black uppercase">
              Admin Portal
            </span>
            <span className="text-xs text-gray-400">Student Admissions & Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            KRE8ECH Student Records & Operations
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            View full details of anyone who joins KRE8ECH, chat on WhatsApp, export records, or update cohort statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold transition-colors"
          >
            Preview Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Exit</span>
          </button>
        </div>
      </div>

      {/* Live Feedback Toast */}
      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200">
        {[
          { key: "registrations", label: `School Registrations (${registrations.length})`, icon: Users },
          { key: "hackready", label: `⚡ Hackready Workshop (${hackreadyList.length})`, icon: GraduationCap },
          { key: "curriculum", label: "Program & Curriculum", icon: Layers },
          { key: "projects", label: "Projects & Builds", icon: Code },
          { key: "achievements", label: "Achievements", icon: Trophy },
          { key: "hackathons", label: "Hackathons", icon: Calendar },
          { key: "problemStatements", label: "Problem Statements", icon: FileText },
          { key: "announcements", label: "Announcements", icon: Bell },
        ].map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-[#202124] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================
          TAB 1: STUDENT REGISTRATIONS & RECORDS (PRIMARY)
          ========================================================= */}
      {activeTab === "registrations" && (
        <div className="space-y-6">
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-gray-400">Total Applicants</span>
              <div className="text-3xl font-black text-[#202124] mt-1">{totalStudents}</div>
              <span className="text-[10px] text-gray-500 font-medium">Joined via Website</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-emerald-600">Confirmed Seats</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">{confirmedStudents}</div>
              <span className="text-[10px] text-gray-500 font-medium">Cohort 1 Builders</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-amber-600">Schools & Colleges</span>
              <div className="text-3xl font-black text-[#202124] mt-1">{uniqueSchools}</div>
              <span className="text-[10px] text-gray-500 font-medium">Unique Institutions</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-blue-600">Geographic Reach</span>
              <div className="text-3xl font-black text-[#202124] mt-1">{uniqueCities}</div>
              <span className="text-[10px] text-gray-500 font-medium">Cities Represented</span>
            </div>
          </div>

          {/* Sync & Integration Banner */}
          <div className="bg-[#FFF9E8] border border-[#F6C900]/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Sparkles className="w-4 h-4 text-[#F6C900]" />
                <span className="text-xs font-black text-[#202124] uppercase tracking-wide">
                  Google Sheets / Excel Auto-Sync
                </span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    globalSheetsConfigured
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-white text-amber-900 border-amber-300"
                  }`}
                >
                  {globalSheetsConfigured
                    ? "Global Production Sync Active"
                    : webhookUrlInput
                    ? "Browser-Local Test URL Only"
                    : "Not Connected Globally"}
                </span>
              </div>
              <p className="text-xs text-gray-700">
                {globalSheetsConfigured
                  ? "Every student submitting /register, /register/hackready, or /contact is automatically added to your Google Sheet (downloadable as .xlsx)."
                  : "Set NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL in Cloudflare Pages after deploying google-apps-script/Code.gs so all students sync automatically."}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsWebhookOpen(!isWebhookOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#202124] hover:bg-gray-50 transition-colors shadow-2xs"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>
                  {globalSheetsConfigured || webhookUrlInput
                    ? "Manage Sheets Sync"
                    : "Connect Google Sheets"}
                </span>
              </button>
            </div>
          </div>

          {/* Webhook Configuration Panel (Collapsible) */}
          {isWebhookOpen && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase text-[#202124]">
                    Google Apps Script Web App Endpoint (Sheets &amp; Excel Sync)
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Deploy <code>google-apps-script/Code.gs</code> as a Google Sheets Web App (&quot;Anyone&quot; access). Set <code>NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL</code> in Cloudflare Pages for all visitors, or paste the <code>/exec</code> URL below to test from this browser.
                  </p>
                </div>
                <button onClick={() => setIsWebhookOpen(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#202124]"
                />
                <button
                  type="button"
                  onClick={handleSaveWebhook}
                  className="px-4 py-2 rounded-xl bg-[#202124] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Save URL
                </button>
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  disabled={isTestingWebhook}
                  className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold hover:bg-amber-200 transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTestingWebhook ? "Sending..." : "Send Test Lead"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Controls Bar: Search, Filters, Add, Export */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by student name, phone, email, school, or city..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#202124] shadow-2xs"
                />
                {regSearch && (
                  <button
                    onClick={() => setRegSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-xs transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Student Record</span>
                </button>

                <button
                  type="button"
                  onClick={() => exportRegistrationsToCSV(filteredRegs)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-black transition-colors"
                  title="Download CSV spreadsheet with all fields including phone and notes"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
                  title="Download full JSON backup"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Backup JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
                  title="Import or restore records from JSON backup"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                </button>
              </div>
            </div>

            {/* Filter pills */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-gray-400 font-bold text-[11px] mr-1 uppercase">Status:</span>
                {["All", "Confirmed", "Pending", "Shortlisted", "Contacted"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      statusFilter === st
                        ? "bg-[#202124] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400 font-bold text-[11px] uppercase">Program:</span>
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="px-2.5 py-1 rounded-xl border border-gray-200 text-xs bg-white font-medium focus:outline-none"
                >
                  <option value="All">All Programs</option>
                  <option value="Four-Week Builder Program Cohort 1">Four-Week Builder Program</option>
                  <option value="Offline Hackathon Showcase 2026">Grand Offline Hackathon 2026</option>
                  <option value="Weekend Ideathon Sprint">Weekend Ideathon Sprint</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Registrations Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-wide">
                  Registered Applicants ({filteredRegs.length})
                </h3>
                <p className="text-[11px] text-gray-500">
                  Click on any student row or the &quot;View Dossier&quot; button to see their complete profile, WhatsApp, tech interests, and notes.
                </p>
              </div>

              <button
                type="button"
                onClick={loadAllData}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                title="Refresh Table"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {filteredRegs.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Users className="w-10 h-10 text-gray-300 mx-auto" />
                <h4 className="text-sm font-bold text-gray-700">No student records found</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  {regSearch || statusFilter !== "All"
                    ? "Try adjusting your search query or status filter."
                    : "No registrations yet. When a student clicks 'Join KRE8ECH' and submits the form, their complete details will show up here."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#F6C900] text-[#202124] text-xs font-bold"
                >
                  Add a Student Record Manually
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                    <tr>
                      <th className="p-3.5">Student Details</th>
                      <th className="p-3.5">WhatsApp / Phone</th>
                      <th className="p-3.5">School / College</th>
                      <th className="p-3.5">Class</th>
                      <th className="p-3.5">City</th>
                      <th className="p-3.5">Selected Program</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Applied Date</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRegs.map((reg) => {
                      const cleanPhone = (reg.phoneNumber || "").replace(/[^\d+]/g, "");
                      const waLink = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                        `Hi ${reg.fullName}, greetings from KRE8ECH! We received your application for the ${
                          reg.registeredProgram || "Four-Week Builder Program"
                        }.`
                      )}`;

                      return (
                        <tr
                          key={reg.id}
                          className="hover:bg-amber-50/30 transition-colors group cursor-pointer"
                          onClick={() => handleOpenDossier(reg)}
                        >
                          {/* Student Details */}
                          <td className="p-3.5 font-bold text-[#202124]">
                            <div className="text-sm font-extrabold flex items-center gap-1.5">
                              <span>{reg.fullName}</span>
                            </div>
                            <div className="text-[11px] text-gray-500 font-normal flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <a
                                href={`mailto:${reg.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:underline hover:text-[#202124]"
                              >
                                {reg.email}
                              </a>
                            </div>
                          </td>

                          {/* Phone / WhatsApp */}
                          <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800">
                                {reg.phoneNumber || "Not provided"}
                              </span>
                              {reg.phoneNumber && (
                                <div className="flex items-center gap-1">
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                                    title="Chat on WhatsApp"
                                  >
                                    <WhatsAppIcon className="w-3.5 h-3.5" />
                                  </a>
                                  <a
                                    href={`tel:${reg.phoneNumber}`}
                                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                    title="Call Student"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* School */}
                          <td className="p-3.5 max-w-[180px]">
                            <span className="line-clamp-2 text-gray-700 font-medium">
                              {reg.schoolCollege}
                            </span>
                          </td>

                          {/* Class */}
                          <td className="p-3.5 font-bold text-[#202124]">
                            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[11px]">
                              {reg.classYear}
                            </span>
                          </td>

                          {/* City */}
                          <td className="p-3.5 text-gray-600 font-medium">{reg.city}</td>

                          {/* Program */}
                          <td className="p-3.5 max-w-xs">
                            <span className="line-clamp-1 font-semibold text-gray-800 text-[11px]">
                              {reg.registeredProgram || "Four-Week Builder Program"}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={reg.status || "Confirmed"}
                              onChange={(e) =>
                                handleStatusChange(
                                  reg.id,
                                  e.target.value as StudentRegistration["status"]
                                )
                              }
                              className={`text-[10px] font-extrabold px-2 py-1 rounded-lg border focus:outline-none transition-colors ${
                                reg.status === "Confirmed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : reg.status === "Pending"
                                  ? "bg-amber-50 text-amber-800 border-amber-300"
                                  : reg.status === "Shortlisted"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : "bg-purple-50 text-purple-800 border-purple-300"
                              }`}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending">Pending</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Contacted">Contacted</option>
                            </select>
                          </td>

                          {/* Date */}
                          <td className="p-3.5 text-gray-400 text-[11px] whitespace-nowrap">
                            {reg.registeredAt}
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenDossier(reg)}
                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#202124] hover:text-white text-gray-700 transition-colors"
                                title="View Full Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRegistration(reg.id, reg.fullName)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: HACKREADY WORKSHOP (COLLEGE & B.TECH REGISTRATIONS)
          ========================================================= */}
      {activeTab === "hackready" && (
        <div className="space-y-6">
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-gray-400">Total Workshop Applicants</span>
              <div className="text-3xl font-black text-[#202124] mt-1">{totalHackready}</div>
              <span className="text-[10px] text-gray-500 font-medium">B.Tech & College Students</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-emerald-600">Confirmed Seats</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">{confirmedHackready}</div>
              <span className="text-[10px] text-gray-500 font-medium">Ready for Workshop</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-amber-600">Engineering Branches</span>
              <div className="text-3xl font-black text-[#202124] mt-1">{uniqueBranches}</div>
              <span className="text-[10px] text-gray-500 font-medium">CSE, IT, ECE, AI & More</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <span className="text-[11px] font-bold uppercase text-blue-600">Semesters</span>
              <div className="text-3xl font-black text-[#202124] mt-1">{uniqueSemesters}</div>
              <span className="text-[10px] text-gray-500 font-medium">1st to 8th Semesters</span>
            </div>
          </div>

          {/* Action & Filter Bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Roll No, Name, Branch, Semester, Gmail, Phone..."
                  value={hackSearch}
                  onChange={(e) => setHackSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#202124] shadow-2xs"
                />
                {hackSearch && (
                  <button
                    onClick={() => setHackSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddHackOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-xs transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Hackready Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => exportHackreadyToCSV(filteredHackready)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors shadow-sm"
                  title="Export all Hackready registrations directly into an Excel (.csv) spreadsheet"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Excel (.csv)</span>
                </button>
              </div>
            </div>

            {/* Filter pills */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-gray-400 font-bold text-[11px] mr-1 uppercase">Status:</span>
                {["All", "Confirmed", "Pending", "Shortlisted", "Contacted"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setHackStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      hackStatusFilter === st
                        ? "bg-[#202124] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400 font-bold text-[11px] uppercase">Branch:</span>
                <select
                  value={hackBranchFilter}
                  onChange={(e) => setHackBranchFilter(e.target.value)}
                  className="px-2.5 py-1 rounded-xl border border-gray-200 text-xs bg-white font-medium focus:outline-none max-w-xs"
                >
                  <option value="All">All Branches</option>
                  <option value="Computer Science & Engineering (CSE)">CSE</option>
                  <option value="Artificial Intelligence & Machine Learning (AI & ML)">AI & ML</option>
                  <option value="Artificial Intelligence & Data Science">AI & DS</option>
                  <option value="Electronics & Communication Engineering (ECE)">ECE</option>
                  <option value="Bachelor of Computer Applications">BCA</option>
                  <option value="Bachelor of Business Administration">BBA</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hackready Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-wide flex items-center gap-2">
                  <span>Hackready Workshop Students ({filteredHackready.length})</span>
                </h3>
                <p className="text-[11px] text-gray-500">
                  College students with Roll No., Branch, Semester, Gmail, and WhatsApp contact details.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => exportHackreadyToCSV(filteredHackready)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open in Excel</span>
                </button>
                <button
                  type="button"
                  onClick={loadAllData}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                  title="Refresh Table"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {filteredHackready.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <GraduationCap className="w-10 h-10 text-gray-300 mx-auto" />
                <h4 className="text-sm font-bold text-gray-700">No Hackready registrations found</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  {hackSearch || hackStatusFilter !== "All" || hackBranchFilter !== "All"
                    ? "Try adjusting your search query or filters."
                    : "No college entries recorded yet. Anyone who registers via the Hackready Workshop form will appear here."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddHackOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#F6C900] text-[#202124] text-xs font-bold"
                >
                  Add a Student Record Manually
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                    <tr>
                      <th className="p-3.5">Roll No.</th>
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Branch & Semester</th>
                      <th className="p-3.5">Gmail / Email</th>
                      <th className="p-3.5">WhatsApp / Phone</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredHackready.map((hr) => {
                      const cleanPhone = (hr.phoneNumber || "").replace(/[^\d+]/g, "");
                      const waLink = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                        `Hi ${hr.fullName}, greetings from KRE8ECH! Regarding your Hackready Workshop registration (Roll No: ${hr.rollNo}, ${hr.branch}): welcome aboard!`
                      )}`;

                      return (
                        <tr
                          key={hr.id}
                          className="hover:bg-amber-50/30 transition-colors group cursor-pointer"
                          onClick={() => handleOpenHackDossier(hr)}
                        >
                          {/* Roll No */}
                          <td className="p-3.5 font-mono font-bold text-[#202124]">
                            <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md border border-gray-200">
                              {hr.rollNo}
                            </span>
                          </td>

                          {/* Student Name */}
                          <td className="p-3.5 font-bold text-[#202124]">
                            <div className="text-sm font-extrabold">{hr.fullName}</div>
                            {hr.notes && (
                              <div className="text-[10px] text-gray-400 font-normal line-clamp-1 mt-0.5">
                                {hr.notes}
                              </div>
                            )}
                          </td>

                          {/* Branch & Semester */}
                          <td className="p-3.5 max-w-[200px]">
                            <div className="font-semibold text-gray-900 text-[11px] line-clamp-1">
                              {hr.branch}
                            </div>
                            <div className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF9E8] text-[#202124] border border-[#F6C900]/50">
                              {hr.semester}
                            </div>
                          </td>

                          {/* Gmail / Email */}
                          <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1.5 text-gray-700">
                              <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <a
                                href={`mailto:${hr.email}`}
                                className="font-medium hover:underline hover:text-black"
                              >
                                {hr.email}
                              </a>
                            </div>
                          </td>

                          {/* Phone / WhatsApp */}
                          <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800">{hr.phoneNumber}</span>
                              <div className="flex items-center gap-1">
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                                  title="Chat on WhatsApp"
                                >
                                  <WhatsAppIcon className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`tel:${hr.phoneNumber}`}
                                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                  title="Call Student"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={hr.status || "Confirmed"}
                              onChange={(e) =>
                                handleHackStatusChange(
                                  hr.id,
                                  e.target.value as HackreadyRegistration["status"]
                                )
                              }
                              className={`text-[10px] font-extrabold px-2 py-1 rounded-lg border focus:outline-none transition-colors ${
                                hr.status === "Confirmed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : hr.status === "Pending"
                                  ? "bg-amber-50 text-amber-800 border-amber-300"
                                  : hr.status === "Shortlisted"
                                  ? "bg-blue-50 text-blue-800 border-blue-300"
                                  : "bg-purple-50 text-purple-800 border-purple-300"
                              }`}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending">Pending</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Contacted">Contacted</option>
                            </select>
                          </td>

                          {/* Date */}
                          <td className="p-3.5 text-gray-400 text-[11px] whitespace-nowrap">
                            {hr.registeredAt}
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenHackDossier(hr)}
                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#202124] hover:text-white text-gray-700 transition-colors"
                                title="View Full Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteHack(hr.id, hr.fullName)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          HACKREADY DOSSIER MODAL
          ========================================================= */}
      {selectedHackready && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    Roll No: {selectedHackready.rollNo}
                  </span>
                  <span className="text-xs text-gray-400">
                    Applied: {selectedHackready.registeredAt}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#202124]">
                  {selectedHackready.fullName}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCloseHackDossier}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/${(selectedHackready.phoneNumber || "").replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                  `Hi ${selectedHackready.fullName}, this is KRE8ECH regarding your Hackready Workshop registration (Roll No: ${selectedHackready.rollNo}, ${selectedHackready.branch}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${selectedHackready.phoneNumber}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gray-600" />
                <span>Call {selectedHackready.phoneNumber}</span>
              </a>

              <a
                href={`mailto:${selectedHackready.email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gray-600" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Full Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Roll Number</span>
                <div className="font-mono font-bold text-[#202124] text-sm">
                  {selectedHackready.rollNo}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Branch & Semester</span>
                <div className="font-bold text-[#202124]">
                  {selectedHackready.branch} • {selectedHackready.semester}
                </div>
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Update Enrollment Status:
                </span>
                <select
                  value={selectedHackready.status || "Confirmed"}
                  onChange={(e) =>
                    handleHackStatusChange(
                      selectedHackready.id,
                      e.target.value as HackreadyRegistration["status"]
                    )
                  }
                  className="px-3 py-1.5 rounded-xl border border-gray-300 font-bold text-xs bg-white focus:outline-none"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Shortlisted">Shortlisted for Hackathon</option>
                  <option value="Contacted">Contacted via Phone</option>
                </select>
              </div>
            </div>

            {/* Admin Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold uppercase text-gray-500">
                Internal Admin Notes:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Attending with team, confirmed project title..."
                value={editHackNotes}
                onChange={(e) => setEditHackNotes(e.target.value)}
                className="w-full p-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#202124]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveHackNotes}
                  className="px-4 py-2 rounded-xl bg-[#202124] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          ADD HACKREADY STUDENT MANUALLY MODAL
          ========================================================= */}
      {isAddHackOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-black text-[#202124]">Add Hackready Student</h3>
                <p className="text-xs text-gray-500">Log a college student registration manually.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddHackOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddHack} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={manualHackForm.fullName}
                    onChange={(e) => setManualHackForm({ ...manualHackForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Roll No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 220101054"
                    value={manualHackForm.rollNo}
                    onChange={(e) => setManualHackForm({ ...manualHackForm, rollNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Branch *</label>
                  <select
                    value={manualHackForm.branch}
                    onChange={(e) => setManualHackForm({ ...manualHackForm, branch: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="Computer Science & Engineering (CSE)">CSE</option>
                    <option value="Artificial Intelligence & Machine Learning (AI & ML)">AI & ML</option>
                    <option value="Artificial Intelligence & Data Science (AI & DS)">AI & DS</option>
                    <option value="Electronics & Communication Engineering (ECE)">ECE</option>
                    <option value="Bachelor of Computer Applications (BCA)">BCA</option>
                    <option value="Bachelor of Business Administration (BBA)">BBA</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Semester *</label>
                  <select
                    value={manualHackForm.semester}
                    onChange={(e) => setManualHackForm({ ...manualHackForm, semester: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Gmail / Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={manualHackForm.email}
                    onChange={(e) => setManualHackForm({ ...manualHackForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={manualHackForm.phoneNumber}
                    onChange={(e) => setManualHackForm({ ...manualHackForm, phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">Status</label>
                <select
                  value={manualHackForm.status}
                  onChange={(e) =>
                    setManualHackForm({
                      ...manualHackForm,
                      status: e.target.value as HackreadyRegistration["status"]
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Contacted">Contacted</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">Internal Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Registered via college flyer / offline campus drive"
                  value={manualHackForm.notes}
                  onChange={(e) => setManualHackForm({ ...manualHackForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddHackOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F6C900] text-[#202124] font-black hover:bg-[#E5BA00]"
                >
                  Save Hackready Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    ID: {selectedStudent.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    Applied: {selectedStudent.registeredAt}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#202124]">
                  {selectedStudent.fullName}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCloseDossier}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {selectedStudent.phoneNumber && (
                <a
                  href={`https://wa.me/${(selectedStudent.phoneNumber || "").replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                    `Hi ${selectedStudent.fullName}, this is the KRE8ECH Team regarding your ${
                      selectedStudent.registeredProgram || "Builder Program"
                    } registration.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black shadow-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              {selectedStudent.phoneNumber && (
                <a
                  href={`tel:${selectedStudent.phoneNumber}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gray-600" />
                  <span>Call {selectedStudent.phoneNumber}</span>
                </a>
              )}

              <a
                href={`mailto:${selectedStudent.email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gray-600" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Full Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">School / College</span>
                <div className="font-bold text-[#202124] flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{selectedStudent.schoolCollege}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Class / Grade & City</span>
                <div className="font-bold text-[#202124] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{selectedStudent.classYear} • {selectedStudent.city}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-gray-400">Applied Program</span>
                <div className="font-extrabold text-[#202124]">
                  {selectedStudent.registeredProgram || "Four-Week Builder Program Cohort 1"}
                </div>
              </div>
            </div>

            {/* Technology Interests */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-gray-500">
                Technology Interests Chosen by Student:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedStudent.techInterests || []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-950 font-bold text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-500">
                  Update Enrollment Status:
                </span>
                <select
                  value={selectedStudent.status || "Confirmed"}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedStudent.id,
                      e.target.value as StudentRegistration["status"]
                    )
                  }
                  className="px-3 py-1.5 rounded-xl border border-gray-300 font-bold text-xs bg-white focus:outline-none"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Shortlisted">Shortlisted for Hackathon</option>
                  <option value="Contacted">Contacted via Phone</option>
                </select>
              </div>
            </div>

            {/* Admin Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold uppercase text-gray-500">
                Internal Admin Notes & Follow-ups:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Spoke to parent on 21st Nov. Confirmed interest in AI track. Fee paid via UPI..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full p-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#202124]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-[#202124] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          ADD STUDENT MANUALLY MODAL
          ========================================================= */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-black text-[#202124]">Add Student Record</h3>
                <p className="text-xs text-gray-500">Manually log a phone lead or offline registration.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStudentOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddStudent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diya Sengupta"
                  value={manualForm.fullName}
                  onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={manualForm.phoneNumber}
                    onChange={(e) => setManualForm({ ...manualForm, phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="diya@example.com"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">School / College</label>
                  <input
                    type="text"
                    placeholder="e.g. Modern School"
                    value={manualForm.schoolCollege}
                    onChange={(e) => setManualForm({ ...manualForm, schoolCollege: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Gurugram"
                    value={manualForm.city}
                    onChange={(e) => setManualForm({ ...manualForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Class / Year</label>
                  <select
                    value={manualForm.classYear}
                    onChange={(e) => setManualForm({ ...manualForm, classYear: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="College 1st Year">College 1st Year</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-gray-600 mb-1">Initial Status</label>
                  <select
                    value={manualForm.status}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        status: e.target.value as StudentRegistration["status"]
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Contacted">Contacted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">Select Program</label>
                <select
                  value={manualForm.registeredProgram}
                  onChange={(e) => setManualForm({ ...manualForm, registeredProgram: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                >
                  <option value="Four-Week Builder Program Cohort 1">
                    Four-Week Builder Program (Cohort 1)
                  </option>
                  <option value="Offline Hackathon Showcase 2026">
                    KRE8ECH Grand Offline Hackathon 2026
                  </option>
                  <option value="Weekend Ideathon Sprint">Weekend Ideathon Sprint</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">Internal Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Registered via phone enquiry"
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F6C900] text-[#202124] font-black hover:bg-[#E5BA00]"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          IMPORT JSON MODAL
          ========================================================= */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-xl font-black text-[#202124]">Restore Records from JSON</h3>
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Paste the contents of a backup JSON file to restore registrations into your dashboard.
            </p>

            <textarea
              rows={8}
              placeholder="Paste JSON array here..."
              value={jsonImportText}
              onChange={(e) => setJsonImportText(e.target.value)}
              className="w-full p-3 font-mono text-xs rounded-xl border border-gray-200 focus:outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportJSON}
                className="px-5 py-2 rounded-xl bg-[#202124] text-white text-xs font-bold hover:bg-black"
              >
                Restore Records
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: CURRICULUM MANAGEMENT
          ========================================================= */}
      {activeTab === "curriculum" && program && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-[#202124]">
                Manage Four-Week Builder Program
              </h2>
              <p className="text-xs text-gray-500">
                Update weekly focus, individual day session topics, and learning outputs.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveCurriculum}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F6C900] text-[#202124] font-bold text-xs hover:bg-[#e5bc00] transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Publish Curriculum Updates</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-gray-500 mb-1">Program Title</label>
              <input
                type="text"
                value={program.title}
                onChange={(e) => setProgram({ ...program, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-gray-500 mb-1">Tagline</label>
              <input
                type="text"
                value={program.tagline}
                onChange={(e) => setProgram({ ...program, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-black uppercase tracking-wide text-gray-700">
              Curriculum Breakdown ({program.weeks.length} Weeks)
            </h3>
            <div className="space-y-4">
              {program.weeks.map((week, wIndex) => (
                <div key={week.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#FFF9E8] text-[#202124] border border-[#F6C900]">
                      {week.badge}
                    </span>
                    <span className="text-xs text-gray-500">{week.sessionFormat}</span>
                  </div>
                  <h4 className="text-base font-black text-[#202124]">{week.title}</h4>
                  <p className="text-xs text-gray-600">{week.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: PROJECTS
          ========================================================= */}
      {activeTab === "projects" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-[#202124]">Projects Showcase</h2>
              <p className="text-xs text-gray-500">
                Manage student prototypes, GitHub links, demo URLs, and showcase statuses.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCreateProject}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6C900] text-[#202124] font-bold text-xs hover:bg-[#e5bc00] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl border border-gray-100 bg-gray-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-200 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FFF9E8] text-[#202124] border border-[#F6C900]/60">
                      {proj.category}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-800">
                      {proj.status}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-[#202124]">{proj.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-1">{proj.shortDescription}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const newTitle = prompt("Update Project Title:", proj.title);
                      if (newTitle) {
                        const updated = projects.map((p) =>
                          p.id === proj.id ? { ...p, title: newTitle } : p
                        );
                        saveProjects(updated);
                        setProjects(updated);
                        showFeedback("Project updated!");
                      }
                    }}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                    title="Edit Title"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProj(proj.id)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: ACHIEVEMENTS
          ========================================================= */}
      {activeTab === "achievements" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div>
            <h2 className="text-xl font-black text-[#202124]">Achievements & Recognitions</h2>
            <p className="text-xs text-gray-500">Manage hackathon milestones and verified wins.</p>
          </div>

          <div className="space-y-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-6 rounded-2xl border border-gray-100 bg-[#FAF9F5]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-3 py-1 rounded bg-[#FFF9E8] border border-[#F6C900] text-[#202124]">
                    {ach.position}
                  </span>
                  <span className="text-xs font-bold text-gray-500">{ach.date}</span>
                </div>
                <h3 className="text-lg font-black text-[#202124]">{ach.featuredHeadline}</h3>
                <p className="text-xs text-gray-600">{ach.summary}</p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {ach.awards.map((aw, i) => (
                    <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded bg-white border border-gray-200 text-gray-800">
                      {aw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: HACKATHONS
          ========================================================= */}
      {activeTab === "hackathons" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-[#202124]">Hackathons & Sprints</h2>
              <p className="text-xs text-gray-500">Manage dates, venue, rules, and registration states.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const title = prompt("Enter Hackathon Title:");
                if (!title) return;
                const newHack: Hackathon = {
                  id: `hack-${Date.now()}`,
                  title,
                  slug: `hackathon-${Date.now()}`,
                  bannerImage: "/images/kre8ech-wings.png",
                  description: "Student sprint and prototype challenge.",
                  date: "Upcoming",
                  venue: "Main Campus Hub",
                  registrationDeadline: "Open",
                  eligibility: "Class 9 - 12",
                  teamSize: "2 - 4 Members",
                  tracks: ["Open Innovation", "AI Track"],
                  rules: ["Teams of 2-4", "Working prototypes mandatory"],
                  schedule: [{ time: "10:00 AM", activity: "Kickoff" }],
                  status: "Upcoming"
                };
                addHackathon(newHack);
                setHackathons(getHackathons());
                showFeedback("Hackathon published!");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6C900] text-[#202124] font-bold text-xs hover:bg-[#e5bc00] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Hackathon</span>
            </button>
          </div>

          <div className="space-y-4">
            {hackathons.map((h) => (
              <div key={h.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FFF9E8] text-[#202124] border border-[#F6C900]/60">
                      {h.status}
                    </span>
                    <span className="text-xs text-gray-500">{h.date}</span>
                  </div>
                  <h4 className="text-base font-black text-[#202124]">{h.title}</h4>
                  <p className="text-xs text-gray-600">{h.venue} • {h.teamSize}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={h.status}
                    onChange={(e) => {
                      const updated = hackathons.map((hack) =>
                        hack.id === h.id ? { ...hack, status: e.target.value as any } : hack
                      );
                      saveHackathons(updated);
                      setHackathons(updated);
                      showFeedback("Hackathon status changed!");
                    }}
                    className="text-xs font-bold p-2 rounded-xl border border-gray-300 bg-white"
                  >
                    <option value="Registration Open">Registration Open</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 6: PROBLEM STATEMENTS
          ========================================================= */}
      {activeTab === "problemStatements" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-[#202124]">Problem Statements Bank</h2>
              <p className="text-xs text-gray-500">Create, edit, or toggle open/closed status for challenges.</p>
            </div>
            <button
              type="button"
              onClick={handleCreatePS}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6C900] text-[#202124] font-bold text-xs hover:bg-[#e5bc00] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Problem Statement</span>
            </button>
          </div>

          <div className="space-y-4">
            {problemStatements.map((ps) => (
              <div key={ps.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-800">
                      {ps.code}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FFF9E8] text-[#202124] border border-[#F6C900]/60">
                      {ps.category}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {ps.difficulty}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-[#202124]">{ps.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-1">{ps.summary}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newStatus: "Open" | "Closed" = ps.status === "Open" ? "Closed" : "Open";
                      const updated = problemStatements.map((item) =>
                        item.id === ps.id ? { ...item, status: newStatus } : item
                      );
                      saveProblemStatements(updated);
                      setProblemStatements(updated);
                      showFeedback(`Status toggled to ${newStatus}!`);
                    }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                      ps.status === "Open"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {ps.status}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeletePS(ps.id)}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 7: ANNOUNCEMENTS
          ========================================================= */}
      {activeTab === "announcements" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-[#202124]">Cohort Announcements</h2>
              <p className="text-xs text-gray-500">Broadcast important dates and notices to student dashboards.</p>
            </div>
            <button
              type="button"
              onClick={handleCreateAnnouncement}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6C900] text-[#202124] font-bold text-xs hover:bg-[#e5bc00] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Announcement</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F6C900] text-[#202124]">
                      {ann.tag}
                    </span>
                    <span className="text-xs font-bold text-[#202124]">{ann.title}</span>
                    <span className="text-xs text-gray-400">• {ann.date}</span>
                  </div>
                  <p className="text-xs text-gray-600">{ann.content}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const next = announcements.filter((a) => a.id !== ann.id);
                    saveAnnouncements(next);
                    setAnnouncements(next);
                    showFeedback("Announcement removed.");
                  }}
                  className="p-2 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
