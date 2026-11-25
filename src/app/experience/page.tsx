"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code,
  Lightbulb,
  Rocket,
  Layers,
  Award,
  ChevronRight,
  Laptop
} from "lucide-react";
import {
  PillarLearn2D,
  PillarBuild2D,
  PillarInnovate2D,
  StudentCodingIllustration2D
} from "@/components/illustrations/CapablStyle2DIllustrations";
import {
  AnimatedLaptop,
  InteractiveBulb,
  AnimatedRocket,
  AnimatedRobot
} from "@/components/hero/HeroInteractiveStickers";

const BuilderForge3D = dynamic(
  () => import("@/components/three/BuilderForge3D"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] rounded-3xl bg-[#121316] border border-gray-800 animate-pulse flex items-center justify-center text-xs font-bold text-gray-400">
        Loading 3D Interactive Forge...
      </div>
    )
  }
);

export default function ExperiencePage() {
  return (
    <div className="pb-24 space-y-20">
      {/* Header */}
      <section className="relative pt-14 pb-16 bg-gradient-to-b from-[#FFFDF9] via-white to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>The KRE8ECH Experience</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#202124] tracking-tight leading-[1.1]">
              A Three-Pillar Journey of{" "}
              <span className="relative inline-block mt-1">
                <span className="relative z-10">Real Creation.</span>
                <span className="absolute left-0 bottom-2 w-full h-3.5 bg-[#F6C900]/80 -z-0 rounded-full" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-gray-700">
              LEARN • BUILD • INNOVATE
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We replace passive lectures with hands-on technical creation. Through three integrated pillars, students gain the tools, confidence, and competitive experience to turn ideas into software reality.
            </p>

            <div className="pt-2 flex flex-wrap gap-3.5">
              <Link
                href="/builder-program"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-sm shadow-sm transition-all"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200 shadow-xs transition-all"
              >
                <span>Discover Student Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three.js 3D Interactive Lab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BuilderForge3D />
      </section>

      {/* Interactive Builder Playground */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-gray-100 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF9E8] border border-[#F6C900]/70 text-xs font-bold text-[#202124] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F6C900] animate-pulse" />
              <span>Interactive Student Builder Playground • Click to Test:</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202124]">
              Hands-On Tools at Your Fingertips
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Test out our live builder simulations below. Every animation triggers strictly on click!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
            <AnimatedLaptop />
            <InteractiveBulb />
            <AnimatedRocket />
            <AnimatedRobot />
          </div>
        </div>
      </section>

      {/* PILLAR 1: LEARN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center justify-center font-black text-sm">
                01
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                Pillar 1 • Foundation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#202124]">
              LEARN: Demystifying the Digital World
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Before you can build the future, you must understand how it operates. Students explore computer science fundamentals without the dry, theoretical approach. We dissect real websites, understand how LLMs predict tokens, and master computational logic.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">AI & Prompt Engineering</p>
                <p className="text-[11px] text-gray-500">How generative AI models work and how to leverage them as coding copilots.</p>
              </div>
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Computational Thinking</p>
                <p className="text-[11px] text-gray-500">Deconstructing complex problems into step-by-step algorithmic logic.</p>
              </div>
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Web & Cloud Architecture</p>
                <p className="text-[11px] text-gray-500">Understanding clients, servers, databases, and modern APIs.</p>
              </div>
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Developer Tooling</p>
                <p className="text-[11px] text-gray-500">Setting up VS Code, GitHub repositories, and browser developer consoles.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-[#FFFDF7] rounded-3xl p-8 border border-amber-200/60 shadow-sm text-center">
              <PillarLearn2D className="w-full h-auto max-h-44 mx-auto mb-4" />
              <div className="pt-3 border-t border-amber-200/40">
                <span className="text-xs font-black text-[#202124]">Pillar 01: LEARN</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Explore modern technology and digital tools shaping tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 2: BUILD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF7] rounded-3xl border border-amber-200/70 p-8 sm:p-12 shadow-[0_4px_24px_rgba(246,201,0,0.08)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
              <PillarBuild2D className="w-full h-auto max-h-44 mx-auto mb-4" />
              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-black text-[#202124]">Pillar 02: BUILD</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Translate ideas into functional, responsive software</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-2xl bg-[#F6C900] text-[#202124] flex items-center justify-center font-black text-sm shadow-xs">
                02
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                Pillar 2 • Creation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#202124]">
              BUILD: Transforming Concepts into Working Software
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Theory without application is quickly forgotten. In the BUILD phase, students roll up their sleeves and build real projects. From user wireframing in Figma to frontend development with Next.js and Tailwind CSS, every student creates a functional digital MVP.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">UI/UX Design in Figma</p>
                <p className="text-[11px] text-gray-500">Creating wireframes, color systems, and clickable prototypes.</p>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Responsive Frontend Code</p>
                <p className="text-[11px] text-gray-500">Writing clean HTML, CSS, React, and modern TypeScript.</p>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Live Web Deployment</p>
                <p className="text-[11px] text-gray-500">Deploying projects live to Vercel with real shareable URLs.</p>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Debugging & Edge Cases</p>
                <p className="text-[11px] text-gray-500">Overcoming runtime errors, testing edge inputs, and hardening code.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLAR 3: INNOVATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-2xl bg-[#121316] text-[#F6C900] flex items-center justify-center font-black text-sm">
                03
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#F6C900]">
                Pillar 3 • Impact
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#202124]">
              INNOVATE: Pitching, Competing & Winning
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              True innovation isn&apos;t complete until you can communicate your solution to the world. Students learn the art of the 3-minute hackathon pitch, present live software demos to juries of tech mentors and parents, and compete in concluding offline hackathons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">3-Minute Stage Pitch</p>
                <p className="text-[11px] text-gray-500">Structured storytelling: Hook, Problem, Solution, Demo, and Impact.</p>
              </div>
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">In-Person Offline Hackathon</p>
                <p className="text-[11px] text-gray-500">The Week 4 grand finale: team collaboration, live jury, and awards.</p>
              </div>
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Team Collaboration</p>
                <p className="text-[11px] text-gray-500">Git branch collaboration, role delegation, and sprint planning.</p>
              </div>
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-1">
                <p className="text-xs font-bold text-[#202124]">Champion Mentorship</p>
                <p className="text-[11px] text-gray-500">Guidance from our Saksham Hackathon 1st Position champion team.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-[#121316] text-white rounded-3xl p-8 border border-gray-800 shadow-xl text-center">
              <PillarInnovate2D className="w-full h-auto max-h-44 mx-auto mb-4" />
              <div className="pt-3 border-t border-gray-800">
                <span className="text-xs font-black text-[#F6C900]">Pillar 03: INNOVATE</span>
                <p className="text-[11px] text-gray-300 mt-0.5">Solve real problems, pitch live on stage & compete for laurels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Connection CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-14 text-center border border-gray-800 shadow-xl space-y-6 max-w-4xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#F6C900] text-[#202124] text-xs font-black uppercase tracking-wider">
            Experience the Curriculum
          </span>
          <h2 className="text-3xl sm:text-5xl font-black">
            Experience the Three Pillars in Action
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our Four-Week Builder Program guides you through all three pillars across 11 online guided learning days and 1 grand offline hackathon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/builder-program"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs transition-all shadow-md"
            >
              <span>Explore the 4-Week Program</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-gray-100 text-[#202124] font-black text-xs transition-all shadow-xs"
            >
              <span>Register Your Interest</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
