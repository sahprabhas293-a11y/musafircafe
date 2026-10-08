"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sahfamily@musafircafe.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network or connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070809] text-[#f4ede4] flex flex-col justify-between p-6 md:p-12 font-sans select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#9c9488] hover:text-[#f4ede4] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return To Public Experience</span>
        </Link>
        <span className="text-[10px] font-mono tracking-widest text-[#c46845] uppercase">
          SECURE PORTAL
        </span>
      </div>

      {/* Center Login Box */}
      <div className="max-w-md w-full mx-auto my-auto p-8 sm:p-10 bg-[#131417] border border-[#f4ede4]/15 rounded-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#c46845]/15 border border-[#c46845]/40 text-[#c46845] flex items-center justify-center mx-auto mb-4">
            <Lock size={20} />
          </div>
          <h1 className="font-serif text-3xl uppercase tracking-wider text-[#f4ede4]">
            MUSAFIRCAFE
          </h1>
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#9c9488] block mt-1">
            MANAGEMENT CONSOLE · SAH FAMILY
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-xs flex items-center gap-3 text-xs text-rose-300">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sahfamily@musafircafe.com"
              className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3.5 py-2.5 text-xs text-[#f4ede4] focus:outline-none focus:border-[#c46845] transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488]">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3.5 py-2.5 text-xs text-[#f4ede4] focus:outline-none focus:border-[#c46845] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] text-xs font-sans tracking-[0.25em] uppercase rounded-xs transition-colors cursor-pointer font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Enter Management Console"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Demo / Developer Credentials Helper */}
        <div className="mt-8 pt-6 border-t border-[#f4ede4]/10 text-[11px] text-[#9c9488] leading-relaxed">
          <div className="flex items-center gap-1.5 text-[#f4ede4] font-medium mb-1.5">
            <ShieldCheck size={14} className="text-[#c46845]" />
            <span>Development Authentication:</span>
          </div>
          <p className="font-mono text-[10px] text-[#9c9488]/80">
            Account: <code>sahfamily@musafircafe.com</code><br />
            Password: <code>MusafirSah2026!</code> (or <code>Musafir2026!</code>)
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-[10px] font-mono tracking-widest text-[#9c9488]/60 uppercase">
        Protected with HTTP-only cookies, rate limiting, and role-based access control.
      </div>
    </div>
  );
}
