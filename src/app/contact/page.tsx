"use client";

import React, { useState } from "react";
import {
  Mail,
  Building,
  User,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Phone
} from "lucide-react";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "student",
    schoolName: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pb-24 space-y-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFFDF9] via-white to-white py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tight">
              Contact & School Collaboration
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Have questions about the Four-Week Builder Program? Want to organize a student hackathon at your school? We&apos;d love to connect with you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#202124]">Enquiry Received!</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out, <strong>{formData.name}</strong>. A KRE8ECH program coordinator will follow up with you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", type: "student", schoolName: "", message: "" });
                  }}
                  className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-black text-[#202124] mb-1">Send an Enquiry</h3>
                  <p className="text-xs text-gray-400">Fill out the details below and we&apos;ll be in touch.</p>
                </div>

                {/* Enquiry Type Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                    I am getting in touch as a:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "student", label: "Student" },
                      { key: "school", label: "School / Educator" },
                      { key: "mentor", label: "Mentor / Partner" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: t.key })}
                        className={`py-2 rounded-2xl text-xs font-semibold border transition-all ${
                          formData.type === t.key
                            ? "bg-amber-50 text-amber-950 font-bold border-amber-300 shadow-xs"
                            : "bg-white border-gray-200/80 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priyanshu@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    School / College / Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Modern School, Barakhamba Road"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Your Message / Specific Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you'd like to explore, cohort queries, or collaboration details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#202124] shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs sm:text-sm shadow-xs transition-all"
                >
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-amber-200/60 shadow-xs space-y-4">
              <span className="text-[11px] font-bold uppercase text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50 inline-block">
                For Schools & Institutions
              </span>
              <h3 className="text-xl font-black text-[#202124]">
                Bring KRE8ECH to Your Campus
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                We partner with school leadership, computer science faculty, and student innovation clubs to conduct:
              </p>
              <ul className="space-y-2 text-xs font-semibold text-gray-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                  In-school hackathons & prototype pitch days
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                  AI & modern web development student cohorts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                  Faculty mentoring & computational thinking workshops
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-[#202124]">Contact Information</h4>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Quick Support
                </span>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <a
                href="https://wa.me/919875721958?text=Hi%20KRE8ECH,%20I%20have%20a%20question%20about%20your%20programs!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Ask on WhatsApp (+91 98757 21958)</span>
              </a>

              <div className="space-y-3.5 text-xs text-gray-600 pt-1">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#202124] block">Official Email</span>
                    <a href="mailto:kre8ech@gmail.com" className="text-gray-700 hover:text-black font-semibold hover:underline">
                      kre8ech@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#202124] block">WhatsApp & Contact Number</span>
                    <a href="tel:+919875721958" className="text-gray-700 hover:text-black font-semibold hover:underline">
                      +91 98757 21958
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#202124] block">Response Hours</span>
                    <span>Monday to Saturday, 10:00 AM – 06:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#202124] block">Program Hub</span>
                    <span>Delhi NCR & Hybrid Online Cohorts Across India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
