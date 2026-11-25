import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Award, Calendar, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Lightbulb } from "lucide-react";
import { initialAchievements } from "@/data/mockData";

export default function AchievementsPage() {
  const featured = initialAchievements[0];

  return (
    <div className="pb-20 space-y-14">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FAF8F2] to-white py-12 border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-medium text-[#6B7280]">Milestones &amp; Journey</span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight">
              Our Achievements &amp; Story
            </h1>
            <p className="text-[#525252] text-base sm:text-lg leading-relaxed">
              Before launching KRE8ECH to teach students how to build, our team proved our engineering process in live competitive hackathons.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Story: Saksham Hackathon */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-10 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-[#6B7280]">Featured Hackathon Milestone</span>
                <h2 className="text-2xl sm:text-4xl font-semibold text-[#202124] tracking-tight">
                  {featured.featuredHeadline}
                </h2>
                <p className="text-sm sm:text-base font-medium text-[#525252]">
                  {featured.eventName} — {featured.position}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F2] border border-black/[0.06] text-[#202124] tabular-nums">
                  <Calendar className="w-3.5 h-3.5 text-[#6B7280]" strokeWidth={1.75} />
                  <span>{featured.date}</span>
                </span>
                {featured.venue && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F2] border border-black/[0.06] text-[#202124]">
                    <MapPin className="w-3.5 h-3.5 text-[#6B7280]" strokeWidth={1.75} />
                    <span>{featured.venue}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Verified Team Win</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-xl p-4 border border-black/[0.08] space-y-3">
                  <div className="overflow-hidden rounded-lg bg-[#FAF8F2] border border-black/[0.06]">
                    <Image
                      src="/images/saksham-winners.jpg"
                      alt="KRE8ECH team with the Agentic AI Saksham Hackathon Overall Winner cheque"
                      width={1024}
                      height={623}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#202124]">Agentic AI Saksham Hackathon</span>
                    <span className="font-semibold text-[#D4A700]">Overall 1st Position</span>
                  </div>
                </div>

                <div className="bg-[#FAF8F2] rounded-xl p-5 border border-black/[0.08] space-y-3">
                  <h3 className="text-xs font-semibold text-[#202124] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#D4A700]" strokeWidth={1.75} />
                    <span>Awards &amp; Track Honors</span>
                  </h3>
                  <ul className="space-y-2 text-xs font-medium text-[#202124]">
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-black/[0.06]">
                      <Trophy className="w-4 h-4 text-[#D4A700] shrink-0" strokeWidth={1.75} />
                      <span>Overall First Position Champions (Saksham Hackathon)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-black/[0.06]">
                      <Lightbulb className="w-4 h-4 text-[#D4A700] shrink-0" strokeWidth={1.75} />
                      <span>Ideation Track Excellence Recognition</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-black/[0.06]">
                      <Award className="w-4 h-4 text-[#D4A700] shrink-0" strokeWidth={1.75} />
                      <span>Promothon Special Category Award</span>
                    </li>
                    <li className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-black/[0.06]">
                      <Lightbulb className="w-4 h-4 text-[#D4A700] shrink-0" strokeWidth={1.75} />
                      <span>Ideathon First Position</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#202124] mb-2">
                    The Saksham Story: Turning Code into Impact
                  </h3>
                  <p className="text-[#525252] text-sm sm:text-base leading-relaxed">
                    {featured.story}
                  </p>
                </div>

                <div className="bg-[#FAF8F2] p-5 rounded-xl border border-black/[0.08] space-y-3">
                  <span className="text-xs font-semibold text-[#202124]">Project Spotlight: OutreachIQ</span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#525252]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span><strong className="text-[#202124]">Research Agent:</strong> gathers public lead context via DuckDuckGo search and RAG</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span><strong className="text-[#202124]">Personalization &amp; Sequence Agents:</strong> drafts tailored multi-touch outreach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span><strong className="text-[#202124]">Reply &amp; Decision Agents:</strong> classifies responses and escalates to humans when ready</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Python", "Ollama (local LLM)", "DuckDuckGo Search", "RAG", "Multi-Agent Orchestration"].map((chip) => (
                      <span key={chip} className="text-xs px-2.5 py-1 rounded-md bg-white border border-black/[0.06] text-[#202124]">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FAF8F2] p-5 rounded-xl border border-black/[0.08] space-y-2.5">
                  <h4 className="text-xs font-semibold text-[#202124]">Key Lessons Built Into Our Curriculum</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#525252]">
                    {featured.learnings.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ideathon Milestone */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-medium text-[#6B7280]">Ideathon • Verified Milestone</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124]">Ideathon 1st Position</h2>
            <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
              A KRE8ECH team member secured 1st Position in the Ideathon track, highlighting our focus on structured problem discovery before writing code.
            </p>
            <Link
              href="/hackathons"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#202124] hover:bg-black text-white text-xs font-semibold transition-colors"
            >
              <span>Explore Upcoming Hackathons</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] bg-white rounded-xl p-4 border border-black/[0.08]">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-[#FAF8F2]">
                <Image
                  src="/images/ideathon-winner.jpg"
                  alt="KRE8ECH team member receiving 1st Position award at the Ideathon"
                  fill
                  sizes="(max-width: 640px) 100vw, 340px"
                  loading="lazy"
                  className="object-cover object-[center_top]"
                />
              </div>
              <p className="text-xs font-semibold text-[#202124] mt-3">1st Position — Ideathon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
