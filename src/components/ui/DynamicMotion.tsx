"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll-triggered entrance animation using IntersectionObserver.
 * Respects reduced-motion preferences and stays lightweight for static export.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface AnimatedNumberProps {
  target: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Counts up smoothly from 0 to target once scrolled into view.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  suffix = "",
  durationMs = 900,
  className = ""
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(target);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let rafId = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [started, target, durationMs]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {displayValue}
      {suffix}
    </span>
  );
};

interface RotatingPhraseProps {
  phrases: string[];
  intervalMs?: number;
  className?: string;
}

/**
 * Cycles through short phrases cleanly with a subtle vertical fade.
 */
export const RotatingPhrase: React.FC<RotatingPhraseProps> = ({
  phrases,
  intervalMs = 2600,
  className = ""
}) => {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const timer = window.setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFading(false);
      }, 220);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [phrases, intervalMs]);

  return (
    <span
      className={`inline-block transition-[opacity,transform] duration-300 ${
        fading ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
      } ${className}`}
    >
      {phrases[index]}
    </span>
  );
};
