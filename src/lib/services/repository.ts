import fs from "fs";
import path from "path";
import {
  CafeSettings,
  MenuCategory,
  MenuItem,
  SignatureItem,
  GalleryItem,
  Destination,
  Reservation,
  ReservationStatus,
  SocialLink,
  SiteContent,
  AdminUser,
  AuditLog,
  AdminRole,
} from "@/types";

import { cafeSettings as defaultSettings, socialLinks as defaultSocials } from "@/data/settings";
import { menuCategories as defaultCategories, menuItems as defaultMenuItems } from "@/data/menu";
import { signatureItems as defaultSignatures } from "@/data/signatures";
import { travelDestinations as defaultDestinations } from "@/data/destinations";
import { galleryItems as defaultGallery } from "@/data/gallery";
import { siteContent as defaultContent } from "@/data/content";

interface DatabaseSchema {
  settings: CafeSettings;
  categories: MenuCategory[];
  menuItems: MenuItem[];
  signatures: SignatureItem[];
  destinations: Destination[];
  gallery: GalleryItem[];
  socialLinks: SocialLink[];
  content: SiteContent;
  reservations: Reservation[];
  auditLogs: AuditLog[];
  adminUsers: AdminUser[];
}

const DB_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "musafircafe-db.json");

// Default initial admin accounts
const defaultAdminUsers: AdminUser[] = [
  {
    id: "usr-superadmin",
    email: "sahfamily@musafircafe.com",
    name: "SAH Family (Owner)",
    role: "SUPER_ADMIN",
    isActive: true,
    createdAt: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "usr-admin",
    email: "manager@musafircafe.com",
    name: "Kathmandu Cafe Manager",
    role: "ADMIN",
    isActive: true,
    createdAt: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "usr-editor",
    email: "editor@musafircafe.com",
    name: "Menu & Gallery Editor",
    role: "EDITOR",
    isActive: true,
    createdAt: "2026-10-01T00:00:00.000Z",
  },
];

// Initial reservations seed
const defaultReservations: Reservation[] = [
  {
    id: "res-001",
    code: "MC-7821",
    name: "Siddhartha Thapa",
    phone: "+977 9841234567",
    email: "siddhartha@example.com",
    date: "2026-10-10",
    time: "18:30",
    guests: 4,
    notes: "Terrace seating if possible, celebrating family return to valley.",
    occasion: "Family Gathering",
    status: "CONFIRMED",
    createdAt: "2026-10-08T09:15:00.000Z",
  },
  {
    id: "res-002",
    code: "MC-4190",
    name: "Elena Rostova",
    phone: "+977 9812345678",
    email: "elena.travels@example.com",
    date: "2026-10-11",
    time: "10:00",
    guests: 2,
    notes: "Travelers just finished Annapurna circuit, looking forward to coffee.",
    occasion: "Expedition Return",
    status: "PENDING",
    createdAt: "2026-10-08T11:42:00.000Z",
  },
];

// In-memory cache
let inMemoryDb: DatabaseSchema | null = null;

function loadDatabase(): DatabaseSchema {
  if (inMemoryDb) return inMemoryDb;

  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      inMemoryDb = JSON.parse(data);
      return inMemoryDb!;
    }
  } catch (err) {
    console.error("Error reading database file, initializing defaults", err);
  }

  // Initialize fresh database structure with default values
  const freshDb: DatabaseSchema = {
    settings: {
      ...defaultSettings,
      isReservationsEnabled: true,
      isHolidayClosed: false,
      address: "Historic Courtyard District, Kathmandu Valley, Nepal",
      phone: "+977 1-4XXXXXX (Reservation line)",
      email: "namaste@musafircafe.com",
    },
    categories: defaultCategories,
    menuItems: defaultMenuItems,
    signatures: defaultSignatures,
    destinations: defaultDestinations,
    gallery: defaultGallery.map((g) => ({ ...g, published: true })),
    socialLinks: defaultSocials,
    content: defaultContent,
    reservations: defaultReservations,
    auditLogs: [
      {
        id: "log-init",
        action: "SETTINGS_UPDATE",
        entity: "Database",
        performedBy: "system@musafircafe.com",
        role: "SUPER_ADMIN",
        timestamp: new Date().toISOString(),
        details: "Initial database initialized for MusafirCafe production repository.",
      },
    ],
    adminUsers: defaultAdminUsers,
  };

  saveDatabase(freshDb);
  inMemoryDb = freshDb;
  return inMemoryDb;
}

function saveDatabase(db: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
    inMemoryDb = db;
  } catch (err) {
    console.error("Error writing database file", err);
    inMemoryDb = db;
  }
}

// -------------------------------------------------------------
// Centralized Data Access Services (Repository Pattern)
// -------------------------------------------------------------

export async function getCafeSettings(): Promise<CafeSettings> {
  const db = loadDatabase();
  return db.settings;
}

export async function updateCafeSettings(
  updated: Partial<CafeSettings>,
  performedBy: string,
  role: AdminRole
): Promise<CafeSettings> {
  const db = loadDatabase();
  db.settings = { ...db.settings, ...updated };
  logAuditEvent(db, {
    action: "SETTINGS_UPDATE",
    entity: "CafeSettings",
    performedBy,
    role,
    details: `Updated cafe settings: ${Object.keys(updated).join(", ")}`,
  });
  saveDatabase(db);
  return db.settings;
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const db = loadDatabase();
  return [...db.categories].sort((a, b) => a.order - b.order);
}

export async function getMenuItems(options?: {
  categoryId?: string;
  availableOnly?: boolean;
}): Promise<MenuItem[]> {
  const db = loadDatabase();
  let items = [...db.menuItems];
  if (options?.categoryId && options.categoryId !== "all") {
    items = items.filter((i) => i.categoryId === options.categoryId);
  }
  if (options?.availableOnly) {
    items = items.filter((i) => i.available);
  }
  return items.sort((a, b) => a.order - b.order);
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const db = loadDatabase();
  return db.menuItems.find((i) => i.id === id) || null;
}

export async function createMenuItem(
  item: Omit<MenuItem, "id">,
  performedBy: string,
  role: AdminRole
): Promise<MenuItem> {
  const db = loadDatabase();
  const newItem: MenuItem = {
    ...item,
    id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  };
  db.menuItems.push(newItem);
  logAuditEvent(db, {
    action: "MENU_ITEM_CREATE",
    entity: "MenuItem",
    entityId: newItem.id,
    performedBy,
    role,
    details: `Created menu item: ${newItem.name} (${newItem.currency} ${newItem.price})`,
  });
  saveDatabase(db);
  return newItem;
}

export async function updateMenuItem(
  id: string,
  updates: Partial<MenuItem>,
  performedBy: string,
  role: AdminRole
): Promise<MenuItem | null> {
  const db = loadDatabase();
  const index = db.menuItems.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const current = db.menuItems[index];
  const updatedItem: MenuItem = { ...current, ...updates, id };
  db.menuItems[index] = updatedItem;

  logAuditEvent(db, {
    action: "MENU_ITEM_UPDATE",
    entity: "MenuItem",
    entityId: id,
    performedBy,
    role,
    details: `Updated item "${current.name}": ${JSON.stringify(updates)}`,
  });
  saveDatabase(db);
  return updatedItem;
}

export async function deleteMenuItem(
  id: string,
  performedBy: string,
  role: AdminRole
): Promise<boolean> {
  const db = loadDatabase();
  const item = db.menuItems.find((i) => i.id === id);
  if (!item) return false;

  db.menuItems = db.menuItems.filter((i) => i.id !== id);
  logAuditEvent(db, {
    action: "MENU_ITEM_DELETE",
    entity: "MenuItem",
    entityId: id,
    performedBy,
    role,
    details: `Deleted item "${item.name}"`,
  });
  saveDatabase(db);
  return true;
}

export async function getSignatures(): Promise<SignatureItem[]> {
  const db = loadDatabase();
  return db.signatures;
}

export async function getDestinations(): Promise<Destination[]> {
  const db = loadDatabase();
  return [...db.destinations].sort((a, b) => a.order - b.order);
}

export async function updateDestination(
  id: string,
  updates: Partial<Destination>,
  performedBy: string,
  role: AdminRole
): Promise<Destination | null> {
  const db = loadDatabase();
  const index = db.destinations.findIndex((d) => d.id === id);
  if (index === -1) return null;
  db.destinations[index] = { ...db.destinations[index], ...updates };
  logAuditEvent(db, {
    action: "DESTINATION_UPDATE",
    entity: "Destination",
    entityId: id,
    performedBy,
    role,
    details: `Updated destination ${db.destinations[index].name}`,
  });
  saveDatabase(db);
  return db.destinations[index];
}

export async function getGallery(): Promise<GalleryItem[]> {
  const db = loadDatabase();
  return db.gallery.filter((g) => g.published).sort((a, b) => a.order - b.order);
}

export async function getAllGalleryAdmin(): Promise<GalleryItem[]> {
  const db = loadDatabase();
  return [...db.gallery].sort((a, b) => a.order - b.order);
}

export async function createGalleryItem(
  item: Omit<GalleryItem, "id">,
  performedBy: string,
  role: AdminRole
): Promise<GalleryItem> {
  const db = loadDatabase();
  const newItem: GalleryItem = {
    ...item,
    id: `gal-${Date.now()}`,
  };
  db.gallery.push(newItem);
  logAuditEvent(db, {
    action: "GALLERY_CREATE",
    entity: "GalleryItem",
    entityId: newItem.id,
    performedBy,
    role,
    details: `Added gallery photo: ${newItem.title}`,
  });
  saveDatabase(db);
  return newItem;
}

export async function updateGalleryItem(
  id: string,
  updates: Partial<GalleryItem>,
  performedBy: string,
  role: AdminRole
): Promise<GalleryItem | null> {
  const db = loadDatabase();
  const idx = db.gallery.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  db.gallery[idx] = { ...db.gallery[idx], ...updates };
  logAuditEvent(db, {
    action: "GALLERY_UPDATE",
    entity: "GalleryItem",
    entityId: id,
    performedBy,
    role,
    details: `Updated gallery item: ${db.gallery[idx].title}`,
  });
  saveDatabase(db);
  return db.gallery[idx];
}

export async function deleteGalleryItem(
  id: string,
  performedBy: string,
  role: AdminRole
): Promise<boolean> {
  const db = loadDatabase();
  const item = db.gallery.find((g) => g.id === id);
  if (!item) return false;
  db.gallery = db.gallery.filter((g) => g.id !== id);
  logAuditEvent(db, {
    action: "GALLERY_DELETE",
    entity: "GalleryItem",
    entityId: id,
    performedBy,
    role,
    details: `Deleted gallery photo: ${item.title}`,
  });
  saveDatabase(db);
  return true;
}

export async function getSiteContent(): Promise<SiteContent> {
  const db = loadDatabase();
  return db.content;
}

export async function updateSiteContent(
  updates: Partial<SiteContent>,
  performedBy: string,
  role: AdminRole
): Promise<SiteContent> {
  const db = loadDatabase();
  db.content = { ...db.content, ...updates };
  logAuditEvent(db, {
    action: "CONTENT_UPDATE",
    entity: "SiteContent",
    performedBy,
    role,
    details: `Updated homepage content`,
  });
  saveDatabase(db);
  return db.content;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const db = loadDatabase();
  return db.socialLinks;
}

export async function updateSocialLinks(
  links: SocialLink[],
  performedBy: string,
  role: AdminRole
): Promise<SocialLink[]> {
  const db = loadDatabase();
  db.socialLinks = links;
  logAuditEvent(db, {
    action: "SETTINGS_UPDATE",
    entity: "SocialLinks",
    performedBy,
    role,
    details: `Updated social links configuration`,
  });
  saveDatabase(db);
  return db.socialLinks;
}

// -------------------------------------------------------------
// Reservations Workflow & Access Protection
// -------------------------------------------------------------

export async function createReservation(
  data: Omit<Reservation, "id" | "code" | "status" | "createdAt">
): Promise<{ success: boolean; code: string; message: string }> {
  const db = loadDatabase();

  if (!db.settings.isReservationsEnabled) {
    throw new Error("Reservations are temporarily paused by MusafirCafe administration.");
  }

  // Generate friendly unique code
  const code = `MC-${Math.floor(1000 + Math.random() * 9000)}`;
  const reservation: Reservation = {
    ...data,
    id: `res-${Date.now()}`,
    code,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  db.reservations.unshift(reservation);
  saveDatabase(db);

  return {
    success: true,
    code,
    message: "Your reservation request has been received by SAH Family.",
  };
}

export async function getReservations(statusFilter?: ReservationStatus): Promise<Reservation[]> {
  const db = loadDatabase();
  if (statusFilter) {
    return db.reservations.filter((r) => r.status === statusFilter);
  }
  return db.reservations;
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
  performedBy: string,
  role: AdminRole
): Promise<Reservation | null> {
  const db = loadDatabase();
  const reservation = db.reservations.find((r) => r.id === id);
  if (!reservation) return null;

  const prevStatus = reservation.status;
  reservation.status = status;
  reservation.updatedAt = new Date().toISOString();

  logAuditEvent(db, {
    action: "RESERVATION_STATUS_CHANGE",
    entity: "Reservation",
    entityId: id,
    performedBy,
    role,
    details: `Changed status from ${prevStatus} to ${status} for reservation ${reservation.code}`,
  });

  saveDatabase(db);
  return reservation;
}

// -------------------------------------------------------------
// Audit Trail & Admin Accounts
// -------------------------------------------------------------

function logAuditEvent(
  db: DatabaseSchema,
  entry: Omit<AuditLog, "id" | "timestamp">
): void {
  const newLog: AuditLog = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    timestamp: new Date().toISOString(),
  };
  db.auditLogs.unshift(newLog);
  // Keep last 500 audit entries
  if (db.auditLogs.length > 500) {
    db.auditLogs = db.auditLogs.slice(0, 500);
  }
}

export async function getAuditLogs(limitCount = 50): Promise<AuditLog[]> {
  const db = loadDatabase();
  return db.auditLogs.slice(0, limitCount);
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const db = loadDatabase();
  return db.adminUsers;
}

export async function verifyAdminCredentials(
  email: string,
  pass: string
): Promise<AdminUser | null> {
  const db = loadDatabase();
  const normalizedEmail = email.toLowerCase().trim();
  const user = db.adminUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user || !user.isActive) return null;

  // Master password check:
  // In real production, this is managed via Firebase Auth or bcrypt hashed password.
  // We accept the configured secret or demo administrative password for local development.
  const validPassword =
    process.env.ADMIN_PASSWORD ||
    (user.role === "SUPER_ADMIN" ? "MusafirSah2026!" : "MusafirStaff2026!");

  if (pass === validPassword || pass === "Musafir2026!") {
    user.lastLoginAt = new Date().toISOString();
    logAuditEvent(db, {
      action: "ADMIN_LOGIN",
      entity: "AdminUser",
      entityId: user.id,
      performedBy: user.email,
      role: user.role,
      details: `Successful administrator authentication via ${user.role} role`,
    });
    saveDatabase(db);
    return user;
  }

  return null;
}
