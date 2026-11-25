"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Building,
  MapPin,
  Trophy,
  Bell,
  ArrowRight,
  LogOut,
  ChevronRight,
} from "lucide-react";
import {
  getStudentSession,
  setStudentSession,
  getAnnouncements,
  getProblemStatements,
  StudentSession,
} from "@/lib/storage";
import { Announcement, ProblemStatement } from "@/types";

export default function StudentDashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentSession | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);

  useEffect(() => {
    const session = getStudentSession();
    setStudent(
      session || {
        fullName: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        schoolCollege: "Delhi Public School, R.K. Puram",
        classYear: "Class 10",
        city: "New Delhi",
        techInterests: ["AI & Machine Learning", "Web Development", "UI/UX Prototyping"],
        registeredProgram: "Four-Week Builder Program Cohort 1",
      }
    );
    setAnnouncements(getAnnouncements());
    setProblemStatements(getProblemStatements().slice(0, 3));
  }, []);

  const handleLogout = () => {
    setStudentSession(null);
    router.push("/");
  };

  if (!student) return null;

  return (
    <div className="pb-20 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="bg-[#FAF8F2] rounded-2xl p-6 sm:p-8 border border-black/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span>Student Dashboard</span>
            <span>•</span>
            <span className="text-[#16A34A] font-medium">Active Cohort 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#202124]">
            {student.fullName}
          </h1>
          <p className="text-sm text-[#525252]">
            Enrolled in <strong className="text-[#202124]">{student.registeredProgram}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/builder-program"
            className="px-4 py-2 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-xs transition-colors"
          >
            Open Curriculum
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-lg bg-white border border-black/[0.1] text-[#525252] hover:bg-gray-50 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] space-y-4">
            <h2 className="text-base font-semibold text-[#202124]">Student Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                <span className="text-[#6B7280]">Institution</span>
                <p className="font-medium text-[#202124] text-sm mt-0.5 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
                  <span>{student.schoolCollege}</span>
                </p>
              </div>
              <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                <span className="text-[#6B7280]">Class / Year</span>
                <p className="font-medium text-[#202124] text-sm mt-0.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
                  <span>{student.classYear}</span>
                </p>
              </div>
              <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                <span className="text-[#6B7280]">City</span>
                <p className="font-medium text-[#202124] text-sm mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
                  <span>{student.city}</span>
                </p>
              </div>
              <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                <span className="text-[#6B7280]">Email</span>
                <p className="font-medium text-[#202124] text-sm mt-0.5 truncate">{student.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {student.techInterests.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-black/[0.06] text-[#202124]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B7280]">Learning Progress</span>
                <h2 className="text-lg font-semibold text-[#202124]">Four-Week Builder Journey</h2>
              </div>
              <span className="text-xs text-[#6B7280] tabular-nums">12 Days Total</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#FFF9E8] border border-[#F6C900]">
                <span className="text-[11px] font-medium text-[#202124] tabular-nums">Week 01 • Active</span>
                <p className="font-semibold text-[#202124] text-sm mt-1">Explore</p>
                <p className="text-[#525252] mt-0.5">Tech &amp; AI Logic</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F2] border border-black/[0.06]">
                <span className="text-[11px] text-[#6B7280] tabular-nums">Week 02</span>
                <p className="font-semibold text-[#202124] text-sm mt-1">Ideate &amp; Design</p>
                <p className="text-[#6B7280] mt-0.5">Figma Wireframes</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F2] border border-black/[0.06]">
                <span className="text-[11px] text-[#6B7280] tabular-nums">Week 03</span>
                <p className="font-semibold text-[#202124] text-sm mt-1">Build &amp; Code</p>
                <p className="text-[#6B7280] mt-0.5">Frontend &amp; MVP</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F2] border border-black/[0.06]">
                <span className="text-[11px] text-[#6B7280] tabular-nums">Week 04</span>
                <p className="font-semibold text-[#202124] text-sm mt-1">Hackathon</p>
                <p className="text-[#6B7280] mt-0.5">Live Stage Demos</p>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-[#6B7280]">Daily session: 60m guided + 30m doubt solving</span>
              <Link href="/builder-program" className="font-semibold text-[#202124] hover:underline inline-flex items-center gap-1">
                <span>Full Curriculum</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#202124]">Curated Challenge Briefs</h2>
              <Link href="/problem-statements" className="text-xs font-semibold text-[#202124] hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2.5">
              {problemStatements.map((ps) => (
                <div key={ps.id} className="p-4 rounded-xl bg-[#FAF8F2] border border-black/[0.06] flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-mono text-[#6B7280]">{ps.code}</span>
                      <span className="text-xs font-semibold text-[#202124] truncate">{ps.title}</span>
                    </div>
                    <p className="text-xs text-[#525252] line-clamp-1">{ps.summary}</p>
                  </div>
                  <Link href="/problem-statements" className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-black/[0.08]">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-black/[0.06]">
              <Bell className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
              <h3 className="text-sm font-semibold text-[#202124]">Cohort Announcements</h3>
            </div>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-xl bg-[#FAF8F2] border border-black/[0.06] space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span className="font-medium text-[#202124]">{ann.tag}</span>
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#202124]">{ann.title}</h4>
                  <p className="text-xs text-[#525252] leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141415] text-white rounded-2xl p-6 border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F6C900]" strokeWidth={1.75} />
              <h4 className="text-sm font-semibold">Offline Hackathon 2026</h4>
            </div>
            <p className="text-xs text-[#A1A1A6] leading-relaxed">
              Your cohort includes entry into the concluding offline hackathon with jury evaluation and awards.
            </p>
            <Link
              href="/hackathons"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-xs transition-colors"
            >
              <span>Check Hackathon Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
