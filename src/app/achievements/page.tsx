"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Award,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Lightbulb
} from "lucide-react";
import { TrophySticker, SparkleSticker } from "@/components/stickers/TechStickers";
import { getAchievements } from "@/lib/storage";
import { Achievement } from "@/types";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setAchievements(getAchievements());
  }, []);

  const featured = achievements[0];

  // Ideathon placeholder configuration
  // Unfilled fields are hidden per instructions to maintain clean, professional presentation
  const ideathonConfig = {
    winnerName: "", // [WINNER NAME] - hidden until filled
    eventName: "", // [EVENT NAME] - hidden until filled
    venue: "", // [VENUE] - hidden until filled
    city: "", // [CITY] - hidden until filled
    judgingCriteria: "", // [WHAT THE JUDGES LOOKED FOR, e.g. originality and real-world impact] - hidden until filled
    ideaSummary: "", // [WRITE 1-2 LINES ABOUT THE IDEA HERE] - hidden until filled
    date: "", // [DATE] - hidden until filled
  };

  const ideathonHeading = ideathonConfig.eventName
    ? `Ideathon Win: ${ideathonConfig.eventName}`
    : "Ideathon Win";

  const ideathonMetaItems = [
    ideathonConfig.eventName ? `Event: ${ideathonConfig.eventName}` : null,
    ideathonConfig.date ? `Date: ${ideathonConfig.date}` : null,
    "Result: 1st Position"
  ].filter(Boolean) as string[];

  const buildIdeathonDescription = () => {
    const parts: string[] = [];
    if (ideathonConfig.winnerName) {
      let lead = `${ideathonConfig.winnerName} from KRE8ECH secured the 1st Position`;
      if (ideathonConfig.eventName) lead += ` at ${ideathonConfig.eventName}`;
      if (ideathonConfig.venue || ideathonConfig.city) {
        const loc = [ideathonConfig.venue, ideathonConfig.city].filter(Boolean).join(", ");
        lead += `, held at ${loc}`;
      }
      lead += ".";
      parts.push(lead);
    } else {
      let lead = "A KRE8ECH team member secured the 1st Position";
      if (ideathonConfig.eventName) lead += ` at ${ideathonConfig.eventName}`;
      if (ideathonConfig.venue || ideathonConfig.city) {
        const loc = [ideathonConfig.venue, ideathonConfig.city].filter(Boolean).join(", ");
        lead += `, held at ${loc}`;
      }
      lead += ".";
      parts.push(lead);
    }

    if (ideathonConfig.judgingCriteria) {
      parts.push(`The idea was judged on ${ideathonConfig.judgingCriteria}.`);
    }

    if (ideathonConfig.ideaSummary) {
      parts.push(ideathonConfig.ideaSummary);
    }

    return parts.join(" ");
  };

  const ideathonDescription = buildIdeathonDescription();

  const ideathonPhotoCaption = [
    ideathonConfig.winnerName,
    "1st Position",
    ideathonConfig.eventName
  ].filter(Boolean).join(", ");

  const ideathonAwardItem = ideathonConfig.winnerName
    ? `Ideathon First Position: ${ideathonConfig.winnerName}`
    : "Ideathon First Position";

  return (
    <div className="pb-24 space-y-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Real Milestones & Journey</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#202124] tracking-tight">
              Our Achievements & Story
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Before founding KRE8ECH to teach students how to build, our team tested our own grit in fast-paced hackathons. Here is our story, the lessons we took away, and the milestone that sparked our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Highlight Story: Saksham Hackathon */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-10">
            {/* Top Bar with Headline */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100">
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50 inline-block">
                  Featured Hackathon Milestone
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#202124] tracking-tight">
                  {featured.featuredHeadline}
                </h2>
                <p className="text-base sm:text-lg font-bold text-gray-700">
                  {featured.eventName} — {featured.position}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200/60 text-gray-700">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{featured.date}</span>
                </div>
                {featured.venue && (
                  <div className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200/60 text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{featured.venue}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Team Win</span>
                </div>
              </div>
            </div>

            {/* Media & Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Image Asset Presentation (Left Card) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4">
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

                  {/* KRE8ECH logo strip */}
                  <div className="py-2.5 px-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center justify-center gap-2">
                    <Image
                      src="/images/kre8ech-wings.png"
                      alt="KRE8ECH Official Logo"
                      width={36}
                      height={22}
                      className="h-6 w-auto object-contain"
                    />
                    <span className="text-base font-black tracking-tight text-[#202124] flex items-center font-sans">
                      KRE<span className="text-[#F6C900] mx-0.5">8</span>ECH
                    </span>
                  </div>

                  {/* Title and Orange Subtitle */}
                  <div className="pt-2 border-t border-gray-100 text-left">
                    <p className="text-sm font-black text-[#202124]">Agentic AI Saksham Hackathon</p>
                    <p className="text-xs text-[#FF6A00] font-bold mt-0.5">Overall 1st Position Winners</p>
                  </div>
                </div>

                {/* Awards & Track Honors Box */}
                <div className="bg-[#FFFDF7] rounded-3xl p-6 border border-amber-200/60 shadow-xs space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#202124] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Awards & Track Honors</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-bold text-gray-800">
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-gray-100 shadow-xs">
                      <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Overall First Position Champions (Saksham Hackathon)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-gray-100 shadow-xs">
                      <span>💡 Ideation Track Excellence Recognition</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-gray-100 shadow-xs">
                      <span>🚀 Promothon Special Category Award</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-gray-100 shadow-xs">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{ideathonAwardItem}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Story & Learnings (Right Side) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#202124] mb-3">
                    The Saksham Story: Turning Code into Impact
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    At the Agentic AI Saksham Hackathon, our team built OutreachIQ for the problem statement &apos;Personalized Multi-Touch Sales Outreach Agent&apos; (Track D: Sales, Growth &amp; Revenue Agents). Sales teams send thousands of generic cold emails that get ignored, because researching every lead by hand takes too much time. OutreachIQ is a multi-agent AI system that researches each lead, writes personalized messages, plans a multi-touch sequence, understands the lead&apos;s reply, and decides the next step on its own: continue, pause, stop, or escalate to a human. We secured the Overall 1st Position.
                  </p>
                </div>

                {/* PROJECT SPOTLIGHT: OUTREACHIQ */}
                <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-100 space-y-4">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/50 inline-block mb-1.5">
                      PROJECT SPOTLIGHT: OUTREACHIQ
                    </span>
                    <p className="text-xs font-semibold text-gray-600 italic">
                      &quot;From mass messaging to intelligent conversations.&quot;
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      5-Agent Autonomous System:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Research Agent:</strong> gathers public info on each lead through DuckDuckGo search with RAG</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Personalization Agent:</strong> writes tailored emails and LinkedIn messages from that research</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Sequence Planner:</strong> builds a multi-touch cadence with escalating intent</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Reply Intelligence Agent:</strong> classifies replies as interested, objection, out-of-office, not interested or no reply</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Decision Agent:</strong> continue, pause, stop or escalate to a human sales rep</span>
                      </li>
                    </ul>
                  </div>

                  {/* Tech Chips */}
                  <div className="pt-3 border-t border-gray-200/60">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Technologies & Orchestration
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Python", "Ollama (local LLM)", "DuckDuckGo Search", "RAG", "Multi-Agent Orchestration"].map((chip) => (
                        <span
                          key={chip}
                          className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-gray-800 shadow-xs"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* What This Win Taught Us Card */}
                <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    What This Win Taught Us (And Why We Started KRE8ECH)
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Real-world problems require deep user empathy before writing a single line of code</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Autonomous agent systems excel when given clear constraints and verification loops</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Compelling technical storytelling and live demos make the difference between a project and a winning product</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Resilience under time pressure and seamless team role distribution are essential superpowers</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Agents become trustworthy when they are grounded in real sources and know when to hand over to a human.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/50 flex items-center gap-3">
                  <TrophySticker size={40} className="shrink-0" />
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    <strong>Our Mission Continues:</strong> Every method we used at Saksham—autonomous task loops, real-time debugging, and stage pitching—is directly built into our Four-Week Builder Program curriculum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Secondary Milestone: Ideathon Win (Mirrored: Text Left, Photo Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-10">
          {/* Top Bar with Headline & Meta Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100">
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50 inline-block">
                IDEATHON
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#202124] tracking-tight">
                {ideathonHeading}
              </h2>
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-sm font-bold text-gray-700">
                {ideathonMetaItems.map((meta, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-gray-300 font-bold hidden sm:inline">|</span>}
                    <span className="inline-flex items-center gap-1.5">
                      {meta.includes("1st Position") && (
                        <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      {meta}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Milestone</span>
              </div>
            </div>
          </div>

          {/* Media & Story Grid (Mirrored: Text Left, Photo Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Story & Context (Left Side, 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xl font-black text-[#202124] mb-3">
                  Ideation Excellence &amp; Problem Solving
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {ideathonDescription}
                </p>
              </div>

              {/* Recognition Card */}
              <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Competition Honor</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-gray-800">1st Position in Ideathon</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                    Winner
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  At KRE8ECH, ideation is about identifying real friction points and designing pragmatic, scalable prototypes before writing code.
                </p>
              </div>
            </div>

            {/* Photo Card (Right Side, 5 cols, max 360-420px on desktop, full width on mobile) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-[380px] sm:max-w-[420px] bg-white rounded-3xl p-6 border border-gray-100 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4">
                {/* Photo: portrait orientation, fixed aspect ratio 4/5, object-fit cover, object-position center top */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-sm bg-gray-50 border border-gray-100">
                  <Image
                    src="/images/ideathon-winner.jpg"
                    alt="KRE8ECH team member receiving the 1st Position award at the Ideathon"
                    fill
                    sizes="(max-width: 640px) 100vw, 420px"
                    loading="lazy"
                    className="object-cover object-[center_top] rounded-2xl"
                  />
                </div>

                {/* Caption under the photo */}
                <div className="pt-2 border-t border-gray-100 text-left">
                  <p className="text-sm font-black text-[#202124]">
                    {ideathonPhotoCaption}
                  </p>
                  <p className="text-xs text-amber-600 font-bold mt-0.5">
                    Ideathon 1st Position
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50/80 rounded-3xl p-8 sm:p-12 border border-gray-100 text-center max-w-3xl mx-auto space-y-4">
          <SparkleSticker size={40} className="mx-auto" />
          <h3 className="text-2xl font-black text-[#202124]">
            Your Hackathon Journey Starts Here
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every champion started with an empty code editor and a raw problem statement. Join our cohort, discover how to build, and compete in our upcoming student hackathons.
          </p>
          <div className="pt-2">
            <Link
              href="/hackathons"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#202124] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              <span>Explore Upcoming Hackathons</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
