"use client";

import React, { useState } from "react";
import Image from "next/image";
import { travelDestinations } from "@/data/destinations";
import { Destination } from "@/types";
import { Compass, Navigation2, X } from "lucide-react";

export default function TravelSection() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return (
    <section
      id="chapter-travel"
      className="relative w-full bg-[#070809] py-28 md:py-40 text-[#f4ede4] overflow-hidden border-t border-[#f4ede4]/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.35em] uppercase text-[#c46845] mb-4">
              <Compass size={14} />
              <span>THE EXPEDITION CHRONICLES</span>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-[#f4ede4] leading-[0.92] font-normal">
              WHERE WILL
            </h2>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#c46845] leading-[0.92] font-light mt-2">
              YOU GO NEXT?
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm md:text-base text-[#9c9488] font-sans font-light leading-relaxed">
              Every traveler who sits at our counter carries a road behind them and a horizon ahead. These landscapes inspire the spirit of Musafir.
            </p>
            <span className="block text-[11px] font-mono tracking-widest text-[#9c9488]/60 mt-3 uppercase">
              * Storytelling destinations across Nepal
            </span>
          </div>
        </div>

        {/* Large Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelDestinations.map((dest, idx) => (
            <div
              key={dest.id}
              data-cursor="EXPEDITION"
              onClick={() => setSelectedDestination(dest)}
              className="group relative h-[450px] sm:h-[500px] rounded-sm overflow-hidden bg-[#131417] border border-[#f4ede4]/10 hover:border-[#c46845]/60 transition-all duration-700 cursor-pointer flex flex-col justify-between p-8"
            >
              {/* Background Image with Hover Scale */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover filter brightness-[0.75] contrast-105 group-hover:scale-110 group-hover:brightness-[0.88] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/40 to-transparent" />
              </div>

              {/* Top Meta */}
              <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#f4ede4]/80">
                <span className="bg-[#070809]/80 backdrop-blur-md px-3 py-1 rounded-xs border border-[#f4ede4]/10">
                  DEST 0{idx + 1}
                </span>
                <span className="text-[#c46845] flex items-center gap-1.5">
                  <Navigation2 size={12} className="rotate-45" />
                  {dest.elevation}
                </span>
              </div>

              {/* Bottom Content with Text Movement on Hover */}
              <div className="transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="font-serif text-4xl sm:text-5xl uppercase tracking-tight text-[#f4ede4] group-hover:text-[#c46845] transition-colors">
                    {dest.name}
                  </h3>
                  <span className="text-sm font-sans text-[#9c9488]">
                    {dest.nepaliName}
                  </span>
                </div>

                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c46845] block mb-3">
                  {dest.tagline}
                </span>

                <p className="text-xs sm:text-sm font-sans text-[#9c9488] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {dest.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#f4ede4]/15 flex items-center justify-between text-[11px] font-sans tracking-wider text-[#f4ede4]/70">
                  <span>{dest.distanceFromKathmandu}</span>
                  <span className="text-[#c46845] group-hover:translate-x-1 transition-transform">
                    Read Story →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Modal Details */}
      {selectedDestination && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#070809]/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-10 animate-in fade-in"
        >
          <div className="relative max-w-2xl w-full bg-[#131417] border border-[#f4ede4]/20 p-8 sm:p-12 rounded-sm shadow-2xl">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-6 right-6 text-[#9c9488] hover:text-[#f4ede4] p-1 rounded-full border border-[#f4ede4]/10 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c46845] mb-2 uppercase">
              <span>Himalayan Trail Notes</span>
              <span>·</span>
              <span>Elevation {selectedDestination.elevation}</span>
            </div>

            <h3 className="font-serif text-4xl sm:text-5xl uppercase text-[#f4ede4] mb-2">
              {selectedDestination.name}
            </h3>
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#c46845] block mb-6">
              {selectedDestination.tagline}
            </span>

            <p className="text-sm sm:text-base font-sans text-[#9c9488] leading-relaxed mb-6">
              {selectedDestination.description}
            </p>

            <div className="p-4 bg-[#0a0b0d] border border-[#f4ede4]/10 rounded-xs mb-6 text-xs font-sans text-[#f4ede4]/80">
              <span className="font-semibold text-[#c46845] uppercase tracking-wider block mb-1">
                Cultural Essence:
              </span>
              {selectedDestination.culturalNote}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#f4ede4]/10 text-xs text-[#9c9488]">
              <span>Distance: {selectedDestination.distanceFromKathmandu}</span>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-[#f4ede4] hover:text-[#c46845] uppercase tracking-widest cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
