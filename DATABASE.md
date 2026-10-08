# MUSAFIRCAFE — DATABASE & CMS ARCHITECTURE

## 1. Data Models & Schemas

The application defines 10 core entities in `src/types/index.ts`:

- `CafeSettings`: Operational details (hours, location, address, phone, email, reservation open status).
- `MenuCategory`: Category slug, title, Nepali subtitle, description, display order.
- `MenuItem`: Name, price (in NPR), description, category, availability, featured badge, vegetarian flag.
- `SignatureItem`: Curated Musafir selection items with tasting notes and pairings.
- `Destination`: 6 Nepal storytelling destinations with elevation and trail coordinates.
- `GalleryItem`: Archive photographs with varying editorial aspect ratios (`cinema`, `tall`, `wide`, `square`).
- `Reservation`: Table booking requests (code, customer name, phone, email, date, time, guests, status).
- `AuditLog`: Security audit events tracking administrative mutations.
- `AdminUser`: Administrator accounts with RBAC roles (`SUPER_ADMIN`, `ADMIN`, `EDITOR`).
- `SocialLink`: Configurable platforms (Instagram, Facebook, TikTok, YouTube, WhatsApp).

---

## 2. Firestore Security Rules

See `firestore.rules` in the project root:

- **Public**: Can read public content (menu, gallery, destinations, settings).
- **Public**: Can create reservations with strict schema validation.
- **Public**: **CANNOT** view reservations, delete bookings, or read administrative users.
- **Role-Based Access Control**:
  - `SUPER_ADMIN`: Full access to all collections and admin management.
  - `ADMIN`: Access to menu, gallery, reservations, settings, and content.
  - `EDITOR`: Access to menu, gallery, and content only.

---

## 3. Storage Security Rules

See `storage.rules`:
- Validates file type (`image/jpeg`, `image/png`, `image/webp`, `image/avif`).
- Maximum file size: 5MB.
- Rejects SVG and executable files to prevent stored XSS.
