import { z } from "zod";

// Reservation input validation
export const reservationCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters")
    .regex(/^[a-zA-Z\s'.\-]+$/, "Name contains invalid characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !isNaN(selected.getTime()) && selected >= today;
    }, "Reservation date cannot be in the past"),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
    .refine((val) => {
      const [h, m] = val.split(":").map(Number);
      const totalMinutes = h * 60 + m;
      // Cafe open 7:00 AM (420 min) to 10:00 PM (1320 min)
      return totalMinutes >= 420 && totalMinutes <= 1320;
    }, "Reservation time must be between 7:00 AM and 10:00 PM"),
  guests: z
    .number()
    .int("Guest count must be an integer")
    .min(1, "At least 1 guest required")
    .max(20, "For parties larger than 20, please contact SAH Family directly"),
  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional()
    .transform((val) => val?.trim() || ""),
  occasion: z
    .string()
    .max(50, "Occasion cannot exceed 50 characters")
    .optional(),
  // Anti-spam honeypot field - must be empty
  website: z.string().max(0, "Spam detected").optional(),
});

// Menu item validation
export const menuItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Name required").max(100),
  nepaliName: z.string().max(100).optional(),
  categoryId: z.enum([
    "coffee",
    "tea",
    "momo",
    "noodles",
    "fried-rice",
    "snacks",
    "burger-sandwich",
    "pizza",
    "nepali",
    "dessert",
    "cold-drinks",
  ]),
  description: z.string().trim().min(2).max(500),
  price: z.number().positive("Price must be positive").max(20000, "Price exceeds max threshold"),
  currency: z.string().default("Rs."),
  image: z.string().min(1, "Image URL is required"),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  isVegetarian: z.boolean().default(false),
  isSpicy: z.boolean().default(false),
  order: z.number().int().default(1),
});

// Cafe settings validation
export const cafeSettingsSchema = z.object({
  name: z.string().trim().min(2).max(60),
  tagline: z.string().trim().max(120),
  owner: z.string().trim().min(2).max(60),
  location: z.string().trim().min(2).max(100),
  city: z.string().trim().min(2).max(50),
  country: z.string().trim().min(2).max(50),
  address: z.string().max(150).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().max(80).optional(),
  openingHours: z.string().trim().min(2).max(100),
  timezone: z.string().trim().max(50),
  gmtOffset: z.string().trim().max(30),
  isReservationsEnabled: z.boolean(),
  isHolidayClosed: z.boolean(),
  holidayNotice: z.string().max(200).optional(),
});

// Admin login validation
export const adminLoginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
