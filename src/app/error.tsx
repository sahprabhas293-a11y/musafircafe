"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime exception encountered:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070809] text-[#f4ede4] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-full bg-rose-950/40 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>

      <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#c46845] block mb-2">
        EXPERIENCE PAUSED
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase text-[#f4ede4] mb-4">
        A TEMPORARY HIMALAYAN MIST
      </h1>

      <p className="text-xs sm:text-sm font-sans text-[#9c9488] max-w-md mx-auto leading-relaxed mb-8">
        We encountered a momentary disturbance in rendering the journey. Rest assured, your table is safe.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] text-xs font-sans tracking-[0.2em] uppercase rounded-xs transition-colors cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Resume Journey</span>
        </button>

        <Link
          href="/"
          className="px-6 py-3 border border-[#f4ede4]/20 hover:border-[#f4ede4] text-xs font-sans tracking-[0.2em] uppercase rounded-xs transition-colors text-[#9c9488] hover:text-[#f4ede4]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
