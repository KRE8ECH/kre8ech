"use client";

import React, { useState, useEffect } from "react";

// =========================================================================
// 1. ANIMATED LAPTOP: ONLY RUNS CODE ON CLICK!
// =========================================================================
export const AnimatedLaptop: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

  const codeLines = [
    { text: "const student = new Kre8ech();", color: "text-amber-300" },
    { text: "await student.learn('AI + Web');", color: "text-sky-300" },
    { text: "const app = await student.build();", color: "text-emerald-300" },
    { text: "app.deploy('Saksham Hackathon 🏆');", color: "text-purple-300" },
    { text: "> [OK] Prototype Live in 18ms ✨", color: "text-[#F6C900]" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setActiveLine((prev) => {
          if (prev >= codeLines.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isRunning, codeLines.length]);

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleToggle()}
      className="group relative cursor-pointer select-none transition-all duration-200 active:scale-95"
      title="Click to run live code!"
    >
      <div className="relative p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:border-amber-400 hover:shadow-md transition-all w-60 sm:w-64">
        {/* Top Window Bar */}
        <div className="bg-[#1E1F22] rounded-t-xl px-3 py-1.5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
            <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`} />
            <span>builder.ts</span>
          </div>
        </div>

        {/* Screen Content */}
        <div className="bg-[#121316] p-2.5 font-mono text-[10px] leading-relaxed space-y-1 h-24 overflow-hidden relative">
          {!isRunning ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-1">
              <span className="text-[#F6C900] text-sm">▶</span>
              <p className="text-[11px] font-bold text-gray-200">Click to Run Code</p>
              <p className="text-[9px] text-gray-500">Live student code execution</p>
            </div>
          ) : (
            codeLines.map((line, idx) => (
              <div
                key={idx}
                className={`transition-all duration-200 flex items-center gap-1.5 ${
                  idx === activeLine
                    ? `${line.color} font-bold translate-x-0.5`
                    : idx < activeLine
                    ? "text-gray-400 opacity-70"
                    : "text-gray-600 opacity-30"
                }`}
              >
                <span className="text-[9px] text-gray-600 select-none">0{idx + 1}</span>
                <span className="truncate">{line.text}</span>
                {idx === activeLine && (
                  <span className="inline-block w-1.5 h-3 bg-[#F6C900] animate-cursor-blink ml-0.5" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Laptop Keyboard Base */}
        <div className="bg-[#E2E2E6] h-3 rounded-b-xl border-t border-[#D1D1D6] relative flex items-center justify-center shadow-inner">
          <div className="w-10 h-1 bg-[#B0B0B8] rounded-full" />
        </div>

        {/* Bottom Interactive Click Pill */}
        <div className="mt-2.5 flex items-center justify-center">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
            isRunning 
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-[#FFF9E8] text-[#202124] border-[#F6C900]"
          }`}>
            {isRunning ? "● Running (Click to Pause)" : "▶ Click to Run Code"}
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. INTERACTIVE LIGHTBULB: ONLY TOGGLES ON CLICK!
// =========================================================================
export const InteractiveBulb: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleBulb = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div
      onClick={toggleBulb}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && toggleBulb()}
      className="group relative cursor-pointer select-none transition-transform duration-200 active:scale-95"
      title={`Click to turn bulb ${isOn ? "OFF" : "ON"}!`}
    >
      <div
        className={`relative p-3.5 rounded-2xl transition-all duration-300 border flex flex-col items-center justify-center w-36 sm:w-44 text-center ${
          isOn
            ? "bg-amber-50/90 border-[#F6C900] shadow-[0_0_24px_rgba(246,201,0,0.35)]"
            : "bg-white border-gray-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:border-amber-300"
        }`}
      >
        <svg
          width={54}
          height={54}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-300 ${isOn ? "animate-bulb-glow scale-105" : "scale-100 opacity-60"}`}
        >
          {/* Light Rays - ONLY VISIBLE WHEN CLICKED ON */}
          {isOn && (
            <g className="transition-opacity duration-300">
              <line x1="50" y1="8" x2="50" y2="16" stroke="#F6C900" strokeWidth="3" strokeLinecap="round" />
              <line x1="22" y1="22" x2="28" y2="28" stroke="#F6C900" strokeWidth="3" strokeLinecap="round" />
              <line x1="78" y1="22" x2="72" y2="28" stroke="#F6C900" strokeWidth="3" strokeLinecap="round" />
              <line x1="12" y1="46" x2="20" y2="46" stroke="#F6C900" strokeWidth="3" strokeLinecap="round" />
              <line x1="88" y1="46" x2="80" y2="46" stroke="#F6C900" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* Bulb Glass */}
          <path
            d="M34 54C28 48 26 41 28 34C30 23 40 19 50 19C60 19 70 23 72 34C74 41 72 48 66 54L62 66H38L34 54Z"
            fill={isOn ? "#F6C900" : "#E5E7EB"}
            className="transition-colors duration-300"
          />
          <path
            d="M38 52C34 47 33 42 34 36C36 26 44 23 50 23C56 23 64 26 66 36C67 42 66 47 62 52L59 63H41L38 52Z"
            fill={isOn ? "#FFDF43" : "#F3F4F6"}
            className="transition-colors duration-300"
          />

          {/* Filament */}
          <path
            d="M44 44C44 40 47 37 50 37C53 37 56 40 56 44V60M44 60H56"
            stroke={isOn ? "#202124" : "#9CA3AF"}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-colors duration-300"
          />

          {/* Base */}
          <rect x="40" y="66" width="20" height="5" rx="1.5" fill={isOn ? "#E2E2E6" : "#D1D5DB"} />
          <rect x="42" y="72" width="16" height="4" rx="1.5" fill="#202124" />
          <path d="M45 76H55C55 79 45 79 45 76Z" fill="#202124" />
        </svg>

        {/* Action Prompt Pill */}
        <div className="mt-2.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
              isOn
                ? "bg-[#FFF9E8] text-[#202124] border-[#F6C900]"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {isOn ? "💡 Idea Sparked! (Click Off)" : "🌙 Click to Turn ON"}
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. ANIMATED ROCKET: ONLY FIRES AND ORBITS ON CLICK (STRICTLY CONTAINED)!
// =========================================================================
export const AnimatedRocket: React.FC = () => {
  const [isFiring, setIsFiring] = useState(false);

  const handleLaunch = () => {
    if (isFiring) return;
    setIsFiring(true);
    // Smooth contained launch flight for 4.2 seconds, then docks cleanly back
    setTimeout(() => {
      setIsFiring(false);
    }, 4200);
  };

  return (
    <div
      onClick={handleLaunch}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleLaunch()}
      className="group relative cursor-pointer select-none transition-transform duration-200 active:scale-95"
      title="Click to launch rocket on curved orbit!"
    >
      <div
        className={`relative p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center w-36 sm:w-44 text-center overflow-hidden ${
          isFiring
            ? "bg-amber-50/90 border-[#F6C900] shadow-[0_0_24px_rgba(246,201,0,0.35)]"
            : "bg-white border-gray-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:border-amber-300"
        }`}
      >
        <div className={`transition-transform duration-500 ${isFiring ? "animate-rocket-curve" : "transform translate-y-0"}`}>
          <svg
            width={58}
            height={70}
            viewBox="0 0 100 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* THRUSHTER FIRE - ONLY ANIMATES WHEN CLICKED! */}
            {isFiring && (
              <g className="animate-flame">
                <path d="M42 74C42 74 38 92 50 104C62 92 58 74 58 74H42Z" fill="#FF6A00" />
                <path d="M45 74C45 74 43 88 50 96C57 88 55 74 55 74H45Z" fill="#F6C900" />
                <circle cx="50" cy="80" r="3" fill="#FFFFFF" />
              </g>
            )}

            {/* Spark Particles during flight */}
            {isFiring && (
              <>
                <circle cx="48" cy="98" r="2" fill="#FF9900" className="animate-spark-1" />
                <circle cx="53" cy="102" r="1.5" fill="#F6C900" className="animate-spark-2" />
              </>
            )}

            {/* Fins */}
            <path d="M34 56L22 68C21 69.5 22 72 24 72H38L35 56H34Z" fill="#202124" />
            <path d="M66 56L78 68C79 69.5 78 72 76 72H62L65 56H66Z" fill="#202124" />

            {/* Fuselage */}
            <path
              d="M50 14C37 28 37 54 37 70H63C63 54 63 28 50 14Z"
              fill="#FFFFFF"
              stroke="#D1D5DB"
              strokeWidth="1.5"
            />
            {/* Nose Tip */}
            <path d="M50 14C45 21 41 28 40 34H60C59 28 55 21 50 14Z" fill="#F6C900" />
            {/* Porthole */}
            <circle cx="50" cy="46" r="8" fill="#FFFDF8" stroke="#202124" strokeWidth="2" />
            <circle cx="50" cy="46" r="4" fill="#F6C900" />
          </svg>
        </div>

        {/* Action Prompt Pill */}
        <div className="mt-2.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
              isFiring
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : "bg-[#FFF9E8] text-[#202124] border-[#F6C900]"
            }`}
          >
            {isFiring ? "🚀 Orbiting (4s)!" : "🚀 Click to Launch"}
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. ANIMATED ROBOT: ONLY WAVES HAND "HYY!" ON CLICK!
// =========================================================================
export const AnimatedRobot: React.FC = () => {
  const [isWaving, setIsWaving] = useState(false);

  const handleWave = () => {
    if (isWaving) return;
    setIsWaving(true);
    // Waves for 4 seconds on click, then settles
    setTimeout(() => {
      setIsWaving(false);
    }, 4000);
  };

  return (
    <div
      onClick={handleWave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleWave()}
      className="group relative cursor-pointer select-none transition-transform duration-200 active:scale-95"
      title="Click robot to wave Hyy!"
    >
      <div
        className={`relative p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center w-36 sm:w-44 text-center ${
          isWaving
            ? "bg-amber-50/90 border-[#F6C900] shadow-[0_0_24px_rgba(246,201,0,0.35)]"
            : "bg-white border-gray-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:border-amber-300"
        }`}
      >
        {/* Internal Mini Speech Bubble during wave */}
        {isWaving && (
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#121316] text-[#F6C900] px-2 py-0.5 rounded-full text-[9px] font-black shadow-md border border-gray-800 z-10 animate-bounce">
            👋 Hyy Builder!
          </div>
        )}

        <svg
          width={56}
          height={56}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1"
        >
          {/* Antenna */}
          <line x1="50" y1="14" x2="50" y2="25" stroke="#202124" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="12" r="4.5" fill="#F6C900" className={isWaving ? "animate-pulse" : ""} />

          {/* Head */}
          <rect
            x="24"
            y="25"
            width="52"
            height="42"
            rx="12"
            fill="#FFFFFF"
            stroke="#D1D5DB"
            strokeWidth="1.5"
          />

          {/* Eye Screen */}
          <rect x="30" y="33" width="40" height="18" rx="6" fill="#202124" />

          {/* Eyes - BLINK ONLY WHEN WAVING */}
          <g className={isWaving ? "animate-blink-eyes" : ""}>
            <circle cx="39" cy="42" r="3.5" fill="#F6C900" />
            <circle cx="61" cy="42" r="3.5" fill="#F6C900" />
          </g>

          {/* Smile */}
          <path
            d="M42 56C42 56 46 59 50 59C54 59 58 56 58 56"
            stroke="#202124"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Shoulders */}
          <path
            d="M28 78C28 73 34 71 42 71H58C66 71 72 73 72 78V84H28V78Z"
            fill="#F6F6F8"
            stroke="#E0E0E6"
            strokeWidth="1.5"
          />

          {/* Left Static Arm */}
          <path d="M24 74C20 76 18 80 18 86" stroke="#202124" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="18" cy="87" r="3" fill="#F6C900" />

          {/* RIGHT ARM & HAND - ONLY WAVES ON CLICK! */}
          <g className={isWaving ? "animate-wave-hand" : ""}>
            <path
              d={isWaving ? "M72 74C78 68 82 58 84 50" : "M76 74C80 76 82 80 82 86"}
              stroke="#202124"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle
              cx={isWaving ? 84 : 82}
              cy={isWaving ? 48 : 87}
              r={isWaving ? 4 : 3}
              fill="#F6C900"
              stroke={isWaving ? "#202124" : "none"}
              strokeWidth={1}
            />
          </g>
        </svg>

        {/* Action Prompt Pill */}
        <div className="mt-2.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
              isWaving
                ? "bg-[#121316] text-[#F6C900] border-gray-800"
                : "bg-[#FFF9E8] text-[#202124] border-[#F6C900]"
            }`}
          >
            {isWaving ? "👋 Waving Hyy!" : "🤖 Click to Say Hyy"}
          </span>
        </div>
      </div>
    </div>
  );
};
