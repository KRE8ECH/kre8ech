import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/FloatingWhatsAppButton";

export default function Footer() {
  return (
    <footer className="bg-[#141415] text-[#EDEDED] border-t border-white/[0.08] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-10 border-b border-white/[0.08]">
          {/* Brand Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none" title="KRE8ECH — Learn • Build • Innovate">
              <div className="flex flex-col leading-none select-none">
                <span className="text-2xl font-semibold tracking-tight text-white flex items-center">
                  KRE<span className="text-[#F6C900] font-bold mx-[1px]">8</span>ECH
                </span>
                <span className="text-[10px] font-medium tracking-[0.14em] text-[#A1A1A6] mt-1">
                  Learn • Build • Innovate
                </span>
              </div>
            </Link>

            <p className="text-[#A1A1A6] text-sm max-w-sm leading-relaxed">
              Helping school and college students transition from passive technology consumers to creative builders through structured cohorts, AI workflows, and offline hackathons.
            </p>

            <div className="pt-1 space-y-2 text-xs text-[#D4D4D8]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F6C900] shrink-0" strokeWidth={1.75} />
                <a href="mailto:kre8ech@gmail.com" className="hover:text-[#F6C900] transition-colors font-medium">
                  kre8ech@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F6C900] shrink-0" strokeWidth={1.75} />
                <a href="tel:+919875721958" className="hover:text-[#F6C900] transition-colors font-medium tabular-nums">
                  +91 98757 21958
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919875721958?text=Hi%20KRE8ECH,%20I%20have%20a%20question%20about%20your%20programs!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs transition-colors duration-150"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Program */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">Programs</h4>
            <ul className="space-y-2 text-sm text-[#A1A1A6]">
              <li>
                <Link href="/builder-program" className="hover:text-white transition-colors">
                  12-Day Builder Program
                </Link>
              </li>
              <li>
                <Link href="/mission" className="hover:text-white transition-colors">
                  Our Mission &amp; Evolution
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-white transition-colors">
                  The KRE8ECH Experience
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-[#F6C900] font-medium inline-flex items-center gap-1 hover:underline">
                  <span>School Registration</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
              </li>
              <li>
                <Link href="/register/hackready" className="hover:text-white transition-colors">
                  Hackready College Workshop
                </Link>
              </li>
            </ul>
          </div>

          {/* Innovation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">Innovation</h4>
            <ul className="space-y-2 text-sm text-[#A1A1A6]">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Student Build Showcase
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-white transition-colors">
                  Saksham 1st Position Story
                </Link>
              </li>
              <li>
                <Link href="/hackathons" className="hover:text-white transition-colors">
                  Hackathons &amp; Challenges
                </Link>
              </li>
              <li>
                <Link href="/problem-statements" className="hover:text-white transition-colors">
                  Problem Statements Bank
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">Community</h4>
            <ul className="space-y-2 text-sm text-[#A1A1A6]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About KRE8ECH
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  School Collaborations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Enquiries
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Student Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#85858B] gap-4">
          <p className="tabular-nums">© {new Date().getFullYear()} KRE8ECH. Built for student innovators.</p>
          <div className="flex items-center gap-6">
            <span>Cohorts open for Class 9 onwards &amp; College</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About &amp; Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
