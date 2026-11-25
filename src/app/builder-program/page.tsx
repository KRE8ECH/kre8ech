"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Users,
  FileCheck,
  HelpCircle,
} from "lucide-react";
import { FourWeekRoadmapIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";
import { getProgramData } from "@/lib/storage";
import { initialProgramData } from "@/data/mockData";
import { ProgramOverview } from "@/types";

export default function BuilderProgramPage() {
  const [program, setProgram] = useState<ProgramOverview>(initialProgramData);
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    setProgram(getProgramData());
  }, []);

  const selectedWeek = program.weeks.find((w) => w.weekNumber === activeWeek) || program.weeks[0];

  const faqs = [
    {
      q: "Who is the Four-Week Builder Program designed for?",
      a: "The program is tailored for school students starting from Class 9 onwards. It requires zero prior coding experience—just curiosity and a willingness to build.",
    },
    {
      q: "What is the daily schedule for online classes?",
      a: "Each online learning day runs 90 minutes: 60 minutes of interactive guided learning, tool walkthroughs, and hands-on coding, followed immediately by 30 minutes of live doubt-solving and project feedback.",
    },
    {
      q: "How many total days is the program?",
      a: "The program spans 4 weeks across 12 structured days: 11 online interactive builder sessions and 1 in-person offline hackathon day.",
    },
    {
      q: "What happens during the Offline Hackathon day?",
      a: "Students gather in person with their teams to polish prototypes under mentor guidance, present live 3-minute stage demos to a jury of mentors and parents, and compete for builder awards and certificates.",
    },
    {
      q: "What will students build by the end of the 4 weeks?",
      a: "Every student or team designs a clickable Figma prototype, writes functional responsive code, deploys a working web MVP, prepares a 5-slide pitch deck, and delivers a live demonstration.",
    },
  ];

  return (
    <div className="pb-20 space-y-16">
      {/* Hero */}
      <section className="pt-12 pb-14 bg-gradient-to-b from-[#FAF8F2] to-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-medium text-[#6B7280]">Structured Student Cohort</span>

              <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight leading-[1.08]">
                The Four-Week{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Builder Program</span>
                  <span className="absolute left-0 bottom-1 w-full h-3 bg-[#F6C900]/80 -z-0 rounded-sm" />
                </span>
              </h1>

              <p className="text-base sm:text-lg font-medium text-[#202124]">{program.tagline}</p>
              <p className="text-[#525252] text-sm sm:text-base leading-relaxed">
                {program.overviewDescription}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-black/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-1">
                    <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Duration</span>
                  </div>
                  <p className="text-sm font-semibold text-[#202124] tabular-nums">4 Weeks</p>
                  <p className="text-[11px] text-[#6B7280] tabular-nums">12 Days Total</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-black/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-1">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Daily Format</span>
                  </div>
                  <p className="text-sm font-semibold text-[#202124] tabular-nums">90 Mins / Day</p>
                  <p className="text-[11px] text-[#6B7280] tabular-nums">60m Live + 30m Doubt</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-black/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-1">
                    <Trophy className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Finale</span>
                  </div>
                  <p className="text-sm font-semibold text-[#202124] tabular-nums">1 Full Day</p>
                  <p className="text-[11px] text-[#6B7280]">Offline Hackathon</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-black/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-1">
                    <Users className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Eligibility</span>
                  </div>
                  <p className="text-sm font-semibold text-[#202124]">Class 9 Onwards</p>
                  <p className="text-[11px] text-[#6B7280]">No Coding Required</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors"
                >
                  <span>Register Your Interest</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAF8F2] text-[#202124] font-medium text-xs border border-black/[0.1] transition-colors"
                >
                  <span>Jump to Weekly Roadmap</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-black/[0.08]">
                <FourWeekRoadmapIllustration2D className="w-full h-auto" />
                <div className="pt-3 mt-3 border-t border-black/[0.06] text-center">
                  <span className="text-xs font-semibold text-[#202124]">11 Online Sessions + 1 Offline Hackathon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Rhythm */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F2] rounded-2xl p-6 sm:p-10 border border-black/[0.08] space-y-6">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-medium text-[#6B7280]">Daily Learning Rhythm</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">
              How every online class operates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-xl border border-black/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span className="font-medium tabular-nums">Part 1 • 60 Minutes</span>
                <Clock className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold text-[#202124]">
                Guided Concept Learning &amp; Hands-on Build
              </h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                Interactive demonstrations, live architecture breakdowns, and guided exercises where students build alongside the mentor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span className="font-medium tabular-nums">Part 2 • 30 Minutes</span>
                <HelpCircle className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold text-[#202124]">
                Dedicated Doubt-Solving &amp; Code Review
              </h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                Immediate 1-on-1 debugging, UI feedback, and personalized guidance so no student falls behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Weekly Roadmap */}
      <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-6">
        <div className="max-w-2xl space-y-1.5">
          <span className="text-xs font-medium text-[#6B7280]">Curriculum Roadmap</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">
            Week-by-Week Learning Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {program.weeks.map((week) => {
            const isSelected = activeWeek === week.weekNumber;
            return (
              <button
                key={week.id}
                type="button"
                onClick={() => setActiveWeek(week.weekNumber)}
                className={`p-4 rounded-xl text-left border transition-colors ${
                  isSelected
                    ? "bg-[#202124] text-white border-[#202124]"
                    : "bg-white text-[#202124] border-black/[0.08] hover:bg-[#FAF8F2]"
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[11px] tabular-nums">
                  <span className={isSelected ? "text-[#F6C900] font-semibold" : "text-[#6B7280]"}>
                    Week 0{week.weekNumber}
                  </span>
                  <span className={isSelected ? "text-[#A1A1A6]" : "text-[#6B7280]"}>
                    {week.onlineDays + week.offlineDays} Days
                  </span>
                </div>
                <h3 className="text-sm font-semibold truncate">{week.title}</h3>
                <p className={`text-xs mt-0.5 truncate ${isSelected ? "text-[#A1A1A6]" : "text-[#525252]"}`}>
                  {week.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-black/[0.06]">
            <div>
              <span className="text-xs font-medium text-[#6B7280] tabular-nums">
                Week 0{selectedWeek.weekNumber} • {selectedWeek.sessionFormat}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#202124] mt-1">
                {selectedWeek.title}: {selectedWeek.subtitle}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedWeek.toolsTechnologies.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-[#FAF8F2] text-[#202124] border border-black/[0.06]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <p className="text-sm text-[#525252] leading-relaxed">{selectedWeek.description}</p>
              <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-black/[0.06] text-xs text-[#202124]">
                <strong>Primary Objective:</strong> {selectedWeek.focus}
              </div>
            </div>

            <div className="bg-[#FAF8F2] p-5 rounded-xl border border-black/[0.06] space-y-2.5">
              <h4 className="text-xs font-semibold text-[#202124] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#16A34A]" strokeWidth={1.75} />
                <span>Expected Outputs</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#525252]">
                {selectedWeek.expectedOutputs.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {selectedWeek.days.map((day) => (
              <div
                key={day.dayNumber}
                className={`p-5 rounded-xl border flex flex-col justify-between ${
                  day.isHackathonDay
                    ? "bg-[#141415] text-white border-white/[0.08] md:col-span-3"
                    : "bg-white text-[#202124] border-black/[0.08]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded tabular-nums ${
                        day.isHackathonDay ? "bg-[#F6C900] text-[#202124]" : "bg-[#FAF8F2] text-[#202124] border border-black/[0.08]"
                      }`}
                    >
                      Day 0{day.dayNumber}
                    </span>
                    {day.isHackathonDay && (
                      <span className="text-xs font-semibold text-[#F6C900]">In-Person Hackathon</span>
                    )}
                  </div>
                  <h5 className="text-sm font-semibold mb-1.5">{day.title}</h5>
                  <p className={`text-xs mb-3 leading-relaxed ${day.isHackathonDay ? "text-[#A1A1A6]" : "text-[#525252]"}`}>
                    {day.description}
                  </p>
                </div>

                <ul className={`space-y-1 text-xs ${day.isHackathonDay ? "text-[#D4D4D8]" : "text-[#525252]"}`}>
                  {day.topics.map((top, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${day.isHackathonDay ? "bg-[#F6C900]" : "bg-[#6B7280]"}`} />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offline Hackathon Finale */}
      <section id="offline-hackathon" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141415] text-white rounded-2xl p-6 sm:p-10 border border-white/[0.08] space-y-5">
          <span className="text-xs font-medium text-[#F6C900] tabular-nums">Week 04 • Day 12</span>
          <h2 className="text-2xl sm:text-3xl font-semibold">The Concluding Offline Hackathon Day</h2>
          <p className="text-[#A1A1A6] text-sm sm:text-base max-w-3xl leading-relaxed">
            After 11 online sessions, the cohort gathers in person. Teams finalize their software under mentor guidance and deliver 3-minute live prototype demonstrations to the jury.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#1C1C1F] p-4 rounded-xl border border-white/[0.08]">
              <p className="text-[#F6C900] font-semibold text-xs">Team Sprint</p>
              <p className="text-xs text-[#A1A1A6] mt-1">2–4 member teams collaborating side-by-side</p>
            </div>
            <div className="bg-[#1C1C1F] p-4 rounded-xl border border-white/[0.08]">
              <p className="text-[#F6C900] font-semibold text-xs">Live 3-Min Demos</p>
              <p className="text-xs text-[#A1A1A6] mt-1">Real working code demonstrations on stage</p>
            </div>
            <div className="bg-[#1C1C1F] p-4 rounded-xl border border-white/[0.08]">
              <p className="text-[#F6C900] font-semibold text-xs">Jury Evaluation</p>
              <p className="text-xs text-[#A1A1A6] mt-1">Builder certificates, trophies &amp; mentor feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">Frequently Asked Questions</h2>
          <p className="text-sm text-[#525252]">Key details about cohort timings, prerequisites, and outcomes.</p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-black/[0.08] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-medium text-[#202124] hover:bg-[#FAF8F2]"
                >
                  <span className="text-sm">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#6B7280] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#6B7280] shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#525252] leading-relaxed border-t border-black/[0.06] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
