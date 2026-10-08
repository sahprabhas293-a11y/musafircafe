"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface IntroSequenceProps {
  onComplete: () => void;
  isUnlocked: boolean;
}

export default function IntroSequence({ onComplete, isUnlocked }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const introPhaseRef = useRef<HTMLDivElement>(null);
  const brandPhaseRef = useRef<HTMLDivElement>(null);
  const sahFamilyRef = useRef<HTMLDivElement>(null);
  const presentsRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);

  const musafirTitleRef = useRef<HTMLHeadingElement>(null);
  const cafeTitleRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const lineSvgRef = useRef<SVGLineElement>(null);

  const [hasStartedEnter, setHasStartedEnter] = useState(false);

  useEffect(() => {
    // If already unlocked, do nothing
    if (isUnlocked) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial setup
      gsap.set(sahFamilyRef.current, { opacity: 0, y: 15 });
      gsap.set(presentsRef.current, { opacity: 0, y: 15 });
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 0,
        yPercent: 120,
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
      });

      gsap.set(brandPhaseRef.current, { opacity: 0, pointerEvents: "none" });
      gsap.set(musafirTitleRef.current, {
        opacity: 0,
        scale: 0.94,
        letterSpacing: "-0.08em",
      });
      gsap.set(cafeTitleRef.current, { opacity: 0, y: 20 });
      gsap.set(bgImageRef.current, { opacity: 0, scale: 1.0 });
      gsap.set(metadataRef.current, { opacity: 0, y: 15 });
      gsap.set(enterBtnRef.current, { opacity: 0, y: 20 });

      // PHASE 1: SAH FAMILY PRESENTS
      tl.to(sahFamilyRef.current, { opacity: 1, y: 0, duration: 1.2, delay: 0.4 })
        .to(presentsRef.current, { opacity: 0.7, y: 0, duration: 1.0 }, "+=0.3")
        // Typography masked reveal
        .to(
          line1Ref.current,
          {
            opacity: 1,
            yPercent: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.1,
          },
          "+=0.4"
        )
        .to(
          line2Ref.current,
          {
            opacity: 1,
            yPercent: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.1,
          },
          "-=0.7"
        )
        .to(
          line3Ref.current,
          {
            opacity: 1,
            yPercent: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
          },
          "-=0.7"
        )
        // Disappear statement
        .to(
          [sahFamilyRef.current, presentsRef.current, line1Ref.current, line2Ref.current, line3Ref.current],
          {
            opacity: 0,
            yPercent: -40,
            duration: 1.0,
            stagger: 0.05,
            ease: "power2.inOut",
          },
          "+=1.4"
        )
        .to(introPhaseRef.current, { display: "none", duration: 0.1 })

        // PHASE 2: MUSAFIR BRAND REVEAL
        .set(brandPhaseRef.current, { opacity: 1, pointerEvents: "auto" })
        .to(musafirTitleRef.current, {
          opacity: 1,
          scale: 1,
          letterSpacing: "0.06em", // Starts tightly packed then spreads apart
          duration: 2.2,
          ease: "power2.out",
        })
        .to(
          cafeTitleRef.current,
          {
            opacity: 0.9,
            y: 0,
            duration: 1.2,
          },
          "-=1.2"
        )
        // Background image slowly becomes visible behind letters
        .to(
          bgImageRef.current,
          {
            opacity: 0.28,
            duration: 2.5,
            ease: "sine.inOut",
          },
          "-=1.8"
        )
        .to(
          metadataRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
          },
          "-=0.8"
        )
        .to(
          enterBtnRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isUnlocked]);

  // Handle Enter The Cafe click transition
  const handleEnterClick = () => {
    if (hasStartedEnter) return;
    setHasStartedEnter(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Expand Musafir beyond viewport, scale image 1.0 -> 1.15, cinematic crossfade/clip-path
    tl.to(enterBtnRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
    })
      .to(
        metadataRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        "-=0.3"
      )
      .to(
        musafirTitleRef.current,
        {
          scale: 3.2,
          letterSpacing: "0.35em",
          opacity: 0,
          duration: 1.4,
          ease: "expo.inOut",
        },
        0.1
      )
      .to(
        cafeTitleRef.current,
        {
          yPercent: 180,
          opacity: 0,
          duration: 1.0,
          ease: "power3.in",
        },
        0.2
      )
      .to(
        bgImageRef.current,
        {
          scale: 1.18,
          opacity: 0.05,
          duration: 1.5,
          ease: "expo.inOut",
        },
        0
      )
      .to(
        containerRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        0.6
      );
  };

  if (isUnlocked) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#070809] text-[#f4ede4] flex items-center justify-center overflow-hidden select-none"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      {/* PHASE 1: FIRST LOAD TYPOGRAPHY */}
      <div
        ref={introPhaseRef}
        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto"
      >
        <div ref={sahFamilyRef} className="text-xs md:text-sm font-sans tracking-[0.4em] text-[#f4ede4]/70 uppercase mb-3">
          SAH FAMILY
        </div>
        <div ref={presentsRef} className="text-[10px] md:text-xs font-sans tracking-[0.5em] text-[#9c9488] uppercase mb-12">
          PRESENTS
        </div>

        <div className="overflow-hidden space-y-2 md:space-y-4">
          <h1
            ref={line1Ref}
            className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight font-light uppercase text-[#f4ede4]"
          >
            A PLACE
          </h1>
          <h1
            ref={line2Ref}
            className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight font-light uppercase text-[#f4ede4]"
          >
            FOR EVERY
          </h1>
          <h1
            ref={line3Ref}
            className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight font-light uppercase text-[#c46845]"
          >
            JOURNEY.
          </h1>
        </div>
      </div>

      {/* PHASE 2: BRAND REVEAL */}
      <div
        ref={brandPhaseRef}
        className="absolute inset-0 flex flex-col items-center justify-between p-8 md:p-14 text-center z-10"
      >
        {/* Subtle Background Image */}
        <div
          ref={bgImageRef}
          className="absolute inset-0 -z-10 pointer-events-none filter contrast-125 saturate-50"
        >
          <Image
            src="/images/brand-reveal-bg.jpg"
            alt="Kathmandu at twilight"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-[#070809]/70 to-[#070809]" />
        </div>

        {/* Top Heritage Line */}
        <div ref={metadataRef} className="pt-4 flex flex-col items-center gap-2">
          <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] text-[#f4ede4]/60 uppercase">
            A SAH FAMILY EXPERIENCE
          </span>
          <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] text-[#9c9488] uppercase">
            KATHMANDU · NEPAL
          </span>
        </div>

        {/* Center Giant Typography */}
        <div className="my-auto flex flex-col items-center justify-center w-full px-4">
          <h1
            ref={musafirTitleRef}
            className="font-serif text-[clamp(4.5rem,15vw,16rem)] leading-[0.88] font-normal uppercase tracking-wider text-[#f4ede4] transition-all select-none"
          >
            MUSAFIR
          </h1>
          <span
            ref={cafeTitleRef}
            className="font-serif text-2xl sm:text-4xl md:text-6xl tracking-[0.35em] uppercase text-[#c46845] font-light mt-2"
          >
            CAFE
          </span>
        </div>

        {/* Bottom Interactive ENTER THE CAFE CTA */}
        <div className="pb-8 md:pb-12">
          <button
            ref={enterBtnRef}
            onClick={handleEnterClick}
            data-cursor="ENTER"
            onMouseEnter={() => {
              if (lineSvgRef.current) {
                gsap.to(lineSvgRef.current, { attr: { x2: "180" }, duration: 0.4, ease: "power2.out" });
              }
            }}
            onMouseLeave={() => {
              if (lineSvgRef.current) {
                gsap.to(lineSvgRef.current, { attr: { x2: "110" }, duration: 0.4, ease: "power2.out" });
              }
            }}
            className="group cursor-pointer flex flex-col items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c46845] p-3"
            aria-label="Enter Musafir Cafe"
          >
            <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-[#f4ede4] group-hover:text-[#c46845] transition-colors uppercase font-medium">
              ENTER THE CAFE
            </span>
            <div className="flex items-center gap-2">
              <svg width="180" height="12" viewBox="0 0 180 12" className="overflow-visible">
                <line
                  ref={lineSvgRef}
                  x1="0"
                  y1="6"
                  x2="110"
                  y2="6"
                  stroke="#f4ede4"
                  strokeWidth="1.5"
                  className="transition-all"
                />
              </svg>
              <ArrowRight
                size={16}
                className="text-[#f4ede4] group-hover:translate-x-2 transition-transform duration-300"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
