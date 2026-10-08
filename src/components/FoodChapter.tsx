"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "./SmoothScroll";

const foodCategoriesShowcase = [
  {
    name: "Momo",
    nepali: "म:म:",
    subtitle: "Steam · Fried · Kothey · Jhol · C-Momo",
    description: "The soul of Kathmandu streets. Delicate translucent pleated skins holding rich savory broths and paired with fiery roasted timur sesame chutney.",
    image: "/images/momo-hero.jpg",
    highlight: "10 Distinct Variations",
    fromPrice: "From Rs. 140",
  },
  {
    name: "Chowmein & Thukpa",
    nepali: "चाउमिन र थुक्पा",
    subtitle: "Wok Char & Himalayan Broths",
    description: "Wok-smoked egg noodles tossed with shredded greens and garlic chili, alongside slow-simmered Tibetan noodle soups warming the Kathmandu evenings.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
    highlight: "Handmade Broths",
    fromPrice: "From Rs. 150",
  },
  {
    name: "Nepali Heritage",
    nepali: "नेपाली थाली",
    subtitle: "Thakali Sets & Newari Chatamari",
    description: "Complete Mustang Thakali thali plates layered with fragrant rice, black mountain lentils, fermented gundruk, and crunchy Newari rice-flour Chatamari.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80",
    highlight: "Generational Recipes",
    fromPrice: "From Rs. 250",
  },
  {
    name: "Fried Rice",
    nepali: "भुटेको भात",
    subtitle: "High Flame Wok Fragrance",
    description: "Long-grain rice wok-tossed over blazing heat with garden peas, shredded farm vegetables, farm eggs, and a touch of roasted sesame oil.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80",
    highlight: "Flame Charred",
    fromPrice: "From Rs. 170",
  },
  {
    name: "Burger & Sandwich",
    nepali: "बर्गर र स्यान्डविच",
    subtitle: "Artisanal Buns & Melted Cheese",
    description: "Golden brioche buns and toasted sourdough packed with charred spiced patties, caramelized onions, crisp greens, and rich mountain cheddar.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    highlight: "Freshly Baked Bread",
    fromPrice: "From Rs. 220",
  },
  {
    name: "Pizza & Sourdough",
    nepali: "पिज्जा",
    subtitle: "Stone-Baked Thin Crust",
    description: "Hand-stretched sourdough dough blistered in hot stone ovens, topped with sweet San Marzano style reduction and molten local buffalo mozzarella.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    highlight: "Stone Oven Fired",
    fromPrice: "From Rs. 450",
  },
  {
    name: "Desserts & Bakes",
    nepali: "मिठाई",
    subtitle: "Fudge Brownie & Cheesecake",
    description: "Decadent Belgian dark chocolate brownies served warm with vanilla bean gelato, alongside velvety baked cheesecakes.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80",
    highlight: "House Baked Daily",
    fromPrice: "From Rs. 180",
  },
];

export default function FoodChapter() {
  const containerRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    // Only apply horizontal scroll pinning on desktop (min-width: 1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = horizontalTrackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${totalScrollWidth * 1.1}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="chapter-food"
      className="relative w-full bg-[#0a0b0d] text-[#f4ede4] overflow-hidden border-t border-[#f4ede4]/5"
    >
      {/* Intro Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#c46845]">
            CHAPTER 03
          </span>
          <span className="w-12 h-[1px] bg-[#f4ede4]/20" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-[#9c9488] uppercase">
            KATHMANDU CULINARY HERITAGE
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#9c9488] font-light uppercase block">
              THEN,
            </span>
            <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.88] tracking-tight uppercase text-[#f4ede4] font-normal">
              FOOD.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm md:text-base text-[#9c9488] font-sans font-light leading-relaxed mb-4">
              Where Himalayan mountain comfort blends with classic street-side craftsmanship. Each plate is prepared fresh with locally sourced ingredients.
            </p>
            <button
              onClick={() => scrollTo("#chapter-menu", { duration: 1.5 })}
              className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#c46845] hover:text-[#f4ede4] transition-colors cursor-pointer"
            >
              <span>Explore Complete Menu</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Track for Desktop / Vertical Sequence for Mobile */}
      <div className="w-full pb-24 md:pb-32">
        <div
          ref={horizontalTrackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-12 lg:w-max will-change-transform"
        >
          {foodCategoriesShowcase.map((food, idx) => (
            <div
              key={food.name}
              data-cursor="EXPLORE"
              className="w-full lg:w-[480px] xl:w-[540px] shrink-0 group flex flex-col justify-between bg-[#131417]/80 border border-[#f4ede4]/10 rounded-sm overflow-hidden hover:border-[#c46845]/50 transition-all duration-500"
            >
              {/* Category Image with Zoom on Hover */}
              <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] overflow-hidden">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131417] via-transparent to-transparent opacity-80" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 backdrop-blur-md bg-[#0a0b0d]/70 px-3.5 py-1.5 rounded-full border border-[#f4ede4]/10">
                  <span className="text-[10px] font-mono tracking-widest text-[#c46845]">
                    0{idx + 1}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#f4ede4]/40" />
                  <span className="text-[10px] font-sans tracking-wider uppercase text-[#f4ede4]">
                    {food.highlight}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-10 text-xs font-mono tracking-wider text-[#f4ede4] bg-[#c46845] px-3 py-1 rounded-xs">
                  {food.fromPrice}
                </div>
              </div>

              {/* Text Information */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-3xl md:text-4xl uppercase text-[#f4ede4] group-hover:text-[#c46845] transition-colors tracking-wide">
                      {food.name}
                    </h3>
                    <span className="text-xs text-[#9c9488] font-sans">
                      {food.nepali}
                    </span>
                  </div>
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#c46845] block mb-3">
                    {food.subtitle}
                  </span>
                  <p className="text-xs md:text-sm font-sans text-[#9c9488] leading-relaxed">
                    {food.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f4ede4]/10 flex items-center justify-between">
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#9c9488]">
                    Crafted In Kitchen
                  </span>
                  <button
                    onClick={() => scrollTo("#chapter-menu", { duration: 1.5 })}
                    className="text-xs font-sans tracking-[0.2em] uppercase text-[#f4ede4] group-hover:text-[#c46845] flex items-center gap-1 cursor-pointer"
                  >
                    View Items →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
