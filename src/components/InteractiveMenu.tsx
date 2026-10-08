"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { menuCategories, menuItems } from "@/data/menu";
import { MenuCategorySlug, MenuItem, MenuCategory } from "@/types";
import { Search, Flame, Sparkles, Leaf, X } from "lucide-react";

export default function InteractiveMenu() {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [categories, setCategories] = useState<MenuCategory[]>(menuCategories);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategorySlug | "all">("coffee");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyVeg, setShowOnlyVeg] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  // Sync with live backend data
  React.useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        if (res.ok) {
          const data = await res.json();
          if (data.items?.length) setItems(data.items);
          if (data.categories?.length) setCategories(data.categories);
        }
      } catch (err) {
        console.warn("Using offline menu fallback", err);
      }
    }
    fetchMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.categoryId !== selectedCategory) {
        return false;
      }
      // Vegetarian filter
      if (showOnlyVeg && !item.isVegetarian) {
        return false;
      }
      // Featured filter
      if (showOnlyFeatured && !item.featured) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery, showOnlyVeg, showOnlyFeatured]);

  const activeCategoryMeta = useMemo(() => {
    return categories.find((cat) => cat.slug === selectedCategory);
  }, [categories, selectedCategory]);

  return (
    <section
      id="chapter-menu"
      className="relative w-full bg-[#0a0b0d] py-28 md:py-36 text-[#f4ede4] border-t border-[#f4ede4]/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#c46845]">
                CHAPTER 05
              </span>
              <span className="w-12 h-[1px] bg-[#f4ede4]/20" />
              <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-[#9c9488] uppercase">
                COMPLETE TABLE OFFERINGS
              </span>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#f4ede4] font-normal leading-none">
              THE MENU
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#9c9488] font-sans font-light leading-relaxed">
            Freshly prepared to order. All dairy is sourced from local mountain farms. Spices are stone-ground daily in our Kathmandu kitchen.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center bg-[#131417]/70 p-4 md:p-6 rounded-sm border border-[#f4ede4]/10 mb-10">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c9488]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks, or spices..."
              className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#f4ede4] placeholder-[#9c9488]/60 focus:outline-none focus:border-[#c46845] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9c9488] hover:text-[#f4ede4]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => setShowOnlyVeg(!showOnlyVeg)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase border transition-colors cursor-pointer ${
                showOnlyVeg
                  ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/50"
                  : "bg-transparent text-[#9c9488] border-[#f4ede4]/10 hover:border-[#f4ede4]/30"
              }`}
            >
              <Leaf size={12} />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase border transition-colors cursor-pointer ${
                showOnlyFeatured
                  ? "bg-[#c46845]/20 text-[#c46845] border-[#c46845]/60"
                  : "bg-transparent text-[#9c9488] border-[#f4ede4]/10 hover:border-[#f4ede4]/30"
              }`}
            >
              <Sparkles size={12} />
              <span>Featured</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Scrolling Pill Bar */}
        <div className="overflow-x-auto scrollbar-none pb-4 mb-12 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex items-center gap-2 sm:gap-3 w-max">
            <button
              onClick={() => setSelectedCategory("all")}
              data-cursor="SELECT"
              className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#c46845] text-[#f4ede4] font-medium shadow-lg shadow-[#c46845]/20"
                  : "bg-[#131417] text-[#9c9488] border border-[#f4ede4]/10 hover:text-[#f4ede4] hover:border-[#f4ede4]/25"
              }`}
            >
              All Offerings ({items.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                data-cursor="SELECT"
                className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-[#c46845] text-[#f4ede4] font-medium shadow-lg shadow-[#c46845]/20"
                    : "bg-[#131417] text-[#9c9488] border border-[#f4ede4]/10 hover:text-[#f4ede4] hover:border-[#f4ede4]/25"
                }`}
              >
                <span>{cat.name}</span>
                {cat.nepaliSubtitle && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    · {cat.nepaliSubtitle}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category Description Banner if specific category selected */}
        {activeCategoryMeta && (
          <div className="mb-10 pb-6 border-b border-[#f4ede4]/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl uppercase text-[#f4ede4]">
                {activeCategoryMeta.name}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#9c9488] mt-1 max-w-xl">
                {activeCategoryMeta.description}
              </p>
            </div>
            <span className="text-xs font-mono tracking-widest text-[#c46845]">
              {filteredItems.length} Available Choices
            </span>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#f4ede4]/15 rounded-sm">
            <p className="font-serif text-2xl text-[#9c9488]">No items found matching your filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setShowOnlyVeg(false);
                setShowOnlyFeatured(false);
                setSelectedCategory("all");
              }}
              className="mt-4 text-xs font-sans tracking-widest uppercase text-[#c46845] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                data-cursor="VIEW"
                onClick={() => setActiveItemModal(item)}
                className="group p-6 bg-[#131417]/70 hover:bg-[#18191d] border border-[#f4ede4]/10 hover:border-[#c46845]/50 transition-all duration-300 rounded-sm flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-serif text-xl sm:text-2xl text-[#f4ede4] group-hover:text-[#c46845] transition-colors leading-tight">
                      {item.name}
                    </h4>
                    <span className="font-serif text-lg sm:text-xl text-[#c46845] font-light whitespace-nowrap">
                      {item.currency} {item.price}
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[#9c9488] line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f4ede4]/5 flex items-center justify-between text-[11px] font-sans">
                  <div className="flex items-center gap-2">
                    {item.isVegetarian && (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Leaf size={11} />
                        <span className="text-[10px]">Veg</span>
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="flex items-center gap-1 text-rose-400">
                        <Flame size={11} />
                        <span className="text-[10px]">Spicy</span>
                      </span>
                    )}
                    {item.featured && (
                      <span className="flex items-center gap-1 text-[#d49b61]">
                        <Sparkles size={11} />
                        <span className="text-[10px]">Special</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[#9c9488] group-hover:text-[#f4ede4] transition-colors">
                    Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {activeItemModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#070809]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in"
        >
          <div className="relative max-w-xl w-full bg-[#131417] border border-[#f4ede4]/20 p-8 sm:p-10 rounded-sm shadow-2xl">
            <button
              onClick={() => setActiveItemModal(null)}
              className="absolute top-6 right-6 text-[#9c9488] hover:text-[#f4ede4] p-1 rounded-full border border-[#f4ede4]/10 cursor-pointer"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            {activeItemModal.image && (
              <div className="relative w-full h-48 rounded-xs overflow-hidden mb-6 border border-[#f4ede4]/10">
                <Image
                  src={activeItemModal.image}
                  alt={activeItemModal.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#f4ede4]">
                {activeItemModal.name}
              </h3>
              <span className="font-serif text-2xl text-[#c46845]">
                {activeItemModal.currency} {activeItemModal.price}
              </span>
            </div>

            <p className="text-sm font-sans text-[#9c9488] leading-relaxed mb-6">
              {activeItemModal.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {activeItemModal.isVegetarian && (
                <span className="px-2.5 py-1 rounded-xs bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs">
                  Vegetarian
                </span>
              )}
              {activeItemModal.isSpicy && (
                <span className="px-2.5 py-1 rounded-xs bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs">
                  Spiced to order
                </span>
              )}
              {activeItemModal.featured && (
                <span className="px-2.5 py-1 rounded-xs bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs">
                  Musafir Recommendation
                </span>
              )}
            </div>

            <div className="pt-4 border-t border-[#f4ede4]/10 flex items-center justify-between text-xs text-[#9c9488]">
              <span>Category: {activeItemModal.categoryId.toUpperCase()}</span>
              <button
                onClick={() => setActiveItemModal(null)}
                className="text-[#f4ede4] hover:text-[#c46845] uppercase tracking-widest cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
