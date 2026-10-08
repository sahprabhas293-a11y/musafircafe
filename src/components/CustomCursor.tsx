"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check touch and reduced motion
    const touchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (touchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);
    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Delegate hover listeners for dynamic cursor text
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        // Check for general clickable elements
        const clickable = (e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select");
        if (clickable) {
          setIsHovered(true);
          setCursorText("");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: "transform" }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out border border-[#f4ede4]/40 backdrop-invert-0 ${
          cursorText
            ? "w-20 h-20 bg-[#c46845]/90 border-transparent text-[#f4ede4] scale-100 shadow-2xl backdrop-blur-sm"
            : isHovered
            ? "w-12 h-12 bg-[#f4ede4]/20 border-[#f4ede4]/80 backdrop-blur-xs scale-100"
            : "w-3 h-3 bg-[#f4ede4] border-transparent"
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[10px] uppercase font-sans tracking-[0.2em] font-semibold text-center select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
