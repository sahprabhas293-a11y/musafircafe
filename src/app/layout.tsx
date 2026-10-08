import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://musafircafe.com"),
  title: "MUSAFIRCAFE — A Place For Every Journey | Kathmandu, Nepal",
  description:
    "MusafirCafe is a family-owned café by SAH Family in Kathmandu, Nepal. An immersive digital journey through coffee, food, culture, and Himalayan memories.",
  keywords: [
    "MusafirCafe",
    "Kathmandu cafe",
    "SAH Family",
    "Nepal specialty coffee",
    "Artisanal momo",
    "Himalayan journey",
    "Nepal travel cafe",
  ],
  authors: [{ name: "SAH Family" }],
  openGraph: {
    title: "MUSAFIRCAFE — A Place For Every Journey",
    description: "Owned by SAH Family. Kathmandu, Nepal.",
    images: ["/images/cafe-interior.jpg"],
    type: "website",
    locale: "en_US",
    siteName: "MusafirCafe",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUSAFIRCAFE — A Place For Every Journey",
    description: "Owned by SAH Family. Kathmandu, Nepal.",
    images: ["/images/cafe-interior.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "MusafirCafe",
    alternateName: "Musafir Cafe Kathmandu",
    description: "A premium cinematic café experience by SAH Family in Kathmandu, Nepal.",
    url: "https://musafircafe.com",
    image: "https://musafircafe.com/images/cafe-interior.jpg",
    servesCuisine: ["Nepali", "Himalayan", "Specialty Coffee", "Artisan Momo"],
    priceRange: "Rs. 150 - Rs. 700",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.7172,
      longitude: 85.324,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "22:00",
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0b0d] text-[#f4ede4] antialiased selection:bg-[#c46845] selection:text-[#f4ede4]">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
