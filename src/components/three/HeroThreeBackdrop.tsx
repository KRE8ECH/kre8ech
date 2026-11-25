"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight ambient Three.js WebGL backdrop for the Hero section.
 * Renders cursor-reactive low-poly floating geometry and depth particles
 * on the edges while keeping center headline contrast clean.
 */
export default function HeroThreeBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
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
      // Gracefully skip if WebGL context is unavailable
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 9;

    // Warm studio lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffea80, 2.2);
    keyLight.position.set(6, 7, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x202124, 1.1);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    // Track disposable resources cleanly
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

    // Left Spatial Cluster: Gold Wireframe Icosahedron + Charcoal Ring
    const leftGroup = new THREE.Group();
    leftGroup.position.set(-5.1, 0.6, -1.2);

    const icoCore = new THREE.Mesh(
      regGeo(new THREE.IcosahedronGeometry(1.15, 0)),
      regMat(
        new THREE.MeshStandardMaterial({
          color: 0xf6c900,
          metalness: 0.25,
          roughness: 0.35,
          transparent: true,
          opacity: 0.24
        })
      )
    );
    const icoWire = new THREE.Mesh(
      regGeo(new THREE.IcosahedronGeometry(1.22, 0)),
      regMat(
        new THREE.MeshBasicMaterial({
          color: 0xf6c900,
          wireframe: true,
          transparent: true,
          opacity: 0.55
        })
      )
    );
    const leftRing = new THREE.Mesh(
      regGeo(new THREE.TorusGeometry(1.75, 0.035, 12, 64)),
      regMat(
        new THREE.MeshBasicMaterial({
          color: 0x202124,
          transparent: true,
          opacity: 0.2
        })
      )
    );
    leftRing.rotation.x = Math.PI / 3;
    leftGroup.add(icoCore, icoWire, leftRing);
    scene.add(leftGroup);

    // Right Spatial Cluster: Dark Faceted Octahedron + Gold Orbit Ring
    const rightGroup = new THREE.Group();
    rightGroup.position.set(5.1, -0.35, -1.0);

    const octCore = new THREE.Mesh(
      regGeo(new THREE.OctahedronGeometry(1.1, 0)),
      regMat(
        new THREE.MeshStandardMaterial({
          color: 0x202124,
          metalness: 0.45,
          roughness: 0.28,
          transparent: true,
          opacity: 0.2
        })
      )
    );
    const octWire = new THREE.Mesh(
      regGeo(new THREE.OctahedronGeometry(1.18, 0)),
      regMat(
        new THREE.MeshBasicMaterial({
          color: 0x202124,
          wireframe: true,
          transparent: true,
          opacity: 0.24
        })
      )
    );
    const rightRing = new THREE.Mesh(
      regGeo(new THREE.TorusGeometry(1.7, 0.04, 12, 64)),
      regMat(
        new THREE.MeshBasicMaterial({
          color: 0xf6c900,
          transparent: true,
          opacity: 0.45
        })
      )
    );
    rightRing.rotation.y = Math.PI / 4;
    rightGroup.add(octCore, octWire, rightRing);
    scene.add(rightGroup);

    // Subtle 3D Depth Particle Constellation
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0xf6c900),
      new THREE.Color(0xffaa00),
      new THREE.Color(0x202124)
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;

      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particlesGeo = regGeo(new THREE.BufferGeometry());
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMat = regMat(
      new THREE.PointsMaterial({
        size: 0.075,
        vertexColors: true,
        transparent: true,
        opacity: 0.55
      })
    );
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Responsive layout scaling so mobile widths stay balanced
    const syncResponsivePlacement = (w: number) => {
      const compact = w < 900;
      leftGroup.visible = !compact;
      rightGroup.visible = !compact;
      if (!compact) {
        const spread = Math.min(5.6, Math.max(4.0, w / 230));
        leftGroup.position.x = -spread;
        rightGroup.position.x = spread;
      }
    };
    syncResponsivePlacement(width);

    // Cursor parallax state
    let pointerX = 0;
    let pointerY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // ResizeObserver for crisp canvas DPI
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      syncResponsivePlacement(w);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause rendering when scrolled offscreen
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

    const renderFrame = () => {
      if (isInView) {
        const t = clock.getElapsedTime();

        // Smooth camera parallax
        camera.position.x += (pointerX * 0.45 - camera.position.x) * 0.04;
        camera.position.y += (-pointerY * 0.3 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        leftGroup.rotation.y = t * 0.26;
        leftGroup.rotation.x = Math.sin(t * 0.4) * 0.25;
        leftGroup.position.y = 0.6 + Math.sin(t * 0.9) * 0.18;
        leftRing.rotation.z = t * 0.35;

        rightGroup.rotation.y = -t * 0.22;
        rightGroup.rotation.z = Math.cos(t * 0.35) * 0.22;
        rightGroup.position.y = -0.35 + Math.cos(t * 0.85) * 0.18;
        rightRing.rotation.x = -t * 0.3;

        particles.rotation.y = t * 0.035;
        renderer.render(scene, camera);
      }

      if (!prefersReduced) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      visibilityObserver?.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
