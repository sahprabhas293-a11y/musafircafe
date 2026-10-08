"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryItems } from "@/data/gallery";
import { GalleryItem } from "@/types";
import { Camera, X } from "lucide-react";

export default function EditorialGallery() {
  const [selectedMoment, setSelectedMoment] = useState<GalleryItem | null>(null);

  return (
    <section
      id="chapter-moments"
      className="relative w-full bg-[#070809] py-28 md:py-40 text-[#f4ede4] overflow-hidden border-t border-[#f4ede4]/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#c46845]">
                CHAPTER 06
              </span>
              <span className="w-12 h-[1px] bg-[#f4ede4]/20" />
              <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-[#9c9488] uppercase">
                THE VISUAL ARCHIVE
              </span>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#f4ede4] font-normal leading-none">
              MOMENTS
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#9c9488] font-sans font-light leading-relaxed">
            Light passing through morning mist, laughter reverberating off dark timber beams, and the quiet beauty of plates shared between travelers.
          </p>
        </div>

        {/* Editorial Asymmetric Collage Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {galleryItems.map((item, idx) => {
            // Assign varying column spans and heights to create genuine editorial rhythm
            let colSpan = "lg:col-span-4";
            let heightClass = "h-[380px]";

            if (idx === 0) {
              colSpan = "lg:col-span-8";
              heightClass = "h-[450px] md:h-[520px]";
            } else if (idx === 1) {
              colSpan = "lg:col-span-4";
              heightClass = "h-[450px] md:h-[520px]";
            } else if (idx === 3) {
              colSpan = "lg:col-span-7";
              heightClass = "h-[420px]";
            } else if (idx === 4) {
              colSpan = "lg:col-span-5";
              heightClass = "h-[420px]";
            } else if (idx === 6) {
              colSpan = "lg:col-span-4";
              heightClass = "h-[390px]";
            } else if (idx === 7) {
              colSpan = "lg:col-span-4";
              heightClass = "h-[390px]";
            } else if (idx === 8) {
              colSpan = "lg:col-span-4";
              heightClass = "h-[390px]";
            }

            return (
              <div
                key={item.id}
                data-cursor="VIEW MOMENT"
                onClick={() => setSelectedMoment(item)}
                className={`${colSpan} ${heightClass} relative group rounded-sm overflow-hidden bg-[#131417] border border-[#f4ede4]/10 hover:border-[#c46845]/60 transition-all duration-700 cursor-pointer flex flex-col justify-end p-6 md:p-8`}
              >
                {/* Image with smooth scale */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover filter brightness-[0.82] contrast-105 group-hover:scale-108 group-hover:brightness-[0.95] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070809]/90 via-[#070809]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 text-[10px] font-mono tracking-widest text-[#f4ede4]/70 bg-[#070809]/80 px-2.5 py-1 border border-[#f4ede4]/10 rounded-xs">
                  {item.category.toUpperCase()}
                </div>

                {/* Bottom Overlay Title & Caption */}
                <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wide text-[#f4ede4] group-hover:text-[#c46845] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-[#9c9488] line-clamp-1 group-hover:line-clamp-none transition-all">
                    {item.caption}
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-sans tracking-[0.25em] uppercase text-[#c46845] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Moment →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Moment Lightbox Modal */}
      {selectedMoment && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#070809]/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 animate-in fade-in"
        >
          <div className="relative max-w-4xl w-full bg-[#131417] border border-[#f4ede4]/20 p-6 md:p-10 rounded-sm shadow-2xl flex flex-col md:flex-row gap-8 items-center">
            <button
              onClick={() => setSelectedMoment(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-[#9c9488] hover:text-[#f4ede4] p-1.5 rounded-full border border-[#f4ede4]/10 cursor-pointer z-10"
              aria-label="Close moment"
            >
              <X size={20} />
            </button>

            <div className="relative w-full md:w-3/5 h-64 sm:h-80 md:h-96 rounded-xs overflow-hidden border border-[#f4ede4]/10">
              <Image
                src={selectedMoment.image}
                alt={selectedMoment.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="w-full md:w-2/5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#c46845] block mb-2">
                  ARCHIVE ENTRY · {selectedMoment.category.toUpperCase()}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl uppercase text-[#f4ede4] mb-3">
                  {selectedMoment.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#9c9488] leading-relaxed mb-6">
                  {selectedMoment.caption}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f4ede4]/10 flex items-center justify-between text-xs text-[#9c9488]">
                <span>Kathmandu · Nepal</span>
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="text-[#f4ede4] hover:text-[#c46845] uppercase tracking-widest cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
