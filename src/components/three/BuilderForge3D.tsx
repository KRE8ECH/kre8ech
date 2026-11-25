"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { ArrowRight, Boxes, Cpu, Rocket, Sparkles, Trophy, Zap } from "lucide-react";

type ForgeMode = "neural" | "matrix" | "hackathon" | "warp";

const FORGE_MODES: {
  id: ForgeMode;
  label: string;
  tagline: string;
  stack: string[];
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "neural",
    label: "AI Neural Core",
    tagline: "Multi-agent intelligence, LLM reasoning & live automation pipelines.",
    stack: ["LLM Agents", "Prompt Systems", "AI Workflows"],
    icon: Cpu
  },
  {
    id: "matrix",
    label: "Code Matrix Cube",
    tagline: "Modular frontend architecture, TypeScript logic & full-stack MVPs.",
    stack: ["Next.js", "TypeScript", "Tailwind UI"],
    icon: Boxes
  },
  {
    id: "hackathon",
    label: "Hackathon Arena",
    tagline: "Zero-to-one stage prototypes built for national sprint podiums.",
    stack: ["3-Min Pitch", "MVP Demo", "Team Sprint"],
    icon: Trophy
  },
  {
    id: "warp",
    label: "Launch Velocity",
    tagline: "Ship fast, deploy to the real web & go from user to innovator.",
    stack: ["Edge Deploy", "Live URLs", "Real Users"],
    icon: Rocket
  }
];

interface BuilderForge3DProps {
  compact?: boolean;
}

/**
 * Interactive Three.js 3D WebGL Playground ("KRE8ECH 3D Forge") tailored for
 * Gen-Z builders. Supports pointer drag-to-orbit 360°, mode morphing, and pulse boosts.
 */
export default function BuilderForge3D({ compact = false }: BuilderForge3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeModeRef = useRef<ForgeMode>("neural");
  const pulseBoostRef = useRef<number>(0);

  const [activeMode, setActiveMode] = useState<ForgeMode>("neural");
  const [pulseCount, setPulseCount] = useState(0);
  const [webglReady, setWebglReady] = useState(true);

  const currentMeta =
    FORGE_MODES.find((m) => m.id === activeMode) || FORGE_MODES[0];

  const handleModeSelect = (mode: ForgeMode) => {
    setActiveMode(mode);
    activeModeRef.current = mode;
    pulseBoostRef.current = 1.0;
  };

  const triggerPulseBoost = () => {
    pulseBoostRef.current = 1.35;
    setPulseCount((c) => c + 1);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container || typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
    } catch {
      setWebglReady(false);
      return;
    }

    const width = container.clientWidth || 520;
    const height = container.clientHeight || (compact ? 320 : 380);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.2);

    // Three-point studio lighting with KRE8ECH electric gold key light
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const goldLight = new THREE.PointLight(0xf6c900, 14, 24);
    goldLight.position.set(3.5, 3.2, 4.2);
    scene.add(goldLight);

    const coolRimLight = new THREE.DirectionalLight(0x7dd3fc, 1.4);
    coolRimLight.position.set(-4, -2, -3);
    scene.add(coolRimLight);

    const topSpot = new THREE.DirectionalLight(0xffffff, 1.6);
    topSpot.position.set(0, 5, 4);
    scene.add(topSpot);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const regGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };
    const regMat = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };

    const goldSolidMat = regMat(
      new THREE.MeshStandardMaterial({
        color: 0xf6c900,
        metalness: 0.45,
        roughness: 0.22,
        emissive: 0x3d2e00,
        emissiveIntensity: 0.35
      })
    );
    const darkMetalMat = regMat(
      new THREE.MeshStandardMaterial({
        color: 0x323642,
        metalness: 0.65,
        roughness: 0.25
      })
    );
    const goldWireMat = regMat(
      new THREE.MeshBasicMaterial({
        color: 0xf6c900,
        wireframe: true,
        transparent: true,
        opacity: 0.7
      })
    );
    const brightWireMat = regMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      })
    );

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- Mode 1: Neural Core ---
    const neuralGroup = new THREE.Group();
    const coreSolid = new THREE.Mesh(
      regGeo(new THREE.IcosahedronGeometry(1.05, 1)),
      goldSolidMat
    );
    const coreLattice = new THREE.Mesh(
      regGeo(new THREE.IcosahedronGeometry(1.42, 1)),
      goldWireMat
    );
    const ringA = new THREE.Mesh(
      regGeo(new THREE.TorusGeometry(1.85, 0.032, 14, 72)),
      goldSolidMat
    );
    ringA.rotation.x = Math.PI / 3;
    const ringB = new THREE.Mesh(
      regGeo(new THREE.TorusGeometry(2.15, 0.025, 14, 72)),
      regMat(
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.4
        })
      )
    );
    ringB.rotation.y = Math.PI / 3;

    const satelliteGeo = regGeo(new THREE.SphereGeometry(0.11, 12, 12));
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const sat = new THREE.Mesh(satelliteGeo, i % 2 === 0 ? goldSolidMat : brightWireMat);
      const angle = (i / 6) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 0.7, Math.sin(angle) * 2.15);
      neuralGroup.add(sat);
      satellites.push(sat);
    }
    neuralGroup.add(coreSolid, coreLattice, ringA, ringB);
    masterGroup.add(neuralGroup);

    // --- Mode 2: Code Matrix Cube (27 mini-cubes + outer wireframe cage) ---
    const matrixGroup = new THREE.Group();
    const miniCubeGeo = regGeo(new THREE.BoxGeometry(0.46, 0.46, 0.46));
    const spacing = 0.56;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const isAccent = (Math.abs(x + y + z) % 2) === 0;
          const cube = new THREE.Mesh(miniCubeGeo, isAccent ? goldSolidMat : darkMetalMat);
          cube.position.set(x * spacing, y * spacing, z * spacing);
          matrixGroup.add(cube);
        }
      }
    }
    const matrixCage = new THREE.Mesh(
      regGeo(new THREE.BoxGeometry(2.1, 2.1, 2.1)),
      goldWireMat
    );
    matrixGroup.add(matrixCage);
    matrixGroup.visible = false;
    masterGroup.add(matrixGroup);

    // --- Mode 3: Hackathon Arena Knot ---
    const hackathonGroup = new THREE.Group();
    const knotMesh = new THREE.Mesh(
      regGeo(new THREE.TorusKnotGeometry(1.02, 0.3, 120, 20)),
      goldSolidMat
    );
    const knotWire = new THREE.Mesh(
      regGeo(new THREE.TorusKnotGeometry(1.06, 0.32, 80, 14)),
      brightWireMat
    );
    const arenaRing = new THREE.Mesh(
      regGeo(new THREE.TorusGeometry(2.05, 0.04, 16, 80)),
      goldWireMat
    );
    arenaRing.rotation.x = Math.PI / 2;
    hackathonGroup.add(knotMesh, knotWire, arenaRing);
    hackathonGroup.visible = false;
    masterGroup.add(hackathonGroup);

    // --- Mode 4: Launch Warp Tunnel ---
    const warpGroup = new THREE.Group();
    const warpRings: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const r = 0.65 + i * 0.25;
      const ring = new THREE.Mesh(
        regGeo(new THREE.TorusGeometry(r, 0.03, 12, 48)),
        i % 2 === 0 ? goldSolidMat : goldWireMat
      );
      ring.position.z = (i - 3) * 0.45;
      warpGroup.add(ring);
      warpRings.push(ring);
    }
    const warpCore = new THREE.Mesh(
      regGeo(new THREE.OctahedronGeometry(0.55, 0)),
      goldSolidMat
    );
    warpGroup.add(warpCore);
    warpGroup.visible = false;
    masterGroup.add(warpGroup);

    // Ambient 3D starfield background inside Forge
    const starCount = 220;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 14;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
    }
    const starGeo = regGeo(new THREE.BufferGeometry());
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = regMat(
      new THREE.PointsMaterial({
        color: 0xf6c900,
        size: 0.06,
        transparent: true,
        opacity: 0.65
      })
    );
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Pointer drag-to-orbit controls (works seamlessly with mouse & touch)
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = dx * 0.012;
      velX = dy * 0.012;
      masterGroup.rotation.y += velY;
      masterGroup.rotation.x += velX;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      container.releasePointerCapture?.(e.pointerId);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    // Responsive ResizeObserver
    const handleResize = () => {
      const w = container.clientWidth || 520;
      const h = container.clientHeight || (compact ? 320 : 380);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let isInView = true;
    const visibilityObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              isInView = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.05 }
          )
        : null;
    visibilityObserver?.observe(container);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      if (isInView) {
        const t = clock.getElapsedTime();
        const mode = activeModeRef.current;

        neuralGroup.visible = mode === "neural";
        matrixGroup.visible = mode === "matrix";
        hackathonGroup.visible = mode === "hackathon";
        warpGroup.visible = mode === "warp";

        // Smooth decay of pulse boost & drag momentum
        pulseBoostRef.current = Math.max(0, pulseBoostRef.current * 0.93);
        const boost = pulseBoostRef.current;
        const scalePop = 1 + boost * 0.16;
        masterGroup.scale.set(scalePop, scalePop, scalePop);

        if (!isDragging) {
          masterGroup.rotation.y += velY + 0.0065 + boost * 0.04;
          masterGroup.rotation.x += velX;
          velX *= 0.92;
          velY *= 0.92;
          // Gently level extreme vertical tilt when idle
          masterGroup.rotation.x += (Math.sin(t * 0.5) * 0.18 - masterGroup.rotation.x) * 0.02;
        }

        // Per-mode dynamic internal animation
        if (mode === "neural") {
          coreSolid.rotation.y = t * 0.4;
          coreLattice.rotation.x = -t * 0.3;
          ringA.rotation.z = t * 0.6;
          ringB.rotation.x = -t * 0.45;
          satellites.forEach((sat, idx) => {
            const a = t * 0.9 + (idx / satellites.length) * Math.PI * 2;
            sat.position.set(Math.cos(a) * 2.15, Math.sin(a * 2) * 0.45, Math.sin(a) * 2.15);
          });
        } else if (mode === "matrix") {
          matrixCage.rotation.y = -t * 0.25;
        } else if (mode === "hackathon") {
          arenaRing.rotation.z = t * 0.5;
          arenaRing.rotation.y = Math.sin(t * 0.6) * 0.4;
        } else if (mode === "warp") {
          warpCore.rotation.y = t * 1.4;
          warpCore.rotation.z = t * 0.9;
          warpRings.forEach((ring, idx) => {
            const zLoop = ((t * 1.6 + idx * 0.45) % 3.15) - 1.5;
            ring.position.z = zLoop;
            ring.rotation.z = t * (idx % 2 === 0 ? 0.5 : -0.5);
          });
        }

        starField.rotation.y = -t * 0.06;
        renderer.render(scene, camera);
      }

      if (!prefersReduced) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      resizeObserver.disconnect();
      visibilityObserver?.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [compact]);

  return (
    <div className="bg-[#121316] text-white rounded-3xl border border-gray-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Interactive 3D Viewport */}
        <div className="lg:col-span-7 relative bg-[radial-gradient(circle_at_50%_45%,rgba(246,201,0,0.14)_0%,rgba(18,19,22,1)_72%)] border-b lg:border-b-0 lg:border-r border-gray-800/80 min-h-[300px] sm:min-h-[360px]">
          {/* Top HUD */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-bold text-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#F6C900] animate-pulse" />
              <span>THREE.JS WEBGL LAB</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
              Drag 360°
            </span>
          </div>

          {/* WebGL Canvas Container */}
          {webglReady ? (
            <div
              ref={mountRef}
              onDoubleClick={triggerPulseBoost}
              className="w-full h-[300px] sm:h-[360px] cursor-grab active:cursor-grabbing touch-none select-none"
              title="Drag to rotate in 3D • Double-click to boost"
            />
          ) : (
            <div className="w-full h-[300px] sm:h-[360px] flex items-center justify-center p-6 text-center text-xs text-gray-400">
              Interactive 3D view requires WebGL support in your browser.
            </div>
          )}

          {/* Bottom Interactive Trigger */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
              MODE // {currentMeta.label.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={triggerPulseBoost}
              className="pointer-events-auto ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-[#202124]" />
              <span>Pulse Boost{pulseCount > 0 ? ` (${pulseCount})` : ""}</span>
            </button>
          </div>
        </div>

        {/* Right Controls & Gen-Z Tech Stack */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6C900]/10 border border-[#F6C900]/30 text-[#F6C900] text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Forge</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Built to feel alive. <br />
              <span className="text-[#F6C900]">Just like what you&apos;ll ship.</span>
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {currentMeta.tagline}
            </p>

            {/* Mode Switcher Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {FORGE_MODES.map((m) => {
                const Icon = m.icon;
                const selected = activeMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleModeSelect(m.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selected
                        ? "bg-[#F6C900] text-[#202124] border-[#F6C900] shadow-sm font-black"
                        : "bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:border-white/25 font-bold"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 mb-1.5 ${
                        selected ? "text-[#202124]" : "text-[#F6C900]"
                      }`}
                    />
                    <div className="text-xs leading-tight">{m.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800 space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {currentMeta.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F6C900] hover:bg-[#E5BA00] text-[#202124] font-extrabold text-xs transition-all"
              >
                <span>Join Builder Cohort</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
              <Link
                href="/register/hackready"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-colors"
              >
                <span>Hackready Track</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
