import { CafeSettings, SocialLink } from "@/types";

export const cafeSettings: CafeSettings = {
  name: "MUSAFIRCAFE",
  tagline: "A Place For Every Journey",
  owner: "SAH Family",
  location: "Kathmandu, Nepal",
  city: "Kathmandu",
  country: "Nepal",
  openingHours: "7:00 AM — 10:00 PM",
  timezone: "Nepal Time",
  gmtOffset: "GMT +5:45",
  coordinates: {
    lat: 27.7172,
    lng: 85.324,
  },
  phone: undefined, // Backend placeholder
  email: undefined, // Backend placeholder
  isReservationsEnabled: true,
  isHolidayClosed: false,
};

export const socialLinks: SocialLink[] = [
  { platform: "Instagram", url: undefined, enabled: false },
  { platform: "Facebook", url: undefined, enabled: false },
  { platform: "TikTok", url: undefined, enabled: false },
  { platform: "YouTube", url: undefined, enabled: false },
];
