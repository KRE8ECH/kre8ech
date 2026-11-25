import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Code,
  Trophy,
  Calendar,
  Layers,
  Sparkles,
  FileText,
} from "lucide-react";
import HomeInteractiveTracks from "@/components/HomeInteractiveTracks";
import { initialProjects, initialAchievements } from "@/data/mockData";

const directoryCards = [
  {
    number: "01",
    title: "Four-Week Builder Program",
    description: "11 online live sessions + 1 offline hackathon day with daily 30-minute doubt solving.",
    href: "/builder-program",
    cta: "Explore Curriculum",
    icon: Layers,
  },
  {
    number: "02",
    title: "Our Mission & Evolution",
    description: "How students progress from passive Technology Users to Explorers, Builders, and Innovators.",
    href: "/mission",
    cta: "Read Philosophy",
    icon: Compass,
  },
  {
    number: "03",
    title: "The KRE8ECH Experience",
    description: "Interactive builder playground and our Learn, Build, Innovate methodology.",
    href: "/experience",
    cta: "Try Playground",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Student Build Showcase",
    description: "Working AI applications, web MVPs, and IoT prototypes built by student cohorts.",
    href: "/projects",
    cta: "Browse Projects",
    icon: Code,
  },
  {
    number: "05",
    title: "Hackathons & Challenges",
    description: "Upcoming sprint schedules, team rules, and our searchable Problem Statements Bank.",
    href: "/hackathons",
    cta: "View Events",
    icon: Calendar,
  },
  {
    number: "06",
    title: "Achievements & Story",
    description: "How our team secured Overall 1st Position at the Agentic AI Saksham Hackathon.",
    href: "/achievements",
    cta: "Read Our Story",
    icon: Trophy,
  },
];

export default function HomePage() {
  const featuredProjects = initialProjects.slice(0, 3);
  const saksham = initialAchievements[0];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* HERO: Asymmetric Split on Warm Paper Canvas */}
      <section className="bg-gradient-to-b from-[#FAF8F2] to-white border-b border-black/[0.06] pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-medium text-[#6B7280] tracking-wide">
                Student Technology &amp; Builder Initiative • Class 9 Onwards &amp; College
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#202124] tracking-[-0.03em] leading-[1.06]">
                Don&apos;t just use technology.
                <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10">Build with it.</span>
                  <span className="absolute left-0 bottom-1.5 sm:bottom-2 w-full h-3 bg-[#F6C900]/80 -z-0 rounded-sm" />
                </span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-[#525252] leading-relaxed">
                Explore modern AI and software engineering, design working prototypes, and present live on stage through guided cohorts and offline hackathons.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                >
                  <span>Join KRE8ECH</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>

                <Link
                  href="/builder-program"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#FAF8F2] text-[#202124] font-medium text-sm border border-black/[0.1] transition-colors duration-150"
                >
                  <span>Explore 4-Week Program</span>
                  <ArrowUpRight className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
                </Link>
              </div>

              {/* Clean Metric Strip */}
              <div className="pt-6 border-t border-black/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#6B7280]">Duration</p>
                  <p className="text-sm font-semibold text-[#202124] mt-0.5 tabular-nums">4 Weeks • 12 Days</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Daily Format</p>
                  <p className="text-sm font-semibold text-[#202124] mt-0.5 tabular-nums">60m Live + 30m Doubt</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Proven Milestone</p>
                  <p className="text-sm font-semibold text-[#202124] mt-0.5 tabular-nums">Saksham 1st Position</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Open To</p>
                  <p className="text-sm font-semibold text-[#202124] mt-0.5">Class 9+ &amp; College</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[480px] rounded-2xl bg-white border border-black/[0.08] p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                <Image
                  src="/images/students-collaboration.png"
                  alt="KRE8ECH students collaborating on software and AI prototypes"
                  width={1024}
                  height={660}
                  priority
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED PAGES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-[#6B7280]">Platform Sections</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight">
              Explore every part of KRE8ECH
            </h2>
          </div>
          <Link
            href="/problem-statements"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#202124] hover:underline"
          >
            <FileText className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
            <span>Open Problem Statements Bank</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {directoryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white rounded-2xl border border-black/[0.08] p-6 flex flex-col justify-between gap-5 hover:border-[#202124]/30 hover:bg-[#FDFBF7] transition-colors duration-150"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6B7280] tabular-nums">{card.number}</span>
                    <Icon className="w-4 h-4 text-[#6B7280] group-hover:text-[#202124] transition-colors" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#202124]">{card.title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{card.description}</p>
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-[#202124]">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* DYNAMIC PROGRAM & TRACK SWITCHER */}
      <HomeInteractiveTracks />

      {/* CONCISE PROOF & FEATURED PROJECTS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Achievement Spotlight Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-black/[0.08] p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#6B7280]">Verified Milestone</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#FFF9E8] border border-[#F6C900]/60 text-[#202124]">
                  1st Position
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-[#FAF8F2]">
                <Image
                  src="/images/saksham-winners.jpg"
                  alt="KRE8ECH team at Agentic AI Saksham Hackathon"
                  width={1024}
                  height={623}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-[#202124]">
                  {saksham.eventName}
                </h3>
                <p className="text-sm text-[#525252] leading-relaxed">
                  Built OutreachIQ, a 5-agent AI system for personalized multi-touch outreach, securing Overall 1st Position alongside Ideathon and Promothon honors.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-black/[0.06]">
              <Link
                href="/achievements"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#202124] hover:underline"
              >
                <span>Read full team story &amp; learnings</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          </div>

          {/* Top 3 Featured Projects */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-black/[0.08] p-6 flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-black/[0.06]">
              <div>
                <span className="text-xs font-medium text-[#6B7280]">Student Prototypes</span>
                <h3 className="text-lg font-semibold text-[#202124]">Featured Builds</h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#202124] hover:underline"
              >
                <span>All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>

            <div className="divide-y divide-black/[0.06] flex-1">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#6B7280]">{project.category}</span>
                      <span className="text-[#D4D4D8]">•</span>
                      <span className="text-xs font-medium text-[#16A34A]">{project.status}</span>
                    </div>
                    <h4 className="text-base font-semibold text-[#202124] group-hover:underline truncate">
                      {project.title}
                    </h4>
                    <p className="text-xs text-[#525252] line-clamp-1">{project.shortDescription}</p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#202124] shrink-0">
                    <span>Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} />
                  </span>
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B7280]">
              <span>Every project ships with working code and a live demo</span>
              <Link href="/register" className="font-semibold text-[#202124] hover:underline">
                Build yours in Cohort 1 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOCUSED CLOSING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141415] text-white rounded-2xl border border-white/[0.08] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-medium text-[#F6C900]">Admissions Open • No Prior Coding Required</span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Ready to build your first real project?
            </h2>
            <p className="text-sm text-[#A1A1A6] leading-relaxed">
              Join the Four-Week Builder Program (Class 9 onwards) or register for the Hackready College Workshop.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors duration-150"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#232325] hover:bg-[#2E2E32] text-white font-medium text-sm border border-white/[0.1] transition-colors duration-150"
            >
              <span>School Collaboration</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
