"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Building,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Trophy,
  Code,
  FileText,
  Bell,
  ArrowRight,
  LogOut,
  Sparkles,
  ChevronRight
} from "lucide-react";
import {
  getStudentSession,
  setStudentSession,
  getAnnouncements,
  getProgramData,
  getProblemStatements,
  StudentSession
} from "@/lib/storage";
import { signOutGoogleSession } from "@/lib/googleAuth";
import { Announcement, ProgramOverview, ProblemStatement } from "@/types";

export default function StudentDashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentSession | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [program, setProgram] = useState<ProgramOverview | null>(null);
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);

  useEffect(() => {
    const session = getStudentSession();
    if (!session) {
      const defaultDemo: StudentSession = {
        fullName: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        schoolCollege: "Delhi Public School, R.K. Puram",
        classYear: "Class 10",
        city: "New Delhi",
        techInterests: ["AI & Machine Learning", "Web Development", "UI/UX Prototyping"],
        registeredProgram: "Four-Week Builder Program Cohort 1"
      };
      setStudent(defaultDemo);
    } else {
      setStudent(session);
    }

    setAnnouncements(getAnnouncements());
    setProgram(getProgramData());
    setProblemStatements(getProblemStatements().slice(0, 3));
  }, []);

  const handleLogout = () => {
    signOutGoogleSession();
    setStudentSession(null);
    router.push("/");
  };

  if (!student) return null;

  return (
    <div className="pb-24 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-10 border border-gray-200/70 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {student.avatarUrl && (
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border border-gray-300"
              />
            )}
            <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider">
              Student Dashboard
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              Active Cohort 1
            </span>
            {student.authProvider === "google" && (
              <span className="text-[11px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                Google Verified
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#202124]">
            Welcome back, {student.fullName}! 👋
          </h1>

          <p className="text-sm text-gray-600">
            Enrolled in <strong>{student.registeredProgram}</strong>. Your next live builder session starts soon!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/builder-program"
            className="px-5 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-bold text-xs shadow-xs transition-all"
          >
            Access Curriculum
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="text-base font-black text-[#202124] flex items-center justify-between">
              <span>Student Profile Details</span>
              <span className="text-xs font-semibold text-gray-400">Verified Enrollment</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-gray-50/80 rounded-2xl space-y-1 border border-gray-100">
                <span className="text-gray-400 font-medium">Institution</span>
                <p className="font-bold text-[#202124] text-sm flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-gray-500" />
                  {student.schoolCollege}
                </p>
              </div>

              <div className="p-3.5 bg-gray-50/80 rounded-2xl space-y-1 border border-gray-100">
                <span className="text-gray-400 font-medium">Class / Academic Year</span>
                <p className="font-bold text-[#202124] text-sm flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  {student.classYear}
                </p>
              </div>

              <div className="p-3.5 bg-gray-50/80 rounded-2xl space-y-1 border border-gray-100">
                <span className="text-gray-400 font-medium">City / Location</span>
                <p className="font-bold text-[#202124] text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {student.city}
                </p>
              </div>

              <div className="p-3.5 bg-gray-50/80 rounded-2xl space-y-1 border border-gray-100">
                <span className="text-gray-400 font-medium">Contact Email</span>
                <p className="font-bold text-[#202124] text-sm truncate">
                  {student.email}
                </p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Your Technology Interests
              </span>
              <div className="flex flex-wrap gap-2">
                {student.techInterests.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Builder Program Progress Roadmap */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase text-amber-600">Learning Progress</span>
                <h3 className="text-xl font-black text-[#202124]">Four-Week Builder Journey</h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                12 Days Total (11 Online + 1 Offline)
              </span>
            </div>

            {/* 4-Week Step Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-emerald-700">Week 01 • Active</span>
                <p className="font-black text-emerald-950 text-sm">EXPLORE</p>
                <p className="text-emerald-700 text-[11px]">Digital Anatomy & Logic</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Week 02 • Next</span>
                <p className="font-bold text-gray-700 text-sm">IDEATE & DESIGN</p>
                <p className="text-gray-500 text-[11px]">User Personas & Wireframing</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Week 03</span>
                <p className="font-bold text-gray-700 text-sm">BUILD & CODE</p>
                <p className="text-gray-500 text-[11px]">Frontend Code & MVP</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">Week 04</span>
                <p className="font-bold text-gray-700 text-sm">OFFLINE HACKATHON</p>
                <p className="text-gray-500 text-[11px]">Live 3-Min Demos</p>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-gray-500">Daily session: 60m Guided + 30m Doubt Solving</span>
              <Link href="/builder-program" className="font-bold text-[#202124] hover:underline flex items-center gap-1">
                <span>View Full Curriculum</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Problem Statements */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#202124]">
                Curated Challenge Briefs for Your Team
              </h3>
              <Link href="/problem-statements" className="text-xs font-bold text-[#202124] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {problemStatements.map((ps) => (
                <div key={ps.id} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-200/80 text-gray-700">
                        {ps.code}
                      </span>
                      <span className="text-xs font-bold text-[#202124]">{ps.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{ps.summary}</p>
                  </div>
                  <Link
                    href={`/problem-statements`}
                    className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-100 shadow-xs"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Announcements Feed */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Bell className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-black text-[#202124]">Cohort Announcements</h3>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/50 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                    <span className="px-2 py-0.5 rounded-full bg-[#F6C900] text-[#202124]">
                      {ann.tag}
                    </span>
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="text-xs font-black text-[#202124]">{ann.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Participation Badge */}
          <div className="bg-[#121316] text-white rounded-3xl p-6 border border-gray-800 space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F6C900]" />
              <h4 className="text-sm font-black">Offline Hackathon 2026</h4>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your cohort includes guaranteed entry into the Grand Concluding Offline Hackathon with jury evaluation and awards.
            </p>
            <div className="pt-2">
              <Link
                href="/hackathons"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-bold text-xs"
              >
                <span>Check Hackathon Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
