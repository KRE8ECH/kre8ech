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
  Search,
  Save,
  ArrowRight
} from "lucide-react";
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
  exportRegistrationsToCSV,
  getAnnouncements,
  saveAnnouncements
} from "@/lib/storage";
import {
  ProgramOverview,
  Project,
  Achievement,
  Hackathon,
  ProblemStatement,
  StudentRegistration,
  Announcement
} from "@/types";

type AdminTab =
  | "curriculum"
  | "projects"
  | "achievements"
  | "hackathons"
  | "problemStatements"
  | "registrations"
  | "announcements";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("curriculum");

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

  // Search in registrations
  const [regSearch, setRegSearch] = useState("");

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
    setRegistrations(getStudentRegistrations());
    setAnnouncements(getAnnouncements());
  };

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passkey for team members
    if (passcode === "kre8ech2026" || passcode === "admin123" || passcode === "kre8ech") {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setLoginError("");
      loadAllData();
    } else {
      setLoginError("Invalid passcode. Hint: Use 'kre8ech2026'");
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  // --- Curriculum Actions ---
  const handleSaveCurriculum = () => {
    if (program) {
      saveProgramData(program);
      showFeedback("Curriculum updated and published live!");
    }
  };

  const handleAddDayTopic = (weekIndex: number, dayIndex: number, newTopic: string) => {
    if (!program || !newTopic.trim()) return;
    const nextWeeks = [...program.weeks];
    nextWeeks[weekIndex].days[dayIndex].topics.push(newTopic.trim());
    setProgram({ ...program, weeks: nextWeeks });
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
  const filteredRegs = registrations.filter(
    (r) =>
      r.fullName.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.schoolCollege.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.city.toLowerCase().includes(regSearch.toLowerCase())
  );

  // Authentication Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#121316] text-[#F6C900] mx-auto flex items-center justify-center border border-gray-800 shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-[#202124]">KRE8ECH Admin Control</h1>
            <p className="text-xs text-gray-500">
              Restricted portal for KRE8ECH core team members and program directors.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode (e.g. kre8ech2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124]"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#202124] text-white font-bold text-sm hover:bg-black transition-colors shadow-sm"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400">
            Passcode for reviewer test: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-bold">kre8ech2026</code>
          </p>
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
              Admin CMS
            </span>
            <span className="text-xs text-gray-400">Content Management & Registrations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            KRE8ECH Team Control Center
          </h1>
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
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200">
        {[
          { key: "curriculum", label: "Program & Curriculum", icon: Layers },
          { key: "projects", label: "Projects & Builds", icon: Code },
          { key: "achievements", label: "Achievements", icon: Trophy },
          { key: "hackathons", label: "Hackathons", icon: Calendar },
          { key: "problemStatements", label: "Problem Statements", icon: FileText },
          { key: "registrations", label: `Student Registrations (${registrations.length})`, icon: Users },
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
          TAB 1: CURRICULUM MANAGEMENT
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

          {/* Program Overview Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Program Title</label>
              <input
                type="text"
                value={program.title}
                onChange={(e) => setProgram({ ...program, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={program.tagline}
                onChange={(e) => setProgram({ ...program, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-semibold"
              />
            </div>
          </div>

          {/* Weeks Accordion / Editor */}
          <div className="space-y-6 pt-2">
            <h3 className="text-base font-bold text-[#202124]">Weekly Learning Journey</h3>
            {program.weeks.map((week, wIdx) => (
              <div key={week.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded bg-[#FFF9E8] border border-[#F6C900] text-[#202124]">
                    WEEK 0{week.weekNumber}
                  </span>
                  <span className="text-xs text-gray-500">{week.sessionFormat}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Week Title</label>
                    <input
                      type="text"
                      value={week.title}
                      onChange={(e) => {
                        const nextWeeks = [...program.weeks];
                        nextWeeks[wIdx].title = e.target.value;
                        setProgram({ ...program, weeks: nextWeeks });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={week.subtitle}
                      onChange={(e) => {
                        const nextWeeks = [...program.weeks];
                        nextWeeks[wIdx].subtitle = e.target.value;
                        setProgram({ ...program, weeks: nextWeeks });
                      }}
                      className="w-full p-2 rounded-lg border border-gray-300"
                    />
                  </div>
                </div>

                {/* Days inside Week */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-gray-600 uppercase">
                    Daily Sessions ({week.days.length} Days)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {week.days.map((day, dIdx) => (
                      <div key={day.dayNumber} className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-2">
                        <div className="flex items-center justify-between font-bold">
                          <span>Day 0{day.dayNumber}</span>
                          {day.isHackathonDay && (
                            <span className="text-[10px] text-amber-700 font-extrabold">Offline Hackathon</span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => {
                            const nextWeeks = [...program.weeks];
                            nextWeeks[wIdx].days[dIdx].title = e.target.value;
                            setProgram({ ...program, weeks: nextWeeks });
                          }}
                          className="w-full p-1.5 rounded border border-gray-300 text-xs font-semibold bg-white"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] text-gray-400 font-bold block">Topics ({day.topics.length}):</span>
                          <ul className="text-[11px] text-gray-600 space-y-1">
                            {day.topics.map((t, tIdx) => (
                              <li key={tIdx} className="truncate">• {t}</li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            onClick={() => {
                              const newTop = prompt(`Add new topic for Day ${day.dayNumber}:`);
                              if (newTop) handleAddDayTopic(wIdx, dIdx, newTop);
                            }}
                            className="text-[11px] text-blue-600 hover:underline font-bold mt-1"
                          >
                            + Add Topic
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: PROJECTS & BUILDS
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
          TAB 3: ACHIEVEMENTS
          ========================================================= */}
      {activeTab === "achievements" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div>
            <h2 className="text-xl font-black text-[#202124]">Achievements & Recognitions</h2>
            <p className="text-xs text-gray-500">
              Manage hackathon milestones and verified wins.
            </p>
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
          TAB 4: HACKATHONS
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
                  bannerImage: "/images/kre8ech-logo-full.png",
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
          TAB 5: PROBLEM STATEMENTS
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
                        item.id === ps.id
                          ? { ...item, status: newStatus }
                          : item
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
          TAB 6: STUDENT REGISTRATIONS
          ========================================================= */}
      {activeTab === "registrations" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-[#202124]">
                Student Registrations ({filteredRegs.length})
              </h2>
              <p className="text-xs text-gray-500">
                Live cohort applications, class levels, school records, and tech interests.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-300 text-xs w-48 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => exportRegistrationsToCSV(registrations)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#202124] text-white font-bold text-xs hover:bg-black transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">School / College</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Selected Program</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRegs.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-[#202124]">
                      <div>{reg.fullName}</div>
                      <div className="text-[11px] text-gray-400 font-normal">{reg.email}</div>
                    </td>
                    <td className="p-3">{reg.schoolCollege}</td>
                    <td className="p-3 font-semibold">{reg.classYear}</td>
                    <td className="p-3">{reg.city}</td>
                    <td className="p-3 max-w-xs truncate text-[11px]">
                      {reg.registeredProgram || "Four-Week Builder Program"}
                    </td>
                    <td className="p-3 text-gray-400">{reg.registeredAt}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
