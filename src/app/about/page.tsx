import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  Trophy,
  CheckCircle2,
  Users,
  Target,
  Rocket,
  ArrowRight
} from "lucide-react";
import {
  LaptopSticker,
  RocketSticker,
  TrophySticker,
  LightbulbSticker
} from "@/components/stickers/TechStickers";
import { AboutStoryIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";

export default function AboutPage() {
  return (
    <div className="pb-24 space-y-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>About KRE8ECH</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#202124] tracking-tight leading-tight">
              From Curious Minds to Creative Builders.
            </h1>

            <p className="text-xl font-bold text-gray-800">
              LEARN • BUILD • INNOVATE
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              KRE8ECH is a student-focused technology, innovation, and project-building initiative designed to help young minds make the leap from passive technology consumers to active digital creators.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Mission & Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-black uppercase text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-block">
              Our Genesis
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight">
              Why We Started KRE8ECH
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every day, young students spend hours on smartphones, tablets, and computers. They play games, browse feeds, watch videos, and use digital tools. But very few are ever shown how to open up the engine, look under the hood, and build something themselves.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We realized that the barrier wasn&apos;t intelligence or curiosity—it was the lack of an approachable, hands-on bridge. Traditional computer science in schools often gets bogged down in rote syntax and theoretical exams.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              KRE8ECH was conceived to give students a vibrant, supportive sandbox where they can discover modern tools like artificial intelligence, design systems, and frontend frameworks, and build real projects they can be proud of.
            </p>

            <div className="p-5 bg-amber-50/70 rounded-3xl border border-amber-200/60 flex items-center gap-4">
              <TrophySticker size={42} className="shrink-0" />
              <div>
                <p className="text-xs font-black text-[#202124]">Grounded in Real Competition</p>
                <p className="text-xs text-gray-700 mt-0.5">
                  Our methods originate from our own competitive hackathon wins—including securing <strong>1st Position overall at the Agentic AI Saksham Hackathon</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center space-y-5 w-full max-w-md">
              <AboutStoryIllustration2D className="w-full h-auto max-h-48 mx-auto" />

              <div className="py-2 px-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center justify-center">
                <Image
                  src="/images/kre8ech-logo-light.png"
                  alt="KRE8ECH Official Brand"
                  width={180}
                  height={50}
                  className="h-9 w-auto object-contain"
                />
              </div>

              <div className="space-y-2 text-left">
                <h4 className="text-sm font-black text-[#202124]">Core Tenets</h4>
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hands-on building over passive listening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>User empathy before writing code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-world problem discovery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Confidence to pitch on stage</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-400">
                  Initiative for School Students (Class 9 onwards)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-[#202124]">What Drives Us</h2>
          <p className="text-sm text-gray-500 mt-2">The fundamental values behind every cohort and hackathon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/50 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-lg font-black text-[#202124]">Relentless Curiosity</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We encourage students to question everything: why does an algorithm rank a video? How does an LLM predict tokens? How does a payment gateway settle money? Curiosity is the seed of innovation.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/50 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-lg font-black text-[#202124]">Craft & Pragmatism</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Ideas are cheap; execution is everything. We value working prototypes over theoretical slides. We teach students how to write clean code, handle edge cases, and design pleasant user interfaces.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/50 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="text-lg font-black text-[#202124]">Community & Respect</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Building great software is a team sport. We cultivate an inclusive, supportive environment where peers debug each other&apos;s code, celebrate wins, and inspire one another to push further.
            </p>
          </div>
        </div>
      </section>

      {/* School Partnerships Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-xl text-center max-w-3xl mx-auto space-y-5">
          <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#F6C900] text-[#202124] uppercase tracking-wider inline-block">
            For Educators & School Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">Partner with KRE8ECH</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Bring structured project cohorts, artificial intelligence sandboxes, and in-house hackathons directly to your students. We work with forward-thinking schools to nurture the next generation of builders.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs transition-colors"
            >
              <span>Explore School Collaboration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
