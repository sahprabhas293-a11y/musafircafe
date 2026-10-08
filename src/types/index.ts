export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export type AuditAction =
  | "ADMIN_LOGIN"
  | "ADMIN_LOGOUT"
  | "MENU_ITEM_CREATE"
  | "MENU_ITEM_UPDATE"
  | "MENU_ITEM_DELETE"
  | "CATEGORY_UPDATE"
  | "GALLERY_CREATE"
  | "GALLERY_UPDATE"
  | "GALLERY_DELETE"
  | "DESTINATION_UPDATE"
  | "SETTINGS_UPDATE"
  | "CONTENT_UPDATE"
  | "RESERVATION_STATUS_CHANGE"
  | "ADMIN_USER_UPDATE";

export interface AuditLog {
  id: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  performedBy: string; // user email
  role: AdminRole;
  timestamp: string;
  details: string;
}

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Reservation {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  occasion?: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CafeSettings {
  name: string;
  tagline: string;
  owner: string;
  location: string;
  city: string;
  country: string;
  address?: string;
  phone?: string;
  email?: string;
  openingHours: string;
  timezone: string;
  gmtOffset: string;
  isReservationsEnabled: boolean;
  isHolidayClosed: boolean;
  holidayNotice?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl?: string;
}

export type MenuCategorySlug =
  | "coffee"
  | "tea"
  | "momo"
  | "noodles"
  | "fried-rice"
  | "snacks"
  | "burger-sandwich"
  | "pizza"
  | "nepali"
  | "dessert"
  | "cold-drinks";

export interface MenuCategory {
  id: string;
  slug: MenuCategorySlug;
  name: string;
  nepaliSubtitle?: string;
  description: string;
  order: number;
}

export interface MenuItem {
  id: string;
  categoryId: MenuCategorySlug;
  name: string;
  nepaliName?: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  available: boolean;
  featured?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  tags?: string[];
  order: number;
}

export interface SignatureItem {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  notes: string[];
  pairing: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: "atmosphere" | "coffee" | "culinary" | "travel" | "people";
  caption: string;
  aspectRatio: "square" | "tall" | "wide" | "cinema";
  order: number;
  published: boolean;
}

export interface Destination {
  id: string;
  name: string;
  nepaliName: string;
  tagline: string;
  description: string;
  elevation: string;
  distanceFromKathmandu: string;
  image: string;
  culturalNote: string;
  order: number;
}

export interface SocialLink {
  platform: "Instagram" | "Facebook" | "TikTok" | "YouTube" | "WhatsApp";
  url?: string;
  enabled: boolean;
}

export interface SiteContent {
  intro: {
    presenter: string;
    subtext: string;
    headline: string[];
  };
  brand: {
    name: string;
    subname: string;
    meaning: string;
    heritage: string;
    actionText: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    locationNote: string;
  };
  journey: {
    headline: string[];
    paragraph: string;
  };
  coffee: {
    preTitle: string;
    title: string;
    story: string;
  };
  food: {
    preTitle: string;
    title: string;
    story: string;
  };
  familyStory: {
    heading: string[];
    body: string;
    founderNote: string;
  };
  people: {
    heading: string[];
    subtext: string;
  };
  visit: {
    heading: string[];
    subheading: string;
    schedule: string;
    directionsNote: string;
  };
}
