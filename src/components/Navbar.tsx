"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, UserCheck } from "lucide-react";
import { getStudentSession } from "@/lib/storage";

const navLinks = [
  { name: "Program", href: "/builder-program" },
  { name: "Mission", href: "/mission" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Hackathons", href: "/hackathons" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    setIsStudentLoggedIn(!!getStudentSession());
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b transition-colors duration-150 ${
        scrolled ? "border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04)]" : "border-black/[0.06]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="flex flex-col justify-center leading-none shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] rounded-md"
          title="KRE8ECH — Learn • Build • Innovate"
        >
          <span className="text-[22px] sm:text-2xl font-semibold tracking-tight text-[#202124] flex items-center">
            KRE<span className="text-[#D4A700] font-bold mx-[1px]">8</span>ECH
          </span>
          <span className="text-[9px] font-medium tracking-[0.14em] text-[#6B7280] mt-0.5">
            Learn • Build • Innovate
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-150 relative py-1.5 ${
                  isActive
                    ? "text-[#202124] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F6C900]"
                    : "text-[#525252] font-medium hover:text-[#202124]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isStudentLoggedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-[#202124] bg-[#FAF8F2] border border-black/[0.08] hover:bg-[#F3EFE2] transition-colors duration-150"
            >
              <UserCheck className="w-4 h-4 text-[#525252]" strokeWidth={1.75} />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-[#525252] hover:text-[#202124] transition-colors duration-150 px-2.5 py-1.5"
            >
              Student Login
            </Link>
          )}

          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] transition-colors duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
          >
            <span>Join KRE8ECH</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/register"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-[#F6C900] text-[#202124]"
          >
            Join KRE8ECH
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-[#202124] hover:bg-gray-100 transition-colors border border-black/[0.08]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.75} /> : <Menu className="w-5 h-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/[0.08] bg-white px-4 pt-3 pb-5 space-y-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-[#FAF8F2] text-[#202124] font-semibold border border-[#F6C900]/40"
                      : "text-[#525252] font-medium hover:bg-gray-50 hover:text-[#202124]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2">
            {isStudentLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium bg-[#FAF8F2] border border-black/[0.08] text-[#202124]"
              >
                <UserCheck className="w-4 h-4" strokeWidth={1.75} />
                <span>Go to Student Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 rounded-lg text-sm font-medium text-[#202124] bg-gray-100 hover:bg-gray-200"
              >
                Student Login
              </Link>
            )}

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-[#F6C900] text-[#202124]"
            >
              <span>Join KRE8ECH</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
