import { SignatureItem } from "@/types";

export const signatureItems: SignatureItem[] = [
  {
    id: "sig-1",
    name: "Musafir Latte",
    subtitle: "The Signature Journey Roast",
    tagline: "Single-origin mountain espresso with wild Himalayan spices and velvety microfoam.",
    description:
      "A tribute to travelers passing through the valley. Extracted from shade-grown Nuwakot Arabica beans, gently infused with whole crushed green cardamom, cinnamon bark, and saffron-infused golden milk, finished with silky microfoam mandala art.",
    price: 340,
    currency: "Rs.",
    image: "/images/coffee-macro.jpg",
    notes: ["Nuwakot Organic Arabica", "Wild Cardamom Infusion", "Golden Saffron Dust", "Velvety Microfoam"],
    pairing: "Pairs with artisanal dark chocolate fudge brownie",
  },
  {
    id: "sig-2",
    name: "SAH Special",
    subtitle: "Curated by SAH Family",
    tagline: "The house secret recipe combining slow-simmered comfort and rich heritage spices.",
    description:
      "Created from an intimate family recipe perfected over decades. Slow-roasted Himalayan herbs, hand-rolled tender dumplings in a fragrant smoked sesame-timur broth, served with crisp artisan flatbread and seasonal spiced pickles.",
    price: 390,
    currency: "Rs.",
    image: "/images/food-hero.jpg",
    notes: ["Family Secret Spice Blend", "Smoked Sesame-Timur Broth", "Hand-pleated Dumplings", "Charred Herb Garnish"],
    pairing: "Best savored with a hot cup of slow-brewed Masala Tea",
  },
  {
    id: "sig-3",
    name: "Traveler's Breakfast",
    subtitle: "Morning Expedition Fuel",
    tagline: "A hearty dawn feast designed for early wanderers setting out into the Himalayas.",
    description:
      "Everything the morning traveler desires before an expedition into the high ridges. Two farm-fresh eggs cooked your way, artisanal sourdough toast, grilled herb sausages, charred wild mushrooms, hash brown crisp, and freshly pressed juice or drip coffee.",
    price: 450,
    currency: "Rs.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
    notes: ["Farm Fresh Country Eggs", "Artisanal Sourdough", "Charred Wild Mushrooms", "Fresh Pressed Juice"],
    pairing: "Comes with your choice of double espresso or fresh orange juice",
  },
];
