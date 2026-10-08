"use client";

import React, { useState, useEffect } from "react";
import { useLenis } from "./SmoothScroll";
import { ambientSound } from "@/lib/sound";
import { Volume2, VolumeX, Menu as MenuIcon, X } from "lucide-react";

export default function FloatingNav({
  onOpenReservation,
  isVisible = true,
}: {
  onOpenReservation: () => void;
  isVisible?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const state = ambientSound.toggle();
    setIsAudioActive(state);
  };

  const handleNavClick = (target: string) => {
    setIsMenuOpen(false);
    scrollTo(target, { duration: 1.5 });
  };

  if (!isVisible) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 pointer-events-none ${
          isScrolled
            ? "py-4 md:py-5 backdrop-blur-md bg-[#0a0b0d]/75 border-b border-[#f4ede4]/5"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={() => scrollTo(0, { duration: 1.2 })}
            data-cursor="HOME"
            className="pointer-events-auto text-left group cursor-pointer focus:outline-none"
            aria-label="Musafir Cafe Home"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.25em] font-medium text-[#f4ede4] group-hover:text-[#c46845] transition-colors">
              MUSAFIR
            </span>
            <span className="block text-[8px] md:text-[9px] tracking-[0.3em] text-[#9c9488] uppercase">
              Kathmandu · SAH Family
            </span>
          </button>

          {/* Right Navigation & Controls */}
          <div className="pointer-events-auto flex items-center gap-6 md:gap-10">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              data-cursor="SOUND"
              className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#9c9488] hover:text-[#f4ede4] transition-colors cursor-pointer py-1.5 px-2.5 rounded-full border border-[#f4ede4]/10 hover:border-[#f4ede4]/30"
              aria-label={isAudioActive ? "Mute ambient sound" : "Play ambient cafe audio"}
            >
              {isAudioActive ? <Volume2 size={13} className="text-[#c46845]" /> : <VolumeX size={13} />}
              <span>{isAudioActive ? "Sound On" : "Sound Off"}</span>
            </button>

            {/* Desktop Chapter Links */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-sans tracking-[0.25em] uppercase text-[#f4ede4]/80">
              <button
                onClick={() => handleNavClick("#chapter-journey")}
                data-cursor="JOURNEY"
                className="hover:text-[#c46845] transition-colors cursor-pointer"
              >
                Journey
              </button>
              <button
                onClick={() => handleNavClick("#chapter-coffee")}
                data-cursor="COFFEE"
                className="hover:text-[#c46845] transition-colors cursor-pointer"
              >
                Coffee
              </button>
              <button
                onClick={() => handleNavClick("#chapter-food")}
                data-cursor="FOOD"
                className="hover:text-[#c46845] transition-colors cursor-pointer"
              >
                Food
              </button>
              <button
                onClick={() => handleNavClick("#chapter-menu")}
                data-cursor="EXPLORE"
                className="hover:text-[#c46845] transition-colors cursor-pointer"
              >
                Menu
              </button>
              <button
                onClick={() => handleNavClick("#chapter-story")}
                data-cursor="STORY"
                className="hover:text-[#c46845] transition-colors cursor-pointer"
              >
                Story
              </button>
              <button
                onClick={() => handleNavClick("#chapter-visit")}
                data-cursor="VISIT"
                className="hover:text-[#c46845] transition-colors cursor-pointer"
              >
                Visit
              </button>
            </nav>

            {/* Reserve Quick Action */}
            <button
              onClick={onOpenReservation}
              data-cursor="RESERVE"
              className="text-[10px] md:text-[11px] font-sans tracking-[0.25em] uppercase px-4 py-2 border border-[#c46845] text-[#f4ede4] hover:bg-[#c46845] transition-all duration-300 rounded-sm cursor-pointer"
            >
              Reserve
            </button>

            {/* Menu Overlay Trigger (Mobile & Editorial Modal) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-cursor="OPEN"
              className="text-[#f4ede4] hover:text-[#c46845] transition-colors cursor-pointer p-1"
              aria-label={isMenuOpen ? "Close menu" : "Open full menu overlay"}
            >
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Minimalist Editorial Overlay */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#070809]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 lg:p-24 transition-all duration-700 animate-in fade-in"
        >
          {/* Overlay Header */}
          <div className="flex items-center justify-between border-b border-[#f4ede4]/10 pb-6">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] text-[#f4ede4]">MUSAFIRCAFE</span>
              <span className="block text-[10px] tracking-[0.25em] text-[#9c9488] uppercase mt-1">
                A SAH Family Experience · Kathmandu
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-[#f4ede4] hover:text-[#c46845] transition-colors cursor-pointer rounded-full border border-[#f4ede4]/20"
              aria-label="Close menu overlay"
            >
              <X size={22} />
            </button>
          </div>

          {/* Large Editorial Nav Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto max-w-5xl">
            <div className="flex flex-col gap-4 md:gap-6">
              {[
                { title: "01. THE JOURNEY", desc: "Every journey needs a place to pause", target: "#chapter-journey" },
                { title: "02. THE COFFEE", desc: "Himalayan highland bean extractions", target: "#chapter-coffee" },
                { title: "03. THE FOOD", desc: "Momo, Thakali, and Kathmandu kitchen craft", target: "#chapter-food" },
                { title: "04. THE SELECTION", desc: "Curated Musafir signature items", target: "#chapter-selection" },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavClick(item.target)}
                  className="text-left group cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f4ede4]/80 group-hover:text-[#c46845] transition-colors tracking-wide">
                    {item.title}
                  </span>
                  <span className="block text-xs md:text-sm font-sans text-[#9c9488] tracking-widest mt-1">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 md:gap-6 md:pl-12 border-t md:border-t-0 md:border-l border-[#f4ede4]/10 pt-6 md:pt-0">
              {[
                { title: "05. FULL MENU", desc: "Explore all 11 culinary categories", target: "#chapter-menu" },
                { title: "06. SAH FAMILY STORY", desc: "A family, a cafe, a thousand journeys", target: "#chapter-story" },
                { title: "07. GALLERY", desc: "Moments captured in Kathmandu", target: "#chapter-moments" },
                { title: "08. VISIT & RESERVE", desc: "Hours, directions, and your table", target: "#chapter-visit" },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavClick(item.target)}
                  className="text-left group cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f4ede4]/80 group-hover:text-[#c46845] transition-colors tracking-wide">
                    {item.title}
                  </span>
                  <span className="block text-xs md:text-sm font-sans text-[#9c9488] tracking-widest mt-1">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Footer */}
          <div className="border-t border-[#f4ede4]/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9c9488] tracking-widest gap-4">
            <div>KATHMANDU · NEPAL · OPEN DAILY 7:00 AM — 10:00 PM</div>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenReservation();
              }}
              className="text-[#f4ede4] hover:text-[#c46845] underline tracking-[0.2em] uppercase font-medium cursor-pointer"
            >
              Reserve A Table Now →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
