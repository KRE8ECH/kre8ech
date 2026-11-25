"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  User,
  Mail,
  Phone,
  GraduationCap,
  Hash,
  ArrowRight,
  CheckCircle2,
  Download,
  Terminal,
  ChevronLeft
} from "lucide-react";
import { registerHackreadyStudent, exportHackreadyToCSV, setStudentSession } from "@/lib/storage";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";
import { HackreadyRegistration } from "@/types";

const branchOptions = [
  "Computer Science & Engineering (CSE)",
  "Artificial Intelligence & Machine Learning (AI & ML)",
  "Artificial Intelligence & Data Science (AI & DS)",
  "Electronics & Communication Engineering (ECE)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Business Administration (BBA)"
];

const semesterOptions = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester"
];

export default function HackreadyRegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    branch: "Computer Science & Engineering (CSE)",
    semester: "5th Semester",
    rollNo: "",
    email: "",
    phoneNumber: ""
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdRecord, setCreatedRecord] = useState<HackreadyRegistration | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.rollNo.trim() ||
      !formData.branch.trim() ||
      !formData.semester.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim()
    ) {
      setError("Please fill out all required fields: Name, Branch, Semester, Roll No., Gmail, and Phone Number.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please provide a valid Gmail / Email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const record = registerHackreadyStudent({
        fullName: formData.fullName.trim(),
        rollNo: formData.rollNo.trim(),
        branch: formData.branch.trim(),
        semester: formData.semester.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim()
      });

      // Also set student session for auto-login
      setStudentSession({
        fullName: record.fullName,
        email: record.email,
        schoolCollege: `${record.branch} (${record.semester})`,
        classYear: record.semester,
        city: "College Campus",
        techInterests: ["Hackready Workshop", "Hackathon Preparation"],
        registeredProgram: "Hackready Workshop"
      });

      setCreatedRecord(record);
      setIsSubmitting(false);
    } catch (err) {
      setError("An unexpected error occurred while saving registration. Please try again.");
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = createdRecord
    ? encodeURIComponent(
        `Hello KRE8ECH Team! I have registered for the Hackready Workshop:\n\n` +
          `👤 Name: ${createdRecord.fullName}\n` +
          `🎓 Roll No: ${createdRecord.rollNo}\n` +
          `🏛️ Branch: ${createdRecord.branch}\n` +
          `📅 Semester: ${createdRecord.semester}\n` +
          `✉️ Gmail: ${createdRecord.email}\n` +
          `📞 Phone: ${createdRecord.phoneNumber}\n\n` +
          `Excited to participate in the Hackready Workshop!`
      )
    : "";

  return (
    <div className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#202124] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to General Registration</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-950 border border-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>KRE8ECH College Edition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight">
            Hackready Workshop
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            Fill in your details below to secure your seat for the intensive Hackathon Readiness & Prototype Sprint.
          </p>
        </div>

        {createdRecord ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-6 animate-in zoom-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black px-2.5 py-1 rounded bg-[#FFF9E8] border border-[#F6C900] text-[#202124] uppercase">
                Registration Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124] pt-2">
                You&apos;re Registered, {createdRecord.fullName}!
              </h2>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Your entry has been recorded in the Hackready Workshop database.
              </p>
            </div>

            {/* Dossier Card */}
            <div className="max-w-md mx-auto text-left p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2.5">
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500 font-semibold">Student Name:</span>
                <span className="font-bold text-[#202124]">{createdRecord.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500 font-semibold">Roll No:</span>
                <span className="font-mono font-bold text-[#202124] bg-white px-2 py-0.5 rounded border border-gray-200">
                  {createdRecord.rollNo}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500 font-semibold">Branch:</span>
                <span className="font-bold text-[#202124] text-right">{createdRecord.branch}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500 font-semibold">Semester:</span>
                <span className="font-bold text-[#202124]">{createdRecord.semester}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500 font-semibold">Gmail / Email:</span>
                <span className="font-bold text-[#202124]">{createdRecord.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-semibold">Phone / WhatsApp:</span>
                <span className="font-bold text-[#202124]">{createdRecord.phoneNumber}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="max-w-md mx-auto space-y-3 pt-2">
              <a
                href={`https://wa.me/919875721958?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm shadow-md hover:shadow-lg transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Confirm on WhatsApp (+91 98757 21958)</span>
              </a>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => exportHackreadyToCSV([createdRecord])}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#202124] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Registration Slip (Excel)</span>
                </button>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl">
                {error}
              </div>
            )}

            {/* Program Indicator Pill */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-extrabold text-[#202124]">
                  Program: Hackready Workshop (College & B.Tech Registration)
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
                Verified Cohort
              </span>
            </div>

            {/* 1. Name & Roll No */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
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
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                  Roll No. *
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 220101054"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm font-mono focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. Branch & Semester */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                  Branch *
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] bg-white shadow-xs font-semibold"
                  >
                    {branchOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                  Semester *
                </label>
                <div>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] bg-white shadow-xs font-semibold"
                  >
                    {semesterOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Gmail & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                  Gmail / Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                  Phone Number / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                Official registration for KRE8ECH Hackready Workshop 2026.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-sm shadow-sm hover:shadow transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? "Submitting Registration..." : "Submit Hackready Registration"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
