"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
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
  Link as LinkIcon,
  RefreshCw,
  Send,
  AlertCircle,
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
  saveAnnouncements,
} from "@/lib/storage";
import { isGlobalSheetsSyncConfigured, syncToGoogleSheet } from "@/lib/sheetsSync";
import {
  ProgramOverview,
  Project,
  Achievement,
  Hackathon,
  ProblemStatement,
  StudentRegistration,
  HackreadyRegistration,
  Announcement,
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
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("registrations");

  const [program, setProgram] = useState<ProgramOverview | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [feedback, setFeedback] = useState<string | null>(null);
  const [regSearch, setRegSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [programFilter, setProgramFilter] = useState<string>("All");

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
    notes: "",
  });

  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null);
  const [editNotes, setEditNotes] = useState("");
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
    notes: "",
  });

  const [isWebhookOpen, setIsWebhookOpen] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState("");
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [jsonImportText, setJsonImportText] = useState("");

  const globalSheetsActive = isGlobalSheetsSyncConfigured();

  const loadAllData = () => {
    setProgram(getProgramData());
    setProjects(getProjects());
    setAchievements(getAchievements());
    setHackathons(getHackathons());
    setProblemStatements(getProblemStatements());
    setRegistrations(getStudentRegistrations());
    setHackreadyList(getHackreadyRegistrations());
    setAnnouncements(getAnnouncements());
    setWebhookUrlInput(getWebhookUrl());
  };

  useEffect(() => {
    const isAuth = isAdminAuthenticated();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadAllData();
    }
  }, []);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsVerifying(true);
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
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleOpenDossier = (student: StudentRegistration) => {
    setSelectedStudent(student);
    setEditNotes(student.notes || "");
  };

  const handleStatusChange = (id: string, newStatus: StudentRegistration["status"]) => {
    const target = registrations.find((r) => r.id === id);
    if (!target) return;
    const updated: StudentRegistration = { ...target, status: newStatus };
    updateStudentRegistration(updated);
    setRegistrations(getStudentRegistrations());
    if (selectedStudent?.id === id) setSelectedStudent(updated);
    showFeedback(`Student status updated to "${newStatus}"`);
  };

  const handleSaveNotes = () => {
    if (!selectedStudent) return;
    const updated: StudentRegistration = { ...selectedStudent, notes: editNotes };
    updateStudentRegistration(updated);
    setSelectedStudent(updated);
    setRegistrations(getStudentRegistrations());
    showFeedback("Admin notes saved");
  };

  const handleDeleteRegistration = (id: string, name: string) => {
    if (confirm(`Delete the registration record for "${name}"?`)) {
      deleteStudentRegistration(id);
      setRegistrations(getStudentRegistrations());
      if (selectedStudent?.id === id) setSelectedStudent(null);
      showFeedback(`Record for ${name} removed`);
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
      notes: manualForm.notes.trim(),
    };

    const next = [newRecord, ...registrations];
    saveStudentRegistrations(next);
    setRegistrations(next);
    setIsAddStudentOpen(false);
    showFeedback(`Record added for ${newRecord.fullName}`);

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
      notes: "",
    });
  };

  const handleOpenHackDossier = (record: HackreadyRegistration) => {
    setSelectedHackready(record);
    setEditHackNotes(record.notes || "");
  };

  const handleHackStatusChange = (id: string, newStatus: HackreadyRegistration["status"]) => {
    const target = hackreadyList.find((h) => h.id === id);
    if (!target) return;
    const updated: HackreadyRegistration = { ...target, status: newStatus };
    updateHackreadyRegistration(updated);
    setHackreadyList(getHackreadyRegistrations());
    if (selectedHackready?.id === id) setSelectedHackready(updated);
    showFeedback(`Hackready status updated to "${newStatus}"`);
  };

  const handleSaveHackNotes = () => {
    if (!selectedHackready) return;
    const updated: HackreadyRegistration = { ...selectedHackready, notes: editHackNotes };
    updateHackreadyRegistration(updated);
    setSelectedHackready(updated);
    setHackreadyList(getHackreadyRegistrations());
    showFeedback("Hackready internal notes saved");
  };

  const handleDeleteHack = (id: string, name: string) => {
    if (confirm(`Delete the Hackready Workshop record for "${name}"?`)) {
      deleteHackreadyRegistration(id);
      setHackreadyList(getHackreadyRegistrations());
      if (selectedHackready?.id === id) setSelectedHackready(null);
      showFeedback(`Record for ${name} removed`);
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
      alert("Please fill in Student Name, Roll No, Email, and Phone Number.");
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
      notes: manualHackForm.notes.trim(),
    };

    const next = [newRecord, ...hackreadyList];
    saveHackreadyRegistrations(next);
    setHackreadyList(next);
    setIsAddHackOpen(false);
    showFeedback(`Hackready record added for ${newRecord.fullName}`);

    setManualHackForm({
      fullName: "",
      rollNo: "",
      branch: "Computer Science & Engineering (CSE)",
      semester: "5th Semester",
      email: "",
      phoneNumber: "",
      collegeName: "",
      status: "Confirmed",
      notes: "",
    });
  };

  const handleSaveWebhook = () => {
    saveWebhookUrl(webhookUrlInput.trim());
    showFeedback("Local browser test webhook URL saved");
  };

  const handleTestWebhook = async () => {
    const targetUrl = webhookUrlInput.trim();
    if (!targetUrl && !globalSheetsActive) {
      alert("Enter your Google Apps Script Web App URL first.");
      return;
    }
    setIsTestingWebhook(true);
    try {
      const sample = {
        id: `test-${Date.now()}`,
        fullName: "Test Lead (KRE8ECH Verification)",
        email: "kre8ech@gmail.com",
        phoneNumber: "+91 98757 21958",
        schoolCollege: "KRE8ECH Innovation Lab",
        classYear: "Class 10",
        city: "Delhi NCR",
        registeredProgram: "Four-Week Builder Program Cohort 1",
        techInterests: ["Artificial Intelligence & LLMs", "Competitive Hackathons"],
        status: "Confirmed",
        registeredAt: new Date().toISOString().split("T")[0],
        notes: "Test payload dispatched from Admin Portal",
      };

      const res = await syncToGoogleSheet(
        "Student Registrations",
        sample,
        targetUrl || undefined
      );
      if (res.synced) {
        showFeedback("Test row dispatched to Google Sheets endpoint");
      } else {
        alert(res.error || "Failed to reach Google Sheets endpoint.");
      }
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
      showFeedback(`Restored ${parsed.length} student records`);
    } catch (e) {
      alert("Failed to parse JSON: " + (e as Error).message);
    }
  };

  const handleSaveCurriculum = () => {
    if (program) {
      saveProgramData(program);
      showFeedback("Curriculum updated in local preview");
    }
  };

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
      builtDuring: "KRE8ECH Builder Cohort",
    };
    addProject(newProj);
    setProjects(getProjects());
    showFeedback("New project added");
  };

  const handleDeleteProj = (id: string) => {
    if (confirm("Delete this project?")) {
      deleteProject(id);
      setProjects(getProjects());
      showFeedback("Project removed");
    }
  };

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
      expectedDeliverables: ["Functional web prototype", "GitHub repository"],
    };
    addProblemStatement(newPS);
    setProblemStatements(getProblemStatements());
    showFeedback("Problem statement added");
  };

  const handleDeletePS = (id: string) => {
    if (confirm("Delete this problem statement?")) {
      deleteProblemStatement(id);
      setProblemStatements(getProblemStatements());
      showFeedback("Problem statement deleted");
    }
  };

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
      isPinned: true,
    };
    const next = [newAnn, ...announcements];
    saveAnnouncements(next);
    setAnnouncements(next);
    showFeedback("Announcement added");
  };

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

  const totalStudents = registrations.length;
  const confirmedStudents = registrations.filter((r) => r.status === "Confirmed").length;
  const uniqueCities = new Set(registrations.map((r) => (r.city || "").trim().toLowerCase()).filter(Boolean)).size;
  const uniqueSchools = new Set(registrations.map((r) => (r.schoolCollege || "").trim().toLowerCase()).filter(Boolean)).size;

  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-white border border-black/[0.08] rounded-2xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.05)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#141415] text-[#F6C900] mx-auto flex items-center justify-center">
              <Lock className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-semibold text-[#202124]">Restricted Access</h1>
            <p className="text-xs text-[#6B7280]">
              Enter your private administrator passcode to continue.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#525252] mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#202124] text-white font-semibold text-sm hover:bg-black transition-colors disabled:opacity-50"
            >
              <span>{isVerifying ? "Verifying..." : "Unlock Portal"}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-[#141415] text-white rounded-2xl p-6 sm:p-8 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-[#F6C900]">Restricted Operations Portal</span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
            KRE8ECH Student Records &amp; Content
          </h1>
          <p className="text-xs text-[#A1A1A6] mt-1">
            Manage Google Sheets sync, inspect local records, and update preview content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-[#232325] hover:bg-[#2E2E32] text-xs font-medium transition-colors"
          >
            Preview Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Lock Session</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            <span>{feedback}</span>
          </div>
          <button type="button" onClick={() => setFeedback(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-black/[0.08]">
        {[
          { key: "registrations", label: `School Registrations (${registrations.length})`, icon: Users },
          { key: "hackready", label: `Hackready Workshop (${hackreadyList.length})`, icon: GraduationCap },
          { key: "curriculum", label: "Program & Curriculum", icon: Layers },
          { key: "projects", label: "Projects", icon: Code },
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
              type="button"
              onClick={() => setActiveTab(t.key as AdminTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isSelected
                  ? "bg-[#202124] text-white"
                  : "bg-[#FAF8F2] text-[#525252] hover:text-[#202124]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: REGISTRATIONS */}
      {activeTab === "registrations" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Total Applicants</span>
              <div className="text-3xl font-semibold text-[#202124] mt-1 tabular-nums">{totalStudents}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Confirmed Seats</span>
              <div className="text-3xl font-semibold text-[#16A34A] mt-1 tabular-nums">{confirmedStudents}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Schools &amp; Colleges</span>
              <div className="text-3xl font-semibold text-[#202124] mt-1 tabular-nums">{uniqueSchools}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Cities Represented</span>
              <div className="text-3xl font-semibold text-[#202124] mt-1 tabular-nums">{uniqueCities}</div>
            </div>
          </div>

          {/* Google Sheets Sync Status */}
          <div className="bg-[#FAF8F2] border border-black/[0.08] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#202124] block">
                Google Sheets Auto-Sync Status:{" "}
                {globalSheetsActive ? "Global Live Sync Active" : "Local Testing Mode (Set NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL for all visitors)"}
              </span>
              <p className="text-xs text-[#525252]">
                Deploy <code>google-apps-script/Code.gs</code> as a Web App and save its URL in GitHub Actions Variables to append every student registration directly into your Sheet.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsWebhookOpen(!isWebhookOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-black/[0.1] text-xs font-medium text-[#202124] hover:bg-gray-50 shrink-0"
            >
              <LinkIcon className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{isWebhookOpen ? "Hide Webhook Test" : "Configure / Test Webhook"}</span>
            </button>
          </div>

          {isWebhookOpen && (
            <div className="bg-white rounded-xl p-5 border border-black/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#202124]">
                    Google Apps Script Web App URL (Local Browser Test)
                  </h4>
                  <p className="text-xs text-[#6B7280]">
                    For production across all students, add this URL as GitHub repository variable <code>NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL</code>.
                  </p>
                </div>
                <button type="button" onClick={() => setIsWebhookOpen(false)} className="text-[#6B7280] hover:text-[#202124]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-black/[0.12] text-xs focus:outline-none focus:border-[#202124]"
                />
                <button
                  type="button"
                  onClick={handleSaveWebhook}
                  className="px-4 py-2 rounded-lg bg-[#202124] text-white text-xs font-medium hover:bg-black"
                >
                  Save Local URL
                </button>
                <button
                  type="button"
                  onClick={handleTestWebhook}
                  disabled={isTestingWebhook}
                  className="px-4 py-2 rounded-lg bg-[#F6C900] text-[#202124] text-xs font-semibold hover:bg-[#E5BA00] disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>{isTestingWebhook ? "Sending..." : "Send Test Row"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Search & Export Bar */}
          <div className="bg-white rounded-xl p-5 border border-black/[0.08] space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Search students"
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/[0.12] text-xs focus:outline-none focus:border-[#202124]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-xs"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                  <span>Add Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => exportRegistrationsToCSV(filteredRegs)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#202124] text-white font-medium text-xs hover:bg-black"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Export CSV (Excel)</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF8F2] border border-black/[0.08] text-[#202124] font-medium text-xs"
                >
                  <Save className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Backup JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF8F2] border border-black/[0.08] text-[#202124] font-medium text-xs"
                >
                  <Upload className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Import</span>
                </button>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06]">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[#6B7280] font-medium mr-1">Status:</span>
                {["All", "Confirmed", "Pending", "Shortlisted", "Contacted"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-md text-xs font-medium ${
                      statusFilter === st ? "bg-[#202124] text-white" : "bg-[#FAF8F2] text-[#525252]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-black/[0.12] text-xs bg-white font-medium"
              >
                <option value="All">All Programs</option>
                <option value="Four-Week Builder Program Cohort 1">Four-Week Builder Program</option>
                <option value="Offline Hackathon Showcase 2026">Grand Offline Hackathon 2026</option>
                <option value="Weekend Ideathon Sprint">Weekend Ideathon Sprint</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-black/[0.08] overflow-hidden">
            <div className="p-4 border-b border-black/[0.06] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#202124]">
                Registered Applicants ({filteredRegs.length})
              </h3>
              <button type="button" onClick={loadAllData} className="p-2 rounded-lg text-[#6B7280] hover:bg-gray-100" title="Refresh">
                <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#525252]">
                <thead className="bg-[#FAF8F2] text-[#6B7280] border-b border-black/[0.06]">
                  <tr>
                    <th className="p-3.5 font-medium">Student</th>
                    <th className="p-3.5 font-medium">Phone / WhatsApp</th>
                    <th className="p-3.5 font-medium">School / College</th>
                    <th className="p-3.5 font-medium">Class</th>
                    <th className="p-3.5 font-medium">City</th>
                    <th className="p-3.5 font-medium">Program</th>
                    <th className="p-3.5 font-medium">Status</th>
                    <th className="p-3.5 font-medium">Date</th>
                    <th className="p-3.5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {filteredRegs.map((reg) => (
                    <tr key={reg.id} className="hover:bg-[#FAF8F2]/60 cursor-pointer" onClick={() => handleOpenDossier(reg)}>
                      <td className="p-3.5 font-medium text-[#202124]">
                        <div>{reg.fullName}</div>
                        <div className="text-[11px] text-[#6B7280] font-normal">{reg.email}</div>
                      </td>
                      <td className="p-3.5 tabular-nums">{reg.phoneNumber || "—"}</td>
                      <td className="p-3.5">{reg.schoolCollege}</td>
                      <td className="p-3.5">{reg.classYear}</td>
                      <td className="p-3.5">{reg.city}</td>
                      <td className="p-3.5">{reg.registeredProgram || "Four-Week Builder Program"}</td>
                      <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={reg.status || "Confirmed"}
                          onChange={(e) => handleStatusChange(reg.id, e.target.value as StudentRegistration["status"])}
                          className="text-xs font-medium px-2 py-1 rounded border border-black/[0.12] bg-white"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Contacted">Contacted</option>
                        </select>
                      </td>
                      <td className="p-3.5 tabular-nums">{reg.registeredAt}</td>
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button type="button" onClick={() => handleOpenDossier(reg)} className="p-1.5 rounded bg-gray-100 hover:bg-[#202124] hover:text-white">
                            <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                          <button type="button" onClick={() => handleDeleteRegistration(reg.id, reg.fullName)} className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600">
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HACKREADY */}
      {activeTab === "hackready" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Workshop Applicants</span>
              <div className="text-3xl font-semibold text-[#202124] mt-1 tabular-nums">{totalHackready}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Confirmed Seats</span>
              <div className="text-3xl font-semibold text-[#16A34A] mt-1 tabular-nums">{confirmedHackready}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Engineering Branches</span>
              <div className="text-3xl font-semibold text-[#202124] mt-1 tabular-nums">{uniqueBranches}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/[0.08]">
              <span className="text-xs text-[#6B7280]">Semesters</span>
              <div className="text-3xl font-semibold text-[#202124] mt-1 tabular-nums">{uniqueSemesters}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-black/[0.08] space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Search Roll No, Name, Branch"
                  value={hackSearch}
                  onChange={(e) => setHackSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/[0.12] text-xs focus:outline-none focus:border-[#202124]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddHackOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-xs"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                  <span>Add Hackready Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => exportHackreadyToCSV(filteredHackready)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#202124] hover:bg-black text-white font-medium text-xs"
                >
                  <Download className="w-4 h-4" strokeWidth={1.75} />
                  <span>Download Excel (.csv)</span>
                </button>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06]">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[#6B7280] font-medium mr-1">Status:</span>
                {["All", "Confirmed", "Pending", "Shortlisted", "Contacted"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setHackStatusFilter(st)}
                    className={`px-3 py-1 rounded-md text-xs font-medium ${
                      hackStatusFilter === st ? "bg-[#202124] text-white" : "bg-[#FAF8F2] text-[#525252]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <select
                value={hackBranchFilter}
                onChange={(e) => setHackBranchFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-black/[0.12] text-xs bg-white font-medium"
              >
                <option value="All">All Branches</option>
                <option value="Computer Science & Engineering (CSE)">CSE</option>
                <option value="Artificial Intelligence & Machine Learning (AI & ML)">AI &amp; ML</option>
                <option value="Artificial Intelligence & Data Science">AI &amp; DS</option>
                <option value="Electronics & Communication Engineering (ECE)">ECE</option>
                <option value="Bachelor of Computer Applications">BCA</option>
                <option value="Bachelor of Business Administration">BBA</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-black/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#525252]">
                <thead className="bg-[#FAF8F2] text-[#6B7280] border-b border-black/[0.06]">
                  <tr>
                    <th className="p-3.5 font-medium">Roll No.</th>
                    <th className="p-3.5 font-medium">Student Name</th>
                    <th className="p-3.5 font-medium">Branch &amp; Semester</th>
                    <th className="p-3.5 font-medium">Email</th>
                    <th className="p-3.5 font-medium">Phone</th>
                    <th className="p-3.5 font-medium">Status</th>
                    <th className="p-3.5 font-medium">Date</th>
                    <th className="p-3.5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {filteredHackready.map((hr) => (
                    <tr key={hr.id} className="hover:bg-[#FAF8F2]/60 cursor-pointer" onClick={() => handleOpenHackDossier(hr)}>
                      <td className="p-3.5 font-mono font-semibold text-[#202124] tabular-nums">{hr.rollNo}</td>
                      <td className="p-3.5 font-medium text-[#202124]">{hr.fullName}</td>
                      <td className="p-3.5">
                        <div>{hr.branch}</div>
                        <div className="text-[11px] text-[#6B7280]">{hr.semester}</div>
                      </td>
                      <td className="p-3.5">{hr.email}</td>
                      <td className="p-3.5 tabular-nums">{hr.phoneNumber}</td>
                      <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={hr.status || "Confirmed"}
                          onChange={(e) => handleHackStatusChange(hr.id, e.target.value as HackreadyRegistration["status"])}
                          className="text-xs font-medium px-2 py-1 rounded border border-black/[0.12] bg-white"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Contacted">Contacted</option>
                        </select>
                      </td>
                      <td className="p-3.5 tabular-nums">{hr.registeredAt}</td>
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button type="button" onClick={() => handleOpenHackDossier(hr)} className="p-1.5 rounded bg-gray-100 hover:bg-[#202124] hover:text-white">
                            <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                          <button type="button" onClick={() => handleDeleteHack(hr.id, hr.fullName)} className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600">
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CURRICULUM TAB */}
      {activeTab === "curriculum" && program && (
        <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
            <div>
              <h2 className="text-lg font-semibold text-[#202124]">Manage Four-Week Builder Program</h2>
              <p className="text-xs text-[#6B7280]">Update program title and tagline in browser preview storage.</p>
            </div>
            <button
              type="button"
              onClick={handleSaveCurriculum}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold text-xs hover:bg-[#E5BA00]"
            >
              <Save className="w-4 h-4" strokeWidth={1.75} />
              <span>Save Curriculum Updates</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-[#525252] mb-1">Program Title</label>
              <input
                type="text"
                value={program.title}
                onChange={(e) => setProgram({ ...program, title: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-black/[0.12] font-medium"
              />
            </div>
            <div>
              <label className="block font-medium text-[#525252] mb-1">Tagline</label>
              <input
                type="text"
                value={program.tagline}
                onChange={(e) => setProgram({ ...program, tagline: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-black/[0.12]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {program.weeks.map((week) => (
              <div key={week.id} className="p-4 rounded-xl border border-black/[0.08] bg-[#FAF8F2] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#202124]">{week.badge}</span>
                  <span className="text-[#6B7280]">{week.sessionFormat}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#202124]">{week.title}</h4>
                <p className="text-xs text-[#525252]">{week.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === "projects" && (
        <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <h2 className="text-lg font-semibold text-[#202124]">Projects Showcase</h2>
            <button
              type="button"
              onClick={handleCreateProject}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold text-xs hover:bg-[#E5BA00]"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              <span>Add Project</span>
            </button>
          </div>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-xl border border-black/[0.08] bg-[#FAF8F2] flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#6B7280]">{proj.category} • {proj.status}</span>
                  <h4 className="text-sm font-semibold text-[#202124]">{proj.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newTitle = prompt("Update Project Title:", proj.title);
                      if (newTitle) {
                        const updated = projects.map((p) => (p.id === proj.id ? { ...p, title: newTitle } : p));
                        saveProjects(updated);
                        setProjects(updated);
                        showFeedback("Project updated");
                      }
                    }}
                    className="p-2 rounded-lg bg-white border border-black/[0.08] text-[#525252]"
                  >
                    <Edit3 className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                  <button type="button" onClick={() => handleDeleteProj(proj.id)} className="p-2 rounded-lg bg-red-50 text-red-600">
                    <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS TAB */}
      {activeTab === "achievements" && (
        <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-4">
          <h2 className="text-lg font-semibold text-[#202124]">Achievements &amp; Recognitions</h2>
          {achievements.map((ach) => (
            <div key={ach.id} className="p-5 rounded-xl border border-black/[0.08] bg-[#FAF8F2] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#202124]">{ach.position}</span>
                <span className="text-[#6B7280]">{ach.date}</span>
              </div>
              <h3 className="text-base font-semibold text-[#202124]">{ach.featuredHeadline}</h3>
              <p className="text-xs text-[#525252]">{ach.summary}</p>
            </div>
          ))}
        </div>
      )}

      {/* HACKATHONS TAB */}
      {activeTab === "hackathons" && (
        <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <h2 className="text-lg font-semibold text-[#202124]">Hackathons &amp; Sprints</h2>
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
                  status: "Upcoming",
                };
                addHackathon(newHack);
                setHackathons(getHackathons());
                showFeedback("Hackathon added");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold text-xs"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              <span>Add Hackathon</span>
            </button>
          </div>
          <div className="space-y-3">
            {hackathons.map((h) => (
              <div key={h.id} className="p-4 rounded-xl border border-black/[0.08] bg-[#FAF8F2] flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#202124]">{h.title}</h4>
                  <p className="text-xs text-[#6B7280]">{h.venue} • {h.teamSize}</p>
                </div>
                <select
                  value={h.status}
                  onChange={(e) => {
                    const updated = hackathons.map((hack) =>
                      hack.id === h.id ? { ...hack, status: e.target.value as Hackathon["status"] } : hack
                    );
                    saveHackathons(updated);
                    setHackathons(updated);
                    showFeedback("Hackathon status updated");
                  }}
                  className="text-xs font-medium p-2 rounded-lg border border-black/[0.12] bg-white"
                >
                  <option value="Registration Open">Registration Open</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROBLEM STATEMENTS TAB */}
      {activeTab === "problemStatements" && (
        <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <h2 className="text-lg font-semibold text-[#202124]">Problem Statements Bank</h2>
            <button
              type="button"
              onClick={handleCreatePS}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold text-xs"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              <span>Add Problem Statement</span>
            </button>
          </div>
          <div className="space-y-3">
            {problemStatements.map((ps) => (
              <div key={ps.id} className="p-4 rounded-xl border border-black/[0.08] bg-[#FAF8F2] flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#6B7280]">{ps.code} • {ps.difficulty}</span>
                  <h4 className="text-sm font-semibold text-[#202124]">{ps.title}</h4>
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
                      showFeedback(`Status set to ${newStatus}`);
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-black/[0.12] bg-white"
                  >
                    {ps.status}
                  </button>
                  <button type="button" onClick={() => handleDeletePS(ps.id)} className="p-2 rounded-lg bg-red-50 text-red-600">
                    <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS TAB */}
      {activeTab === "announcements" && (
        <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <h2 className="text-lg font-semibold text-[#202124]">Cohort Announcements</h2>
            <button
              type="button"
              onClick={handleCreateAnnouncement}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold text-xs"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              <span>Add Announcement</span>
            </button>
          </div>
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl bg-[#FAF8F2] border border-black/[0.08] flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#202124]">{ann.tag} — {ann.title}</span>
                  <p className="text-xs text-[#525252] mt-0.5">{ann.content}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = announcements.filter((a) => a.id !== ann.id);
                    saveAnnouncements(next);
                    setAnnouncements(next);
                    showFeedback("Announcement removed");
                  }}
                  className="p-2 rounded-lg hover:bg-red-50 text-[#6B7280] hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HACKREADY DOSSIER MODAL */}
      {selectedHackready && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 border border-black/[0.08] shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-black/[0.06]">
              <div>
                <span className="text-xs font-mono text-[#6B7280]">Roll No: {selectedHackready.rollNo}</span>
                <h3 className="text-xl font-semibold text-[#202124]">{selectedHackready.fullName}</h3>
              </div>
              <button type="button" onClick={() => setSelectedHackready(null)} className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${(selectedHackready.phoneNumber || "").replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a href={`tel:${selectedHackready.phoneNumber}`} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF8F2] border border-black/[0.08] text-xs font-medium">
                <Phone className="w-3.5 h-3.5" />
                <span>{selectedHackready.phoneNumber}</span>
              </a>
              <a href={`mailto:${selectedHackready.email}`} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF8F2] border border-black/[0.08] text-xs font-medium">
                <Mail className="w-3.5 h-3.5" />
                <span>{selectedHackready.email}</span>
              </a>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#525252]">Internal Notes</label>
              <textarea
                rows={3}
                value={editHackNotes}
                onChange={(e) => setEditHackNotes(e.target.value)}
                className="w-full p-3 rounded-lg border border-black/[0.12] text-xs"
              />
              <button type="button" onClick={handleSaveHackNotes} className="px-4 py-2 rounded-lg bg-[#202124] text-white text-xs font-medium">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT DOSSIER MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 border border-black/[0.08] shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-black/[0.06]">
              <div>
                <span className="text-xs font-mono text-[#6B7280]">{selectedStudent.id} • {selectedStudent.registeredAt}</span>
                <h3 className="text-xl font-semibold text-[#202124]">{selectedStudent.fullName}</h3>
              </div>
              <button type="button" onClick={() => setSelectedStudent(null)} className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF8F2] border border-black/[0.06]">
                <span className="text-[#6B7280] block">School / College</span>
                <span className="font-medium text-[#202124] flex items-center gap-1 mt-0.5">
                  <Building className="w-3.5 h-3.5" />
                  {selectedStudent.schoolCollege}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF8F2] border border-black/[0.06]">
                <span className="text-[#6B7280] block">Class &amp; City</span>
                <span className="font-medium text-[#202124] mt-0.5 block">
                  {selectedStudent.classYear} • {selectedStudent.city}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#525252]">Internal Notes</label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full p-3 rounded-lg border border-black/[0.12] text-xs"
              />
              <button type="button" onClick={handleSaveNotes} className="px-4 py-2 rounded-lg bg-[#202124] text-white text-xs font-medium">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <h3 className="text-lg font-semibold text-[#202124]">Add Student Record</h3>
              <button type="button" onClick={() => setIsAddStudentOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleManualAddStudent} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={manualForm.fullName}
                onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  required
                  placeholder="Phone *"
                  value={manualForm.phoneNumber}
                  onChange={(e) => setManualForm({ ...manualForm, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={manualForm.email}
                  onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="School / College"
                  value={manualForm.schoolCollege}
                  onChange={(e) => setManualForm({ ...manualForm, schoolCollege: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={manualForm.city}
                  onChange={(e) => setManualForm({ ...manualForm, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddStudentOpen(false)} className="px-4 py-2 rounded-lg bg-gray-100">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD HACKREADY MODAL */}
      {isAddHackOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <h3 className="text-lg font-semibold text-[#202124]">Add Hackready Student</h3>
              <button type="button" onClick={() => setIsAddHackOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleManualAddHack} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={manualHackForm.fullName}
                  onChange={(e) => setManualHackForm({ ...manualHackForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
                />
                <input
                  type="text"
                  required
                  placeholder="Roll No. *"
                  value={manualHackForm.rollNo}
                  onChange={(e) => setManualHackForm({ ...manualHackForm, rollNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12] font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={manualHackForm.email}
                  onChange={(e) => setManualHackForm({ ...manualHackForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone *"
                  value={manualHackForm.phoneNumber}
                  onChange={(e) => setManualHackForm({ ...manualHackForm, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-black/[0.12]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddHackOpen(false)} className="px-4 py-2 rounded-lg bg-gray-100">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMPORT JSON MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#202124]">Restore Records from JSON</h3>
              <button type="button" onClick={() => setIsImportModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              rows={7}
              placeholder="Paste JSON array"
              value={jsonImportText}
              onChange={(e) => setJsonImportText(e.target.value)}
              className="w-full p-3 font-mono text-xs rounded-lg border border-black/[0.12]"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-medium">
                Cancel
              </button>
              <button type="button" onClick={handleImportJSON} className="px-4 py-2 rounded-lg bg-[#202124] text-white text-xs font-medium">
                Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
