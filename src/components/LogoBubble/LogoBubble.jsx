import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./LogoBubble.css";
import logo from "../../assets/logo.png";

/**
 * LogoBubble
 * - Auto-stop after 5 minutes (300000 ms)
 * - Click toggles animation on/off (persisted in sessionStorage)
 * - Hover boosts logo scale
 * - Fade-out when animation stops
 */

export default function LogoBubble({
  src = logo,
  size = 96,
  bubbleCount = 24
}) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const stopTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Respect user reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Restore persisted state OR start animation normally
  useEffect(() => {
    const saved = sessionStorage.getItem("logoPaused");

    if (saved === "true") {
      setIsAnimating(false);
      return;
    }

    setIsAnimating(!prefersReducedMotion);

    // Auto-stop after 5 minutes
    stopTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      sessionStorage.setItem("logoPaused", "true");
    }, 300000);

    return () => clearTimeout(stopTimeoutRef.current);
  }, [prefersReducedMotion]);

  /**
   * Toggle animation on click
   * - If animating → stop + persist
   * - If stopped → start + persist
   * - "atomic stopsave": sessionStorage writes happen synchronously,
   *   so the value is saved even if navigation happens immediately after.
   */
  function handleToggleClick() {
    const newState = !isAnimating;
    setIsAnimating(newState);

    if (newState === false) {
      // atomic stopsave
      sessionStorage.setItem("logoPaused", "true");
      clearTimeout(stopTimeoutRef.current);
    } else {
      // atomic continue-save
      sessionStorage.setItem("logoPaused", "false");
      stopTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        sessionStorage.setItem("logoPaused", "true");
      }, 300000);
    }
  }

  // Motion values for subtle logo distortion/shift
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const logoShiftX = useTransform(mouseX, [0, 1], [-2, 2]);
  const logoShiftY = useTransform(mouseY, [0, 1], [-2, 2]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Track pointer inside container to create subtle logo reaction
    function onPointerMove(e) {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }

    function onPointerLeave() {
      mouseX.set(0.5);
      mouseY.set(0.5);
    }

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [mouseX, mouseY]);

  // Generate memoized bubble descriptors (size, delay, duration, x/y offsets)
  // memo is for performance optimization - we want to pick up where we were at nav click
  const bubbles = useMemo(() => {
    return Array.from({ length: bubbleCount }).map((_, i) => {
      const r = 12 + Math.round(Math.random() * 48);
      const delay = Math.random() * 6;
      const duration = 18 + Math.random() * 18;
      const startX = Math.random() * 100;
      const startY = 100 + Math.random() * 40;
      const driftX = (Math.random() - 0.5) * 40;
      return { id: i, r, delay, duration, startX, startY, driftX };
    });
  }, [bubbleCount]);

  if (prefersReducedMotion) {
    return (
      <div
        className="logoBubbleContainer reduced"
        style={{ width: size, height: size }}
        ref={containerRef}
        onClick={handleToggleClick}
      >
        <img src={src} alt="Logo" className="logoImage" style={{ width: size, height: size }} />
      </div>
    );
  }

  return (
    <div
      className="logoBubbleContainer"
      style={{ width: size, height: size }}
      ref={containerRef}
      onClick={handleToggleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleToggleClick(e);
      }}
    >
      <svg className="bubbleLayer" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {bubbles.map((b) => (
          <motion.circle
            key={b.id}
            cx={b.startX}
            cy={b.startY}
            r={(b.r / 60) * 6}
            fill="rgba(255,255,255,0.22)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={0.4}
            initial={{ translateY: 0, translateX: 0, opacity: 0.9 }}
            animate={
              isAnimating
                ? {
                    translateY: [0, -40, -120],
                    translateX: [0, b.driftX * 0.2, b.driftX * 0.6],
                    opacity: [0.9, 0.7, 0.2]
                  }
                : {
                    translateY: 0,
                    translateX: 0,
                    opacity: 0,
                    transition: { duration: 0.8, ease: "easeOut" }
                  }
            }
            transition={{
              delay: b.delay,
              duration: b.duration,
              repeat: isAnimating ? Infinity : 0,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            style={{ mixBlendMode: "screen", filter: "blur(0.2px)" }}
          />
        ))}
      </svg>

      <motion.img
        src={src}
        alt="Logo"
        className="logoImage"
        style={{
          width: size,
          height: size,
          x: logoShiftX,
          y: logoShiftY
        }}
        animate={{
          scale: isHovered ? 1.08 : 1,
          opacity: isAnimating ? 1 : 0.4
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        draggable={false}
      />
    </div>
  );
}
