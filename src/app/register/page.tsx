"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Building,
  MapPin,
  Phone,
  Terminal,
  FileSpreadsheet,
} from "lucide-react";
import { registerStudent, setStudentSession } from "@/lib/storage";
import { syncToGoogleSheet, SheetsSyncResult } from "@/lib/sheetsSync";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";

const interestOptions = [
  "Artificial Intelligence & LLMs",
  "Web Development & Frontend",
  "Mobile Apps (Android / iOS)",
  "UI/UX Design & Prototyping",
  "Automation & Scripts",
  "Competitive Hackathons",
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    schoolCollege: "",
    classYear: "Class 9",
    city: "",
    techInterests: [] as string[],
    registeredProgram: "Four-Week Builder Program Cohort 1",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [syncResult, setSyncResult] = useState<SheetsSyncResult | null>(null);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.techInterests.includes(interest);
      return {
        ...prev,
        techInterests: exists
          ? prev.techInterests.filter((i) => i !== interest)
          : [...prev.techInterests, interest],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.schoolCollege.trim() ||
      !formData.city.trim()
    ) {
      setError("Please complete all required fields including your contact / WhatsApp number.");
      return;
    }

    if (formData.techInterests.length === 0) {
      setError("Please select at least one technology interest area.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newStudent = registerStudent({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        schoolCollege: formData.schoolCollege.trim(),
        classYear: formData.classYear,
        city: formData.city.trim(),
        techInterests: formData.techInterests,
        registeredProgram: formData.registeredProgram,
      });

      setStudentSession({
        fullName: newStudent.fullName,
        email: newStudent.email,
        schoolCollege: newStudent.schoolCollege,
        classYear: newStudent.classYear,
        city: newStudent.city,
        techInterests: newStudent.techInterests,
        registeredProgram: newStudent.registeredProgram || "Four-Week Builder Program Cohort 1",
      });

      const sheetStatus = await syncToGoogleSheet("Student Registrations", { ...newStudent });
      setSyncResult(sheetStatus);
      setIsSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello KRE8ECH Team, I just registered for KRE8ECH:\n\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phoneNumber}\n` +
      `Email: ${formData.email}\n` +
      `School/College: ${formData.schoolCollege}\n` +
      `Class/Year: ${formData.classYear}\n` +
      `City: ${formData.city}\n` +
      `Program: ${formData.registeredProgram}\n` +
      `Interests: ${formData.techInterests.join(", ")}`
  );

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        {/* Header */}
        <div className="max-w-xl mb-8 space-y-2">
          <span className="text-xs font-medium text-[#6B7280]">Student Onboarding</span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#202124] tracking-tight">
            Join KRE8ECH
          </h1>
          <p className="text-sm text-[#525252] leading-relaxed">
            Register for the Four-Week Builder Program, access problem statements, and join the upcoming cohort.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-6 space-y-6">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-[#FAF8F2] border border-black/[0.08]">
              <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#202124]">
                  Registration Confirmed
                </h2>
                <p className="text-sm text-[#525252]">
                  Welcome, <strong className="text-[#202124]">{formData.fullName}</strong>. Your student profile has been recorded.
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs">
                  <FileSpreadsheet className="w-4 h-4 text-[#16A34A]" strokeWidth={1.75} />
                  {syncResult?.synced ? (
                    <span className="text-[#16A34A] font-medium">
                      Synced directly to the KRE8ECH Google Sheet
                    </span>
                  ) : (
                    <span className="text-[#6B7280]">
                      Saved locally in this browser (configure Google Sheets webhook URL to auto-sync live)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#FAF8F2] border border-black/[0.08] p-5 text-xs space-y-2.5">
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">Student Name</span>
                <span className="font-semibold text-[#202124]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">WhatsApp / Phone</span>
                <span className="font-semibold text-[#202124] tabular-nums">{formData.phoneNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">Email</span>
                <span className="font-semibold text-[#202124]">{formData.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">School / City</span>
                <span className="font-semibold text-[#202124]">{formData.schoolCollege}, {formData.city}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6B7280]">Program</span>
                <span className="font-semibold text-[#202124]">{formData.registeredProgram}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`https://wa.me/919875721958?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-5 py-2.5 rounded-lg bg-[#202124] hover:bg-black text-white text-sm font-medium transition-colors"
              >
                Go to Student Dashboard
              </button>

              <Link
                href="/"
                className="px-4 py-2.5 text-center text-sm font-medium text-[#525252] hover:text-[#202124]"
              >
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg">
                {error}
              </div>
            )}

            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  WhatsApp / Contact Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>
            </div>

            {/* Email & School */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <input
                    type="email"
                    required
                    placeholder="e.g. aarav@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  School / College Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi Public School"
                    value={formData.schoolCollege}
                    onChange={(e) => setFormData({ ...formData, schoolCollege: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>
            </div>

            {/* Class, City, Program */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Class / Year *
                </label>
                <select
                  value={formData.classYear}
                  onChange={(e) => setFormData({ ...formData, classYear: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124] bg-white"
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
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  City *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Select Program *
                </label>
                <select
                  value={formData.registeredProgram}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "Hackready Workshop") {
                      router.push("/register/hackready");
                      return;
                    }
                    setFormData({ ...formData, registeredProgram: val });
                  }}
                  className="w-full px-3 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124] bg-white font-medium text-[#202124]"
                >
                  <option value="Four-Week Builder Program Cohort 1">
                    Four-Week Builder Program (Cohort 1)
                  </option>
                  <option value="Hackready Workshop">
                    Hackready Workshop (College &amp; Branch)
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

            {/* College Hackready Switcher */}
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#202124] font-medium">
                <Terminal className="w-4 h-4 text-[#525252] shrink-0" strokeWidth={1.75} />
                <span>
                  Registering for the <strong>Hackready Workshop</strong> (College &amp; B.Tech)?
                </span>
              </div>
              <Link
                href="/register/hackready"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#202124] hover:bg-black text-white font-medium text-xs transition-colors shrink-0"
              >
                <span>Open Hackready Form</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>

            {/* Technology Interests */}
            <div>
              <label className="block text-xs font-medium text-[#525252] mb-2">
                Technology areas you want to build with *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interestOptions.map((opt) => {
                  const isChecked = formData.techInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInterest(opt)}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-colors flex items-center justify-between ${
                        isChecked
                          ? "bg-[#FFF9E8] border-[#F6C900] text-[#202124]"
                          : "bg-white border-black/[0.08] text-[#525252] hover:bg-[#FAF8F2]"
                      }`}
                    >
                      <span>{opt}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" strokeWidth={1.75} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#6B7280]">
                Already registered?{" "}
                <Link href="/login" className="font-semibold text-[#202124] hover:underline">
                  Log in to your Dashboard
                </Link>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors disabled:opacity-50"
              >
                <span>{isSubmitting ? "Submitting..." : "Complete Registration"}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
