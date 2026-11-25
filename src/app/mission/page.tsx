import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  StageUser2D,
  StageExplorer2D,
  StageBuilder2D,
  StageInnovator2D,
  StudentCodingIllustration2D,
} from "@/components/illustrations/CapablStyle2DIllustrations";

export default function MissionPage() {
  return (
    <div className="pb-20 space-y-16">
      {/* Header */}
      <section className="pt-12 pb-14 bg-gradient-to-b from-[#FAF8F2] to-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-medium text-[#6B7280]">Our Mission &amp; Core Philosophy</span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight leading-[1.08]">
              From Technology Consumers to{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Creative Builders</span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-[#F6C900]/80 -z-0 rounded-sm" />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#525252] leading-relaxed">
              Every school student has the potential to build working software. KRE8ECH bridges the gap between passive digital usage and hands-on engineering.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/builder-program"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors"
              >
                <span>Explore the Builder Program</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#FAF8F2] text-[#202124] font-medium text-sm border border-black/[0.1] transition-colors"
              >
                <span>The KRE8ECH Experience</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consumer vs Builder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-medium text-[#6B7280]">The Challenge</span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#202124] tracking-tight leading-tight">
              Students use software every minute, yet rarely build it themselves
            </h2>
            <p className="text-[#525252] text-base leading-relaxed">
              Young students navigate apps, games, and AI feeds effortlessly, yet their relationship with technology stays purely that of a consumer. School computer classes often prioritize rote syntax over real creation.
            </p>
            <p className="text-[#525252] text-base leading-relaxed">
              KRE8ECH gives students a structured sandbox where they turn everyday observations into clickable Figma prototypes, deployed web applications, and live hackathon demos.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white rounded-2xl p-6 border border-black/[0.08] w-full max-w-md text-center space-y-3">
              <StudentCodingIllustration2D className="w-full h-auto max-h-52 mx-auto" />
              <div className="pt-3 border-t border-black/[0.06]">
                <span className="text-xs font-semibold text-[#202124]">The KRE8ECH Builder Sandbox</span>
                <p className="text-xs text-[#6B7280] mt-0.5">Turning curiosity into working digital products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Student Evolution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F2] rounded-2xl p-6 sm:p-10 border border-black/[0.08] space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-medium text-[#6B7280]">Transformational Pathway</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">
              The 4-Stage Builder Evolution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-xl border border-black/[0.08] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#6B7280] tabular-nums">01</span>
                  <span className="text-xs text-[#6B7280]">Stage 1</span>
                </div>
                <StageUser2D className="h-20 mx-auto my-2" />
                <h3 className="text-base font-semibold text-[#202124] mt-3 mb-1.5">Technology User</h3>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Uses social feeds, games, and everyday apps passively without seeing how they operate.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/[0.08] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#6B7280] tabular-nums">02</span>
                  <span className="text-xs text-[#6B7280]">Stage 2</span>
                </div>
                <StageExplorer2D className="h-20 mx-auto my-2" />
                <h3 className="text-base font-semibold text-[#202124] mt-3 mb-1.5">Explorer</h3>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Deconstructs real applications, explores AI logic, and spots practical problems to solve.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#F6C900] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#202124] tabular-nums">03</span>
                  <span className="text-xs font-medium text-[#202124] bg-[#FFF9E8] px-2 py-0.5 rounded">Build Phase</span>
                </div>
                <StageBuilder2D className="h-20 mx-auto my-2" />
                <h3 className="text-base font-semibold text-[#202124] mt-3 mb-1.5">Builder</h3>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Designs prototypes in Figma, writes responsive code, and ships working web MVPs.
                </p>
              </div>
            </div>

            <div className="bg-[#141415] text-white p-6 rounded-xl border border-white/[0.08] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#F6C900] tabular-nums">04</span>
                  <span className="text-xs text-[#F6C900]">Finale</span>
                </div>
                <StageInnovator2D className="h-20 mx-auto my-2" />
                <h3 className="text-base font-semibold text-white mt-3 mb-1.5">Innovator</h3>
                <p className="text-xs text-[#A1A1A6] leading-relaxed">
                  Pitches live prototypes to mentors and juries at hackathons and solves real community needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Builder Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">The KRE8ECH Builder Manifesto</h2>
          <p className="text-sm text-[#525252] mt-1">Core principles across every cohort and hackathon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-2">
            <span className="text-xs font-semibold text-[#6B7280] tabular-nums">01</span>
            <h3 className="text-base font-semibold text-[#202124]">Working Code Over Slides</h3>
            <p className="text-sm text-[#525252] leading-relaxed">
              Innovation comes from shipping functional prototypes people can test and use, not slide buzzwords.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-2">
            <span className="text-xs font-semibold text-[#6B7280] tabular-nums">02</span>
            <h3 className="text-base font-semibold text-[#202124]">Empathy Before Engineering</h3>
            <p className="text-sm text-[#525252] leading-relaxed">
              Understand the real user friction point clearly before writing the first line of code.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-black/[0.08] space-y-2">
            <span className="text-xs font-semibold text-[#6B7280] tabular-nums">03</span>
            <h3 className="text-base font-semibold text-[#202124]">Fearless Experimentation</h3>
            <p className="text-sm text-[#525252] leading-relaxed">
              Debugging errors under mentor guidance builds resilient engineering confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
