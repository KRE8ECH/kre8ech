"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, X, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { getProjects } from "@/lib/storage";
import { initialProjects } from "@/data/mockData";
import { Project, ProjectCategory } from "@/types";
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
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.shortDescription.toLowerCase().includes(q) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20 space-y-12">
      <section className="bg-gradient-to-b from-[#FAF8F2] to-white py-12 border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-medium text-[#6B7280]">Student Builds &amp; Prototypes</span>
              <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight">
                Projects &amp; Build Showcase
              </h1>
              <p className="text-[#525252] text-base sm:text-lg leading-relaxed">
                Explore real prototypes, web apps, and AI tools built by our student cohorts and hackathon teams.
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-black/[0.08] text-center">
                <StudentCodingIllustration2D className="w-full h-auto max-h-44 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#202124] text-white"
                    : "bg-[#FAF8F2] text-[#525252] border border-black/[0.06] hover:text-[#202124]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-64 shrink-0">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-black/[0.12] text-xs sm:text-sm text-[#202124] focus:outline-none focus:border-[#202124]"
            />
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={project.id}
                className="bg-white rounded-2xl border border-black/[0.08] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-medium text-[#6B7280]">{project.category}</span>
                    <span className="font-medium text-[#16A34A]">{project.status}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-[#202124] mb-2">{project.title}</h2>
                  <p className="text-xs sm:text-sm text-[#525252] leading-relaxed mb-5">
                    {project.shortDescription}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F2] text-[#525252] border border-black/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[#6B7280]">{project.builtDuring || "Builder Cohort"}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-[#525252] hover:text-[#202124] font-medium"
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1 font-semibold text-[#202124] hover:underline"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-[#FAF8F2] rounded-2xl border border-black/[0.08] max-w-lg mx-auto space-y-3">
            <h3 className="text-base font-semibold text-[#202124]">No matching projects</h3>
            <p className="text-xs sm:text-sm text-[#525252]">
              Try selecting another category or clearing your search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-white border border-black/[0.1] text-xs font-medium text-[#202124]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-black/[0.08] shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs text-[#6B7280]">{activeModalProject.category} • {activeModalProject.status}</span>
                <h2 className="text-2xl font-semibold text-[#202124] mt-1">{activeModalProject.title}</h2>
              </div>
              <button type="button" onClick={() => setActiveModalProject(null)} className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed">{activeModalProject.fullDescription}</p>
            <div className="flex flex-wrap gap-1.5">
              {activeModalProject.technologies.map((tech) => (
                <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-black/[0.06] text-[#202124]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-3 border-t border-black/[0.06] flex flex-wrap gap-3">
              {activeModalProject.demoUrl && (
                <a
                  href={activeModalProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F6C900] text-[#202124] text-xs font-semibold"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#202124] text-white text-xs font-medium"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              <Link
                href={`/projects/${activeModalProject.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF8F2] border border-black/[0.08] text-xs font-medium text-[#202124]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Full Specs Page</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
