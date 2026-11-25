"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Users, CheckCircle2, ArrowRight, X, FileText } from "lucide-react";
import { getHackathons } from "@/lib/storage";
import { initialHackathons } from "@/data/mockData";
import { Hackathon, HackathonStatus } from "@/types";
import { HackathonArenaIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";

const statusFilters: (HackathonStatus | "All")[] = [
  "All",
  "Registration Open",
  "Upcoming",
  "Ongoing",
  "Completed",
];

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>(initialHackathons);
  const [selectedStatus, setSelectedStatus] = useState<HackathonStatus | "All">("All");
  const [activeModalHackathon, setActiveModalHackathon] = useState<Hackathon | null>(null);

  useEffect(() => {
    setHackathons(getHackathons());
  }, []);

  const filteredHackathons = hackathons.filter(
    (h) => selectedStatus === "All" || h.status === selectedStatus
  );

  return (
    <div className="pb-20 space-y-12">
      <section className="bg-gradient-to-b from-[#FAF8F2] to-white py-12 border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-medium text-[#6B7280]">Student Innovation Competitions</span>
              <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight">
                Hackathons &amp; Challenges
              </h1>
              <p className="text-[#525252] text-base sm:text-lg leading-relaxed">
                Fast-paced problem solving, prototype building, and team stage pitches through KRE8ECH offline hackathons and online sprints.
              </p>
              <Link
                href="/problem-statements"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-black/[0.1] text-[#202124] font-medium text-xs hover:bg-[#FAF8F2]"
              >
                <FileText className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
                <span>Browse Problem Statements Bank</span>
              </Link>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-black/[0.08]">
                <HackathonArenaIllustration2D className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {statusFilters.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? "bg-[#202124] text-white"
                  : "bg-[#FAF8F2] text-[#525252] border border-black/[0.06] hover:text-[#202124]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#16A34A]">{hackathon.status}</span>
                  <span className="text-[#6B7280] inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>{hackathon.teamSize}</span>
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-[#202124]">{hackathon.title}</h2>
                <p className="text-sm text-[#525252] leading-relaxed">{hackathon.description}</p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                    <span className="text-[#6B7280] block">Date &amp; Format</span>
                    <span className="font-medium text-[#202124]">{hackathon.date}</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                    <span className="text-[#6B7280] block">Venue</span>
                    <span className="font-medium text-[#202124] truncate block">{hackathon.venue}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {hackathon.tracks.map((tr) => (
                    <span key={tr} className="text-xs px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-black/[0.06] text-[#202124]">
                      {tr}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs">
                  <button type="button" onClick={() => setActiveModalHackathon(hackathon)} className="text-[#525252] hover:text-[#202124] font-medium">
                    Quick Specs
                  </button>
                  <Link href={`/hackathons/${hackathon.id}`} className="font-semibold text-[#202124] hover:underline inline-flex items-center gap-1">
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>

                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-xs transition-colors"
                >
                  Register for Hackathon
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeModalHackathon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-black/[0.08] shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-[#16A34A]">{activeModalHackathon.status}</span>
                <h2 className="text-xl font-semibold text-[#202124] mt-1">{activeModalHackathon.title}</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">{activeModalHackathon.venue} • {activeModalHackathon.date}</p>
              </div>
              <button type="button" onClick={() => setActiveModalHackathon(null)} className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-[#202124]">Participation Rules</h4>
              <ul className="space-y-1.5 text-xs text-[#525252]">
                {activeModalHackathon.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-black/[0.06] flex justify-end">
              <Link href="/register" className="px-5 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold text-xs">
                Register Team
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
