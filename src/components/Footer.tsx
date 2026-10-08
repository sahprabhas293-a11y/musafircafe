"use client";

import React from "react";
import { useLenis } from "./SmoothScroll";
import { cafeSettings, socialLinks } from "@/data/settings";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { scrollTo } = useLenis();

  const activeSocials = socialLinks.filter((s) => s.enabled && s.url);

  return (
    <footer className="relative w-full bg-[#050607] text-[#f4ede4] pt-24 md:pt-36 pb-12 overflow-hidden border-t border-[#f4ede4]/10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between min-h-[50vh]">
        {/* Top Header Row with Navigation Links & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-16 border-b border-[#f4ede4]/10">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-sans tracking-[0.25em] uppercase text-[#9c9488]">
            <button
              onClick={() => scrollTo("#chapter-menu", { duration: 1.5 })}
              className="hover:text-[#c46845] transition-colors cursor-pointer"
            >
              MENU
            </button>
            <button
              onClick={() => scrollTo("#chapter-story", { duration: 1.5 })}
              className="hover:text-[#c46845] transition-colors cursor-pointer"
            >
              STORY
            </button>
            <button
              onClick={() => scrollTo("#chapter-moments", { duration: 1.5 })}
              className="hover:text-[#c46845] transition-colors cursor-pointer"
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollTo("#chapter-visit", { duration: 1.5 })}
              className="hover:text-[#c46845] transition-colors cursor-pointer"
            >
              VISIT
            </button>
          </div>

          <button
            onClick={() => scrollTo(0, { duration: 1.8 })}
            data-cursor="TOP"
            className="flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#f4ede4]/70 hover:text-[#c46845] transition-colors cursor-pointer group"
            aria-label="Return to top of journey"
          >
            <span>Return To Origin</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Giant Monolithic Ending Typography */}
        <div className="my-16 md:my-24 text-center flex flex-col items-center">
          <h2 className="font-serif text-[clamp(4.5rem,16vw,17rem)] leading-[0.82] uppercase tracking-tight text-[#f4ede4] font-normal">
            MUSAFIR
          </h2>
          <span className="font-serif text-3xl sm:text-5xl md:text-7xl uppercase tracking-[0.4em] text-[#c46845] font-light mt-2 md:mt-4">
            CAFE
          </span>
          <p className="mt-8 text-xs sm:text-sm font-sans tracking-[0.35em] uppercase text-[#9c9488]">
            {cafeSettings.tagline.toUpperCase()}
          </p>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="pt-8 border-t border-[#f4ede4]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#9c9488] tracking-widest gap-4">
          <div className="uppercase">
            OWNED BY {cafeSettings.owner.toUpperCase()} · {cafeSettings.location.toUpperCase()}
          </div>

          {activeSocials.length > 0 && (
            <div className="flex items-center gap-4">
              {activeSocials.map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f4ede4] transition-colors"
                >
                  {soc.platform}
                </a>
              ))}
            </div>
          )}

          <div className="text-[#9c9488]/60">
            © {new Date().getFullYear()} {cafeSettings.name}. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
