import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart, Sparkles, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";

export default function Footer() {
  return (
    <footer className="bg-[#121316] text-white border-t border-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none" title="KRE8ECH — Learn • Build • Innovate">
              <div className="flex items-center gap-2.5 sm:gap-3">
               
                
                <div className="flex flex-col justify-center leading-none select-none">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center font-sans">
                    KRE<span className="text-[#F6C900] text-[26px] sm:text-[32px] font-black mx-0.5 -translate-y-0.5">8</span>ECH
                  </span>
                  <span className="text-[8px] sm:text-[9.5px] font-black tracking-[0.22em] text-gray-400 uppercase mt-1">
                    LEARN • BUILD • INNOVATE
                  </span>
                </div>
              </div>
            </Link>

            <div className="inline-block px-3 py-1 rounded-full bg-[#F6C900]/10 border border-[#F6C900]/30 text-[#F6C900] text-xs font-bold tracking-wider">
              LEARN • BUILD • INNOVATE
            </div>

            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Helping school students transition from passive technology consumers to active, creative technology builders through structured cohorts, AI tools, and hands-on hackathons.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cohorts starting for Class 9 onwards</span>
            </div>

            {/* Direct Contact Details */}
            <div className="pt-3 space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F6C900] shrink-0" />
                <a href="mailto:kre8ech@gmail.com" className="hover:text-[#F6C900] transition-colors font-semibold">
                  kre8ech@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F6C900] shrink-0" />
                <a href="tel:+919875721958" className="hover:text-[#F6C900] transition-colors font-semibold">
                  +91 98757 21958 (Contact & WhatsApp)
                </a>
              </div>
              <div className="pt-1.5">
                <a
                  href="https://wa.me/919875721958?text=Hi%20KRE8ECH,%20I%20have%20a%20question%20about%20your%20programs!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs shadow-md transition-all hover:scale-105"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Program */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">Builder Program</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/mission" className="hover:text-[#F6C900] transition-colors">
                  Our Mission & Evolution
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#F6C900] transition-colors">
                  The KRE8ECH Experience
                </Link>
              </li>
              <li>
                <Link href="/builder-program" className="hover:text-[#F6C900] transition-colors">
                  12-Day Curriculum
                </Link>
              </li>
              <li>
                <Link href="/builder-program#offline-hackathon" className="hover:text-[#F6C900] transition-colors">
                  Offline Hackathon Day
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-[#F6C900] font-semibold flex items-center gap-1 hover:underline">
                  <span>Register Interest</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Innovation & Hackathons */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">Innovation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/projects" className="hover:text-[#F6C900] transition-colors">
                  Student Build Showcase
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-[#F6C900] transition-colors">
                  Milestones & Hackathon Wins
                </Link>
              </li>
              <li>
                <Link href="/hackathons" className="hover:text-[#F6C900] transition-colors">
                  Hackathons & Challenges
                </Link>
              </li>
              <li>
                <Link href="/problem-statements" className="hover:text-[#F6C900] transition-colors">
                  Problem Statements Bank
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-[#F6C900] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6C900]" />
                  <span>Saksham 1st Position Story</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide uppercase">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-[#F6C900] transition-colors">
                  About KRE8ECH
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F6C900] transition-colors">
                  School Collaborations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F6C900] transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#F6C900] transition-colors">
                  Student Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} KRE8ECH. All rights reserved. Built for school innovators.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for curious student minds
            </span>
            <Link href="/about" className="hover:underline">Privacy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
