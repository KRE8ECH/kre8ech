"use client";

import React, { useState, useEffect } from "react";

export const AnimatedLaptop: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

  const codeLines = [
    { text: "const student = new Kre8ech();", color: "text-amber-300" },
    { text: "await student.learn('AI + Web');", color: "text-sky-300" },
    { text: "const app = await student.build();", color: "text-emerald-300" },
    { text: "app.deploy('Saksham Hackathon');", color: "text-purple-300" },
    { text: "> [OK] Prototype Live in 18ms", color: "text-[#F6C900]" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setActiveLine((prev) => (prev >= codeLines.length - 1 ? 0 : prev + 1));
      }, 1100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, codeLines.length]);

  const handleToggle = () => setIsRunning((prev) => !prev);

  return (
    <div
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleToggle()}
      className="cursor-pointer select-none active:scale-[0.98] transition-transform duration-150"
      title="Click to run live code"
    >
      <div className="p-3.5 rounded-xl bg-white border border-black/[0.08] hover:border-[#202124]/30 transition-colors w-60 sm:w-64">
        <div className="bg-[#1E1F22] rounded-t-lg px-3 py-1.5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
            <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-emerald-400" : "bg-gray-500"}`} />
            <span>builder.ts</span>
          </div>
        </div>

        <div className="bg-[#141415] p-2.5 font-mono text-[10px] leading-relaxed space-y-1 h-24 overflow-hidden">
          {!isRunning ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-1">
              <p className="text-[11px] font-semibold text-gray-200">Click to Run Code</p>
              <p className="text-[10px] text-gray-500">Live student execution</p>
            </div>
          ) : (
            codeLines.map((line, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1.5 transition-opacity duration-150 ${
                  idx === activeLine
                    ? `${line.color} font-semibold`
                    : idx < activeLine
                    ? "text-gray-400 opacity-70"
                    : "text-gray-600 opacity-30"
                }`}
              >
                <span className="text-[9px] text-gray-600 select-none tabular-nums">0{idx + 1}</span>
                <span className="truncate">{line.text}</span>
                {idx === activeLine && (
                  <span className="inline-block w-1.5 h-3 bg-[#F6C900] animate-cursor-blink ml-0.5" />
                )}
              </div>
            ))
          )}
        </div>

        <div className="bg-[#E2E2E6] h-2.5 rounded-b-lg border-t border-[#D1D1D6] flex items-center justify-center">
          <div className="w-10 h-1 bg-[#B0B0B8] rounded-full" />
        </div>

        <div className="mt-2.5 text-center">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
              isRunning
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-[#FAF8F2] text-[#202124] border-black/[0.08]"
            }`}
          >
            {isRunning ? "Running (Click to Pause)" : "Run Code"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const InteractiveBulb: React.FC = () => {
  const [isLit, setIsLit] = useState(false);

  return (
    <div
      onClick={() => setIsLit((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setIsLit((prev) => !prev)}
      className="cursor-pointer select-none active:scale-[0.98] transition-transform duration-150"
      title="Click to toggle ideation bulb"
    >
      <div
        className={`p-3.5 rounded-xl border transition-colors flex flex-col items-center justify-center w-36 sm:w-44 text-center ${
          isLit ? "bg-[#FFFDF5] border-[#F6C900]" : "bg-white border-black/[0.08] hover:border-[#202124]/30"
        }`}
      >
        <div className={`transition-transform duration-200 ${isLit ? "scale-105 animate-bulb-glow" : ""}`}>
          <svg width={56} height={56} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isLit && (
              <g stroke="#F6C900" strokeWidth="2.5" strokeLinecap="round">
                <line x1="50" y1="8" x2="50" y2="15" />
                <line x1="25" y1="18" x2="30" y2="23" />
                <line x1="75" y1="18" x2="70" y2="23" />
                <line x1="14" y1="42" x2="21" y2="42" />
                <line x1="86" y1="42" x2="79" y2="42" />
              </g>
            )}
            <path
              d="M50 22C36 22 26 32 26 45C26 53 31 60 36 66C38 69 39 73 39 77H61C61 73 62 69 64 66C69 60 74 53 74 45C74 32 64 22 50 22Z"
              fill={isLit ? "#F6C900" : "#F3F4F6"}
              stroke="#D1D5DB"
              strokeWidth="1.5"
            />
            <path
              d="M42 54C42 46 47 40 50 40C53 40 58 46 58 54"
              stroke={isLit ? "#FFFFFF" : "#9CA3AF"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <rect x="41" y="77" width="18" height="4" rx="1.5" fill="#202124" />
            <rect x="43" y="83" width="14" height="3.5" rx="1.5" fill="#4B5563" />
          </svg>
        </div>

        <div className="mt-2.5">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
              isLit
                ? "bg-[#202124] text-[#F6C900] border-[#202124]"
                : "bg-[#FAF8F2] text-[#202124] border-black/[0.08]"
            }`}
          >
            {isLit ? "Ideation Active" : "Spark Idea"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const AnimatedRocket: React.FC = () => {
  const [isFiring, setIsFiring] = useState(false);

  const handleLaunch = () => {
    if (isFiring) return;
    setIsFiring(true);
    setTimeout(() => setIsFiring(false), 3600);
  };

  return (
    <div
      onClick={handleLaunch}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleLaunch()}
      className="cursor-pointer select-none active:scale-[0.98] transition-transform duration-150"
      title="Click to launch prototype"
    >
      <div
        className={`p-3.5 rounded-xl border transition-colors flex flex-col items-center justify-center w-36 sm:w-44 text-center overflow-hidden ${
          isFiring ? "bg-[#FFFDF5] border-[#F6C900]" : "bg-white border-black/[0.08] hover:border-[#202124]/30"
        }`}
      >
        <div className={isFiring ? "animate-rocket-curve" : ""}>
          <svg width={56} height={56} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isFiring && (
              <>
                <g className="animate-flame">
                  <path d="M43 74C43 74 47 92 50 94C53 92 57 74 57 74H43Z" fill="#F6C900" />
                  <path d="M46 74C46 74 49 86 50 88C51 86 54 74 54 74H46Z" fill="#FF6B00" />
                </g>
                <circle cx="44" cy="82" r="2" fill="#F6C900" className="animate-spark-1" />
                <circle cx="56" cy="85" r="1.5" fill="#FF6B00" className="animate-spark-2" />
              </>
            )}
            <path d="M36 62L24 72L32 76L38 68Z" fill="#F6C900" />
            <path d="M64 62L76 72L68 76L62 68Z" fill="#F6C900" />
            <path
              d="M50 18C38 30 35 48 36 68C36 72 42 74 50 74C58 74 64 72 64 68C65 48 62 30 50 18Z"
              fill="#FFFFFF"
              stroke="#D1D5DB"
              strokeWidth="1.5"
            />
            <path d="M50 18C45 23 42 29 41 34H59C58 29 55 23 50 18Z" fill="#202124" />
            <circle cx="50" cy="46" r="7" fill="#202124" stroke="#E5E7EB" strokeWidth="2" />
            <circle cx="50" cy="46" r="3.5" fill="#F6C900" />
          </svg>
        </div>

        <div className="mt-2.5">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
              isFiring
                ? "bg-[#202124] text-[#F6C900] border-[#202124]"
                : "bg-[#FAF8F2] text-[#202124] border-black/[0.08]"
            }`}
          >
            {isFiring ? "Launched" : "Launch Build"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const AnimatedRobot: React.FC = () => {
  const [isWaving, setIsWaving] = useState(false);

  const handleWave = () => {
    if (isWaving) return;
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 3600);
  };

  return (
    <div
      onClick={handleWave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleWave()}
      className="cursor-pointer select-none active:scale-[0.98] transition-transform duration-150"
      title="Click to test AI companion"
    >
      <div
        className={`relative p-3.5 rounded-xl border transition-colors flex flex-col items-center justify-center w-36 sm:w-44 text-center ${
          isWaving ? "bg-[#FFFDF5] border-[#F6C900]" : "bg-white border-black/[0.08] hover:border-[#202124]/30"
        }`}
      >
        <svg width={56} height={56} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="14" x2="50" y2="25" stroke="#202124" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="12" r="4.5" fill="#F6C900" />
          <rect x="24" y="25" width="52" height="42" rx="12" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="30" y="33" width="40" height="18" rx="6" fill="#202124" />
          <g className={isWaving ? "animate-blink-eyes" : ""}>
            <circle cx="39" cy="42" r="3.5" fill="#F6C900" />
            <circle cx="61" cy="42" r="3.5" fill="#F6C900" />
          </g>
          <path d="M42 56C42 56 46 59 50 59C54 59 58 56 58 56" stroke="#202124" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 78C28 73 34 71 42 71H58C66 71 72 73 72 78V84H28V78Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
          <path d="M24 74C20 76 18 80 18 86" stroke="#202124" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="18" cy="87" r="3" fill="#F6C900" />
          <g className={isWaving ? "animate-wave-hand" : ""}>
            <path
              d={isWaving ? "M72 74C78 68 82 58 84 50" : "M76 74C80 76 82 80 82 86"}
              stroke="#202124"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={isWaving ? 84 : 82} cy={isWaving ? 48 : 87} r={3} fill="#F6C900" />
          </g>
        </svg>

        <div className="mt-2.5">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
              isWaving
                ? "bg-[#202124] text-[#F6C900] border-[#202124]"
                : "bg-[#FAF8F2] text-[#202124] border-black/[0.08]"
            }`}
          >
            {isWaving ? "AI Agent Active" : "Ping Companion"}
          </span>
        </div>
      </div>
    </div>
  );
};
