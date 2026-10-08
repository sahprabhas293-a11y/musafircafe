"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Coffee, Flame, Droplets, Sparkles } from "lucide-react";

const coffeeShowcase = [
  {
    name: "Espresso",
    nepali: "एस्प्रेसो",
    price: "Rs. 160",
    origin: "Single-Origin Nuwakot",
    flavor: "Dark Cacao · Roasted Walnut · Golden Crema",
    body: "Rich & Concentrated",
  },
  {
    name: "Americano",
    nepali: "अमेरिकानो",
    price: "Rs. 180",
    origin: "Highland Arabica",
    flavor: "Bright Citrus · Wild Honey · Clean Finish",
    body: "Elongated & Nuanced",
  },
  {
    name: "Cappuccino",
    nepali: "क्यापुचिनो",
    price: "Rs. 240",
    origin: "House Alpine Blend",
    flavor: "Warm Cinnamon · Sweet Milk · Velvety Foam",
    body: "Balanced & Silky",
  },
  {
    name: "Cafe Latte",
    nepali: "क्याफे लाट्टे",
    price: "Rs. 250",
    origin: "Organic Mountain Beans",
    flavor: "Vanilla Pod · Sweet Caramel · Microfoam Art",
    body: "Smooth & Comforting",
  },
  {
    name: "Cafe Mocha",
    nepali: "क्याफे मोका",
    price: "Rs. 280",
    origin: "Belgian Cacao & Arabica",
    flavor: "70% Dark Chocolate · Espresso · Steamed Cream",
    body: "Decadent & Warm",
  },
  {
    name: "Cold Coffee",
    nepali: "कोल्ड कफी",
    price: "Rs. 280",
    origin: "Chilled Mountain Extraction",
    flavor: "Blended Cocoa Cream · Shaken Ice · Espresso Shot",
    body: "Crisp & Refreshing",
  },
];

export default function CoffeeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const macroImageRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(coffeeShowcase);

  useEffect(() => {
    async function syncCoffeePrices() {
      try {
        const res = await fetch("/api/menu?category=coffee");
        if (res.ok) {
          const data = await res.json();
          if (data.items?.length) {
            setItems((prev) =>
              prev.map((showcaseItem) => {
                const found = data.items.find(
                  (i: any) => i.name.toLowerCase() === showcaseItem.name.toLowerCase()
                );
                return found
                  ? { ...showcaseItem, price: `${found.currency} ${found.price}` }
                  : showcaseItem;
              })
            );
          }
        }
      } catch {}
    }
    syncCoffeePrices();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal/vertical pan of macro coffee image across scroll
      gsap.fromTo(
        macroImageRef.current,
        { xPercent: -6, scale: 1.05 },
        {
          xPercent: 6,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Staggered reveal of individual coffee items as they scroll into view
      const itemElements = itemsContainerRef.current?.querySelectorAll(".coffee-item-row");
      if (itemElements) {
        itemElements.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 60%",
                scrub: 0.5,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chapter-coffee"
      className="relative min-h-screen w-full bg-[#070809] py-28 md:py-36 text-[#f4ede4] overflow-hidden border-t border-[#f4ede4]/5"
    >
      {/* Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#c46845]">
            CHAPTER 02
          </span>
          <span className="w-12 h-[1px] bg-[#f4ede4]/20" />
          <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-[#9c9488] uppercase">
            HIMALAYAN BEAN EXTRACTION
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#9c9488] font-light uppercase block">
              FIRST,
            </span>
            <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.88] tracking-tight uppercase text-[#f4ede4] font-normal">
              COFFEE.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9c9488] font-sans font-light leading-relaxed">
            Every bean is grown above 1,200 meters in the misty foothills of Nuwakot. Roasted in small batches, freshly ground, and extracted with absolute reverence for flavor.
          </p>
        </div>
      </div>

      {/* Cinematic Macro Coffee Banner with Scroll Movement */}
      <div className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden my-12">
        <div
          ref={macroImageRef}
          className="absolute inset-0 w-[115%] -left-[7.5%] h-full filter brightness-90 contrast-110"
        >
          <Image
            src="/images/coffee-macro.jpg"
            alt="Macro shot of rich espresso extraction with steam and crema"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070809] via-transparent to-[#070809]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-transparent to-[#070809]" />
        </div>

        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 z-10 flex items-center gap-3 backdrop-blur-md bg-[#070809]/60 px-5 py-2.5 rounded-full border border-[#f4ede4]/15">
          <Droplets size={14} className="text-[#c46845]" />
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#f4ede4]">
            Dark Roast Nuwakot Arabica · 9 Bar Extraction
          </span>
        </div>
      </div>

      {/* Large Typography Sequential Item List */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
        <div className="border-b border-[#f4ede4]/10 pb-6 mb-8 flex justify-between items-center">
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#9c9488]">
            THE HOUSE ROAST SELECTION
          </span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#c46845]">
            ALL PRICES IN NPR
          </span>
        </div>

        <div ref={itemsContainerRef} className="flex flex-col divide-y divide-[#f4ede4]/10">
          {items.map((item, idx) => (
            <div
              key={item.name}
              data-cursor="COFFEE"
              className="coffee-item-row group py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 hover:pl-4 cursor-pointer"
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-mono text-xs md:text-sm text-[#9c9488] font-light">
                  0{idx + 1}
                </span>
                <div>
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#f4ede4] group-hover:text-[#c46845] transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xs text-[#9c9488] font-sans tracking-widest hidden sm:inline">
                      {item.nepali}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm font-sans text-[#9c9488] mt-1 tracking-wide">
                    {item.flavor}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 pl-10 md:pl-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#9c9488] block">
                    {item.origin}
                  </span>
                  <span className="text-xs text-[#f4ede4]/70 font-sans tracking-wider">
                    {item.body}
                  </span>
                </div>
                <div className="font-serif text-2xl md:text-3xl text-[#c46845] font-light whitespace-nowrap">
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
