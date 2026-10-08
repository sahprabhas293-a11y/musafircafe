import { Destination } from "@/types";

export const travelDestinations: Destination[] = [
  {
    id: "dest-ktm",
    name: "Kathmandu",
    nepaliName: "काठमाडौँ",
    tagline: "The Ancient Valley of Gods & Courtyards",
    description:
      "A labyrinth of centuries-old brick alleys, carved Newari windows, aromatic incense, and golden spires rising into morning mist. The heart of our café journey.",
    elevation: "1,400 m",
    distanceFromKathmandu: "Origin",
    image: "/images/brand-reveal-bg.jpg",
    culturalNote: "Where ancient heritage meets vibrant modern café culture in the Himalayas.",
    order: 1,
  },
  {
    id: "dest-pokhara",
    name: "Pokhara",
    nepaliName: "पोखरा",
    tagline: "Mirrored Lakes Beneath Annapurna Peaks",
    description:
      "Tranquil Phewa lake waters reflecting the jagged snow peak of Machhapuchhre (Fishtail). The legendary haven for trekkers returning from high alpine passes.",
    elevation: "822 m",
    distanceFromKathmandu: "200 km West",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    culturalNote: "Gentle lake breezes, mountain reflections, and quiet evening contemplation.",
    order: 2,
  },
  {
    id: "dest-mustang",
    name: "Mustang",
    nepaliName: "मुस्ताङ",
    tagline: "The Walled Kingdom in the Rain Shadow",
    description:
      "Windswept ochre canyons, ancient cliff-cave monasteries, and whitewashed stupas beneath towering eight-thousand-meter peaks of Dhaulagiri and Nilgiri.",
    elevation: "3,840 m",
    distanceFromKathmandu: "360 km Northwest",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    culturalNote: "A timeless trans-Himalayan Tibetan plateau preserving pristine ancient traditions.",
    order: 3,
  },
  {
    id: "dest-janakpur",
    name: "Janakpur",
    nepaliName: "जनकपुर",
    tagline: "The City of Ponds, Mithila Art & Sacred Temples",
    description:
      "A sacred plain dotted with dozens of tranquil holy ponds, vibrant hand-painted Mithila murals, and the magnificent marble palace architecture of Janaki Mandir.",
    elevation: "74 m",
    distanceFromKathmandu: "225 km Southeast",
    image: "https://images.unsplash.com/photo-1596178060810-72660bed9a3d?auto=format&fit=crop&w=1200&q=80",
    culturalNote: "Cradle of Maithili culture, intricate folk frescoes, and soul-stirring evening aartis.",
    order: 4,
  },
  {
    id: "dest-saptari",
    name: "Saptari",
    nepaliName: "सप्तरी",
    tagline: "Fertile Terai Plains & River Tributaries",
    description:
      "Wide golden horizons, lush green paddy fields bordered by mango orchards, and the gentle serpentine currents of the Koshi river basin under expansive skies.",
    elevation: "85 m",
    distanceFromKathmandu: "290 km Southeast",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    culturalNote: "Deep familial roots, fertile earth, and warm community hospitality.",
    order: 5,
  },
  {
    id: "dest-biratnagar",
    name: "Biratnagar",
    nepaliName: "विराटनगर",
    tagline: "The Dynamic Eastern Gateway",
    description:
      "A bustling cultural and trade hub in eastern Nepal, where morning street stalls brew spiced black tea and the air hums with enterprise, stories, and forward movement.",
    elevation: "80 m",
    distanceFromKathmandu: "375 km East",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
    culturalNote: "Where travelers cross pathways heading toward the high tea estates of Ilam.",
    order: 6,
  },
];
