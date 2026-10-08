"use client";

import React, { useState, useEffect } from "react";
import { cafeSettings } from "@/data/settings";
import { MapPin, Clock, Calendar, ArrowRight, X, Compass } from "lucide-react";

interface VisitSectionProps {
  onOpenReservation: () => void;
}

export default function VisitSection({ onOpenReservation }: VisitSectionProps) {
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [settings, setSettings] = useState(cafeSettings);

  React.useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch {}
    }
    loadSettings();
  }, []);

  return (
    <section
      id="chapter-visit"
      className="relative min-h-[90vh] w-full bg-[#070809] py-28 md:py-40 text-[#f4ede4] overflow-hidden border-t border-[#f4ede4]/5 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#c46845]" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase text-[#c46845]">
            FINAL CHAPTER · DESTINATION
          </span>
          <span className="w-8 h-[1px] bg-[#c46845]" />
        </div>

        {/* Dramatic Headline */}
        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.92] font-normal text-[#f4ede4]">
          YOUR TABLE
        </h2>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] font-light text-[#c46845] mt-2">
          IS WAITING.
        </h2>

        {/* Cafe Information Block */}
        <div className="mt-12 md:mt-16 max-w-xl mx-auto p-8 md:p-10 bg-[#131417]/80 backdrop-blur-md border border-[#f4ede4]/10 rounded-sm">
          <h3 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-[#f4ede4] mb-2">
            MUSAFIRCAFE
          </h3>
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-[#9c9488] mb-6">
            KATHMANDU · NEPAL
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-6 border-t border-[#f4ede4]/10 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#f4ede4]/90">
              <Clock size={14} className="text-[#c46845]" />
              <div className="text-left">
                <span className="block font-medium uppercase tracking-wider">OPEN DAILY</span>
                <span className="text-[#9c9488]">{settings.openingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#f4ede4]/90">
              <Compass size={14} className="text-[#c46845]" />
              <div className="text-left">
                <span className="block font-medium uppercase tracking-wider">TIMEZONE</span>
                <span className="text-[#9c9488]">Nepal Time · {settings.gmtOffset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => setShowDirectionsModal(true)}
            data-cursor="DIRECTIONS"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#f4ede4]/25 hover:border-[#f4ede4] text-[#f4ede4] text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 rounded-xs cursor-pointer flex items-center justify-center gap-2 group"
          >
            <MapPin size={14} className="text-[#c46845] group-hover:scale-110 transition-transform" />
            <span>GET DIRECTIONS</span>
          </button>

          <button
            onClick={onOpenReservation}
            data-cursor="RESERVE"
            className="w-full sm:w-auto px-9 py-3.5 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 rounded-xs cursor-pointer flex items-center justify-center gap-2 font-medium shadow-lg shadow-[#c46845]/20 group"
          >
            <span>RESERVE A TABLE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Directions Modal */}
      {showDirectionsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] bg-[#070809]/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in"
        >
          <div className="relative max-w-lg w-full bg-[#131417] border border-[#f4ede4]/20 p-8 sm:p-10 rounded-sm shadow-2xl text-[#f4ede4]">
            <button
              onClick={() => setShowDirectionsModal(false)}
              className="absolute top-6 right-6 text-[#9c9488] hover:text-[#f4ede4] p-1.5 rounded-full border border-[#f4ede4]/10 cursor-pointer"
              aria-label="Close directions modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c46845] mb-2 uppercase">
              <MapPin size={14} />
              <span>Location Coordinates</span>
            </div>

            <h3 className="font-serif text-3xl uppercase text-[#f4ede4] mb-2">
              KATHMANDU, NEPAL
            </h3>
            <p className="text-xs font-sans text-[#9c9488] leading-relaxed mb-6">
              Located in the historic Kathmandu valley, amidst traditional courtyards and mountain views.
            </p>

            <div className="space-y-3 bg-[#0a0b0d] p-4 rounded-xs border border-[#f4ede4]/10 text-xs font-sans mb-6">
              <div className="flex justify-between border-b border-[#f4ede4]/5 pb-2">
                <span className="text-[#9c9488]">City / Valley:</span>
                <span className="font-medium text-[#f4ede4]">Kathmandu, Nepal</span>
              </div>
              <div className="flex justify-between border-b border-[#f4ede4]/5 pb-2">
                <span className="text-[#9c9488]">Hours:</span>
                <span className="font-medium text-[#f4ede4]">Open Daily 7:00 AM — 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9c9488]">Coordinates:</span>
                <span className="font-mono text-[#c46845]">27.7172° N, 85.3240° E</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#f4ede4]/10 text-xs">
              <a
                href="https://maps.google.com/?q=Kathmandu,Nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c46845] hover:underline uppercase tracking-wider"
              >
                Open In Google Maps ↗
              </a>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="text-[#9c9488] hover:text-[#f4ede4] uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
