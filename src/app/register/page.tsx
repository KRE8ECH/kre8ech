"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  User,
  Mail,
  Lock,
  Building,
  GraduationCap,
  MapPin
} from "lucide-react";
import { registerStudent, setStudentSession } from "@/lib/storage";

const interestOptions = [
  "Artificial Intelligence & LLMs",
  "Web Development & Frontend",
  "Mobile Apps (Android / iOS)",
  "Smart IoT & Robotics",
  "UI/UX Design & Prototyping",
  "Automation & Scripts",
  "Competitive Hackathons"
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    schoolCollege: "",
    classYear: "Class 9",
    city: "",
    techInterests: [] as string[],
    registeredProgram: "Four-Week Builder Program Cohort 1"
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.techInterests.includes(interest);
      return {
        ...prev,
        techInterests: exists
          ? prev.techInterests.filter((i) => i !== interest)
          : [...prev.techInterests, interest]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.schoolCollege || !formData.city) {
      setError("Please fill out all required fields.");
      return;
    }

    if (formData.techInterests.length === 0) {
      setError("Please select at least one technology interest area.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newStudent = registerStudent({
        fullName: formData.fullName,
        email: formData.email,
        schoolCollege: formData.schoolCollege,
        classYear: formData.classYear,
        city: formData.city,
        techInterests: formData.techInterests,
        registeredProgram: formData.registeredProgram
      });

      setStudentSession({
        fullName: formData.fullName,
        email: formData.email,
        schoolCollege: formData.schoolCollege,
        classYear: formData.classYear,
        city: formData.city,
        techInterests: formData.techInterests,
        registeredProgram: formData.registeredProgram
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Student Onboarding</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight">
            Join KRE8ECH
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            Register your interest for the Four-Week Builder Program, access problem statements, and join our student community.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center py-12 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#202124]">Registration Confirmed!</h2>
            <p className="text-sm text-gray-600">
              Welcome, <strong>{formData.fullName}</strong>. Redirecting you to your student dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl">
                {error}
              </div>
            )}

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. aarav@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* School & Class Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
                  School / College Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi Public School"
                    value={formData.schoolCollege}
                    onChange={(e) => setFormData({ ...formData, schoolCollege: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
                  Class / Year *
                </label>
                <select
                  value={formData.classYear}
                  onChange={(e) => setFormData({ ...formData, classYear: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] bg-white shadow-xs"
                >
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="College 1st Year">College 1st Year</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* City & Program Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
                  City *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
                  Select Program *
                </label>
                <select
                  value={formData.registeredProgram}
                  onChange={(e) => setFormData({ ...formData, registeredProgram: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] bg-white shadow-xs"
                >
                  <option value="Four-Week Builder Program Cohort 1">
                    Four-Week Builder Program (Cohort 1)
                  </option>
                  <option value="Offline Hackathon Showcase 2026">
                    KRE8ECH Grand Offline Hackathon 2026
                  </option>
                  <option value="Weekend Ideathon Sprint">
                    Weekend Ideathon Sprint
                  </option>
                </select>
              </div>
            </div>

            {/* Technology Interests Multi-Select */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                What technologies are you most excited to learn and build? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interestOptions.map((opt) => {
                  const isChecked = formData.techInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      className={`p-3 rounded-2xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-amber-50/80 border-amber-300 text-amber-950 font-bold shadow-xs"
                          : "bg-white border-gray-200/80 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span>{opt}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                Already registered?{" "}
                <Link href="/login" className="font-bold text-[#202124] hover:underline">
                  Log in to your Dashboard
                </Link>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-sm shadow-sm hover:shadow transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? "Creating Account..." : "Complete Registration"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
