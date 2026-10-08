"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useLenis } from "./SmoothScroll";

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax zoom and slow shift on scroll
      gsap.to(imageContainerRef.current, {
        scale: 1.14,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Text scrub movement at a slightly different speed
      gsap.to(textContainerRef.current, {
        yPercent: -20,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-scene"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070809]"
    >
      {/* Background Cafe Interior Image */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] filter brightness-90 contrast-105"
      >
        <Image
          src="/images/cafe-interior.jpg"
          alt="Modern luxury cafe interior in Kathmandu"
          fill
          priority
          className="object-cover"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/40 to-[#0a0b0d]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/60 via-transparent to-[#0a0b0d]/60" />
      </div>

      {/* Main Text Content */}
      <div
        ref={textContainerRef}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center pt-20"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#c46845]" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase text-[#f4ede4]/80">
            KATHMANDU · NEPAL
          </span>
          <span className="w-8 h-[1px] bg-[#c46845]" />
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[#f4ede4] tracking-tight font-normal uppercase leading-[0.95]">
          COME AS A TRAVELER.
        </h1>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#c46845] tracking-tight font-light uppercase leading-[0.95] mt-2 md:mt-4">
          LEAVE WITH A STORY.
        </h2>

        {/* Editorial Subtitle */}
        <p className="mt-8 md:mt-10 max-w-xl text-sm md:text-base text-[#9c9488] font-sans font-light tracking-wide leading-relaxed">
          A sanctuary between the mountain passes and the brick courtyards. Hand-roasted Himalayan coffee, slow culinary craft, and memories nurtured by the SAH Family.
        </p>

        {/* Scroll Indicator */}
        <div className="mt-14 md:mt-20">
          <button
            onClick={() => scrollTo("#chapter-journey", { duration: 1.5 })}
            data-cursor="SCROLL"
            className="flex flex-col items-center gap-2 text-[#f4ede4]/60 hover:text-[#f4ede4] transition-colors cursor-pointer group"
            aria-label="Scroll to chapter 1: The Journey"
          >
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase">Begin Journey</span>
            <ChevronDown size={18} className="animate-bounce text-[#c46845]" />
          </button>
        </div>
      </div>
    </section>
  );
}
