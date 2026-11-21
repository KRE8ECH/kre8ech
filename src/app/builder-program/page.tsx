"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Code,
  Palette,
  Compass,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Users,
  Target,
  FileCheck,
  HelpCircle,
  ArrowUpRight
} from "lucide-react";
import {
  LaptopSticker,
  RocketSticker,
  TrophySticker,
  LightbulbSticker,
  SparkleSticker
} from "@/components/stickers/TechStickers";
import { FourWeekRoadmapIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";
import { getProgramData } from "@/lib/storage";
import { ProgramOverview, WeekCurriculum } from "@/types";

export default function BuilderProgramPage() {
  const [program, setProgram] = useState<ProgramOverview | null>(null);
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    setProgram(getProgramData());
  }, []);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F6C900]" />
      </div>
    );
  }

  const selectedWeek = program.weeks.find((w) => w.weekNumber === activeWeek) || program.weeks[0];

  const faqs = [
    {
      q: "Who is the Four-Week Builder Program designed for?",
      a: "The program is specifically tailored for school students starting from Class 9 onwards. It requires zero prior coding experience—just curiosity, an open mind, and a willingness to build."
    },
    {
      q: "What is the exact daily schedule for online classes?",
      a: "Each online learning day consists of a total of 90 minutes: 60 minutes of interactive guided concept learning, tool walkthroughs, and hands-on coding, followed immediately by 30 minutes of live doubt-solving, mentoring, and project feedback."
    },
    {
      q: "How many total days is the program?",
      a: "The program spans 4 weeks and includes 12 structured days: 11 online interactive builder sessions and 1 grand in-person offline hackathon day."
    },
    {
      q: "What happens during the Offline Hackathon day?",
      a: "The offline hackathon is the grand finale of Week 4. Students gather in person with their teams to polish prototypes under mentor guidance, participate in collaborative problem-solving, present live 3-minute stage demos to a jury of tech mentors and parents, and compete for builder trophies and certificates."
    },
    {
      q: "Can students update or see daily topics as they evolve?",
      a: "Yes! While the core weekly roadmap and learning objectives are established, individual daily topics can be dynamically refined by the KRE8ECH mentor team via our Admin Content Management system to keep pace with the latest tech breakthroughs."
    },
    {
      q: "What will students build by the end of the 4 weeks?",
      a: "Every student or team will design a clickable Figma prototype, write functional responsive code, deploy a working web/app MVP on the web, prepare a 5-slide pitch deck, and deliver a live demonstration."
    }
  ];

  return (
    <div className="pb-24 space-y-20">
      {/* =========================================================
          HERO OVERVIEW
          ========================================================= */}
      <section className="relative pt-12 pb-16 bg-gradient-to-b from-[#FFFDF9] via-white to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Structured Student Cohort</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-[#202124] tracking-tight leading-[1.1]">
                The Four-Week <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10">Builder Program</span>
                  <span className="absolute left-0 bottom-2 w-full h-3.5 bg-[#F6C900]/80 -z-0 rounded-full" />
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-bold text-gray-700">
                {program.tagline}
              </p>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {program.overviewDescription}
              </p>

              {/* Program Specs Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-700" />
                    <span>Duration</span>
                  </div>
                  <p className="text-base font-black text-[#202124]">4 Weeks</p>
                  <p className="text-[11px] text-gray-400">12 Days Total</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-gray-700" />
                    <span>Online Time</span>
                  </div>
                  <p className="text-base font-black text-[#202124]">90 Mins / Day</p>
                  <p className="text-[11px] text-gray-400">60m Live + 30m Doubt</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
                    <Trophy className="w-3.5 h-3.5 text-gray-700" />
                    <span>Offline Day</span>
                  </div>
                  <p className="text-base font-black text-[#202124]">1 Full Day</p>
                  <p className="text-[11px] text-gray-400">Offline Hackathon</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
                    <Users className="w-3.5 h-3.5 text-gray-700" />
                    <span>Audience</span>
                  </div>
                  <p className="text-base font-black text-[#202124]">Class 9 Onwards</p>
                  <p className="text-[11px] text-gray-400">Zero Prerequisite</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-sm shadow-sm hover:shadow transition-all"
                >
                  <span>Register Your Interest</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs border border-gray-200 shadow-xs transition-all"
                >
                  <span>Jump to Weekly Roadmap</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                <FourWeekRoadmapIllustration2D className="w-full h-auto" />
                <div className="pt-4 border-t border-gray-100 text-center">
                  <span className="text-xs font-black text-[#202124]">Interactive Weekly Learning Journey</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">11 Online Live Days + 1 Concluding In-Person Hackathon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ONLINE SESSION FORMAT BREAKDOWN (60m + 30m)
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-gray-100/80 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-wider uppercase text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              The Daily Learning Rhythm
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#202124] mt-3">
              How Every Online Class Operates
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              We respect student schedules. No endless passive lectures. Every session is razor-focused on actionable building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 60 Mins Main */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                  PART 1 • 60 MINUTES
                </span>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-lg font-black text-[#202124] mb-2">
                Main Guided Lecture & Hands-on Activity
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                High-energy instruction, interactive code-alongs, live architecture breakdowns, and guided tool walk-throughs. Students code alongside the mentor.
              </p>
              <ul className="space-y-2 text-xs text-gray-700 font-semibold border-t border-gray-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Visual concept breakdown & logic demo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Live student sandbox exercise
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Real-time instructor screen sharing
                </li>
              </ul>
            </div>

            {/* 30 Mins Doubt */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFF9E8] text-[#202124] border border-[#F6C900]/60">
                  PART 2 • 30 MINUTES
                </span>
                <HelpCircle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-black text-[#202124] mb-2">
                Dedicated Doubt-Solving & Mentoring
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                No question left unanswered. Students get immediate 1-on-1 code reviews, error debugging, project advice, and personalized guidance.
              </p>
              <ul className="space-y-2 text-xs text-gray-700 font-semibold border-t border-gray-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Unblock runtime and styling errors
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Project idea sharpening & mentor feedback
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Peer sharing and collaborative problem fixes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE WEEKLY ROADMAP
          ========================================================= */}
      <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Curriculum Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#202124] tracking-tight">
            Week-by-Week Learning Journey
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Click across the weeks below to inspect the detailed focus, daily schedule, practical exercises, and expected outputs.
          </p>
        </div>

        {/* Week Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {program.weeks.map((week) => {
            const isSelected = activeWeek === week.weekNumber;
            return (
              <button
                key={week.id}
                onClick={() => setActiveWeek(week.weekNumber)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? "bg-[#202124] text-white border-[#202124] shadow-md -translate-y-0.5"
                    : "bg-white text-[#202124] border-gray-100 shadow-xs hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold ${isSelected ? "text-[#F6C900]" : "text-gray-400"}`}>
                    WEEK 0{week.weekNumber}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? "bg-[#F6C900] text-[#202124]" : "bg-gray-100 text-gray-600"}`}>
                    {week.onlineDays + week.offlineDays} Days
                  </span>
                </div>
                <h3 className="text-base font-black truncate">{week.title}</h3>
                <p className={`text-xs mt-0.5 truncate ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                  {week.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Week Detailed Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-8 animate-in fade-in duration-200">
          {/* Week Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#F6C900] text-[#202124] font-black text-[11px] uppercase tracking-wider">
                  Week 0{selectedWeek.weekNumber}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {selectedWeek.sessionFormat}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#202124] mt-2">
                {selectedWeek.title}: {selectedWeek.subtitle}
              </h3>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400">Tools:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedWeek.toolsTechnologies.map((t) => (
                  <span key={t} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-[#202124] border border-gray-200/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description & Focus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Week Focus & Scope</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedWeek.description}
              </p>
              <div className="p-3.5 bg-[#FFFDF7] rounded-xl border border-amber-200/50 text-xs text-gray-800">
                <strong>Primary Objective:</strong> {selectedWeek.focus}
              </div>
            </div>

            {/* Expected Outputs */}
            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Expected Student Outputs</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 font-semibold">
                {selectedWeek.expectedOutputs.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Daily Schedule Cards */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Daily Session Breakdown ({selectedWeek.days.length} Days)
              </h4>
              <span className="text-[11px] text-gray-400 italic">
                *Daily topics dynamically manageable via KRE8ECH Admin
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedWeek.days.map((day) => (
                <div
                  key={day.dayNumber}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    day.isHackathonDay
                      ? "bg-[#121316] text-white border-gray-800 shadow-md md:col-span-3"
                      : "bg-white text-[#202124] border-gray-100 shadow-xs hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                        day.isHackathonDay
                          ? "bg-[#F6C900] text-[#202124]"
                          : "bg-amber-50 text-amber-900 border border-amber-200/60"
                      }`}>
                        DAY 0{day.dayNumber}
                      </span>
                      {day.isHackathonDay && (
                        <span className="text-xs font-extrabold text-[#F6C900] flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5" />
                          IN-PERSON OFFLINE HACKATHON
                        </span>
                      )}
                    </div>

                    <h5 className="text-sm font-extrabold mb-1.5 leading-snug">
                      {day.title}
                    </h5>

                    <p className={`text-xs mb-4 leading-relaxed ${day.isHackathonDay ? "text-gray-300" : "text-gray-500"}`}>
                      {day.description}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Key Session Modules
                    </div>
                    <ul className={`space-y-1 text-xs ${day.isHackathonDay ? "text-gray-200" : "text-gray-600"}`}>
                      {day.topics.map((top, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${day.isHackathonDay ? "bg-[#F6C900]" : "bg-gray-400"}`} />
                          <span>{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Activities & Learning Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Core Learning Objectives
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {selectedWeek.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Hands-on Practical Activities
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {selectedWeek.practicalActivities.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-50 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE OFFLINE HACKATHON DAY SPOTLIGHT
          ========================================================= */}
      <section id="offline-hackathon" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F6C900] text-[#202124] text-[11px] font-black uppercase tracking-wider">
                The Culmination • Week 4 Day 12
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                The Concluding Offline Hackathon Day
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                After 11 days of online exploration and software development, the entire cohort comes together under one roof. Teams collaborate across designated builder stations, receive live feedback from senior engineers, and present their working prototypes on stage in front of mentors and guests.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                  <p className="text-[#F6C900] font-extrabold text-xs">Sprint Collaboration</p>
                  <p className="text-[11px] text-gray-400 mt-1">2-4 member student teams working side-by-side</p>
                </div>
                <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                  <p className="text-[#F6C900] font-extrabold text-xs">Live 3-Min Demos</p>
                  <p className="text-[11px] text-gray-400 mt-1">No slides-only pitches. Real working code demonstrations</p>
                </div>
                <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                  <p className="text-[#F6C900] font-extrabold text-xs">Jury Evaluation</p>
                  <p className="text-[11px] text-gray-400 mt-1">Trophies, certificates, awards & seed mentorship</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="text-center p-6 bg-gray-900/60 rounded-3xl border border-gray-800">
                <TrophySticker size={80} className="mx-auto mb-3" />
                <h4 className="text-base font-black text-white">Official Recognition</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Every participant receives the verified KRE8ECH Builder Certificate & project portfolio listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ SECTION
          ========================================================= */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#202124]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Everything you need to know about the Four-Week Builder Program.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#202124] hover:bg-gray-50"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          BOTTOM REGISTRATION CALLOUT
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-sm text-center max-w-3xl mx-auto space-y-5">
          <h3 className="text-2xl sm:text-4xl font-black text-[#202124]">
            Ready to become a technology creator?
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Reserve your spot in the upcoming Four-Week Builder Program cohort. Seats are limited to maintain an intimate mentor-to-student ratio.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-sm shadow-sm hover:shadow transition-all"
            >
              <span>Register Your Interest Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
