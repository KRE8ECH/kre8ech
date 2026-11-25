"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, CheckCircle2, X, ArrowRight } from "lucide-react";
import { getProblemStatements } from "@/lib/storage";
import { initialProblemStatements } from "@/data/mockData";
import { ProblemStatement } from "@/types";

export default function ProblemStatementsPage() {
  const [statements, setStatements] = useState<ProblemStatement[]>(initialProblemStatements);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [activeModalStatement, setActiveModalStatement] = useState<ProblemStatement | null>(null);

  useEffect(() => {
    setStatements(getProblemStatements());
  }, []);

  const filteredStatements = statements.filter((ps) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      ps.title.toLowerCase().includes(q) ||
      ps.code.toLowerCase().includes(q) ||
      ps.category.toLowerCase().includes(q) ||
      ps.summary.toLowerCase().includes(q);
    const matchesDifficulty = selectedDifficulty === "All" || ps.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === "All" || ps.status === selectedStatus;
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="pb-20 space-y-12">
      <section className="bg-gradient-to-b from-[#FAF8F2] to-white py-12 border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-medium text-[#6B7280]">Real-World Challenges</span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight">
              Problem Statements Bank
            </h1>
            <p className="text-[#525252] text-base sm:text-lg leading-relaxed">
              Curated challenge briefs across AI, educational technology, campus sustainability, and automation.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FAF8F2] p-4 rounded-xl border border-black/[0.08]">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6B7280] font-medium">Difficulty:</span>
              {["All", "Beginner", "Intermediate", "Advanced"].map((dif) => (
                <button
                  key={dif}
                  type="button"
                  onClick={() => setSelectedDifficulty(dif)}
                  className={`px-3 py-1 rounded-md font-medium ${
                    selectedDifficulty === dif ? "bg-[#202124] text-white" : "bg-white text-[#525252] border border-black/[0.08]"
                  }`}
                >
                  {dif}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#6B7280] font-medium">Status:</span>
              {["All", "Open", "Closed"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-md font-medium ${
                    selectedStatus === st ? "bg-[#202124] text-white" : "bg-white text-[#525252] border border-black/[0.08]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-60">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search statements"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-lg border border-black/[0.12] text-xs text-[#202124] focus:outline-none focus:border-[#202124]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredStatements.map((ps) => (
            <div key={ps.id} className="bg-white rounded-2xl border border-black/[0.08] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-[#202124]">{ps.code}</span>
                    <span className="text-[#6B7280]">• {ps.category}</span>
                  </div>
                  <span className="font-medium text-[#525252]">{ps.difficulty}</span>
                </div>
                <h2 className="text-lg font-semibold text-[#202124] mb-2">{ps.title}</h2>
                <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-4">{ps.summary}</p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs">
                <span className={`font-medium ${ps.status === "Open" ? "text-[#16A34A]" : "text-[#6B7280]"}`}>
                  {ps.status} Submissions
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModalStatement(ps)}
                  className="font-semibold text-[#202124] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeModalStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-black/[0.08] shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#6B7280]">
                  {activeModalStatement.code} • {activeModalStatement.category} • {activeModalStatement.difficulty}
                </span>
                <h2 className="text-xl font-semibold text-[#202124] mt-1">{activeModalStatement.title}</h2>
              </div>
              <button type="button" onClick={() => setActiveModalStatement(null)} className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#202124] mb-1">Background</h4>
              <p className="text-sm text-[#525252] leading-relaxed">{activeModalStatement.background}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#202124] mb-2">Requirements</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#525252]">
                {activeModalStatement.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-black/[0.06] flex justify-end">
              <Link href="/register" className="px-5 py-2 rounded-lg bg-[#F6C900] text-[#202124] font-semibold text-xs">
                Submit Project for this Brief
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
