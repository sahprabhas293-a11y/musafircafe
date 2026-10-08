"use client";

import React from "react";
import Image from "next/image";
import { signatureItems } from "@/data/signatures";
import { Sparkles, Check, ArrowRight } from "lucide-react";

export default function SignatureSelection({ onOpenReservation }: { onOpenReservation: () => void }) {
  return (
    <section
      id="chapter-selection"
      className="relative w-full bg-[#08090a] py-28 md:py-36 text-[#f4ede4] overflow-hidden border-t border-[#f4ede4]/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c46845]/30 bg-[#c46845]/10 text-[#c46845] text-[10px] font-sans tracking-[0.3em] uppercase mb-4">
            <Sparkles size={12} />
            <span>Curated House Signatures</span>
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#f4ede4] font-normal leading-[0.92]">
            THE MUSAFIR
          </h2>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#c46845] font-light leading-[0.92] mt-2">
            SELECTION
          </h2>
          <p className="mt-6 text-sm md:text-base text-[#9c9488] font-sans font-light leading-relaxed">
            Three distinctive culinary and coffee expressions crafted exclusively by MusafirCafe and nurtured by the SAH Family.
          </p>
        </div>

        {/* 3 Featured Showcases with Asymmetric Editorial Layout */}
        <div className="flex flex-col gap-20 md:gap-32">
          {signatureItems.map((item, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={item.id}
                data-cursor="SIGNATURE"
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Large Editorial Image */}
                <div
                  className={`lg:col-span-7 relative h-[360px] sm:h-[460px] md:h-[540px] rounded-sm overflow-hidden group border border-[#f4ede4]/10 ${
                    isReversed ? "lg:col-start-6" : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.9] contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090a]/80 via-transparent to-transparent" />

                  {/* Corner Accent */}
                  <div className="absolute top-6 left-6 z-10 font-mono text-xs tracking-widest text-[#f4ede4] bg-[#0a0b0d]/80 backdrop-blur-md px-3 py-1 border border-[#f4ede4]/10">
                    SIGNATURE 0{idx + 1}
                  </div>
                  <div className="absolute bottom-6 right-6 z-10 font-serif text-3xl md:text-4xl text-[#c46845] bg-[#0a0b0d]/90 backdrop-blur-md px-4 py-2 border border-[#c46845]/40">
                    {item.currency} {item.price}
                  </div>
                </div>

                {/* Editorial Details & Notes */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isReversed ? "lg:col-start-1" : ""
                  }`}
                >
                  <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#c46845] font-medium block mb-2">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f4ede4] leading-none mb-4">
                    {item.name}
                  </h3>
                  <p className="text-sm font-sans italic text-[#f4ede4]/75 mb-6">
                    "{item.tagline}"
                  </p>
                  <p className="text-sm md:text-base font-sans text-[#9c9488] leading-relaxed mb-8">
                    {item.description}
                  </p>

                  {/* Bullet Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {item.notes.map((note) => (
                      <div key={note} className="flex items-center gap-2 text-xs font-sans text-[#f4ede4]/90">
                        <Check size={14} className="text-[#c46845] shrink-0" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pairing Suggestion & CTA */}
                  <div className="pt-6 border-t border-[#f4ede4]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs font-sans text-[#9c9488]">
                      {item.pairing}
                    </span>
                    <button
                      onClick={onOpenReservation}
                      className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#c46845] hover:text-[#f4ede4] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Reserve Experience</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
