"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function PeopleScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scrub for full-screen candid gathering
      gsap.fromTo(
        imageRef.current,
        { scale: 1.0, yPercent: -8 },
        {
          scale: 1.15,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { yPercent: 20, opacity: 0.2 },
        {
          yPercent: -15,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#070809] py-28"
    >
      {/* Background Candid Photograph */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] filter brightness-[0.78] contrast-105"
      >
        <Image
          src="/images/people-table.jpg"
          alt="Candid gathering of travelers and friends at Musafir Cafe"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070809]/60 to-[#070809]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-[#0a0b0d]" />
      </div>

      {/* Center Cinematic Overlay */}
      <div
        ref={textRef}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center"
      >
        <span className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-[#c46845] block mb-6">
          THE GATHERING TABLE
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] uppercase font-normal text-[#f4ede4]">
          SOME JOURNEYS
        </h2>
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] uppercase font-light text-[#f4ede4]/85">
          ARE BETTER
        </h2>
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] uppercase font-normal text-[#c46845]">
          SHARED.
        </h2>

        <p className="mt-8 md:mt-12 max-w-xl text-base md:text-lg text-[#9c9488] font-sans font-light leading-relaxed">
          Students sketching in notebooks, mountaineers recounting passes crossed, families celebrating birthdays, and solo travelers finding companionable silence over steaming cups.
        </p>
      </div>
    </section>
  );
}
