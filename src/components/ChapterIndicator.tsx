"use client";

import React, { useEffect, useState } from "react";
import { useLenis } from "./SmoothScroll";

export interface Chapter {
  id: string;
  number: string;
  title: string;
  sectionId: string;
}

const chapters: Chapter[] = [
  { id: "chap-1", number: "01 / 06", title: "JOURNEY", sectionId: "#chapter-journey" },
  { id: "chap-2", number: "02 / 06", title: "COFFEE", sectionId: "#chapter-coffee" },
  { id: "chap-3", number: "03 / 06", title: "FOOD", sectionId: "#chapter-food" },
  { id: "chap-4", number: "04 / 06", title: "STORY", sectionId: "#chapter-story" },
  { id: "chap-5", number: "05 / 06", title: "MOMENTS", sectionId: "#chapter-moments" },
  { id: "chap-6", number: "06 / 06", title: "VISIT", sectionId: "#chapter-visit" },
];

export default function ChapterIndicator({ isVisible = true }: { isVisible?: boolean }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      chapters.forEach((chapter, index) => {
        const el = document.querySelector(chapter.sectionId) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChapterIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const current = chapters[activeChapterIndex] || chapters[0];

  return (
    <aside
      aria-label="Chapter navigation"
      className="fixed left-6 md:left-12 bottom-10 z-40 hidden sm:flex flex-col gap-3 pointer-events-auto select-none"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.25em] text-[#f4ede4]/40 font-mono transition-all duration-500">
            {current.number}
          </span>
          <span className="text-xs tracking-[0.2em] font-sans font-medium text-[#f4ede4] uppercase transition-all duration-500">
            {current.title}
          </span>
        </div>

        {/* Vertical subtle indicator ticks */}
        <div className="flex items-center gap-1.5 ml-2">
          {chapters.map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => scrollTo(chap.sectionId, { duration: 1.6 })}
              aria-label={`Jump to chapter ${chap.number} ${chap.title}`}
              className={`h-6 flex items-center justify-center p-0.5 group cursor-pointer transition-all duration-300`}
            >
              <span
                className={`w-[2px] block transition-all duration-500 rounded-full ${
                  activeChapterIndex === idx
                    ? "h-5 bg-[#c46845]"
                    : "h-2 bg-[#f4ede4]/20 group-hover:h-3 group-hover:bg-[#f4ede4]/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
