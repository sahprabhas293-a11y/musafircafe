"use client";

import React from "react";
import { siteContent } from "@/data/content";
import { Heart, Sparkles, ShieldCheck } from "lucide-react";

export default function FamilyStory() {
  const { familyStory } = siteContent;

  return (
    <section
      id="chapter-story"
      className="relative w-full bg-[#0a0b0d] py-28 md:py-40 text-[#f4ede4] overflow-hidden border-t border-[#f4ede4]/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Chapter Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#c46845]">
            CHAPTER 04
          </span>
          <span className="w-12 h-[1px] bg-[#f4ede4]/20" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-[#9c9488] uppercase">
            HERITAGE & PURPOSE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Large Headline */}
          <div className="lg:col-span-7">
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#c46845] block mb-4">
              OWNED BY SAH FAMILY
            </span>
            <div className="space-y-1">
              {familyStory.heading.map((line, idx) => (
                <h2
                  key={line}
                  className={`font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.92] ${
                    idx === 2 ? "text-[#c46845] font-light" : "text-[#f4ede4] font-normal"
                  }`}
                >
                  {line}
                </h2>
              ))}
            </div>
          </div>

          {/* Right Editorial Text & Principles */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:border-l lg:border-[#f4ede4]/10 lg:pl-12">
            <blockquote className="font-serif text-2xl sm:text-3xl text-[#f4ede4]/90 leading-snug font-light italic">
              "{familyStory.body}"
            </blockquote>

            <p className="text-sm font-sans text-[#9c9488] leading-relaxed">
              Every detail—from the selection of single-origin mountain beans to the slow-folded momos and warm greeting at the door—reflects the hospitality of our household. In a fast-moving world, we built a place where travelers can pause, breathe, and belong.
            </p>

            <div className="pt-6 border-t border-[#f4ede4]/10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-[#c46845]" />
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#f4ede4]">
                  {familyStory.founderNote}
                </span>
              </div>
              <div className="text-[11px] font-sans text-[#9c9488] tracking-widest uppercase">
                Kathmandu Valley · Nepal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
