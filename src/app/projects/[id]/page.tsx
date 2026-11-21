"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Users,
  Code,
  Sparkles,
  ArrowRight,
  Layers,
  Tag
} from "lucide-react";
import { getProjects } from "@/lib/storage";
import { Project } from "@/types";
import { StudentCodingIllustration2D } from "@/components/illustrations/CapablStyle2DIllustrations";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const all = getProjects();
    const idOrSlug = params.id as string;
    const found = all.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || all[0];
    setProject(found);
    if (found) {
      setRelatedProjects(all.filter((p) => p.id !== found.id).slice(0, 3));
    }
  }, [params.id]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F6C900]" />
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-16">
      {/* Top Navigation Bar */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#202124] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                  {project.category}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {project.status}
                </span>
                {project.builtDuring && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {project.builtDuring}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#202124] tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {project.shortDescription}
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
              <span className="text-xs font-black uppercase text-gray-400 block tracking-wider">
                Live Prototype Access
              </span>

              <div className="space-y-2.5">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs shadow-sm transition-all"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="text-center py-2 px-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500 font-semibold">
                    Live Demo Link Pending Deployment
                  </div>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#202124] hover:bg-black text-white font-bold text-xs transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Source</span>
                  </a>
                )}
              </div>

              {project.teamMembers && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Student Creators
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {project.teamMembers.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Story & Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Visual Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-center">
              <StudentCodingIllustration2D className="w-full h-auto max-h-72 mx-auto" />
            </div>

            {/* Deep Description */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#202124]">
                Project Overview & Solution
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* What this prototype solves */}
            <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-gray-100 space-y-4">
              <h3 className="text-lg font-black text-[#202124] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Key Highlights & Engineering Deliverables</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900] mt-1.5 shrink-0" />
                  <span>Interactive responsive interface designed and tested for both mobile and desktop screens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900] mt-1.5 shrink-0" />
                  <span>Real-time state management and modern component hierarchy written in clean TypeScript.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900] mt-1.5 shrink-0" />
                  <span>Developed and refined during our intensive cohorts with 1-on-1 mentor guidance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6C900] mt-1.5 shrink-0" />
                  <span>Presented live to a panel of technology mentors and student peer builders.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
              <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-600" />
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/70 text-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Build your own project callout */}
            <div className="bg-[#121316] text-white rounded-3xl p-6 sm:p-7 border border-gray-800 shadow-md space-y-3">
              <span className="text-[10px] font-black uppercase text-[#F6C900] tracking-widest block">
                Four-Week Builder Program
              </span>
              <h4 className="text-lg font-black">Want to build projects like this?</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Join our next student cohort. Learn UI design, modern code, and deploy your own live software prototype.
              </p>
              <div className="pt-2">
                <Link
                  href="/register"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs transition-colors"
                >
                  <span>Apply for Next Cohort</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-[#202124]">Explore More Projects</h3>
            <Link
              href="/projects"
              className="text-xs font-bold text-[#202124] hover:underline flex items-center gap-1"
            >
              <span>View all ({getProjects().length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/projects/${rel.id}`}
                className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 inline-block mb-3">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-black text-[#202124] group-hover:text-amber-600 transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
