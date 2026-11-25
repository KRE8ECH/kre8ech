"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, UserCheck } from "lucide-react";
import { setStudentSession, getStudentRegistrations } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    const registrations = getStudentRegistrations();
    const found = registrations.find((r) => r.email.toLowerCase() === email.toLowerCase());

    if (found) {
      setStudentSession({
        fullName: found.fullName,
        email: found.email,
        schoolCollege: found.schoolCollege,
        classYear: found.classYear,
        city: found.city,
        techInterests: found.techInterests,
        registeredProgram: found.registeredProgram || "Four-Week Builder Program Cohort 1",
      });
    } else {
      setStudentSession({
        fullName: email.split("@")[0].replace(".", " ").toUpperCase(),
        email,
        schoolCollege: "KRE8ECH Student Builder",
        classYear: "Class 10",
        city: "Delhi NCR",
        techInterests: ["AI & Machine Learning", "Web Development"],
        registeredProgram: "Four-Week Builder Program Cohort 1",
      });
    }
    router.push("/dashboard");
  };

  const handleQuickDemo = () => {
    setStudentSession({
      fullName: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      schoolCollege: "Delhi Public School, R.K. Puram",
      classYear: "Class 10",
      city: "New Delhi",
      techInterests: ["AI & Machine Learning", "Web Development", "UI/UX Prototyping"],
      registeredProgram: "Four-Week Builder Program Cohort 1",
    });
    router.push("/dashboard");
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-white border border-black/[0.08] rounded-2xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.04)] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-11 h-11 rounded-xl bg-[#FAF8F2] border border-black/[0.08] mx-auto flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-[#202124]" strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-semibold text-[#202124]">Student Login</h1>
          <p className="text-xs text-[#6B7280]">
            Access your Builder Program dashboard, hackathon details, and weekly progress.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#525252] mb-1">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
              <input
                type="email"
                required
                placeholder="you@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors"
          >
            <span>Open Student Dashboard</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </form>

        <div className="pt-3 border-t border-black/[0.06] space-y-3 text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 rounded-lg bg-[#FAF8F2] hover:bg-[#EFE9DF] text-[#202124] text-xs font-medium border border-black/[0.08] transition-colors"
          >
            Preview Demo Student Account
          </button>

          <p className="text-xs text-[#6B7280]">
            New student?{" "}
            <Link href="/register" className="font-semibold text-[#202124] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
