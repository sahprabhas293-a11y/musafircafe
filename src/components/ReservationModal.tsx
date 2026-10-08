"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles, Mail, Phone, AlertCircle } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "18:00",
    guests: 2,
    notes: "",
    occasion: "Casual Journey",
    website: "", // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState("");
  const [serverError, setServerError] = useState("");

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errs.name = "Please provide your full name (at least 2 characters)";
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errs.phone = "Valid phone number required for table confirmation";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Valid email address required for booking confirmation";
    }
    if (!formData.date) {
      errs.date = "Please select a date for your visit";
    }
    if (!formData.time) {
      errs.time = "Please choose an arrival time";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          time: formData.time,
          guests: Number(formData.guests),
          notes: formData.notes,
          occasion: formData.occasion,
          website: formData.website, // honeypot
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Unable to submit reservation request.");
        setIsSubmitting(false);
        return;
      }

      setReservationCode(data.code);
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setServerError("Network error. Please verify your connection.");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setReservationCode("");
    setServerError("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      className="fixed inset-0 z-[120] bg-[#070809]/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 overflow-y-auto animate-in fade-in"
    >
      <div className="relative max-w-2xl w-full bg-[#131417] border border-[#f4ede4]/20 p-8 sm:p-12 rounded-sm shadow-2xl my-auto text-[#f4ede4]">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 text-[#9c9488] hover:text-[#f4ede4] p-1.5 rounded-full border border-[#f4ede4]/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c46845]"
          aria-label="Close reservation modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          /* Confirmation Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#c46845]/15 border border-[#c46845]/40 text-[#c46845] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>

            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#c46845] block mb-2">
              RESERVATION REQUEST RECEIVED
            </span>
            <h3 id="reservation-modal-title" className="font-serif text-3xl sm:text-4xl uppercase text-[#f4ede4] mb-3">
              YOUR TABLE IS BEING PREPARED
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#9c9488] max-w-md mx-auto leading-relaxed mb-6">
              Thank you, <strong className="text-[#f4ede4]">{formData.name}</strong>. A confirmation has been registered for <strong className="text-[#f4ede4]">{formData.guests} guests</strong> on <strong className="text-[#f4ede4]">{formData.date} at {formData.time}</strong>.
            </p>

            <div className="inline-block p-4 bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs mb-8">
              <span className="text-[10px] font-sans tracking-widest text-[#9c9488] uppercase block mb-1">
                Booking Reference Code
              </span>
              <span className="font-mono text-2xl text-[#c46845] font-semibold tracking-wider">
                {reservationCode}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#c46845] text-[#f4ede4] text-xs font-sans tracking-[0.25em] uppercase rounded-xs hover:bg-[#b05837] transition-colors cursor-pointer"
              >
                Return To Journey
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#c46845] mb-2">
                <Sparkles size={12} />
                <span>SAH FAMILY HOSPITALITY</span>
              </div>
              <h3 id="reservation-modal-title" className="font-serif text-3xl sm:text-4xl uppercase text-[#f4ede4] mb-2">
                RESERVE A TABLE
              </h3>
              <p className="text-xs font-sans text-[#9c9488] leading-relaxed">
                Whether arriving alone with a journal or with family for an evening feast, let us reserve a quiet corner for your journey.
              </p>
            </div>

            {serverError && (
              <div className="mb-6 p-3 bg-rose-950/70 border border-rose-500/40 rounded-xs flex items-center gap-2 text-xs text-rose-300">
                <AlertCircle size={15} className="shrink-0 text-rose-400" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam honeypot - invisible to humans */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3 py-2 text-xs text-[#f4ede4] placeholder-[#9c9488]/50 focus:outline-none focus:border-[#c46845]"
                  />
                  {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5 flex items-center gap-1">
                    <Phone size={11} />
                    <span>Phone *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3 py-2 text-xs text-[#f4ede4] placeholder-[#9c9488]/50 focus:outline-none focus:border-[#c46845]"
                  />
                  {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5 flex items-center gap-1">
                    <Mail size={11} />
                    <span>Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3 py-2 text-xs text-[#f4ede4] placeholder-[#9c9488]/50 focus:outline-none focus:border-[#c46845]"
                  />
                  {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5 flex items-center gap-1">
                    <Calendar size={11} />
                    <span>Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3 py-2 text-xs text-[#f4ede4] focus:outline-none focus:border-[#c46845]"
                  />
                  {errors.date && <p className="text-[10px] text-rose-400 mt-1">{errors.date}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5 flex items-center gap-1">
                    <Clock size={11} />
                    <span>Time (7am - 10pm) *</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3 py-2 text-xs text-[#f4ede4] focus:outline-none focus:border-[#c46845]"
                  />
                  {errors.time && <p className="text-[10px] text-rose-400 mt-1">{errors.time}</p>}
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5 flex items-center gap-1">
                    <Users size={11} />
                    <span>Party Size</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3 py-2 text-xs text-[#f4ede4] focus:outline-none focus:border-[#c46845]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Traveler" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message / Special Request */}
              <div>
                <label className="block text-[11px] font-sans tracking-wider uppercase text-[#9c9488] mb-1.5">
                  Special Notes / Occasion (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Seating preferences, celebrations, dietary requests..."
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs px-3 py-2 text-xs text-[#f4ede4] placeholder-[#9c9488]/50 focus:outline-none focus:border-[#c46845]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#f4ede4]/10">
                <span className="text-[10px] font-mono tracking-widest text-[#9c9488] uppercase">
                  Open Daily · 7:00 AM – 10:00 PM (GMT +5:45)
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-2.5 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] text-xs font-sans tracking-[0.25em] uppercase rounded-xs transition-colors cursor-pointer font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Registering..." : "REQUEST RESERVATION"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
