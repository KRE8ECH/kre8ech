"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Users,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Award
} from "lucide-react";
import {
  StageUser2D,
  StageExplorer2D,
  StageBuilder2D,
  StageInnovator2D,
  StudentCodingIllustration2D,
  AboutStoryIllustration2D
} from "@/components/illustrations/CapablStyle2DIllustrations";
import { TrophySticker, SparkleSticker } from "@/components/stickers/TechStickers";

export default function MissionPage() {
  return (
    <div className="pb-24 space-y-20">
      {/* Hero Header */}
      <section className="relative pt-14 pb-16 bg-gradient-to-b from-[#FFFDF9] via-white to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Our Mission & Core Philosophy</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#202124] tracking-tight leading-[1.1]">
              From Technology Consumers to{" "}
              <span className="relative inline-block mt-1">
                <span className="relative z-10">Creative Builders.</span>
                <span className="absolute left-0 bottom-2 w-full h-3.5 bg-[#F6C900]/80 -z-0 rounded-full" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-gray-700">
              LEARN • BUILD • INNOVATE
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We believe every school student has the innate potential to build something extraordinary. KRE8ECH bridges the gap between passive digital consumption and real-world software creation.
            </p>

            <div className="pt-2 flex flex-wrap gap-3.5">
              <Link
                href="/builder-program"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-sm shadow-sm transition-all"
              >
                <span>Explore the Builder Program</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-200 shadow-xs transition-all"
              >
                <span>The KRE8ECH Experience</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Big Question: The Consumer vs Builder Divide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-black uppercase text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-block">
              The Fundamental Challenge
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#202124] tracking-tight leading-tight">
              Students use technology every minute. But how many know how to build it?
            </h2>

            <p className="text-gray-600 text-base leading-relaxed">
              Today&apos;s teenagers are digital natives. They stream media, chat on interactive apps, explore virtual games, and use digital tools for schoolwork. Yet, their relationship with technology remains almost purely that of a <strong>consumer</strong>.
            </p>

            <p className="text-gray-600 text-base leading-relaxed">
              In most educational setups, computer science is treated like any theoretical subject—focused on rote memorization of syntax, written notebook exams, and outdated exercises. Students rarely get the exhilaration of having an original idea, designing a prototype in Figma, writing responsive code, deploying it to the internet, and showing it off to friends and parents.
            </p>

            <div className="p-5 bg-amber-50/70 rounded-3xl border border-amber-200/60 flex items-center gap-4">
              <TrophySticker size={42} className="shrink-0" />
              <div>
                <p className="text-xs font-black text-[#202124]">A Proven Practical Sandbox</p>
                <p className="text-xs text-gray-700 mt-0.5">
                  Schools provide essential academic foundations; KRE8ECH provides the hands-on innovation laboratory where students turn knowledge into functioning software.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] w-full max-w-md text-center space-y-4">
              <StudentCodingIllustration2D className="w-full h-auto max-h-56 mx-auto" />
              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-black text-[#202124]">The KRE8ECH Laboratory</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Where student curiosity transforms into real digital products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Stage Student Evolution (Detailed Deep Dive) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              Transformational Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#202124]">
              The 4-Stage Builder Evolution
            </h2>
            <p className="text-sm text-gray-600">
              Our structured path guides students through four definitive mindset and technical milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stage 1 */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-xs text-gray-700">
                    01
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
                    Stage 1
                  </span>
                </div>
                <div className="py-2">
                  <StageUser2D className="h-24 mx-auto" />
                </div>
                <h3 className="text-lg font-black text-[#202124] mb-2">Technology User</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Starting as an everyday passive consumer: browsing social media, gaming, and using digital applications without considering how they function.
                </p>
              </div>
              <ul className="text-[11px] text-gray-700 space-y-1.5 border-t border-gray-100 pt-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  Consumes digital products
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  Experiences tech as a black box
                </li>
              </ul>
            </div>

            {/* Stage 2 */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center justify-center font-black text-xs">
                    02
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase">
                    Stage 2
                  </span>
                </div>
                <div className="py-2">
                  <StageExplorer2D className="h-24 mx-auto" />
                </div>
                <h3 className="text-lg font-black text-[#202124] mb-2">Explorer</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Curiosity awakens. Students deconstruct popular applications, understand API requests, experiment with AI tools, and spot daily problem areas.
                </p>
              </div>
              <ul className="text-[11px] text-gray-700 space-y-1.5 border-t border-gray-100 pt-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                  Learns computational logic
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                  Identifies real-world problems
                </li>
              </ul>
            </div>

            {/* Stage 3 */}
            <div className="bg-white p-7 rounded-3xl border border-[#F6C900] shadow-[0_4px_20px_rgba(246,201,0,0.12)] hover:shadow-lg transition-all flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#F6C900] text-[#202124] flex items-center justify-center font-black text-xs shadow-xs">
                    03
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF9E8] text-[#202124] border border-[#F6C900] uppercase">
                    Stage 3
                  </span>
                </div>
                <div className="py-2">
                  <StageBuilder2D className="h-24 mx-auto" />
                </div>
                <h3 className="text-lg font-black text-[#202124] mb-2">Builder</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Translates ideas into working prototypes. Designs wireframes in Figma, writes clean code, integrates AI services, and deploys live web MVPs.
                </p>
              </div>
              <ul className="text-[11px] text-gray-700 space-y-1.5 border-t border-gray-100 pt-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                  Builds functional prototypes
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                  Deploys working software online
                </li>
              </ul>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#121316] text-white p-7 rounded-3xl border border-gray-800 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#F6C900] text-[#202124] font-black text-xs flex items-center justify-center">
                    04
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F6C900] text-[#202124] uppercase">
                    Stage 4
                  </span>
                </div>
                <div className="py-2">
                  <StageInnovator2D className="h-24 mx-auto" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">Innovator</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Takes the stage. Pitches prototypes to mentors and juries at hackathons, solves unaddressed needs in teams, and wins recognition.
                </p>
              </div>
              <ul className="text-[11px] text-gray-300 space-y-1.5 border-t border-gray-800 pt-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                  Pitches on hackathon stages
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900]" />
                  Solves authentic problems
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Tenets of KRE8ECH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-[#202124]">The KRE8ECH Builder Manifesto</h2>
          <p className="text-sm text-gray-500 mt-2">Core principles that define every cohort, challenge, and hackathon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/50 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-lg font-black text-[#202124]">Working Code Over Slides</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Anyone can make a pitch deck with AI buzzwords. We teach students that true innovation comes from shipping something real that people can click, test, and use.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/50 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-lg font-black text-[#202124]">Empathy Before Engineering</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              The most elegant algorithm is worthless if it doesn&apos;t solve a real person&apos;s problem. We teach students to understand user pain points before writing code.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/50 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="text-lg font-black text-[#202124]">Fearless Experimentation</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              In school exams, errors cost marks. In the builder world, errors are how you learn. We encourage students to test bold ideas, break things, debug, and iterate.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#F6C900] via-[#FFD700] to-[#F6C900] rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#202124] text-white text-xs font-black uppercase tracking-wider">
              Join the Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#202124]">
              Ready to transition from consumer to creator?
            </h2>
            <p className="text-sm sm:text-base text-gray-800 font-medium">
              Join the next cohort of our Four-Week Builder Program or bring KRE8ECH to your school.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#202124] hover:bg-black text-white font-extrabold text-xs transition-all shadow-md"
              >
                <span>Register Your Interest</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/experience"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-gray-50 text-[#202124] font-extrabold text-xs transition-all shadow-xs"
              >
                <span>Explore The Experience</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
