"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface LaunchableHeroRocketProps {
  heroRef: React.RefObject<HTMLElement>;
  desktopButtonRef: React.RefObject<HTMLButtonElement>;
  mobileButtonRef: React.RefObject<HTMLButtonElement>;
  launchTrigger: number;
  flightSize: number;
  isLaunched: boolean;
  onLand: () => void;
  onMidFlightBoost: () => void;
}

/**
 * Renders the launched toy rocket inside the Hero section.
 * Keeps the exact SVG size (no scale resizing) while smoothly curving
 * across the Hero container and leaving brief exhaust sparks before docking back.
 */
export const LaunchableHeroRocket: React.FC<LaunchableHeroRocketProps> = ({
  heroRef,
  desktopButtonRef,
  mobileButtonRef,
  launchTrigger,
  flightSize,
  isLaunched,
  onLand,
  onMidFlightBoost
}) => {
  const rocketNodeRef = useRef<HTMLButtonElement>(null);
  const boostSeedRef = useRef(0);
  const flightEndsAtRef = useRef(0);
  const [sparks, setSparks] = useState<SparkParticle[]>([]);

  // Position rocket at its exact dock coordinates before first paint (avoids top-left flash)
  useLayoutEffect(() => {
    if (!isLaunched || !heroRef.current || !rocketNodeRef.current) return;
    const activeBtn =
      (desktopButtonRef.current && desktopButtonRef.current.offsetParent !== null
        ? desktopButtonRef.current
        : mobileButtonRef.current) || desktopButtonRef.current;
    if (!activeBtn) return;
    const hRect = heroRef.current.getBoundingClientRect();
    const bRect = activeBtn.getBoundingClientRect();
    rocketNodeRef.current.style.transform = `translate3d(${(bRect.left - hRect.left).toFixed(
      1
    )}px, ${(bRect.top - hRect.top).toFixed(1)}px, 0) rotate(0deg)`;
  }, [isLaunched, heroRef, desktopButtonRef, mobileButtonRef]);

  // Extend cruise & scramble waypoints whenever clicked again mid-flight
  useEffect(() => {
    if (!isLaunched) return;
    boostSeedRef.current += 1;
    flightEndsAtRef.current = performance.now() + 9500;
  }, [launchTrigger, isLaunched]);

  useEffect(() => {
    if (!isLaunched) {
      setSparks([]);
      return;
    }

    const heroEl = heroRef.current;
    const activeBtn =
      (desktopButtonRef.current && desktopButtonRef.current.offsetParent !== null
        ? desktopButtonRef.current
        : mobileButtonRef.current) || desktopButtonRef.current;

    if (!heroEl || !activeBtn) {
      onLand();
      return;
    }

    const getDockCoords = () => {
      const hRect = heroEl.getBoundingClientRect();
      const bRect = activeBtn.getBoundingClientRect();
      return {
        x: bRect.left - hRect.left,
        y: bRect.top - hRect.top,
        width: hRect.width,
        height: hRect.height
      };
    };

    const initialDock = getDockCoords();
    let x = initialDock.x;
    let y = initialDock.y;
    let vx = -220;
    let vy = -260;
    let angleDeg = 0;

    // Seed smooth organic curved waypoints inside the Hero bounds
    let currentTime = performance.now();
    const startTime = currentTime;
    flightEndsAtRef.current = startTime + 9500;

    let sparkId = 0;
    let lastSparkAt = 0;
    let rafId = 0;
    let seedSnapshot = boostSeedRef.current;

    const pickTarget = (w: number, h: number, seed: number, stepIdx: number) => {
      const marginX = Math.max(24, w * 0.08);
      const maxX = Math.max(marginX + 40, w - flightSize - marginX);
      const marginY = 24;
      const maxY = Math.max(marginY + 40, h - flightSize - 36);

      // Deterministic pseudo-random spread across Hero corners/edges so it moves all around
      const rawA = Math.sin((seed + 1) * 12.9898 + stepIdx * 78.233) * 43758.5453;
      const rawB = Math.sin((seed + 1) * 93.9898 + stepIdx * 37.719) * 24634.6345;
      const rx = rawA - Math.floor(rawA);
      const ry = rawB - Math.floor(rawB);

      return {
        tx: marginX + rx * (maxX - marginX),
        ty: marginY + ry * (maxY - marginY)
      };
    };

    let waypointIndex = 1;
    let target = pickTarget(initialDock.width, initialDock.height, seedSnapshot, waypointIndex);
    let nextWaypointAt = startTime + 1350;

    const tick = (now: number) => {
      const dt = Math.min(0.032, Math.max(0.008, (now - currentTime) / 1000));
      currentTime = now;

      const dock = getDockCoords();
      const returning = now >= flightEndsAtRef.current;

      // Mid-flight click flips direction immediately toward a new spot
      if (boostSeedRef.current !== seedSnapshot && !returning) {
        seedSnapshot = boostSeedRef.current;
        waypointIndex += 1;
        target = pickTarget(dock.width, dock.height, seedSnapshot, waypointIndex);
        nextWaypointAt = now + 1250;
        vx *= -0.7;
        vy -= 140;
      }

      if (!returning && (now >= nextWaypointAt || Math.hypot(target.tx - x, target.ty - y) < 42)) {
        waypointIndex += 1;
        target = pickTarget(dock.width, dock.height, seedSnapshot, waypointIndex);
        nextWaypointAt = now + 1300;
      }

      const goalX = returning ? dock.x : target.tx;
      const goalY = returning ? dock.y : target.ty;
      const dx = goalX - x;
      const dy = goalY - y;
      const dist = Math.hypot(dx, dy) || 1;

      if (returning && dist < 10) {
        setSparks([]);
        onLand();
        return;
      }

      const desiredSpeed = returning ? Math.min(460, Math.max(160, dist * 3.2)) : 310;
      const steerX = (dx / dist) * desiredSpeed;
      const steerY = (dy / dist) * desiredSpeed;

      // Smooth spring-damped steering creates curved toy-plane arcs instead of rigid lines
      const turnRate = returning ? 7.5 : 4.2;
      vx += (steerX - vx) * Math.min(1, turnRate * dt);
      vy += (steerY - vy) * Math.min(1, turnRate * dt);

      x += vx * dt;
      y += vy * dt;

      // Clamp softly inside Hero sky during active cruise
      if (!returning) {
        const minX = 12;
        const maxX = Math.max(minX, dock.width - flightSize - 12);
        const minY = 12;
        const maxY = Math.max(minY, dock.height - flightSize - 12);
        if (x < minX) {
          x = minX;
          vx = Math.abs(vx) * 0.85;
        } else if (x > maxX) {
          x = maxX;
          vx = -Math.abs(vx) * 0.85;
        }
        if (y < minY) {
          y = minY;
          vy = Math.abs(vy) * 0.85;
        } else if (y > maxY) {
          y = maxY;
          vy = -Math.abs(vy) * 0.85;
        }
      }

      // Bank rocket nose toward velocity vector (Rocket SVG points UP = -Y at 0deg)
      const targetAngle = returning && dist < 45
        ? 0
        : (Math.atan2(vy, vx) * 180) / Math.PI + 90;
      const angleDiff = ((targetAngle - angleDeg + 540) % 360) - 180;
      angleDeg += angleDiff * Math.min(1, (returning ? 10 : 8) * dt);

      // Apply GPU transform directly — ZERO scale changes (always 1:1 original size)
      if (rocketNodeRef.current) {
        rocketNodeRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
          1
        )}px, 0) rotate(${angleDeg.toFixed(1)}deg)`;
      }

      // Emit fading spark trail behind nozzle
      if (now - lastSparkAt > 70) {
        lastSparkAt = now;
        const rad = ((angleDeg - 90) * Math.PI) / 180;
        const tailOffset = flightSize * 0.42;
        const centerX = x + flightSize / 2 - Math.cos(rad) * tailOffset;
        const centerY = y + flightSize / 2 - Math.sin(rad) * tailOffset;

        sparkId += 1;
        const particle: SparkParticle = {
          id: sparkId,
          x: centerX + (Math.random() - 0.5) * 10,
          y: centerY + (Math.random() - 0.5) * 10,
          size: flightSize > 64 ? 6 + Math.random() * 4 : 4 + Math.random() * 3,
          color: sparkId % 2 === 0 ? "#F6C900" : "#FF7A00"
        };
        setSparks((prev) => [...prev.slice(-11), particle]);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [isLaunched, flightSize, heroRef, desktopButtonRef, mobileButtonRef, onLand]);

  if (!isLaunched) return null;

  return (
    <>
      {/* Trailing thruster sparks */}
      {sparks.map((sp, idx) => (
        <span
          key={sp.id}
          aria-hidden="true"
          style={{
            left: `${sp.x}px`,
            top: `${sp.y}px`,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            backgroundColor: sp.color,
            opacity: Math.max(0.15, ((idx + 1) / sparks.length) * 0.85)
          }}
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[0.5px] transition-opacity duration-300"
        />
      ))}

      {/* Flying toy rocket at exact fixed size */}
      <button
        ref={rocketNodeRef}
        type="button"
        onClick={onMidFlightBoost}
        style={{
          width: `${flightSize}px`,
          height: `${flightSize}px`,
          left: 0,
          top: 0
        }}
        className="absolute z-30 cursor-pointer select-none focus:outline-none will-change-transform"
        title="Click again to change flight path!"
        aria-label="Flying toy rocket"
      >
        <svg
          width={flightSize}
          height={flightSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block filter drop-shadow-[0_10px_20px_rgba(246,201,0,0.35)]"
        >
          {/* Animated Ignited Thruster Flame */}
          <g className="animate-flame">
            <path
              d="M42 74C42 74 37 91 50 99C63 91 58 74 58 74H42Z"
              fill="#FF6A00"
            />
            <path
              d="M46 74C46 74 44 86 50 92C56 86 54 74 54 74H46Z"
              fill="#F6C900"
            />
          </g>
          {/* Fins */}
          <path d="M34 56L24 68C23 69.5 24 72 26 72H38L35 56H34Z" fill="#202124" />
          <path d="M66 56L76 68C77 69.5 76 72 74 72H62L65 56H66Z" fill="#202124" />
          {/* Body */}
          <path
            d="M50 14C37 28 37 54 37 70H63C63 54 63 28 50 14Z"
            fill="#FFFFFF"
            stroke="#EAEAEA"
            strokeWidth="1.5"
          />
          {/* Nose cone tip */}
          <path d="M50 14C45 21 41 28 40 34H60C59 28 55 21 50 14Z" fill="#F6C900" />
          {/* Porthole */}
          <circle cx="50" cy="46" r="8" fill="#FFFDF8" stroke="#202124" strokeWidth="2" />
          <circle cx="50" cy="46" r="4" fill="#F6C900" />
        </svg>
      </button>
    </>
  );
};
