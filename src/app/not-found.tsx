import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070809] text-[#f4ede4] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-full bg-[#c46845]/15 border border-[#c46845]/40 text-[#c46845] flex items-center justify-center mb-6">
        <Compass size={32} />
      </div>

      <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#c46845] block mb-2">
        ERROR 404 · PATHWAY UNCHARTED
      </span>

      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase text-[#f4ede4] mb-4">
        A TRAIL OFF THE MAP
      </h1>

      <p className="text-xs sm:text-sm font-sans text-[#9c9488] max-w-md mx-auto leading-relaxed mb-8">
        The sanctuary you seek has moved or does not exist along this valley pass. Let us guide your footsteps back to the warmth of the café.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] text-xs font-sans tracking-[0.25em] uppercase rounded-xs transition-colors font-medium shadow-lg shadow-[#c46845]/20"
      >
        <ArrowLeft size={14} />
        <span>Return To MusafirCafe</span>
      </Link>
    </div>
  );
}
