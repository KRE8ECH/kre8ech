"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  Github,
  Code,
  Tag,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Filter,
  Plus
} from "lucide-react";
import { getProjects } from "@/lib/storage";
import { Project, ProjectCategory } from "@/types";
import { LaptopSticker, CodeTagSticker } from "@/components/stickers/TechStickers";
import { StudentCodingIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";

const categories: ProjectCategory[] = [
  "All",
  "AI Applications",
  "Web Development",
  "Mobile Applications",
  "Automation",
  "Smart Technology",
  "Prototypes & MVPs",
  "Hackathon Projects",
  "Innovation Projects",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 space-y-12">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider">
                <Code className="w-3.5 h-3.5 text-amber-600" />
                <span>Student Builds & Prototypes</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tight">
                Projects & Build Showcase
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Explore real-world prototypes, web applications, and AI tools built by our student cohorts and hackathon teams. Every project solves a real problem.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <StudentCodingIllustration2D className="w-full h-auto max-h-48 mx-auto" />
                <div className="pt-2.5 border-t border-gray-100 text-center">
                  <span className="text-xs font-black text-[#202124]">Working MVPs & Functional Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls: Search + Categories */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#202124] text-white shadow-xs font-bold"
                    : "bg-gray-100/80 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#202124] shadow-xs"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={project.id}
                className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                      {project.category}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      project.status === "Live Demo"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#202124] mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>
                </div>

                <div>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-200/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      {project.builtDuring || "Builder Cohort"}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs text-gray-500 hover:text-black font-semibold"
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#202124] hover:text-amber-600 transition-colors"
                      >
                        <span>Full Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="p-12 text-center bg-gray-50/80 rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto space-y-4">
            <CodeTagSticker size={56} className="mx-auto" />
            <h3 className="text-base font-bold text-[#202124]">No projects found</h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Try choosing a different category or adjusting your search term. You can also publish new student projects directly from the Admin Panel.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#202124] shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-gray-100 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                  {activeModalProject.category}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {activeModalProject.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124]">
                {activeModalProject.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Built during: {activeModalProject.builtDuring || "KRE8ECH Builder Cohort"}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Detailed Architecture & Overview
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {activeModalProject.fullDescription}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Technologies & Frameworks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-[#202124] border border-gray-200/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {activeModalProject.teamMembers && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Builder Team
                </h4>
                <p className="text-xs text-gray-700 font-medium">
                  {activeModalProject.teamMembers.join(", ")}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2.5 justify-between items-center">
              <Link
                href={`/projects/${activeModalProject.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#202124] hover:text-amber-600 transition-colors"
              >
                <span>Open Dedicated Project Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex flex-wrap gap-2">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#202124] text-xs font-bold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                {activeModalProject.demoUrl && (
                  <a
                    href={activeModalProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] text-xs font-bold shadow-xs transition-all"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
