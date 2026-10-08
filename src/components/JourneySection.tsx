"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Compass, Mountain, MapPin } from "lucide-react";

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image slow zoom and subtle shift
      gsap.fromTo(
        imageRef.current,
        { scale: 1.0, yPercent: -5 },
        {
          scale: 1.18,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        }
      );

      // Headline and typography scrub parallax
      gsap.fromTo(
        textGroupRef.current,
        { yPercent: 15 },
        {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        }
      );

      // Floating discovery badges subtle reveal
      const badges = [badge1Ref.current, badge2Ref.current, badge3Ref.current];
      badges.forEach((badge, index) => {
        if (!badge) return;
        gsap.fromTo(
          badge,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: badge,
              start: "top 80%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chapter-journey"
      className="relative min-h-[140vh] w-full flex flex-col justify-between overflow-hidden bg-[#08090a] py-28 md:py-40 text-[#f4ede4]"
    >
      {/* Background Image with slow scrub zoom */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[125%] -top-[12%] pointer-events-none filter contrast-110 saturate-[0.85] brightness-[0.65]"
      >
        <Image
          src="/images/journey-pause.jpg"
          alt="Himalayan ridge overlooking misty valley"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08090a]/60 to-[#08090a]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0d] via-transparent to-[#0a0b0d]" />
      </div>

      {/* Top Chapter Tag */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#c46845]">
            CHAPTER 01
          </span>
          <span className="w-12 h-[1px] bg-[#f4ede4]/20" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-[#9c9488] uppercase">
            THE PHILOSOPHY
          </span>
        </div>
        <div className="text-[10px] font-mono tracking-[0.25em] text-[#9c9488]">
          27°42'59.9"N · 85°19'12.0"E
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div
        ref={textGroupRef}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center my-auto"
      >
        <span className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-[#c46845] block mb-6">
          A SANCTUARY FOR TRAVELERS
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] uppercase font-normal">
          EVERY JOURNEY
        </h2>
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] uppercase font-light text-[#f4ede4]/80">
          NEEDS A PLACE
        </h2>
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] uppercase font-normal text-[#c46845]">
          TO PAUSE.
        </h2>

        <p className="mt-10 md:mt-14 max-w-2xl mx-auto text-base md:text-lg text-[#9c9488] font-sans font-light leading-relaxed">
          Between steep high-altitude trails and the lively courtyards of Kathmandu, MusafirCafe was founded by the SAH Family to offer a warm hearth where time slows down.
        </p>
      </div>

      {/* Subtle Floating Elements / Badges */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
        <div
          ref={badge1Ref}
          className="p-6 backdrop-blur-md bg-[#131417]/80 border border-[#f4ede4]/10 rounded-sm flex flex-col gap-3 group hover:border-[#c46845]/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#c46845]/10 flex items-center justify-center text-[#c46845]">
            <Mountain size={20} />
          </div>
          <h3 className="font-serif text-xl tracking-wide uppercase text-[#f4ede4]">Himalayan Origin</h3>
          <p className="text-xs font-sans text-[#9c9488] leading-relaxed">
            Coffee hand-picked from high-elevation shade plantations in Nuwakot and tea from misty Ilam terraces.
          </p>
        </div>

        <div
          ref={badge2Ref}
          className="p-6 backdrop-blur-md bg-[#131417]/80 border border-[#f4ede4]/10 rounded-sm flex flex-col gap-3 group hover:border-[#c46845]/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#c46845]/10 flex items-center justify-center text-[#c46845]">
            <Compass size={20} />
          </div>
          <h3 className="font-serif text-xl tracking-wide uppercase text-[#f4ede4]">The Musafir Spirit</h3>
          <p className="text-xs font-sans text-[#9c9488] leading-relaxed">
            Musafir means traveler. Whether you cross oceans or walk from down the street, your story belongs here.
          </p>
        </div>

        <div
          ref={badge3Ref}
          className="p-6 backdrop-blur-md bg-[#131417]/80 border border-[#f4ede4]/10 rounded-sm flex flex-col gap-3 group hover:border-[#c46845]/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#c46845]/10 flex items-center justify-center text-[#c46845]">
            <MapPin size={20} />
          </div>
          <h3 className="font-serif text-xl tracking-wide uppercase text-[#f4ede4]">SAH Family Hospitality</h3>
          <p className="text-xs font-sans text-[#9c9488] leading-relaxed">
            Warmth rooted in authentic generational hospitality, where guests arrive as travelers and leave as family.
          </p>
        </div>
      </div>
    </section>
  );
}
