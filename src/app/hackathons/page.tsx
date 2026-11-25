"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  FileText
} from "lucide-react";
import { getHackathons, getProblemStatements } from "@/lib/storage";
import { Hackathon, HackathonStatus, ProblemStatement } from "@/types";
import { HackathonArenaIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";

const statusFilters: ("All" | HackathonStatus)[] = [
  "All",
  "Registration Open",
  "Upcoming",
  "Ongoing",
  "Completed"
];

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"All" | HackathonStatus>("All");
  const [activeModalHackathon, setActiveModalHackathon] = useState<Hackathon | null>(null);

  useEffect(() => {
    setHackathons(getHackathons());
  }, []);

  const filteredHackathons = hackathons.filter(
    (h) => selectedStatus === "All" || h.status === selectedStatus
  );

  return (
    <div className="pb-24 space-y-12">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Student Innovation Competitions</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tight">
                Hackathons & Challenges
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Experience fast-paced problem solving, prototype creation, and team pitching through KRE8ECH offline hackathons and online sprint challenges.
              </p>
              <div className="pt-2">
                <Link
                  href="/problem-statements"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-[#202124] font-bold text-xs shadow-xs hover:shadow transition-all"
                >
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>Browse Problem Statements Bank</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <HackathonArenaIllustration2D className="w-full h-auto" />
                <div className="pt-3 border-t border-gray-100 text-center">
                  <span className="text-xs font-black text-[#202124]">Live Offline Hackathon Floor</span>
                  <p className="text-[10px] text-gray-400">Team collaboration, mentor sprint check-ins & stage demos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hackathon List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {statusFilters.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === st
                  ? "bg-[#202124] text-white shadow-xs font-bold"
                  : "bg-gray-100/80 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Hackathons Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    hackathon.status === "Registration Open"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : hackathon.status === "Upcoming"
                      ? "bg-amber-50 text-amber-800 border-amber-300"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}>
                    {hackathon.status}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>{hackathon.teamSize}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#202124] leading-tight">
                  {hackathon.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {hackathon.description}
                </p>

                {/* Event Details Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 space-y-0.5">
                    <span className="text-gray-400 font-medium">Date & Format</span>
                    <p className="font-bold text-[#202124]">{hackathon.date}</p>
                  </div>
                  <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 space-y-0.5">
                    <span className="text-gray-400 font-medium">Venue</span>
                    <p className="font-bold text-[#202124] truncate">{hackathon.venue}</p>
                  </div>
                  <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 space-y-0.5">
                    <span className="text-gray-400 font-medium">Registration Deadline</span>
                    <p className="font-bold text-[#202124]">{hackathon.registrationDeadline}</p>
                  </div>
                  <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 space-y-0.5">
                    <span className="text-gray-400 font-medium">Eligibility</span>
                    <p className="font-bold text-[#202124] truncate">{hackathon.eligibility}</p>
                  </div>
                </div>

                {/* Tracks list */}
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Challenge Tracks
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hackathon.tracks.map((tr) => (
                      <span
                        key={tr}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/50"
                      >
                        {tr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalHackathon(hackathon)}
                    className="text-xs text-gray-500 hover:text-black font-semibold"
                  >
                    Quick Specs
                  </button>
                  <Link
                    href={`/hackathons/${hackathon.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#202124] hover:text-amber-600 transition-colors"
                  >
                    <span>Full Details Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-xs shadow-xs transition-all"
                >
                  Register for Hackathon
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Hackathon Details */}
      {activeModalHackathon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-gray-100 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              type="button"
              onClick={() => setActiveModalHackathon(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                {activeModalHackathon.status}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124] mt-2">
                {activeModalHackathon.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {activeModalHackathon.venue} • {activeModalHackathon.date}
              </p>
            </div>

            {/* Rules */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Participation Rules & Guidelines
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {activeModalHackathon.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Event Day Schedule
              </h4>
              <div className="space-y-1.5 border border-gray-100 rounded-2xl p-4 bg-gray-50/70">
                {activeModalHackathon.schedule.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-none">
                    <span className="font-extrabold text-[#202124] w-24 shrink-0">{item.time}</span>
                    <span className="text-gray-600 font-medium text-right flex-1">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prizes */}
            {activeModalHackathon.prizes && (
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/50 text-xs">
                <span className="font-bold text-amber-950 uppercase tracking-wider block mb-1">
                  Prizes & Recognition
                </span>
                <p className="text-gray-800">{activeModalHackathon.prizes}</p>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 flex justify-end gap-3">
              <Link
                href="/register"
                className="px-6 py-3 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs shadow-xs"
              >
                Register Team
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
