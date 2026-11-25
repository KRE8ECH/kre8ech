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
  MapPin,
  Phone,
  MessageSquare
} from "lucide-react";
import { registerStudent, setStudentSession } from "@/lib/storage";
import { syncToGoogleSheet, SheetsSyncResult } from "@/lib/sheetsSync";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { GoogleUserProfile } from "@/lib/googleAuth";

const interestOptions = [
  "Artificial Intelligence & LLMs",
  "Web Development & Frontend",
  "Mobile Apps (Android / iOS)",
  "UI/UX Design & Prototyping",
  "Automation & Scripts",
  "Competitive Hackathons"
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
    registeredProgram: "Four-Week Builder Program Cohort 1"
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [syncResult, setSyncResult] = useState<SheetsSyncResult | null>(null);
  const [googleProfile, setGoogleProfile] = useState<GoogleUserProfile | null>(null);

  const handleGoogleAutofill = (profile: GoogleUserProfile) => {
    setError("");
    setGoogleProfile(profile);
    setFormData((prev) => ({
      ...prev,
      fullName: prev.fullName.trim() ? prev.fullName : profile.name,
      email: profile.email
    }));
  };

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

  const completedStepsCount = [
    formData.fullName.trim().length > 0,
    formData.phoneNumber.trim().length > 0,
    formData.email.trim().length > 0,
    formData.schoolCollege.trim().length > 0,
    formData.city.trim().length > 0,
    formData.techInterests.length > 0
  ].filter(Boolean).length;
  const completionPercent = Math.round((completedStepsCount / 6) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim() || !formData.schoolCollege.trim() || !formData.city.trim()) {
      setError("Please fill out all required fields including your Contact / WhatsApp Number.");
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
        registeredProgram: formData.registeredProgram
      });

      setStudentSession({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        schoolCollege: formData.schoolCollege.trim(),
        classYear: formData.classYear,
        city: formData.city.trim(),
        techInterests: formData.techInterests,
        registeredProgram: formData.registeredProgram,
        avatarUrl: googleProfile?.picture,
        authProvider: googleProfile ? "google" : "email"
      });

      const sheetSync = await syncToGoogleSheet("Student Registrations", newStudent);
      setSyncResult(sheetSync);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello KRE8ECH Team! I just registered for KRE8ECH:\n\n` +
    `👤 Name: ${formData.fullName}\n` +
    `📞 Phone: ${formData.phoneNumber}\n` +
    `✉️ Email: ${formData.email}\n` +
    `🏫 School/College: ${formData.schoolCollege}\n` +
    `🎓 Class/Year: ${formData.classYear}\n` +
    `📍 City: ${formData.city}\n` +
    `🚀 Program: ${formData.registeredProgram}\n` +
    `💡 Interests: ${formData.techInterests.join(", ")}\n\n` +
    `Looking forward to joining the cohort!`
  );

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
          <div className="text-center py-8 space-y-6 animate-in zoom-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124]">
                Registration Confirmed!
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Welcome, <strong>{formData.fullName}</strong>.{" "}
                {syncResult?.synced
                  ? "Your application has been automatically synced to our official spreadsheet."
                  : "Your application has been saved on this device."}
              </p>
              {syncResult && (
                <div className="pt-1 flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                      syncResult.synced
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-900 border-amber-200"
                    }`}
                  >
                    {syncResult.synced
                      ? "Synced to Master Sheet"
                      : "Saved locally (please also confirm via WhatsApp below)"}
                  </span>
                </div>
              )}
            </div>

            {/* Registration Summary Card */}
            <div className="max-w-md mx-auto text-left p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Student Name:</span>
                <span className="font-bold text-[#202124]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">WhatsApp / Phone:</span>
                <span className="font-bold text-[#202124]">{formData.phoneNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Email:</span>
                <span className="font-bold text-[#202124]">{formData.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">School / City:</span>
                <span className="font-bold text-[#202124]">{formData.schoolCollege}, {formData.city}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-semibold">Program:</span>
                <span className="font-bold text-[#202124]">{formData.registeredProgram}</span>
              </div>
            </div>

            {/* WhatsApp notification CTA */}
            <div className="max-w-md mx-auto pt-2 space-y-3">
              <a
                href={`https://wa.me/919875721958?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm shadow-md hover:shadow-lg transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Confirm on WhatsApp (+91 98757 21958)</span>
              </a>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-2.5 rounded-full bg-[#202124] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Go to Student Dashboard
                </button>
                <Link
                  href="/"
                  className="text-xs font-bold text-gray-600 hover:text-black underline"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dynamic Form Completion Progress */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-gray-200/70 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#202124]">
                <span className="uppercase tracking-wider text-gray-500">Application Completion</span>
                <span className="tabular-nums font-black">{completionPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-[#F6C900] rounded-full transition-[width] duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl">
                {error}
              </div>
            )}

            {/* Quick Autofill with Google */}
            {googleProfile ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {googleProfile.picture && (
                    <img
                      src={googleProfile.picture}
                      alt={googleProfile.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-emerald-200 shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-black text-emerald-950 truncate">
                      Signed in with Google as {googleProfile.name}
                    </p>
                    <p className="text-[11px] text-emerald-800 truncate">
                      {googleProfile.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-200">
                    Verified
                  </span>
                  <button
                    type="button"
                    onClick={() => setGoogleProfile(null)}
                    className="text-[11px] font-bold text-gray-600 hover:text-black underline"
                  >
                    Switch
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-2.5">
                <p className="text-[11px] font-bold text-gray-600 text-center">
                  Save time — autofill your name &amp; verified Gmail using Google:
                </p>
                <GoogleSignInButton
                  onSuccess={handleGoogleAutofill}
                  onError={(msg) => setError(msg)}
                  label="Continue with Google"
                />
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
                  WhatsApp / Contact Number *
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

            {/* Email & School Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
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
            </div>

            {/* School & Class Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "HackReady Workshop" || val === "Hackready Workshop") {
                      router.push("/register/hackready");
                      return;
                    }
                    setFormData({ ...formData, registeredProgram: val });
                  }}
                  className="w-full px-3 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#202124] bg-white shadow-xs font-semibold text-gray-800"
                >
                  <option value="Four-Week Builder Program Cohort 1">
                    Four-Week Builder Program (Cohort 1)
                  </option>
                  <option value="HackReady Workshop">
                    ⚡ Hackready Workshop (College & Branch Registration)
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

            {/* Quick banner for Hackready Workshop */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-950 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Registering for <strong>Hackready Workshop</strong> (College & B.Tech)?
                </span>
              </div>
              <Link
                href="/register/hackready"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#202124] hover:bg-black text-[#F6C900] font-black text-xs transition-colors shrink-0 shadow-xs"
              >
                <span>Open Hackready Form</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
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
