"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, UserCheck } from "lucide-react";
import { getStudentSession } from "@/lib/storage";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Mission", href: "/mission" },
  { name: "Experience", href: "/experience" },
  { name: "Builder Program", href: "/builder-program" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Hackathons", href: "/hackathons" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Check login state
    const student = getStudentSession();
    setIsStudentLoggedIn(!!student);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-white ${
        scrolled
          ? "border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] py-3"
          : "border-b border-gray-100 py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name (Clean, crisp, authentic wings + bold KRE8ECH with bright yellow 8) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
            title="KRE8ECH — Learn • Build • Innovate"
          >
            
            <div className="flex flex-col justify-center leading-none select-none">
              <span className="text-2xl sm:text-[27px] md:text-[29px] font-black tracking-tight text-[#202124] flex items-center font-sans">
                KRE<span className="text-[#F6C900] text-[26px] sm:text-[30px] md:text-[32px] font-black mx-0.5 -translate-y-0.5">8</span>ECH
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-black tracking-[0.22em] text-gray-500 uppercase mt-0.5">
                LEARN • BUILD • INNOVATE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Clean, modern typography like Capabl - airy, no cluttered gray pill) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm transition-colors duration-150 relative py-1 ${
                    isActive
                      ? "text-[#202124] font-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F6C900] after:rounded-full"
                      : "text-gray-600 font-semibold hover:text-[#202124]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Student Account */}
            {isStudentLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-full text-gray-800 bg-[#FFF9E8] border border-[#F6C900]/50 hover:bg-[#FEF2B8] transition-colors"
              >
                <UserCheck className="w-4 h-4 text-[#202124]" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs sm:text-sm font-bold text-gray-700 hover:text-black transition-colors px-2 py-1"
              >
                Student Login
              </Link>
            )}

            {/* Primary CTA */}
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] shadow-sm hover:shadow transition-all"
            >
              <span> Join KRE8ECH</span>
              <ArrowRight className="w-6.5 h-6.5 stroke-[4.5]" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2.5">
            <Link
              href="/register"
              className="text-xs font-black px-3.5 py-2 rounded-full bg-[#F6C900] text-[#202124] shadow-xs"
            >
              Join KRE8ECH
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#FFF9E8] text-[#202124] font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {isStudentLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-[#FFF9E8] text-[#202124]"
              >
                <UserCheck className="w-4 h-4" />
                <span>Go to Student Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 rounded-xl text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200"
              >
                Student Login
              </Link>
            )}

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-extrabold bg-[#F6C900] text-[#202124] shadow-sm"
            >
              <span>Join KRE8ECH</span>
              <ArrowRight className="w-6.5 h-6.5 stroke-[4.5]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
