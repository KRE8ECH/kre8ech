"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Hash,
  ArrowRight,
  CheckCircle2,
  Download,
  Terminal,
  ChevronLeft,
  FileSpreadsheet,
} from "lucide-react";
import { registerHackreadyStudent, exportHackreadyToCSV, setStudentSession } from "@/lib/storage";
import { syncToGoogleSheet, SheetsSyncResult } from "@/lib/sheetsSync";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";
import { HackreadyRegistration } from "@/types";

const branchOptions = [
  "Computer Science & Engineering (CSE)",
  "Artificial Intelligence & Machine Learning (AI & ML)",
  "Artificial Intelligence & Data Science (AI & DS)",
  "Electronics & Communication Engineering (ECE)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Business Administration (BBA)",
];

const semesterOptions = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

export default function HackreadyRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    branch: "Computer Science & Engineering (CSE)",
    semester: "5th Semester",
    rollNo: "",
    email: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdRecord, setCreatedRecord] = useState<HackreadyRegistration | null>(null);
  const [syncResult, setSyncResult] = useState<SheetsSyncResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
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
      setError("Please provide a valid email address.");
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
        phoneNumber: formData.phoneNumber.trim(),
      });

      setStudentSession({
        fullName: record.fullName,
        email: record.email,
        schoolCollege: `${record.branch} (${record.semester})`,
        classYear: record.semester,
        city: "College Campus",
        techInterests: ["Hackready Workshop", "Hackathon Preparation"],
        registeredProgram: "Hackready Workshop",
      });

      const sheetStatus = await syncToGoogleSheet("Hackready Workshop", {
        ...record,
        program: "Hackready Workshop",
      });
      setSyncResult(sheetStatus);
      setCreatedRecord(record);
    } catch {
      setError("An unexpected error occurred while saving registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = createdRecord
    ? encodeURIComponent(
        `Hello KRE8ECH Team, I registered for the Hackready Workshop:\n\n` +
          `Name: ${createdRecord.fullName}\n` +
          `Roll No: ${createdRecord.rollNo}\n` +
          `Branch: ${createdRecord.branch}\n` +
          `Semester: ${createdRecord.semester}\n` +
          `Email: ${createdRecord.email}\n` +
          `Phone: ${createdRecord.phoneNumber}`
      )
    : "";

  return (
    <div className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-5">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] hover:text-[#202124] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
          <span>Back to General Registration</span>
        </Link>
      </div>

      <div className="bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        {/* Header */}
        <div className="max-w-xl mb-8 space-y-2">
          <span className="text-xs font-medium text-[#6B7280]">KRE8ECH College Edition</span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#202124] tracking-tight">
            Hackready Workshop
          </h1>
          <p className="text-sm text-[#525252] leading-relaxed">
            Submit your details below to reserve your seat for the Hackathon Readiness &amp; Prototype Sprint.
          </p>
        </div>

        {createdRecord ? (
          <div className="py-4 space-y-6">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-[#FAF8F2] border border-black/[0.08]">
              <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#202124]">
                  You&apos;re Registered, {createdRecord.fullName}
                </h2>
                <p className="text-sm text-[#525252]">
                  Your Hackready Workshop entry has been recorded.
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
                <span className="font-semibold text-[#202124]">{createdRecord.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">Roll No.</span>
                <span className="font-mono font-semibold text-[#202124] tabular-nums">{createdRecord.rollNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">Branch</span>
                <span className="font-semibold text-[#202124] text-right">{createdRecord.branch}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">Semester</span>
                <span className="font-semibold text-[#202124]">{createdRecord.semester}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.06]">
                <span className="text-[#6B7280]">Email</span>
                <span className="font-semibold text-[#202124]">{createdRecord.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6B7280]">Phone / WhatsApp</span>
                <span className="font-semibold text-[#202124] tabular-nums">{createdRecord.phoneNumber}</span>
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
                onClick={() => exportHackreadyToCSV([createdRecord])}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#202124] hover:bg-black text-white text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" strokeWidth={1.75} />
                <span>Download Slip (Excel CSV)</span>
              </button>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#FAF8F2] hover:bg-[#EFE9DF] text-[#202124] text-sm font-medium border border-black/[0.08]"
              >
                Dashboard
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

            <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-black/[0.08] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#525252] shrink-0" strokeWidth={1.75} />
                <span className="font-semibold text-[#202124]">
                  Program: Hackready Workshop (College &amp; B.Tech)
                </span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FFF9E8] border border-[#F6C900]/60 text-[#202124]">
                2026 Cohort
              </span>
            </div>

            {/* Name & Roll No */}
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
                  Roll No. *
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 220101054"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm font-mono tabular-nums focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>
            </div>

            {/* Branch & Semester */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Branch *
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124] bg-white font-medium"
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
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Semester *
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124] bg-white font-medium"
                >
                  {semesterOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Gmail / Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">
                  Phone Number / WhatsApp *
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

            {/* Submit Bar */}
            <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#6B7280]">
                Official registration for KRE8ECH Hackready Workshop 2026
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors disabled:opacity-50"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit Registration"}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
