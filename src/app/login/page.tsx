"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, UserCheck } from "lucide-react";
import {
  setStudentSession,
  getStudentRegistrations,
  getHackreadyRegistrations
} from "@/lib/storage";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { GoogleUserProfile } from "@/lib/googleAuth";
import { trackEvent } from "@/lib/analytics";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const createSessionFromEmail = (
    targetEmail: string,
    provider: "google" | "email",
    googleProfile?: GoogleUserProfile
  ) => {
    const cleanEmail = targetEmail.trim();
    const normalized = cleanEmail.toLowerCase();

    const generalMatch = getStudentRegistrations().find(
      (r) => r.email.toLowerCase() === normalized
    );
    const hackreadyMatch = getHackreadyRegistrations().find(
      (r) => r.email.toLowerCase() === normalized
    );

    if (generalMatch) {
      setStudentSession({
        fullName: generalMatch.fullName,
        email: generalMatch.email,
        schoolCollege: generalMatch.schoolCollege,
        classYear: generalMatch.classYear,
        city: generalMatch.city,
        techInterests: generalMatch.techInterests,
        registeredProgram:
          generalMatch.registeredProgram || "Four-Week Builder Program Cohort 1",
        avatarUrl: googleProfile?.picture,
        authProvider: provider
      });
    } else if (hackreadyMatch) {
      setStudentSession({
        fullName: hackreadyMatch.fullName,
        email: hackreadyMatch.email,
        schoolCollege: `${hackreadyMatch.branch} (${hackreadyMatch.semester})`,
        classYear: hackreadyMatch.semester,
        city: hackreadyMatch.collegeName || "College Campus",
        techInterests: ["Hackready Workshop", "Hackathon Preparation"],
        registeredProgram: "Hackready Workshop",
        avatarUrl: googleProfile?.picture,
        authProvider: provider
      });
    } else {
      setStudentSession({
        fullName:
          googleProfile?.name || cleanEmail.split("@")[0].replace(/[._]/g, " "),
        email: cleanEmail,
        schoolCollege: "KRE8ECH Student Member",
        classYear: "Builder Cohort",
        city: "India",
        techInterests: ["Artificial Intelligence & LLMs", "Web Development"],
        registeredProgram: "Four-Week Builder Program",
        avatarUrl: googleProfile?.picture,
        authProvider: provider
      });
    }

    trackEvent("login", { method: provider });
    router.push("/dashboard");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }
    createSessionFromEmail(email, "email");
  };

  const handleGoogleSuccess = (profile: GoogleUserProfile) => {
    setError("");
    createSessionFromEmail(profile.email, "google", profile);
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
      authProvider: "demo"
    });
    trackEvent("login", { method: "demo" });
    router.push("/dashboard");
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 mx-auto flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-amber-900" />
          </div>
          <h1 className="text-2xl font-black text-[#202124]">Student Login</h1>
          <p className="text-xs text-gray-500">
            Access your Builder Program dashboard, hackathon submissions, and weekly progress.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl">
            {error}
          </div>
        )}

        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={(msg) => setError(msg)}
          label="Sign in with Google"
        />

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-gray-200" />
          <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">
            Or use registered email
          </span>
          <div className="w-full border-t border-gray-200" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="you@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] shadow-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-sm shadow-xs transition-all"
          >
            <span>Log In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 space-y-3 text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200/60 transition-colors"
          >
            ⚡ Instant Demo Student Login
          </button>

          <p className="text-xs text-gray-500">
            New student?{" "}
            <Link href="/register" className="font-bold text-[#202124] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
