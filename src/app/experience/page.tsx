import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  PillarLearn2D,
  PillarBuild2D,
  PillarInnovate2D,
} from "@/components/illustrations/CapablStyle2DIllustrations";
import {
  AnimatedLaptop,
  InteractiveBulb,
  AnimatedRocket,
  AnimatedRobot,
} from "@/components/hero/HeroInteractiveStickers";

export default function ExperiencePage() {
  return (
    <div className="pb-20 space-y-16">
      {/* Header */}
      <section className="pt-12 pb-14 bg-gradient-to-b from-[#FAF8F2] to-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-medium text-[#6B7280]">The KRE8ECH Experience</span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight leading-[1.08]">
              A Three-Pillar Journey of{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Real Creation</span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-[#F6C900]/80 -z-0 rounded-sm" />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#525252] leading-relaxed">
              We replace passive lectures with hands-on software building across three connected phases: Learn, Build, and Innovate.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/builder-program"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#FAF8F2] text-[#202124] font-medium text-sm border border-black/[0.1] transition-colors"
              >
                <span>Discover Student Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F2] rounded-2xl p-6 sm:p-10 border border-black/[0.08] text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-1.5">
            <span className="text-xs font-medium text-[#6B7280]">Interactive Builder Playground</span>
            <h2 className="text-2xl font-semibold text-[#202124]">Hands-On Tools</h2>
            <p className="text-xs sm:text-sm text-[#525252]">
              Click any builder module below to trigger its simulation.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <AnimatedLaptop />
            <InteractiveBulb />
            <AnimatedRocket />
            <AnimatedRobot />
          </div>
        </div>
      </section>

      {/* Pillar 1: LEARN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-medium text-[#6B7280] tabular-nums">Pillar 01 • Foundation</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">
              LEARN: Demystifying the Digital World
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
              Students dissect real websites, explore how generative AI models work, and build computational thinking habits before writing production code.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                <p className="text-xs font-semibold text-[#202124]">AI &amp; Prompt Engineering</p>
                <p className="text-xs text-[#525252] mt-0.5">Using AI tools responsibly as engineering copilots.</p>
              </div>
              <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-black/[0.06]">
                <p className="text-xs font-semibold text-[#202124]">Web &amp; Cloud Fundamentals</p>
                <p className="text-xs text-[#525252] mt-0.5">Understanding clients, APIs, and modern developer tooling.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-xs bg-[#FAF8F2] rounded-xl p-6 border border-black/[0.08] text-center">
              <PillarLearn2D className="w-full h-auto max-h-40 mx-auto mb-3" />
              <span className="text-xs font-semibold text-[#202124]">Pillar 01: Learn</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: BUILD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F2] rounded-2xl border border-black/[0.08] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-xs bg-white rounded-xl p-6 border border-black/[0.08] text-center">
              <PillarBuild2D className="w-full h-auto max-h-40 mx-auto mb-3" />
              <span className="text-xs font-semibold text-[#202124]">Pillar 02: Build</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            <span className="text-xs font-medium text-[#6B7280] tabular-nums">Pillar 02 • Creation</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">
              BUILD: Turning Concepts into Working Software
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
              From wireframing user flows in Figma to building responsive React interfaces and deploying live URLs, every student ships a working MVP.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-white rounded-xl border border-black/[0.06]">
                <p className="text-xs font-semibold text-[#202124]">UI/UX Wireframing</p>
                <p className="text-xs text-[#525252] mt-0.5">Clickable prototypes and user journey mapping in Figma.</p>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-black/[0.06]">
                <p className="text-xs font-semibold text-[#202124]">Live Deployment</p>
                <p className="text-xs text-[#525252] mt-0.5">Shipping responsive frontend builds and debugging edge cases.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: INNOVATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-black/[0.08] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-medium text-[#6B7280] tabular-nums">Pillar 03 • Showcase</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">
              INNOVATE: Pitching &amp; Competing Live
            </h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
              Students practice the 3-minute live demo pitch, collaborate in sprint teams, and present working software on stage at our offline hackathon finale.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#202124] hover:bg-black text-white text-xs font-semibold transition-colors"
              >
                <span>Join the Next Cohort</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-xs bg-[#141415] text-white rounded-xl p-6 border border-white/[0.08] text-center">
              <PillarInnovate2D className="w-full h-auto max-h-40 mx-auto mb-3" />
              <span className="text-xs font-semibold text-[#F6C900]">Pillar 03: Innovate</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
