"use client";

import React from "react";

// =========================================================================
// 1. 2D ILLUSTRATION: STUDENT CODING AT DESK (CAPABL EDTECH STYLE)
// =========================================================================
export const StudentCodingIllustration2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto select-none ${className}`}
  >
    {/* Soft background glow */}
    <circle cx="200" cy="150" r="120" fill="#FFF9E8" />
    <circle cx="200" cy="150" r="90" fill="#FFF3C4" opacity="0.6" />

    {/* Desk Surface */}
    <rect x="50" y="210" width="300" height="12" rx="6" fill="#202124" />
    <rect x="70" y="222" width="10" height="40" rx="3" fill="#E5E7EB" />
    <rect x="320" y="222" width="10" height="40" rx="3" fill="#E5E7EB" />

    {/* Laptop on Desk */}
    <path d="M140 210H260L250 200H150L140 210Z" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1.5" />
    <rect x="155" y="130" width="90" height="70" rx="6" fill="#202124" stroke="#4B5563" strokeWidth="2" />
    <rect x="160" y="135" width="80" height="60" rx="4" fill="#1E1F22" />
    {/* Code Lines on Screen */}
    <rect x="166" y="143" width="28" height="4" rx="2" fill="#F6C900" />
    <rect x="198" y="143" width="22" height="4" rx="2" fill="#38BDF8" />
    <rect x="170" y="152" width="44" height="4" rx="2" fill="#4ADE80" />
    <rect x="170" y="161" width="35" height="4" rx="2" fill="#C084FC" />
    <rect x="174" y="170" width="48" height="4" rx="2" fill="#F6C900" />
    <rect x="166" y="179" width="30" height="4" rx="2" fill="#94A3B8" />

    {/* Coffee Mug on Desk */}
    <rect x="275" y="185" width="18" height="25" rx="4" fill="#F6C900" stroke="#202124" strokeWidth="1.5" />
    <path d="M293 190C298 190 300 196 298 202C296 206 293 206 293 206" stroke="#202124" strokeWidth="2" strokeLinecap="round" />
    <path d="M281 178C281 174 285 172 283 168" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M287 178C287 174 291 172 289 168" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />

    {/* Desk Plant on Left */}
    <path d="M100 195L103 210H117L120 195H100Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
    <circle cx="110" cy="188" r="8" fill="#4ADE80" />
    <circle cx="104" cy="182" r="7" fill="#22C55E" />
    <circle cx="116" cy="182" r="7" fill="#16A34A" />

    {/* Floating 2D Tech Badges */}
    <g transform="translate(80, 80)">
      <rect width="64" height="34" rx="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.04))" />
      <text x="12" y="22" fontFamily="monospace" fontSize="13" fontWeight="bold" fill="#202124">&lt;AI /&gt;</text>
      <circle cx="50" cy="17" r="4" fill="#F6C900" />
    </g>

    <g transform="translate(260, 65)">
      <rect width="68" height="34" rx="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.04))" />
      <circle cx="20" cy="17" r="7" fill="#F6C900" />
      <text x="34" y="21" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#202124">BUILD</text>
    </g>

    {/* Sparkles */}
    <path d="M200 60L202 66L208 68L202 70L200 76L198 70L192 68L198 66L200 60Z" fill="#F6C900" />
    <path d="M340 130L341 134L345 135L341 136L340 140L339 136L335 135L339 134L340 130Z" fill="#F6C900" />
    <path d="M70 140L71 144L75 145L71 146L70 150L69 146L65 145L69 144L70 140Z" fill="#F6C900" />
  </svg>
);

// =========================================================================
// 2. 2D STAGE 1: TECHNOLOGY USER
// =========================================================================
export const StageUser2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="80" cy="60" r="46" fill="#F3F4F6" />
    {/* Smartphone Frame */}
    <rect x="58" y="25" width="44" height="72" rx="9" fill="#202124" />
    <rect x="62" y="32" width="36" height="56" rx="5" fill="#FFFFFF" />
    {/* App Content */}
    <rect x="66" y="37" width="28" height="16" rx="3" fill="#E5E7EB" />
    <circle cx="80" cy="45" r="5" fill="#9CA3AF" />
    {/* Social / Game bars */}
    <rect x="66" y="58" width="18" height="3" rx="1.5" fill="#F6C900" />
    <rect x="66" y="64" width="26" height="3" rx="1.5" fill="#E5E7EB" />
    <rect x="66" y="70" width="22" height="3" rx="1.5" fill="#E5E7EB" />
    {/* Home bar */}
    <rect x="74" y="91" width="12" height="2" rx="1" fill="#FFFFFF" />
    {/* Passive play icon */}
    <circle cx="118" cy="40" r="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
    <path d="M116 36L122 40L116 44V36Z" fill="#F6C900" />
  </svg>
);

// =========================================================================
// 3. 2D STAGE 2: EXPLORER
// =========================================================================
export const StageExplorer2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="80" cy="60" r="46" fill="#FFF9E8" />
    {/* Code Card Background */}
    <rect x="42" y="32" width="58" height="52" rx="8" fill="#FFFFFF" stroke="#FDE047" strokeWidth="2" />
    <rect x="48" y="42" width="22" height="3.5" rx="1.5" fill="#F6C900" />
    <rect x="48" y="50" width="36" height="3.5" rx="1.5" fill="#202124" />
    <rect x="48" y="58" width="28" height="3.5" rx="1.5" fill="#9CA3AF" />
    <rect x="48" y="66" width="18" height="3.5" rx="1.5" fill="#38BDF8" />
    {/* Magnifying Glass */}
    <circle cx="95" cy="56" r="22" fill="#FFFFFF" stroke="#202124" strokeWidth="3" />
    <circle cx="95" cy="56" r="16" fill="#FFF9E8" />
    {/* Circuit node inside lens */}
    <circle cx="95" cy="56" r="4.5" fill="#F6C900" />
    <path d="M88 56H102M95 49V63" stroke="#202124" strokeWidth="1.5" strokeLinecap="round" />
    {/* Handle */}
    <path d="M111 72L126 87" stroke="#202124" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 4. 2D STAGE 3: BUILDER
// =========================================================================
export const StageBuilder2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="80" cy="60" r="46" fill="#FFF3C4" />
    {/* Laptop screen */}
    <rect x="44" y="30" width="72" height="48" rx="6" fill="#202124" />
    <rect x="48" y="34" width="64" height="40" rx="4" fill="#1E1F22" />
    {/* Live code in screen */}
    <rect x="54" y="40" width="20" height="3" rx="1.5" fill="#F6C900" />
    <rect x="54" y="46" width="36" height="3" rx="1.5" fill="#38BDF8" />
    <rect x="54" y="52" width="28" height="3" rx="1.5" fill="#4ADE80" />
    <rect x="54" y="58" width="44" height="3" rx="1.5" fill="#C084FC" />
    {/* Base */}
    <path d="M36 78H124L118 84H42L36 78Z" fill="#D1D5DB" />
    {/* Wrench / Hammer crossed badge */}
    <circle cx="118" cy="42" r="14" fill="#F6C900" stroke="#202124" strokeWidth="2" />
    <path d="M112 48L124 36M114 36L122 48" stroke="#202124" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// =========================================================================
// 5. 2D STAGE 4: INNOVATOR
// =========================================================================
export const StageInnovator2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="80" cy="60" r="46" fill="#202124" />
    {/* Champion Trophy */}
    <path d="M64 42H96V62C96 71 89 78 80 78C71 78 64 71 64 62V42Z" fill="#F6C900" stroke="#D97706" strokeWidth="1.5" />
    <path d="M68 45H92V60C92 67 87 73 80 73C73 73 68 67 68 60V45Z" fill="#FFDE43" />
    {/* Number 1 */}
    <circle cx="80" cy="58" r="8" fill="#FFFFFF" />
    <text x="80" y="62" fontFamily="sans-serif" fontSize="9" fontWeight="900" fill="#202124" textAnchor="middle">1</text>
    {/* Handles */}
    <path d="M64 48H55C50 48 50 62 58 64H64" stroke="#F6C900" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M96 48H105C110 48 110 62 102 64H96" stroke="#F6C900" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Stem & Pedestal */}
    <rect x="76" y="78" width="8" height="10" fill="#D97706" />
    <rect x="66" y="88" width="28" height="8" rx="2" fill="#F6C900" />
    {/* Confetti */}
    <circle cx="48" cy="34" r="2.5" fill="#38BDF8" />
    <circle cx="112" cy="36" r="2.5" fill="#F43F5E" />
    <rect x="52" y="75" width="4" height="4" rx="1" fill="#4ADE80" transform="rotate(30 52 75)" />
    <rect x="108" y="72" width="4" height="4" rx="1" fill="#F6C900" transform="rotate(-20 108 72)" />
  </svg>
);

// =========================================================================
// 6. 2D PILLAR ILLUSTRATIONS (LEARN • BUILD • INNOVATE)
// =========================================================================
export const PillarLearn2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="80" cy="70" r="50" fill="#FFF9E8" />
    {/* Open Book */}
    <path d="M45 85C55 80 70 82 80 88C90 82 105 80 115 85V55C105 50 90 52 80 58C70 52 55 50 45 55V85Z" fill="#FFFFFF" stroke="#202124" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M80 58V88" stroke="#202124" strokeWidth="2.5" />
    {/* AI Brain Circuits floating above */}
    <circle cx="80" cy="40" r="14" fill="#F6C900" stroke="#202124" strokeWidth="2" />
    <path d="M74 40H86M80 34V46" stroke="#202124" strokeWidth="2" strokeLinecap="round" />
    {/* Sparkle */}
    <path d="M115 35L116 38L119 39L116 40L115 43L114 40L111 39L114 38L115 35Z" fill="#F6C900" />
  </svg>
);

export const PillarBuild2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="80" cy="70" r="50" fill="#FFF9E8" />
    {/* Screen window */}
    <rect x="42" y="38" width="76" height="56" rx="8" fill="#FFFFFF" stroke="#202124" strokeWidth="2.5" />
    <rect x="42" y="38" width="76" height="14" rx="6" fill="#202124" />
    <circle cx="50" cy="45" r="2" fill="#F6C900" />
    <circle cx="56" cy="45" r="2" fill="#FFFFFF" />
    {/* Code Brackets in window */}
    <path d="M60 68L54 74L60 80M74 68L80 74L74 80M70 65L64 82" stroke="#F6C900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Gear icon on corner */}
    <circle cx="108" cy="86" r="14" fill="#F6C900" stroke="#202124" strokeWidth="2" />
    <circle cx="108" cy="86" r="5" fill="#FFFFFF" stroke="#202124" strokeWidth="2" />
  </svg>
);

export const PillarInnovate2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="80" cy="70" r="50" fill="#FFF9E8" />
    {/* Rocket flying up */}
    <path d="M80 30C72 40 70 60 70 75H90C90 60 88 40 80 30Z" fill="#FFFFFF" stroke="#202124" strokeWidth="2.5" />
    <path d="M80 30C76 35 73 40 73 45H87C87 40 84 35 80 30Z" fill="#F6C900" />
    <circle cx="80" cy="56" r="5" fill="#F6C900" stroke="#202124" strokeWidth="2" />
    {/* Fins */}
    <path d="M68 65L58 75H70L68 65Z" fill="#202124" />
    <path d="M92 65L102 75H90L92 65Z" fill="#202124" />
    {/* Flame */}
    <path d="M74 77C74 77 72 88 80 94C88 88 86 77 86 77H74Z" fill="#F6C900" stroke="#D97706" strokeWidth="1.5" />
    {/* Stars */}
    <path d="M50 45L51 48L54 49L51 50L50 53L49 50L46 49L49 48L50 45Z" fill="#F6C900" />
    <path d="M112 50L113 53L116 54L113 55L112 58L111 55L108 54L111 53L112 50Z" fill="#F6C900" />
  </svg>
);

// =========================================================================
// 7. 2D ILLUSTRATION: HACKATHON CHAMPION TROPHY (SAKSHAM 1ST POSITION)
// =========================================================================
export const HackathonVictoryIllustration2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 360 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto select-none ${className}`}
  >
    {/* Soft Golden Background Aura */}
    <circle cx="180" cy="140" r="100" fill="#FFF9E8" />
    <circle cx="180" cy="140" r="75" fill="#FEF08A" opacity="0.4" />

    {/* Confetti pieces */}
    <rect x="80" y="45" width="8" height="8" rx="2" fill="#F6C900" transform="rotate(25 80 45)" />
    <rect x="270" y="60" width="7" height="7" rx="2" fill="#38BDF8" transform="rotate(-15 270 60)" />
    <circle cx="100" cy="90" r="4" fill="#F43F5E" />
    <circle cx="260" cy="100" r="4" fill="#10B981" />
    <rect x="90" y="160" width="8" height="4" rx="2" fill="#A855F7" transform="rotate(45 90 160)" />
    <rect x="265" y="165" width="9" height="4" rx="2" fill="#F6C900" transform="rotate(-30 265 165)" />

    {/* Pedestal Base */}
    <rect x="130" y="215" width="100" height="20" rx="6" fill="#202124" />
    <rect x="140" y="195" width="80" height="20" rx="4" fill="#374151" />

    {/* Plate on Pedestal */}
    <rect x="150" y="220" width="60" height="10" rx="2" fill="#F6C900" />
    <text x="180" y="228" fontFamily="sans-serif" fontSize="7" fontWeight="900" fill="#202124" textAnchor="middle">
      1ST POSITION
    </text>

    {/* Golden Trophy Cup */}
    <path
      d="M140 95H220V140C220 162 202 180 180 180C158 180 140 162 140 140V95Z"
      fill="#F6C900"
      stroke="#D97706"
      strokeWidth="2.5"
    />
    <path
      d="M148 100H212V136C212 153 198 168 180 168C162 168 148 153 148 136V100Z"
      fill="#FDE047"
    />

    {/* Number 1 Badge on Trophy */}
    <circle cx="180" cy="132" r="16" fill="#FFFFFF" stroke="#202124" strokeWidth="2" />
    <text x="180" y="139" fontFamily="sans-serif" fontSize="18" fontWeight="900" fill="#202124" textAnchor="middle">
      1
    </text>

    {/* Left Handle */}
    <path
      d="M140 110H120C110 110 110 140 125 145H142"
      stroke="#D97706"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right Handle */}
    <path
      d="M220 110H240C250 110 250 140 235 145H218"
      stroke="#D97706"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Trophy Stem */}
    <rect x="174" y="180" width="12" height="16" fill="#D97706" />

    {/* Sparkle Stars on Trophy */}
    <path d="M215 80L217 84L221 85L217 86L215 90L213 86L209 85L213 84L215 80Z" fill="#F6C900" />
    <path d="M145 75L147 79L151 80L147 81L145 85L143 81L139 80L143 79L145 75Z" fill="#F6C900" />
  </svg>
);

// =========================================================================
// 8. 2D ILLUSTRATION: FOUR-WEEK BUILDER ROADMAP (CAPABL TIMELINE STYLE)
// =========================================================================
export const FourWeekRoadmapIllustration2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 380 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto select-none ${className}`}
  >
    {/* Background Soft Card */}
    <rect x="10" y="10" width="360" height="220" rx="20" fill="#FFFDF8" stroke="#F3F4F6" strokeWidth="2" />

    {/* Timeline Track Line */}
    <path d="M60 120H320" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 120H250" stroke="#F6C900" strokeWidth="4" strokeLinecap="round" />

    {/* Stage 1: Explore */}
    <circle cx="80" cy="120" r="16" fill="#F6C900" stroke="#202124" strokeWidth="2" />
    <text x="80" y="124" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#202124" textAnchor="middle">01</text>
    <text x="80" y="155" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#202124" textAnchor="middle">EXPLORE</text>
    <text x="80" y="170" fontFamily="sans-serif" fontSize="9" fill="#6B7280" textAnchor="middle">Week 1 • Tech & AI</text>

    {/* Stage 2: Ideate */}
    <circle cx="150" cy="120" r="16" fill="#F6C900" stroke="#202124" strokeWidth="2" />
    <text x="150" y="124" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#202124" textAnchor="middle">02</text>
    <text x="150" y="155" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#202124" textAnchor="middle">DESIGN</text>
    <text x="150" y="170" fontFamily="sans-serif" fontSize="9" fill="#6B7280" textAnchor="middle">Week 2 • Problem</text>

    {/* Stage 3: Build */}
    <circle cx="230" cy="120" r="16" fill="#F6C900" stroke="#202124" strokeWidth="2" />
    <text x="230" y="124" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#202124" textAnchor="middle">03</text>
    <text x="230" y="155" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#202124" textAnchor="middle">BUILD</text>
    <text x="230" y="170" fontFamily="sans-serif" fontSize="9" fill="#6B7280" textAnchor="middle">Week 3 • Prototype</text>

    {/* Stage 4: Compete (Offline Hackathon) */}
    <circle cx="300" cy="120" r="18" fill="#202124" stroke="#F6C900" strokeWidth="3" />
    <text x="300" y="124" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#F6C900" textAnchor="middle">04</text>
    <text x="300" y="155" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#202124" textAnchor="middle">HACKATHON</text>
    <text x="300" y="170" fontFamily="sans-serif" fontSize="9" fill="#F59E0B" fontWeight="bold" textAnchor="middle">Offline Sprint 🏆</text>

    {/* Top Indicator Cards */}
    <g transform="translate(60, 35)">
      <rect width="110" height="26" rx="13" fill="#FFF9E8" stroke="#F6C900" strokeWidth="1.5" />
      <text x="55" y="17" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#202124" textAnchor="middle">11 Online Days (90m)</text>
    </g>

    <g transform="translate(210, 35)">
      <rect width="110" height="26" rx="13" fill="#202124" />
      <text x="55" y="17" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#F6C900" textAnchor="middle">1 Offline Hackathon</text>
    </g>
  </svg>
);

// =========================================================================
// 9. 2D ILLUSTRATION: HACKATHON ARENA (FOR HACKATHONS PAGE)
// =========================================================================
export const HackathonArenaIllustration2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <rect x="10" y="10" width="380" height="200" rx="20" fill="#FFFDF8" stroke="#F3F4F6" strokeWidth="2" />
    {/* Stage in Background */}
    <rect x="70" y="30" width="260" height="36" rx="10" fill="#202124" />
    <rect x="130" y="42" width="140" height="12" rx="6" fill="#F6C900" />
    <text x="200" y="51" fontFamily="sans-serif" fontSize="8" fontWeight="900" fill="#202124" textAnchor="middle">
      KRE8ECH HACKATHON ARENA
    </text>
    {/* Team Desks */}
    {/* Team A */}
    <g transform="translate(50, 95)">
      <rect width="85" height="50" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <rect x="25" y="14" width="35" height="22" rx="3" fill="#202124" />
      <rect x="28" y="17" width="29" height="16" rx="2" fill="#F6C900" />
      <text x="42.5" y="45" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#6B7280" textAnchor="middle">Team Alpha</text>
    </g>
    {/* Team B */}
    <g transform="translate(158, 95)">
      <rect width="85" height="50" rx="8" fill="#FFF9E8" stroke="#F6C900" strokeWidth="1.5" />
      <rect x="25" y="14" width="35" height="22" rx="3" fill="#202124" />
      <rect x="28" y="17" width="29" height="16" rx="2" fill="#38BDF8" />
      <text x="42.5" y="45" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#D97706" textAnchor="middle">Team Innovators</text>
    </g>
    {/* Team C */}
    <g transform="translate(265, 95)">
      <rect width="85" height="50" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <rect x="25" y="14" width="35" height="22" rx="3" fill="#202124" />
      <rect x="28" y="17" width="29" height="16" rx="2" fill="#4ADE80" />
      <text x="42.5" y="45" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#6B7280" textAnchor="middle">Team Builders</text>
    </g>
    {/* Timer Badge */}
    <g transform="translate(150, 160)">
      <rect width="100" height="28" rx="14" fill="#202124" />
      <circle cx="165" cy="174" r="3" fill="#EF4444" />
      <text x="204" y="177" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#F6C900" textAnchor="middle">
        02:45:00 SPRINT
      </text>
    </g>
  </svg>
);

// =========================================================================
// 10. 2D ILLUSTRATION: ABOUT BUILDER STORY
// =========================================================================
export const AboutStoryIllustration2D: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto select-none ${className}`}>
    <circle cx="190" cy="130" r="105" fill="#FFF9E8" />
    <circle cx="190" cy="130" r="80" fill="#FEF08A" opacity="0.3" />

    {/* Central Code Portal Screen */}
    <rect x="90" y="60" width="200" height="135" rx="14" fill="#202124" stroke="#4B5563" strokeWidth="2.5" />
    <rect x="95" y="65" width="190" height="125" rx="10" fill="#18191B" />
    {/* Window Controls */}
    <circle cx="112" cy="78" r="3.5" fill="#FF5F56" />
    <circle cx="122" cy="78" r="3.5" fill="#FFBD2E" />
    <circle cx="132" cy="78" r="3.5" fill="#27C93F" />
    <text x="190" y="81" fontFamily="monospace" fontSize="8" fill="#9CA3AF" textAnchor="middle">kre8ech-student-lab.ts</text>

    {/* Code Lines inside */}
    <rect x="110" y="96" width="60" height="5" rx="2.5" fill="#F6C900" />
    <rect x="175" y="96" width="45" height="5" rx="2.5" fill="#38BDF8" />
    <rect x="110" y="108" width="95" height="5" rx="2.5" fill="#4ADE80" />
    <rect x="110" y="120" width="75" height="5" rx="2.5" fill="#C084FC" />
    <rect x="110" y="132" width="120" height="5" rx="2.5" fill="#FDE047" />
    <rect x="110" y="144" width="50" height="5" rx="2.5" fill="#94A3B8" />

    {/* Floating Badges */}
    <g transform="translate(50, 40)">
      <rect width="65" height="30" rx="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))" />
      <text x="32.5" y="19" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#202124" textAnchor="middle">LEARN</text>
    </g>
    <g transform="translate(265, 45)">
      <rect width="65" height="30" rx="10" fill="#F6C900" stroke="#D97706" strokeWidth="1.5" filter="drop-shadow(0 4px 10px rgba(246,201,0,0.2))" />
      <text x="32.5" y="19" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#202124" textAnchor="middle">BUILD</text>
    </g>
    <g transform="translate(155, 205)">
      <rect width="80" height="32" rx="12" fill="#202124" stroke="#F6C900" strokeWidth="2" />
      <text x="40" y="20" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#F6C900" textAnchor="middle">INNOVATE</text>
    </g>
  </svg>
);
