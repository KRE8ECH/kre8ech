"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Sparkles,
  FileText,
  Layers,
  Tag
} from "lucide-react";
import { getProblemStatements } from "@/lib/storage";
import { ProblemStatement } from "@/types";

export default function ProblemStatementsPage() {
  const [statements, setStatements] = useState<ProblemStatement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [activeModalStatement, setActiveModalStatement] = useState<ProblemStatement | null>(null);

  useEffect(() => {
    setStatements(getProblemStatements());
  }, []);

  const filteredStatements = statements.filter((ps) => {
    const matchesSearch =
      ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "All" || ps.difficulty === selectedDifficulty;
    const matchesStatus =
      selectedStatus === "All" || ps.status === selectedStatus;
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="pb-24 space-y-12">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Real-World Challenges</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tight">
              Problem Statements Bank
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Carefully curated challenge briefs spanning AI, educational technology, campus sustainability, and automation. Choose a problem, form a team, and build a solution.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter & List Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/80 p-3 sm:p-4 rounded-3xl border border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
              <span className="text-gray-400 mr-1">Difficulty:</span>
              {["All", "Beginner", "Intermediate", "Advanced"].map((dif) => (
                <button
                  key={dif}
                  onClick={() => setSelectedDifficulty(dif)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedDifficulty === dif
                      ? "bg-[#202124] text-white shadow-xs font-bold"
                      : "bg-white text-gray-600 border border-gray-200/60 hover:bg-gray-100"
                  }`}
                >
                  {dif}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 text-xs font-bold text-gray-700 ml-0 sm:ml-4">
              <span className="text-gray-400 mr-1">Status:</span>
              {["All", "Open", "Closed"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedStatus === st
                      ? "bg-[#202124] text-white shadow-xs font-bold"
                      : "bg-white text-gray-600 border border-gray-200/60 hover:bg-gray-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-60">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search statements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white rounded-full border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#202124] shadow-xs"
            />
          </div>
        </div>

        {/* Problem Statements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStatements.map((ps) => (
            <div
              key={ps.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                      {ps.code}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                      {ps.category}
                    </span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    ps.difficulty === "Beginner"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : ps.difficulty === "Intermediate"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}>
                    {ps.difficulty}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#202124] mb-2 leading-snug">
                  {ps.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {ps.summary}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className={`font-semibold flex items-center gap-1.5 ${
                    ps.status === "Open" ? "text-emerald-700" : "text-gray-400"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      ps.status === "Open" ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                    }`} />
                    {ps.status} Submissions
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveModalStatement(ps)}
                    className="font-bold text-[#202124] hover:underline flex items-center gap-1"
                  >
                    <span>Read Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Statement Modal */}
      {activeModalStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-gray-100 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              type="button"
              onClick={() => setActiveModalStatement(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {activeModalStatement.code}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                  {activeModalStatement.category}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {activeModalStatement.difficulty}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124]">
                {activeModalStatement.title}
              </h2>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Problem Background & Context
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {activeModalStatement.background}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Solution Requirements
              </h4>
              <ul className="space-y-1 text-xs sm:text-sm text-gray-700">
                {activeModalStatement.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Expected Deliverables
              </h4>
              <ul className="space-y-1 text-xs text-gray-700 font-medium">
                {activeModalStatement.expectedDeliverables.map((deliv, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {activeModalStatement.hackathonName || "Open Builder Challenge"}
              </span>
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-bold text-xs shadow-xs"
              >
                Submit Project for this PS
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
