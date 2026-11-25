"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";
import { syncToGoogleSheet } from "@/lib/sheetsSync";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "student",
    schoolName: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await syncToGoogleSheet("Contact Enquiries", {
        id: `enq-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        enquiryType: formData.type,
        schoolName: formData.schoolName.trim(),
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-20 space-y-14">
      <section className="bg-gradient-to-b from-[#FAF8F2] to-white py-12 border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-medium text-[#6B7280]">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#202124] tracking-tight">
              Contact &amp; School Collaboration
            </h1>
            <p className="text-[#525252] text-base sm:text-lg leading-relaxed">
              Have questions about the Four-Week Builder Program or want to host a student hackathon at your school? Connect with our coordinator team.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08]">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto" strokeWidth={1.75} />
                <h2 className="text-2xl font-semibold text-[#202124]">Enquiry Received</h2>
                <p className="text-sm text-[#525252] max-w-sm mx-auto">
                  Thank you for reaching out, <strong className="text-[#202124]">{formData.name}</strong>. Our team will follow up within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", type: "student", schoolName: "", message: "" });
                  }}
                  className="px-5 py-2 rounded-lg bg-[#FAF8F2] hover:bg-[#EFE9DF] border border-black/[0.08] text-xs font-medium text-[#202124] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-[#202124]">Send an Enquiry</h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">Fill out the details below and we will reply shortly.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#525252] mb-2">
                    I am getting in touch as a
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
                        className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                          formData.type === t.key
                            ? "bg-[#202124] text-white border-[#202124]"
                            : "bg-white border-black/[0.1] text-[#525252] hover:bg-[#FAF8F2]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#525252] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#525252] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priyanshu@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#525252] mb-1">
                    School / College / Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Modern School, Barakhamba Road"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#525252] mb-1">
                    Message / Specific Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share cohort queries or school collaboration details"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] text-sm focus:outline-none focus:border-[#202124]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-semibold text-sm transition-colors disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Sending..." : "Submit Enquiry"}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </form>
            )}
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F2] rounded-2xl p-6 border border-black/[0.08] space-y-3">
              <span className="text-xs font-medium text-[#6B7280]">For Schools &amp; Institutions</span>
              <h3 className="text-lg font-semibold text-[#202124]">Bring KRE8ECH to Your Campus</h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                We partner with school leadership, computer science faculty, and innovation clubs to run:
              </p>
              <ul className="space-y-2 text-xs text-[#202124] font-medium">
                <li>• In-school hackathons &amp; prototype pitch days</li>
                <li>• AI &amp; modern web development student cohorts</li>
                <li>• Faculty mentoring &amp; computational thinking workshops</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-black/[0.08] space-y-4">
              <h4 className="text-sm font-semibold text-[#202124]">Contact Information</h4>

              <a
                href="https://wa.me/919875721958?text=Hi%20KRE8ECH,%20I%20have%20a%20question%20about%20your%20programs!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Ask on WhatsApp (+91 98757 21958)</span>
              </a>

              <div className="space-y-3 text-xs text-[#525252] pt-1">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div>
                    <span className="font-semibold text-[#202124] block">Official Email</span>
                    <a href="mailto:kre8ech@gmail.com" className="hover:underline">kre8ech@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div>
                    <span className="font-semibold text-[#202124] block">WhatsApp &amp; Phone</span>
                    <a href="tel:+919875721958" className="hover:underline tabular-nums">+91 98757 21958</a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div>
                    <span className="font-semibold text-[#202124] block">Response Hours</span>
                    <span>Monday to Saturday, 10:00 AM – 06:00 PM IST</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div>
                    <span className="font-semibold text-[#202124] block">Program Hub</span>
                    <span>Delhi NCR &amp; Hybrid Online Cohorts Across India</span>
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
