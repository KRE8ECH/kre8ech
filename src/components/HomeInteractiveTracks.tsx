"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Calendar, Terminal } from "lucide-react";

interface StageDetail {
  id: string;
  number: string;
  weekLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  deliverables: string[];
  tools: string[];
}

const stages: StageDetail[] = [
  {
    id: "explore",
    number: "01",
    weekLabel: "Week 01 • 3 Online Days",
    title: "Explore",
    subtitle: "Tech Foundations & AI",
    summary:
      "Break down how real apps, servers, and AI models work under the hood while discovering authentic problems around school and daily life.",
    deliverables: [
      "Product teardown of a modern web application",
      "Problem discovery canvas with 3 candidate ideas",
      "Configured developer & AI prompt workspace",
    ],
    tools: ["VS Code", "GitHub", "Gemini / ChatGPT", "FigJam"],
  },
  {
    id: "ideate",
    number: "02",
    weekLabel: "Week 02 • 3 Online Days",
    title: "Ideate & Design",
    subtitle: "User Empathy & Prototypes",
    summary:
      "Turn raw observations into crisp problem statements, design user journeys, and build clickable interfaces before writing production code.",
    deliverables: [
      "1-page MVP specification blueprint",
      "Clickable multi-screen wireframe prototype",
      "Defined user journey and edge-case flow",
    ],
    tools: ["Figma", "FigJam", "Miro", "Notion"],
  },
  {
    id: "build",
    number: "03",
    weekLabel: "Week 03 • 3 Online Days",
    title: "Build & Develop",
    subtitle: "Code & Live Deployment",
    summary:
      "Translate designs into responsive interfaces, add real interactivity and data flows with AI-assisted coding, and deploy live on the web.",
    deliverables: [
      "Responsive working MVP hosted on a live URL",
      "Clean GitHub repository with version history",
      "Structured debugging and mobile QA check",
    ],
    tools: ["HTML / Tailwind", "React / Next.js", "REST APIs", "Vercel"],
  },
  {
    id: "compete",
    number: "04",
    weekLabel: "Week 04 • 2 Online + 1 Offline Day",
    title: "Finalize & Compete",
    subtitle: "Offline Hackathon Finale",
    summary:
      "Refine your project, craft a crisp 3-minute live demo pitch, and present in person with your team at the concluding KRE8ECH Hackathon.",
    deliverables: [
      "5-slide technical pitch deck & backup demo",
      "Live 3-minute stage pitch in front of mentors",
      "Verified Builder Certificate & jury evaluation",
    ],
    tools: ["Live Stage Pitch", "Loom", "Google Slides", "Team Sprint"],
  },
];

const trackOptions = [
  {
    key: "school" as const,
    label: "Four-Week Builder Program",
    badge: "Class 9 Onwards",
    duration: "4 Weeks • 12 Days (11 Online + 1 Offline)",
    schedule: "90 mins/day (60m guided + 30m doubt solving)",
    ctaLabel: "Register for School Cohort",
    ctaHref: "/register",
    secondaryLabel: "View Full 12-Day Curriculum",
    secondaryHref: "/builder-program",
  },
  {
    key: "hackready" as const,
    label: "Hackready Workshop",
    badge: "College & B.Tech",
    duration: "Intensive Hackathon Readiness & MVP Sprint",
    schedule: "Roll No. & Branch verified college cohort",
    ctaLabel: "Open Hackready Registration",
    ctaHref: "/register/hackready",
    secondaryLabel: "Explore Hackathons",
    secondaryHref: "/hackathons",
  },
];

export default function HomeInteractiveTracks() {
  const [activeTrack, setActiveTrack] = useState<"school" | "hackready">("school");
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const selectedTrack = trackOptions.find((t) => t.key === activeTrack) || trackOptions[0];
  const stage = stages[activeStageIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FAF8F2] rounded-2xl border border-black/[0.08] p-6 sm:p-10 space-y-8">
        {/* Header + Track Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-black/[0.08]">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-[#6B7280]">Interactive Program Explorer</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight">
              Choose your track and inspect the pathway
            </h2>
          </div>

          <div
            className="inline-flex p-1 rounded-xl bg-white border border-black/[0.08] self-start"
            role="tablist"
            aria-label="Program tracks"
          >
            {trackOptions.map((track) => {
              const selected = activeTrack === track.key;
              return (
                <button
                  key={track.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTrack(track.key)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 ${
                    selected
                      ? "bg-[#202124] text-white"
                      : "text-[#525252] hover:text-[#202124]"
                  }`}
                >
                  {track.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Track Quick Bar */}
        <div className="bg-white rounded-xl border border-black/[0.08] p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#525252]">
            <span className="px-2.5 py-1 rounded-md bg-[#FFF9E8] border border-[#F6C900]/50 text-[#202124] font-semibold text-xs">
              {selectedTrack.badge}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
              <span>{selectedTrack.duration}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              {activeTrack === "school" ? (
                <Clock className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
              ) : (
                <Terminal className="w-4 h-4 text-[#6B7280]" strokeWidth={1.75} />
              )}
              <span>{selectedTrack.schedule}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href={selectedTrack.secondaryHref}
              className="px-4 py-2 rounded-lg bg-[#FAF8F2] hover:bg-[#EFE9DF] text-[#202124] text-xs font-medium border border-black/[0.08] transition-colors"
            >
              {selectedTrack.secondaryLabel}
            </Link>
            <Link
              href={selectedTrack.ctaHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] text-xs font-semibold transition-colors"
            >
              <span>{selectedTrack.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Interactive 4-Stage Step Selector + Live Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {stages.map((item, idx) => {
              const isSelected = idx === activeStageIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-colors duration-150 flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-[#202124] text-white border-[#202124]"
                      : "bg-white text-[#202124] border-black/[0.08] hover:bg-[#FDFBF7]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold tabular-nums shrink-0 ${
                        isSelected
                          ? "bg-[#F6C900] text-[#202124]"
                          : "bg-[#FAF8F2] text-[#525252] border border-black/[0.06]"
                      }`}
                    >
                      {item.number}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{item.title}</p>
                      <p className={`text-xs truncate ${isSelected ? "text-[#A1A1A6]" : "text-[#6B7280]"}`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[11px] tabular-nums shrink-0 ${isSelected ? "text-[#F6C900]" : "text-[#6B7280]"}`}>
                    W{item.number}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-black/[0.08] p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#6B7280] tabular-nums">
                  {stage.weekLabel}
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-[#FAF8F2] border border-black/[0.06] text-[#525252] tabular-nums">
                  Stage {stage.number} of 04
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#202124]">
                  {stage.title}: {stage.subtitle}
                </h3>
                <p className="text-sm text-[#525252] leading-relaxed mt-2">
                  {stage.summary}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium text-[#6B7280]">Expected student outputs</p>
                <ul className="space-y-2">
                  {stage.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-[#202124]">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {stage.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-black/[0.06] text-[#525252]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <Link
                href="/builder-program"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#202124] hover:underline"
              >
                <span>See day-by-day schedule</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
