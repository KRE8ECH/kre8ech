"use client";

import React, { useEffect, useRef, useState } from "react";

export const CODING_BOX_RUNS = [
  {
    cmd: "kre8 init ai-agent",
    output: "✓ AI Agent compiled — Hackathon ready!"
  },
  {
    cmd: "npm run ship-mvp",
    output: "✓ Deployed Week 4 prototype to the live web ⚡"
  },
  {
    cmd: "git push origin main",
    output: "✓ Podium build green — Saksham 1st Position 🏆"
  },
  {
    cmd: "kre8 dev --genz",
    output: "✓ Turned caffeine & curiosity into working software!"
  }
];

interface InteractiveHeroCodingBoxProps {
  size?: number;
  isActive: boolean;
  runIndex: number;
  onTrigger: () => void;
  className?: string;
}

/**
 * Interactive Laptop / Coding Box sticker that keeps its exact SVG size
 * while switching into an active dark-IDE live code typing & spark burst on click.
 */
export const InteractiveHeroCodingBox: React.FC<InteractiveHeroCodingBoxProps> = ({
  size = 84,
  isActive,
  runIndex,
  onTrigger,
  className = ""
}) => {
  const [phase, setPhase] = useState<"idle" | "typing" | "done">("idle");
  const [lineStep, setLineStep] = useState(0);
  const timerRef = useRef<number[]>([]);

  useEffect(() => {
    timerRef.current.forEach((id) => window.clearTimeout(id));
    timerRef.current = [];

    if (!isActive) {
      setPhase("idle");
      setLineStep(0);
      return;
    }

    setPhase("typing");
    setLineStep(1);

    const t1 = window.setTimeout(() => setLineStep(2), 380);
    const t2 = window.setTimeout(() => setLineStep(3), 780);
    const t3 = window.setTimeout(() => setPhase("done"), 1350);
    const t4 = window.setTimeout(() => {
      setPhase("idle");
      setLineStep(0);
    }, 5200);

    timerRef.current = [t1, t2, t3, t4];
    return () => {
      timerRef.current.forEach((id) => window.clearTimeout(id));
      timerRef.current = [];
    };
  }, [isActive, runIndex]);

  const isCompiling = phase === "typing" || phase === "done";
  const isDone = phase === "done";

  return (
    <button
      type="button"
      onClick={onTrigger}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none focus:outline-none ${className}`}
      title="Click to run code inside the laptop!"
      aria-label="Run live code inside laptop coding box"
    >
      {/* Floating code token sparks during active compilation (no layout resize) */}
      {isCompiling && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
          <span className="animate-code-token-1 absolute -top-1 left-2 text-[10px] font-mono font-black text-[#202124] bg-[#F6C900] px-1 rounded shadow-xs">
            &lt;/&gt;
          </span>
          <span className="animate-code-token-2 absolute -top-2 right-2 text-[10px] font-mono font-black text-[#F6C900] bg-[#121316] px-1 rounded shadow-xs">
            &#123;&#125;
          </span>
          <span className="animate-code-token-3 absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-600">
            ⚡
          </span>
        </span>
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`block transition-all duration-200 ${
          isCompiling
            ? "filter drop-shadow-[0_10px_22px_rgba(246,201,0,0.4)]"
            : "filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
        }`}
      >
        {/* Outer bezel */}
        <rect
          x="18"
          y="22"
          width="64"
          height="42"
          rx="6"
          fill="#202124"
          stroke={isCompiling ? "#F6C900" : "none"}
          strokeWidth={isCompiling ? "2" : "0"}
        />

        {/* Display background shifts to dark IDE when compiling */}
        <rect
          x="21"
          y="25"
          width="58"
          height="34"
          rx="4"
          fill={isCompiling ? "#121316" : "#FFFDF8"}
          className="transition-colors duration-200"
        />

        {/* Window top bar */}
        <rect
          x="21"
          y="25"
          width="58"
          height="8"
          rx="2"
          fill={isCompiling ? "#1F2128" : "#FAF5E6"}
          className="transition-colors duration-200"
        />
        <circle cx="26" cy="29" r="1.5" fill={isCompiling ? "#FF5F56" : "#F6C900"} />
        <circle cx="31" cy="29" r="1.5" fill={isCompiling ? "#FFBD2E" : "#E2E2E2"} />
        <circle cx="36" cy="29" r="1.5" fill={isCompiling ? "#27C93F" : "#E2E2E2"} />

        {!isCompiling ? (
          /* Default idle coding box state matching original sticker */
          <>
            <path
              d="M28 38L33 42L28 46"
              stroke="#202124"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="37"
              y1="42"
              x2="48"
              y2="42"
              stroke="#F6C900"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="28"
              y1="51"
              x2="58"
              y2="51"
              stroke="#A0A0A0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          /* Live animated code lines & build check inside dark IDE screen */
          <>
            {/* Line 1: prompt chevron + animated syntax bar */}
            <path
              d="M26 37L30 40L26 43"
              stroke="#F6C900"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="33"
              y1="40"
              x2={lineStep >= 1 ? "56" : "35"}
              y2="40"
              stroke="#38BDF8"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="transition-all duration-200"
            />

            {/* Line 2 */}
            {lineStep >= 2 && (
              <line
                x1="26"
                y1="46.5"
                x2={lineStep >= 3 ? "66" : "46"}
                y2="46.5"
                stroke="#F6C900"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="transition-all duration-200"
              />
            )}

            {/* Line 3 / Build Status */}
            {lineStep >= 3 && (
              <>
                <line
                  x1="26"
                  y1="53"
                  x2={isDone ? "56" : "42"}
                  y2="53"
                  stroke={isDone ? "#34D399" : "#A78BFA"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {!isDone && (
                  <rect
                    x="45"
                    y="51"
                    width="3"
                    height="4"
                    rx="0.5"
                    fill="#F6C900"
                    className="animate-cursor-blink"
                  />
                )}
              </>
            )}

            {/* Glowing green check dot on build completion */}
            {isDone && (
              <g>
                <circle cx="70" cy="52" r="4.5" fill="#22C55E" />
                <path
                  d="M68 52L69.5 53.5L72.5 50.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </>
        )}

        {/* Base */}
        <path
          d="M12 66C12 64.8954 12.8954 64 14 64H86C87.1046 64 88 64.8954 88 66V70C88 72.2091 86.2091 74 84 74H16C13.7909 74 12 72.2091 12 70V66Z"
          fill={isCompiling ? "#D4D4DA" : "#F5F5F7"}
          stroke={isCompiling ? "#F6C900" : "#E5E5E8"}
          strokeWidth="1.5"
        />
        <rect x="42" y="66" width="16" height="3" rx="1.5" fill="#D1D1D6" />
      </svg>
    </button>
  );
};
