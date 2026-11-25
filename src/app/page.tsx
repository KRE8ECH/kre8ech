"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  ExternalLink,
  Code,
  Lightbulb,
  Rocket,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Zap,
  Layers,
  Award
} from "lucide-react";
import {
  LaptopSticker,
  RocketSticker,
  LightbulbSticker,
  RobotSticker,
  GearSticker,
  TrophySticker,
  CodeTagSticker,
  SparkleSticker
} from "@/components/stickers/TechStickers";
import {
  StudentCodingIllustration2D,
  FourWeekRoadmapIllustration2D,
  PillarLearn2D,
  PillarBuild2D,
  PillarInnovate2D,
  StageUser2D,
  StageExplorer2D,
  StageBuilder2D,
  StageInnovator2D
} from "@/components/illustrations/CapablStyle2DIllustrations";
import { getProgramData, getProjects, getAchievements, getHackathons, getAnnouncements } from "@/lib/storage";
import { ProgramOverview, Project, Achievement, Hackathon, Announcement } from "@/types";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";
import { Reveal, AnimatedNumber, RotatingPhrase } from "@/components/ui/DynamicMotion";
import {
  AnimatedLaptop,
  InteractiveBulb,
  AnimatedRocket,
  AnimatedRobot
} from "@/components/hero/HeroInteractiveStickers";

const skillMarqueeItems = [
  "AI & LLM Agents",
  "Next.js & React MVPs",
  "Figma UI Wireframing",
  "Hackready College Track",
  "Prompt Engineering",
  "IoT & Smart Tech",
  "3-Minute Stage Pitching",
  "Offline Hackathon Finale"
];

const stageInsights = [
  {
    label: "Stage 01 — Consumer",
    focus: "Everyday digital fluency without seeing under the hood yet.",
    unlock: "Mindset shift starts with guided teardown labs."
  },
  {
    label: "Stage 02 — Explorer",
    focus: "Deconstructs websites, APIs, prompts, and daily problem spaces.",
    unlock: "Unlocks: Computational thinking & AI tool mastery."
  },
  {
    label: "Stage 03 — Builder",
    focus: "Turns user problems into wireframes, responsive UI, and working code.",
    unlock: "Unlocks: Figma systems, full-stack web MVPs & deployments."
  },
  {
    label: "Stage 04 — Innovator",
    focus: "Pitches live prototypes in teams at offline hackathons and competitions.",
    unlock: "Unlocks: Hackathon readiness, demo confidence & podium wins."
  }
];

export default function HomePage() {
  const [program, setProgram] = useState<ProgramOverview | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [pinnedAnnouncement, setPinnedAnnouncement] = useState<Announcement | null>(null);
  const [activeStickerHint, setActiveStickerHint] = useState<string | null>(null);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(2);
  const [activeProgramWeek, setActiveProgramWeek] = useState<number>(1);
  const [showHeroPlayground, setShowHeroPlayground] = useState<boolean>(false);

  useEffect(() => {
    setProgram(getProgramData());
    setProjects(getProjects().slice(0, 3));
    setAchievements(getAchievements());
    setHackathons(getHackathons());
    const allAnnouncements = getAnnouncements();
    setPinnedAnnouncement(allAnnouncements.find((a) => a.isPinned) || allAnnouncements[0] || null);
  }, []);

  const sakshamAchievement = achievements[0];
  const selectedProgramWeek =
    program?.weeks.find((w) => w.weekNumber === activeProgramWeek) || program?.weeks[0] || null;

  return (
    <div className="space-y-14 sm:space-y-16 pb-16 overflow-hidden">
      {/* =========================================================
          SECTION 1 — HERO
          ========================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-[#FFFDF9] via-white to-white overflow-hidden">
        {/* Crisp architectural background grid + soft radial aura */}
        <div className="absolute inset-0 bg-subtle-grid pointer-events-none -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#FFF3C4]/45 via-[#FFF9E8]/20 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Decorative Floating Tech Stickers (Interactive on click!) */}
        {/* 1. TOP-LEFT: Laptop Sticker */}
        <button
          type="button"
          onClick={() => setActiveStickerHint("Build & deploy functional software in guided coding sprints")}
          className="hidden lg:block absolute top-12 xl:top-14 left-8 xl:left-20 z-10 animate-float-slow focus:outline-none"
          title="Click for builder insight"
        >
          <LaptopSticker size={84} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]" />
        </button>

        {/* 2. TOP-RIGHT: Rocket Sticker */}
        <button
          type="button"
          onClick={() => setActiveStickerHint("Ship your working MVP in 4 weeks and pitch live")}
          className="hidden lg:block absolute top-14 xl:top-16 right-8 xl:right-20 z-10 animate-float-reverse focus:outline-none"
          title="Click for launch insight"
        >
          <RocketSticker size={84} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-[0_8px_20px_rgba(246,201,0,0.22)]" />
        </button>

        {/* 3. BOTTOM-LEFT: Lightbulb Sticker */}
        <button
          type="button"
          onClick={() => setActiveStickerHint("Turn everyday student challenges into prototype ideas")}
          className="hidden xl:block absolute bottom-16 left-12 xl:left-24 z-10 animate-float-slow focus:outline-none"
          title="Click for ideation insight"
        >
          <LightbulbSticker size={72} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-[0_8px_20px_rgba(246,201,0,0.25)]" />
        </button>

        {/* 4. BOTTOM-RIGHT: Robot Sticker */}
        <button
          type="button"
          onClick={() => setActiveStickerHint("Learn AI tools, agentic workflows, and smart automation")}
          className="hidden xl:block absolute bottom-16 right-12 xl:right-24 z-10 animate-float-reverse focus:outline-none"
          title="Click for AI insight"
        >
          <RobotSticker size={76} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]" />
        </button>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Dynamic Live Cohort Ribbon */}
          {pinnedAnnouncement && (
            <div className="mb-3 flex justify-center">
              <Link
                href="/register/hackready"
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121316] text-white text-[11px] font-bold shadow-sm hover:bg-black transition-all group"
              >
                <span className="px-1.5 py-0.5 rounded bg-[#F6C900] text-[#202124] text-[10px] font-black uppercase">
                  {pinnedAnnouncement.tag}
                </span>
                <span className="truncate max-w-[230px] sm:max-w-md">{pinnedAnnouncement.title}</span>
                <ArrowRight className="w-3 h-3 text-[#F6C900] transition-transform group-hover:translate-x-0.5 shrink-0" />
              </Link>
            </div>
          )}

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/70 text-[#202124] text-xs font-bold tracking-wide mb-5 sm:mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#F6C900] ring-4 ring-[#F6C900]/30 animate-pulse" />
            <span>From curious minds to creative builders</span>
            <SparkleSticker size={14} />
          </div>

          {activeStickerHint && (
            <div className="mb-4 flex justify-center animate-in fade-in duration-200">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#F6C900] text-xs font-bold text-[#202124] shadow-sm">
                <Zap className="w-3.5 h-3.5 text-[#F6C900] fill-[#F6C900]" />
                <span>{activeStickerHint}</span>
                <button
                  type="button"
                  onClick={() => setActiveStickerHint(null)}
                  className="text-gray-400 hover:text-[#202124] ml-1 text-[11px] font-black"
                  aria-label="Dismiss tip"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#202124] tracking-tight leading-[1.08] mb-5 sm:mb-6">
            Don&apos;t just learn technology.
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-[#202124]">Build with it.</span>
              <span className="absolute left-0 bottom-2 sm:bottom-3 w-full h-3 sm:h-4 bg-[#F6C900]/80 -z-0 rounded-full" />
            </span>
          </h1>

          {/* Subtext description with dynamic cycling focus */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 font-normal leading-relaxed mb-6 sm:mb-8">
            Explore technology, learn AI, and ship{" "}
            <RotatingPhrase
              phrases={["AI Assistants", "Web Applications", "Figma Systems", "Hackathon MVPs"]}
              className="font-extrabold text-[#202124] underline decoration-[#F6C900] decoration-2 underline-offset-4"
            />{" "}
            — turning your ideas into something meaningful through guided cohorts and hackathons.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-8">
            <Link
              href="/builder-program"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Explore Builder Program</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200/90 shadow-sm hover:shadow transition-all"
            >
              <span>Discover Projects</span>
              <ArrowUpRight className="w-4 h-4 text-gray-500" />
            </Link>

            <a
              href="https://wa.me/919875721958?text=Hi%20KRE8ECH,%20I%20have%20a%20query%20about%20the%20Builder%20Program!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

          {/* Mobile view of interactive tech stickers */}
          <div className="lg:hidden flex items-center justify-center gap-6 sm:gap-8 mb-6">
            <button
              type="button"
              onClick={() => setActiveStickerHint("Build & deploy functional software in guided coding sprints")}
              className="animate-float-slow focus:outline-none"
            >
              <LaptopSticker size={52} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-sm" />
            </button>
            <button
              type="button"
              onClick={() => setActiveStickerHint("Turn everyday student challenges into prototype ideas")}
              className="animate-float-reverse focus:outline-none"
            >
              <LightbulbSticker size={46} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-sm" />
            </button>
            <button
              type="button"
              onClick={() => setActiveStickerHint("Ship your working MVP in 4 weeks and pitch live")}
              className="animate-float-slow focus:outline-none"
            >
              <RocketSticker size={52} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-sm" />
            </button>
            <button
              type="button"
              onClick={() => setActiveStickerHint("Learn AI tools, agentic workflows, and smart automation")}
              className="animate-float-reverse focus:outline-none"
            >
              <RobotSticker size={48} className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-sm" />
            </button>
          </div>

          {/* Animated Metric Highlights Strip */}
          <div className="pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-4 bg-white rounded-2xl border border-gray-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#F6C900] hover:-translate-y-0.5 hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 font-medium">Program Duration</p>
              <p className="text-base font-extrabold text-[#202124] mt-0.5">
                <AnimatedNumber target={4} suffix=" Weeks" /> • <AnimatedNumber target={12} suffix=" Days" />
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#F6C900] hover:-translate-y-0.5 hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 font-medium">Daily Online Format</p>
              <p className="text-base font-extrabold text-[#202124] mt-0.5">
                <AnimatedNumber target={60} suffix="m Live" /> + <AnimatedNumber target={30} suffix="m Doubt" />
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#F6C900] hover:-translate-y-0.5 hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 font-medium">Proven Milestone</p>
              <p className="text-base font-extrabold text-[#202124] mt-0.5">
                Saksham <AnimatedNumber target={1} suffix="st" /> Position
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#F6C900] hover:-translate-y-0.5 hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 font-medium">Target Students</p>
              <p className="text-base font-extrabold text-[#202124] mt-0.5">
                Class <AnimatedNumber target={9} suffix="+" /> Onwards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Continuous Skills Ticker */}
      <section aria-label="Skills covered at KRE8ECH" className="bg-[#121316] text-white border-y border-gray-800 py-3.5 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8">
          {[...skillMarqueeItems, ...skillMarqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#F6C900]" />
              <span className="text-xs font-extrabold tracking-wide uppercase text-gray-200">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 2 — OUR PURPOSE & STUDENT PROGRESSION
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Purpose Showcase matching Capabl Reference: Text Left, Student Illustration Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
          {/* Left Column: Heading & Mission */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Our Purpose</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202124] tracking-tight leading-[1.12]">
              We believe every student has the potential to{" "}
              <span className="relative inline-block">
                <span className="relative z-10">build something extraordinary.</span>
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-3 sm:h-4 bg-[#F6C900] -z-0 rounded-full" />
              </span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Students use digital tools every day, but rarely get the opportunity to understand how they are built. KRE8ECH creates an encouraging, hands-on space where ideas turn into working software prototypes, AI assistants, and stage-ready hackathon innovations.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800">
                💡 From Tech Consumers to Creators
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800">
                🚀 Real-World Software Building
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                🎯 Class 9 Onwards
              </span>
            </div>
          </div>

          {/* Right Column: Students Collaboration Illustration (Sticker Style - Seamless with Background) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[520px]">
              <Image
                src="/images/students-collaboration.png"
                alt="KRE8ECH student creators collaborating on tech projects and software prototypes"
                width={1024}
                height={660}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Seamless Interactive 4-Stage Pathway: User -> Explorer -> Builder -> Innovator */}
        <Reveal>
          <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-10 border border-gray-100/80 shadow-sm mb-10 sm:mb-12">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">The KRE8ECH Journey</span>
                <h3 className="text-xl sm:text-2xl font-black text-[#202124] mt-0.5">The Student Builder Evolution</h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700 shadow-xs">
                Click a stage to inspect progression • Phase {activeStageIdx + 1} / 4
              </span>
            </div>

            {/* Animated Stage Progress Bar */}
            <div className="w-full h-2 rounded-full bg-gray-200/80 overflow-hidden mb-7">
              <div
                className="h-full bg-[#F6C900] rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${(activeStageIdx + 1) * 25}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Stage 1 */}
              <button
                type="button"
                onClick={() => setActiveStageIdx(0)}
                onMouseEnter={() => setActiveStageIdx(0)}
                className={`text-left bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                  activeStageIdx === 0
                    ? "border-[#202124] ring-2 ring-[#F6C900]/60 shadow-lg -translate-y-1"
                    : "border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs">
                      01
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400">Starting Point</span>
                  </div>
                  <div className="my-2 py-1">
                    <StageUser2D className="h-20 mx-auto" />
                  </div>
                  <h4 className="text-base font-extrabold text-[#202124] mb-1.5">
                    Technology User
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Consuming digital content, social feeds, gaming, and using digital applications as everyday passive tools.
                  </p>
                </div>
              </button>

              {/* Stage 2 */}
              <button
                type="button"
                onClick={() => setActiveStageIdx(1)}
                onMouseEnter={() => setActiveStageIdx(1)}
                className={`text-left bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                  activeStageIdx === 1
                    ? "border-[#202124] ring-2 ring-[#F6C900]/60 shadow-lg -translate-y-1"
                    : "border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center justify-center font-bold text-xs">
                      02
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700">Curiosity</span>
                  </div>
                  <div className="my-2 py-1">
                    <StageExplorer2D className="h-20 mx-auto" />
                  </div>
                  <h4 className="text-base font-extrabold text-[#202124] mb-1.5">
                    Explorer
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Deconstructing how apps work, exploring AI logic, understanding data flows, and spotting daily problem areas.
                  </p>
                </div>
              </button>

              {/* Stage 3 */}
              <button
                type="button"
                onClick={() => setActiveStageIdx(2)}
                onMouseEnter={() => setActiveStageIdx(2)}
                className={`text-left bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between relative cursor-pointer ${
                  activeStageIdx === 2
                    ? "border-[#F6C900] ring-2 ring-[#F6C900] shadow-lg -translate-y-1"
                    : "border-[#F6C900]/70 shadow-[0_4px_16px_rgba(246,201,0,0.12)] hover:shadow-lg"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F6C900] text-[#202124] flex items-center justify-center font-black text-xs shadow-xs">
                      03
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-800">Code & Create</span>
                  </div>
                  <div className="my-2 py-1">
                    <StageBuilder2D className="h-20 mx-auto" />
                  </div>
                  <h4 className="text-base font-extrabold text-[#202124] mb-1.5">
                    Builder
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Writing code, leveraging AI developer tools, designing Figma wireframes, building MVPs, and debugging solutions.
                  </p>
                </div>
              </button>

              {/* Stage 4 */}
              <button
                type="button"
                onClick={() => setActiveStageIdx(3)}
                onMouseEnter={() => setActiveStageIdx(3)}
                className={`text-left bg-[#121316] text-white p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                  activeStageIdx === 3
                    ? "border-[#F6C900] ring-2 ring-[#F6C900]/80 shadow-xl -translate-y-1"
                    : "border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-xl"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F6C900] text-[#202124] font-black text-xs flex items-center justify-center">
                      04
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#F6C900]">The Goal</span>
                  </div>
                  <div className="my-2 py-1">
                    <StageInnovator2D className="h-20 mx-auto" />
                  </div>
                  <h4 className="text-base font-extrabold text-white mb-1.5">
                    Innovator
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Pitching prototypes on live hackathon stages, working in teams, solving unaddressed problems, and launching real products.
                  </p>
                </div>
              </button>
            </div>

            {/* Dynamic Live Stage Readout Bar */}
            <div className="mt-5 p-4 rounded-2xl bg-white border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                  {stageInsights[activeStageIdx].label}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#202124]">
                  {stageInsights[activeStageIdx].focus}{" "}
                  <span className="text-gray-500 font-normal">({stageInsights[activeStageIdx].unlock})</span>
                </p>
              </div>
              <Link
                href="/register"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#202124] hover:bg-black text-white text-xs font-bold transition-colors"
              >
                <span>Start Your Evolution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Clean Context Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50/80 rounded-3xl p-8 sm:p-10 border border-gray-100">
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-[#202124]">
              Bridging the Practical Building Gap
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Schools provide essential academic foundations. KRE8ECH creates an additional, high-energy sandbox where students apply that knowledge to write functional software, collaborate in sprint teams, and experience the thrill of invention.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Rote Learning</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Functional Software MVPs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Live Stage Demos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Offline Hackathon Day</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/mission"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] hover:bg-black text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>Read Full Mission & Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="p-4 sm:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md w-full">
              <StudentCodingIllustration2D className="max-h-56 mx-auto" />
              <div className="text-center mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs font-bold text-[#202124] italic">
                  &quot;The best way to predict the future is to invent it.&quot;
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">— KRE8ECH Student Builder Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — THE KRE8ECH PILLARS
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The Three Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202124] tracking-tight">
            The KRE8ECH Experience
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-2">
            A cohesive three-part journey that empowers students to bring technology to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1: LEARN */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-gray-300 group-hover:text-[#F6C900] transition-colors">
                  01
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-bold">
                  Phase 1
                </span>
              </div>
              <div className="mb-4">
                <PillarLearn2D className="h-28 mx-auto" />
              </div>
              <h3 className="text-2xl font-black text-[#202124] mb-3">LEARN</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Explore technology, AI foundations, digital tools, development workflows, and the emerging technologies shaping tomorrow&apos;s world.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-700 font-semibold border-t border-gray-100 pt-5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                Demystifying AI, LLMs & Web Systems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                Computational Thinking & Logic
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                Modern Developer Toolkits
              </li>
            </ul>
          </div>

          {/* Pillar 2: BUILD */}
          <div className="bg-[#FFFDF7] rounded-3xl p-8 border border-amber-200/60 shadow-[0_4px_20px_rgba(246,201,0,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-amber-300 group-hover:text-amber-500 transition-colors">
                  02
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  Phase 2
                </span>
              </div>
              <div className="mb-4">
                <PillarBuild2D className="h-28 mx-auto" />
              </div>
              <h3 className="text-2xl font-black text-[#202124] mb-3">BUILD</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Apply learning directly through web applications, responsive interfaces, interactive prototypes, AI workflows, and practical activities.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-700 font-semibold border-t border-amber-200/40 pt-5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                Figma Wireframes & User Flows
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                Modern Frontend Code & Deployments
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                Real Working Software MVPs
              </li>
            </ul>
          </div>

          {/* Pillar 3: INNOVATE */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-gray-300 group-hover:text-[#F6C900] transition-colors">
                  03
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#121316] text-[#F6C900] text-[10px] font-bold">
                  Phase 3
                </span>
              </div>
              <div className="mb-4">
                <PillarInnovate2D className="h-28 mx-auto" />
              </div>
              <h3 className="text-2xl font-black text-[#202124] mb-3">INNOVATE</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Think independently, identify real problems, develop solutions, experiment fearlessly, and present creations on hackathon stages.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-700 font-semibold border-t border-gray-100 pt-5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                In-Person Offline Hackathon Showcase
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                3-Minute Stage Pitch Mastery
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                Team Collaboration & Awards
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Builder Playground Drawer / Strip */}
        <div className="mt-10 bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-gray-200/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-800">
                <Zap className="w-3.5 h-3.5 text-[#F6C900] fill-[#F6C900]" />
                <span>Interactive Mini Lab</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#202124]">
                Test the KRE8ECH Builder Playground
              </h3>
              <p className="text-xs text-gray-600">
                Click to test live code execution, idea sparking, MVP rocket launch, and bot greetings right here.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowHeroPlayground((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-300 hover:border-[#202124] text-xs font-extrabold text-[#202124] shadow-xs transition-all"
              >
                <span>{showHeroPlayground ? "Hide Mini Lab" : "Launch Mini Lab"}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showHeroPlayground ? "rotate-90" : ""
                  }`}
                />
              </button>

              <Link
                href="/experience"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Full Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {showHeroPlayground && (
            <div className="mt-6 pt-6 border-t border-gray-200/70 flex flex-wrap items-center justify-center gap-4 sm:gap-6 animate-in fade-in duration-200">
              <AnimatedLaptop />
              <InteractiveBulb />
              <AnimatedRocket />
              <AnimatedRobot />
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          SECTION 4 — FEATURED FOUR-WEEK BUILDER PROGRAM
          ========================================================= */}
      <section className="bg-gradient-to-b from-white via-[#FFFDF5] to-white py-10 sm:py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold uppercase tracking-wider">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span>Flagship Student Program</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-[#202124] tracking-tight leading-tight">
                  The Four-Week Builder Program
                </h2>

                <p className="text-lg font-bold text-gray-700">
                  From learning the tools to building your own project.
                </p>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  A structured learning experience involving 11 online guided classes, daily 30-minute doubt-solving, practical tasks, project development and a concluding offline hackathon day where students present live to mentors and peers.
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Program Duration</p>
                    <p className="text-base font-extrabold text-[#202124] mt-0.5">4 Weeks</p>
                  </div>
                  <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Total Program Days</p>
                    <p className="text-base font-extrabold text-[#202124] mt-0.5">12 Days</p>
                  </div>
                  <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 font-medium">Daily Online Format</p>
                    <p className="text-base font-extrabold text-[#202124] mt-0.5">90 Mins / Day</p>
                  </div>
                </div>

                {/* Daily Breakdown explanation */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/50 text-xs text-gray-700 space-y-1">
                  <p className="font-bold text-amber-950">Daily 90-Minute Online Structure:</p>
                  <p>• <strong>60 Minutes:</strong> Guided lecture, practical demonstration & hands-on activity.</p>
                  <p>• <strong>30 Minutes:</strong> Dedicated doubt-solving, mentoring & code review.</p>
                  <p>• <strong>Final Offline Day:</strong> In-person Hackathon, team building, stage pitches & awards.</p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                  <Link
                    href="/builder-program"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-sm shadow-sm hover:shadow transition-all"
                  >
                    <span>Explore Full Curriculum</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                  <Link
                    href="/register"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200 transition-all shadow-xs"
                  >
                    <span>Register Your Interest</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Interactive 4-Week Preview Cards & Dynamic Syllabus */}
              <div className="lg:col-span-5 space-y-3">
                <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-xs mb-3">
                  <FourWeekRoadmapIllustration2D className="w-full h-auto" />
                </div>

                {[
                  {
                    week: 1,
                    header: "WEEK 01 • 3 ONLINE DAYS",
                    badge: "Foundation",
                    badgeCls: "bg-gray-200 text-gray-800",
                    title: "EXPLORE",
                    desc: "Introduction to technology, AI, computational thinking, and the builder mindset."
                  },
                  {
                    week: 2,
                    header: "WEEK 02 • 3 ONLINE DAYS",
                    badge: "Design",
                    badgeCls: "bg-amber-100 text-amber-900",
                    title: "IDEATE & DESIGN",
                    desc: "Problem identification, user personas, wireframing, and Figma prototypes."
                  },
                  {
                    week: 3,
                    header: "WEEK 03 • 3 ONLINE DAYS",
                    badge: "Engineering",
                    badgeCls: "bg-yellow-100 text-yellow-900",
                    title: "BUILD & DEVELOP",
                    desc: "Practical code, responsive layouts, AI-assisted development, and MVP progress."
                  },
                  {
                    week: 4,
                    header: "WEEK 04 • 2 ONLINE + 1 OFFLINE HACKATHON",
                    badge: "Grand Finale",
                    badgeCls: "bg-[#F6C900] text-[#202124] font-extrabold",
                    title: "FINALIZE & COMPETE",
                    desc: "Pitch preparation, team collaboration, live demo showcase, and offline hackathon day!"
                  }
                ].map((item) => {
                  const isSelected = activeProgramWeek === item.week;
                  const isDark = item.week === 4;
                  return (
                    <button
                      key={item.week}
                      type="button"
                      onClick={() => setActiveProgramWeek(item.week)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isDark
                          ? isSelected
                            ? "bg-[#121316] text-white border-[#F6C900] ring-2 ring-[#F6C900]/70 shadow-lg"
                            : "bg-[#121316] text-white border-gray-800 shadow-md hover:border-[#F6C900]/60"
                          : isSelected
                          ? "bg-[#FFFDF5] border-[#F6C900] ring-2 ring-[#F6C900]/50 shadow-sm"
                          : "bg-gray-50/80 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-between text-xs font-bold mb-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <span className={isDark ? "text-[#F6C900]" : ""}>{item.header}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${item.badgeCls}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h4 className={`text-base font-extrabold ${isDark ? "text-white" : "text-[#202124]"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs mt-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {item.desc}
                      </p>
                    </button>
                  );
                })}

                {selectedProgramWeek && (
                  <div className="mt-3 p-4 rounded-2xl bg-[#FAF8F2] border border-amber-200/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                        Week 0{selectedProgramWeek.weekNumber} Live Syllabus Preview
                      </span>
                      <Link
                        href="/builder-program"
                        className="text-[11px] font-bold text-[#202124] hover:underline"
                      >
                        Full Details →
                      </Link>
                    </div>
                    <ul className="space-y-1.5">
                      {selectedProgramWeek.days.slice(0, 3).map((d) => (
                        <li key={d.dayNumber} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[#202124] shrink-0">
                            D{d.dayNumber}
                          </span>
                          <span className="font-semibold leading-snug">{d.title}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedProgramWeek.toolsTechnologies.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5 — ACHIEVEMENTS & OUR STORY
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-10 border border-gray-200/70 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Real Team Milestone</span>
              </div>

              {/* Homepage Highlight Headline */}
              <h2 className="text-3xl sm:text-5xl font-black text-[#202124] tracking-tight leading-tight">
                3rd Hackathon. First Win. First Position.
              </h2>

              <p className="text-base sm:text-lg font-bold text-gray-800">
                Agentic AI Saksham Hackathon — Overall 1st Position Winners
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                At the Agentic AI Saksham Hackathon, our team built OutreachIQ for the problem statement &apos;Personalized Multi-Touch Sales Outreach Agent&apos; (Track D: Sales, Growth &amp; Revenue Agents). OutreachIQ is a multi-agent AI system that automates deep research, tailored outreach, reply intelligence, and autonomous escalation. We secured the Overall 1st Position.
              </p>

              {/* Triple Crown Milestone Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/90 shadow-sm relative overflow-hidden">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-[#F6C900] fill-[#F6C900]" />
                    <span>Triple Podium Milestone</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#202124] leading-snug">
                    Kre8ech achieved first position in{" "}
                    <span className="text-amber-600 font-black">Hackathon</span> :{" "}
                    <span className="text-amber-600 font-black">Ideathon</span> :{" "}
                    <span className="text-amber-600 font-black">Prompthon</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 mt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <span className="text-base">🏆</span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-900">Hackathon</p>
                      <p className="text-xs font-black text-[#202124]">1st Position Winner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <span className="text-base">💡</span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-900">Ideathon</p>
                      <p className="text-xs font-black text-[#202124]">1st Position Winner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <span className="text-base">🚀</span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-wide text-amber-900">Prompthon</p>
                      <p className="text-xs font-black text-[#202124]">1st Position Winner</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Milestone Honors</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#202124] shadow-xs flex items-center gap-1.5">
                    🏆 Overall First Position Champions (Saksham Hackathon)
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#202124] shadow-xs flex items-center gap-1.5">
                    💡 Ideation Track Excellence Recognition
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#202124] shadow-xs flex items-center gap-1.5">
                    🚀 Promothon Special Category Award
                  </span>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-4">
                <Link
                  href="/achievements"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] text-white font-bold text-xs hover:bg-black transition-colors"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-xs text-gray-500">Inspiring the next cohort of student innovators</span>
              </div>
            </div>

            {/* Achievement Card with Team Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-center space-y-4">
                {/* Team Photo with Winner Cheque */}
                <div className="relative w-full overflow-hidden rounded-2xl shadow-sm bg-gray-50 border border-gray-100">
                  <Image
                    src="/images/saksham-winners.jpg"
                    alt="KRE8ECH team with the Agentic AI Saksham Hackathon Overall Winner cheque"
                    width={1024}
                    height={623}
                    loading="lazy"
                    className="w-full h-auto object-cover object-center rounded-2xl"
                  />
                </div>

                {/* Logo strip */}
                <div className="py-2.5 px-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center justify-center gap-2">
                  <Image
                    src="/images/kre8ech-wings.png"
                    alt="KRE8ECH"
                    width={36}
                    height={22}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-base font-black tracking-tight text-[#202124] flex items-center font-sans">
                    KRE<span className="text-[#F6C900] mx-0.5">8</span>ECH
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-100 text-left">
                  <h3 className="text-sm font-black text-[#202124]">Agentic AI Saksham Hackathon</h3>
                  <p className="text-xs text-[#FF6A00] font-bold mt-0.5">Overall 1st Position Winners</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Reveal>
      </section>

      {/* =========================================================
          SECTION 6 — FEATURED PROJECTS SHOWCASE
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider mb-3">
              <Code className="w-3.5 h-3.5 text-amber-600" />
              <span>Student Builds & Prototypes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              Featured Innovations
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Explore real prototypes and projects built during cohorts, sprints, and hackathons.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#202124] hover:text-black group self-start md:self-end"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#202124] mb-2 leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {project.shortDescription}
                </p>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-gray-50 text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {project.builtDuring || "KRE8ECH Initiative"}
                  </span>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#202124] hover:text-amber-600 transition-colors"
                  >
                    <span>Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* =========================================================
          SECTION 7 — FINAL HOMEPAGE CTA
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-gradient-to-r from-[#F6C900] via-[#FFD700] to-[#F6C900] rounded-3xl p-8 sm:p-14 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#202124] text-white text-xs font-extrabold uppercase tracking-wider">
              Start Building Today
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-[#202124] tracking-tight leading-tight">
              Your ideas are just the beginning.
            </h2>

            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
              Learn new skills, explore technology, build projects and take your first step toward innovation. Join the KRE8ECH community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#202124] hover:bg-black text-white font-extrabold text-sm shadow-md transition-all"
              >
                <span>Join KRE8ECH</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <Link
                href="/builder-program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#202124] font-extrabold text-sm shadow-sm transition-all"
              >
                <span>Explore the Program</span>
              </Link>

              <a
                href="https://wa.me/919875721958?text=Hi%20KRE8ECH,%20I%20want%20to%20learn%20more%20about%20joining%20the%20community!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm shadow-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>

            <p className="text-xs text-gray-800 font-medium pt-1">
              Open to students from Class 9 onwards • No prior coding experience required
            </p>
          </div>
        </div>
        </Reveal>
      </section>
    </div>
  );
}
