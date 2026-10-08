"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FloatingNav from "@/components/FloatingNav";
import ChapterIndicator from "@/components/ChapterIndicator";
import IntroSequence from "@/components/IntroSequence";
import HeroScene from "@/components/HeroScene";
import JourneySection from "@/components/JourneySection";
import CoffeeChapter from "@/components/CoffeeChapter";
import FoodChapter from "@/components/FoodChapter";
import SignatureSelection from "@/components/SignatureSelection";
import PeopleScene from "@/components/PeopleScene";
import FamilyStory from "@/components/FamilyStory";
import TravelSection from "@/components/TravelSection";
import InteractiveMenu from "@/components/InteractiveMenu";
import EditorialGallery from "@/components/EditorialGallery";
import VisitSection from "@/components/VisitSection";
import ReservationModal from "@/components/ReservationModal";
import Footer from "@/components/Footer";

export default function MusafirCafeApp() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <SmoothScroll isLocked={!isIntroComplete}>
      {/* Custom Minimalist Cinematic Cursor (Desktop) */}
      <CustomCursor />

      {/* Cinematic Opening Film & Brand Reveal Experience */}
      <IntroSequence
        isUnlocked={isIntroComplete}
        onComplete={() => setIsIntroComplete(true)}
      />

      {/* Floating Minimal Navigation Bar */}
      <FloatingNav
        isVisible={isIntroComplete}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Subtle Dynamic Chapter Indicator (01 - 06) */}
      <ChapterIndicator isVisible={isIntroComplete} />

      {/* Main Experience Stream */}
      <main className="relative min-h-screen w-full bg-[#0a0b0d] overflow-x-hidden">
        {/* Full-screen Kathmandu Cafe Interior Scene */}
        <HeroScene />

        {/* Chapter 01: The Journey */}
        <JourneySection />

        {/* Chapter 02: Coffee */}
        <CoffeeChapter />

        {/* Chapter 03: Food */}
        <FoodChapter />

        {/* The Musafir Selection (Signatures) */}
        <SignatureSelection
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* The Table / People Candid Gathering Scene */}
        <PeopleScene />

        {/* Chapter 04: SAH Family Story */}
        <FamilyStory />

        {/* Travel Section: Where Will You Go Next? */}
        <TravelSection />

        {/* Chapter 05: The Interactive Full Menu */}
        <InteractiveMenu />

        {/* Chapter 06: Editorial Moments Gallery */}
        <EditorialGallery />

        {/* Chapter 06 Ending: Visit Kathmandu & Directions */}
        <VisitSection
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* The Ending of the Journey */}
        <Footer />
      </main>

      {/* Full-Screen Reservation Experience Overlay */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </SmoothScroll>
  );
}
