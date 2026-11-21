"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  FileText,
  ShieldCheck
} from "lucide-react";
import { getHackathons, getProblemStatements } from "@/lib/storage";
import { Hackathon, ProblemStatement } from "@/types";
import { HackathonArenaIllustration2D, HackathonVictoryIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";

export default function HackathonDetailClient({ id }: { id?: string }) {
  const params = useParams();
  const router = useRouter();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [relatedProblems, setRelatedProblems] = useState<ProblemStatement[]>([]);

  useEffect(() => {
    const all = getHackathons();
    const idOrSlug = id || (params?.id as string);
    const found = all.find((h) => h.id === idOrSlug || h.slug === idOrSlug) || all[0];
    setHackathon(found);

    if (found) {
      const allProblems = getProblemStatements();
      setRelatedProblems(allProblems.slice(0, 3));
    }
  }, [id, params]);

  if (!hackathon) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F6C900]" />
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-16">
      {/* Top Header */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/hackathons"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#202124] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Hackathons</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  hackathon.status === "Registration Open"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : hackathon.status === "Upcoming"
                    ? "bg-amber-50 text-amber-800 border-amber-300"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}>
                  {hackathon.status}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span>Team Size: {hackathon.teamSize}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#202124] tracking-tight leading-tight">
                {hackathon.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {hackathon.description}
              </p>
            </div>

            {/* Registration Box */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <span className="text-xs font-black uppercase text-gray-400 block tracking-wider">
                Registration & Status
              </span>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400">Date</span>
                  <span className="font-bold text-[#202124]">{hackathon.date}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400">Venue</span>
                  <span className="font-bold text-[#202124]">{hackathon.venue}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400">Deadline</span>
                  <span className="font-bold text-[#202124]">{hackathon.registrationDeadline}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-400">Eligibility</span>
                  <span className="font-bold text-[#202124]">{hackathon.eligibility}</span>
                </div>
              </div>

              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs shadow-sm transition-all"
              >
                <span>Register for this Hackathon</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hackathon Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Visual Arena Banner */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-center">
              <HackathonArenaIllustration2D className="w-full h-auto max-h-64 mx-auto" />
            </div>

            {/* Challenge Tracks */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#202124]">Challenge Tracks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hackathon.tracks.map((tr, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/50 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#202124]">{tr}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Open problem-solving track for student teams.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            {hackathon.schedule && hackathon.schedule.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#202124]">Event Day Schedule</h2>
                <div className="bg-[#FAF9F5] rounded-3xl p-6 border border-gray-100 space-y-3">
                  {hackathon.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 text-xs"
                    >
                      <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                        {item.time}
                      </span>
                      <span className="font-bold text-[#202124]">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules & Guidelines */}
            {hackathon.rules && hackathon.rules.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-[#202124]">Rules & Guidelines</h2>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 space-y-2.5">
                  {hackathon.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Prizes Box */}
            {hackathon.prizes && (
              <div className="bg-[#FFFDF7] rounded-3xl p-6 border border-amber-200/60 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Awards & Recognition</span>
                </div>
                <p className="text-xs text-gray-800 font-bold leading-relaxed">
                  {hackathon.prizes}
                </p>
                <p className="text-[11px] text-gray-500">
                  All participants receive official KRE8ECH Builder certificates and project portfolio badges.
                </p>
              </div>
            )}

            {/* Problem Statements Callout */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
              <span className="text-xs font-black uppercase text-gray-400 block tracking-wider">
                Need Ideas to Build?
              </span>
              <h4 className="text-base font-black text-[#202124]">
                Browse the Problem Statements Bank
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Explore real challenges in healthcare, education, campus life, and sustainability curated for student builders.
              </p>
              <div className="pt-2">
                <Link
                  href="/problem-statements"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#202124] font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Challenge Bank</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
