import React from "react";

interface StickerProps {
  className?: string;
  size?: number;
}

// 1. Laptop with Code
export const LaptopSticker: React.FC<StickerProps> = ({ className = "", size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.06)] ${className}`}
  >
    {/* Screen outer */}
    <rect x="18" y="22" width="64" height="42" rx="6" fill="#202124" />
    {/* Screen display */}
    <rect x="21" y="25" width="58" height="34" rx="4" fill="#FFFDF8" />
    {/* Window top bar */}
    <rect x="21" y="25" width="58" height="8" rx="2" fill="#FAF5E6" />
    <circle cx="26" cy="29" r="1.5" fill="#F6C900" />
    <circle cx="31" cy="29" r="1.5" fill="#E2E2E2" />
    <circle cx="36" cy="29" r="1.5" fill="#E2E2E2" />
    {/* Code snippet */}
    <path d="M28 38L33 42L28 46" stroke="#202124" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="37" y1="42" x2="48" y2="42" stroke="#F6C900" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="28" y1="51" x2="58" y2="51" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
    {/* Base */}
    <path
      d="M12 66C12 64.8954 12.8954 64 14 64H86C87.1046 64 88 64.8954 88 66V70C88 72.2091 86.2091 74 84 74H16C13.7909 74 12 72.2091 12 70V66Z"
      fill="#F5F5F7"
      stroke="#E5E5E8"
      strokeWidth="1.5"
    />
    <rect x="42" y="66" width="16" height="3" rx="1.5" fill="#D1D1D6" />
  </svg>
);

// 2. Rocket
export const RocketSticker: React.FC<StickerProps> = ({ className = "", size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_6px_16px_rgba(246,201,0,0.18)] ${className}`}
  >
    {/* Rocket Exhaust Flame */}
    <path
      d="M44 74C44 74 41 86 50 92C59 86 56 74 56 74H44Z"
      fill="#FF9900"
    />
    <path
      d="M47 74C47 74 45 82 50 86C55 82 53 74 53 74H47Z"
      fill="#F6C900"
    />
    {/* Fins */}
    <path
      d="M34 56L24 68C23 69.5 24 72 26 72H38L35 56H34Z"
      fill="#202124"
    />
    <path
      d="M66 56L76 68C77 69.5 76 72 74 72H62L65 56H66Z"
      fill="#202124"
    />
    {/* Body */}
    <path
      d="M50 14C37 28 37 54 37 70H63C63 54 63 28 50 14Z"
      fill="#FFFFFF"
      stroke="#EAEAEA"
      strokeWidth="1.5"
    />
    {/* Nose cone tip */}
    <path
      d="M50 14C45 21 41 28 40 34H60C59 28 55 21 50 14Z"
      fill="#F6C900"
    />
    {/* Porthole */}
    <circle cx="50" cy="46" r="8" fill="#FFFDF8" stroke="#202124" strokeWidth="2" />
    <circle cx="50" cy="46" r="4" fill="#F6C900" />
  </svg>
);

// 3. Lightbulb
export const LightbulbSticker: React.FC<StickerProps> = ({ className = "", size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_6px_16px_rgba(246,201,0,0.22)] ${className}`}
  >
    {/* Rays */}
    <line x1="50" y1="12" x2="50" y2="18" stroke="#F6C900" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="25" y1="26" x2="30" y2="31" stroke="#F6C900" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="75" y1="26" x2="70" y2="31" stroke="#F6C900" strokeWidth="2.5" strokeLinecap="round" />

    {/* Bulb Glass */}
    <path
      d="M34 54C28 48 26 41 28 34C30 23 40 19 50 19C60 19 70 23 72 34C74 41 72 48 66 54L62 66H38L34 54Z"
      fill="#F6C900"
    />
    <path
      d="M38 52C34 47 33 42 34 36C36 26 44 23 50 23C56 23 64 26 66 36C67 42 66 47 62 52L59 63H41L38 52Z"
      fill="#FFDE33"
    />
    {/* Filament */}
    <path
      d="M44 44C44 40 47 37 50 37C53 37 56 40 56 44V60M44 60H56"
      stroke="#202124"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Base Screw */}
    <rect x="40" y="66" width="20" height="5" rx="1.5" fill="#E2E2E6" />
    <rect x="42" y="72" width="16" height="4" rx="1.5" fill="#202124" />
    <path d="M45 76H55C55 79 45 79 45 76Z" fill="#202124" />
  </svg>
);

// 4. Robot
export const RobotSticker: React.FC<StickerProps> = ({ className = "", size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.06)] ${className}`}
  >
    {/* Antenna */}
    <line x1="50" y1="14" x2="50" y2="25" stroke="#202124" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="12" r="4" fill="#F6C900" />
    {/* Head */}
    <rect x="24" y="25" width="52" height="42" rx="12" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1.5" />
    {/* Eye Screen */}
    <rect x="30" y="33" width="40" height="18" rx="6" fill="#202124" />
    {/* Eyes */}
    <circle cx="39" cy="42" r="3.5" fill="#F6C900" />
    <circle cx="61" cy="42" r="3.5" fill="#F6C900" />
    {/* Smile */}
    <path d="M42 56C42 56 46 59 50 59C54 59 58 56 58 56" stroke="#202124" strokeWidth="2" strokeLinecap="round" />
    {/* Shoulders */}
    <path
      d="M28 78C28 73 34 71 42 71H58C66 71 72 73 72 78V82H28V78Z"
      fill="#F6C900"
    />
  </svg>
);

// 5. Trophy
export const TrophySticker: React.FC<StickerProps> = ({ className = "", size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_6px_16px_rgba(246,201,0,0.2)] ${className}`}
  >
    {/* Left Handle */}
    <path
      d="M32 26H22C18 26 16 34 22 43C25 48 30 50 34 50"
      stroke="#F6C900"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right Handle */}
    <path
      d="M68 26H78C82 26 84 34 78 43C75 48 70 50 66 50"
      stroke="#F6C900"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Cup Body */}
    <path
      d="M31 20H69V38C69 50 58 58 50 58C42 58 31 50 31 38V20Z"
      fill="#F6C900"
    />
    {/* Star */}
    <path
      d="M50 31L52 35.5L57 36L53.5 39.5L54.5 44.5L50 42L45.5 44.5L46.5 39.5L43 36L48 35.5L50 31Z"
      fill="#202124"
    />
    {/* Stem & Base */}
    <rect x="47" y="58" width="6" height="12" fill="#D4AF37" />
    <path d="M36 70H64L67 78H33L36 70Z" fill="#202124" />
  </svg>
);

// 6. Code Window
export const CodeTagSticker: React.FC<StickerProps> = ({ className = "", size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.06)] ${className}`}
  >
    <rect x="18" y="24" width="64" height="52" rx="10" fill="#202124" />
    <circle cx="28" cy="34" r="2.5" fill="#F6C900" />
    <circle cx="36" cy="34" r="2.5" fill="#666" />
    <circle cx="44" cy="34" r="2.5" fill="#444" />
    <path
      d="M36 46L29 52L36 58M64 46L71 52L64 58M53 44L47 60"
      stroke="#F6C900"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 7. Sparkle
export const SparkleSticker: React.FC<StickerProps> = ({ className = "", size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M30 6C30 18 36 24 48 30C36 36 30 42 30 54C30 42 24 36 12 30C24 24 30 18 30 6Z"
      fill="#F6C900"
    />
  </svg>
);

// 8. Gear
export const GearSticker: React.FC<StickerProps> = ({ className = "", size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_4px_12px_rgba(246,201,0,0.18)] ${className}`}
  >
    <circle cx="50" cy="50" r="22" fill="#F6C900" />
    <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
    <rect x="46" y="20" width="8" height="10" rx="3" fill="#F6C900" />
    <rect x="46" y="70" width="8" height="10" rx="3" fill="#F6C900" />
    <rect x="20" y="46" width="10" height="8" rx="3" fill="#F6C900" />
    <rect x="70" y="46" width="10" height="8" rx="3" fill="#F6C900" />
  </svg>
);

// 9. Puzzle
export const PuzzleSticker: React.FC<StickerProps> = ({ className = "", size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${className}`}
  >
    <rect x="26" y="26" width="48" height="48" rx="8" fill="#FFFDF8" stroke="#EAEAEA" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="8" fill="#F6C900" />
  </svg>
);
