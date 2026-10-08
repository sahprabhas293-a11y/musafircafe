# MUSAFIRCAFE — PRODUCTION ARCHITECTURE

This document outlines the production architecture, caching strategy, and operational requirements for MusafirCafe.

## 1. System Architecture

```
User Browser
    │
    ▼
Custom Domain (e.g. musafircafe.com with TLS 1.3)
    │
    ▼
Vercel Edge Network (Global CDN / Edge Cache)
    │
    ▼
Next.js App Router (Node.js 20+ Runtime)
    ├── Static & Dynamic Routes: /, /admin, /admin/login
    ├── API Endpoints: /api/reservations, /api/menu, /api/settings, etc.
    │
    ▼
Centralized Repository Service (src/lib/services/repository.ts)
    ├── Dual Adapter Mode
    ├── In-memory + Persistent JSON Store (Default Zero-Config Mode)
    └── Firebase Firestore + Storage (Configured via Environment Variables)
```

## 2. Zero-Code Owner Control Guarantee

- **Menu Changes**: Any price updated in `/admin` (e.g. Cappuccino from Rs. 240 to Rs. 280) immediately modifies the database. The public website reads directly from this service without needing source code edits.
- **Reservation Workflow**: Customers submitting table requests receive a unique reference code (`MC-XXXX`). Only administrators can view the reservation queue.
- **Hours & Holiday Status**: If the café alters operating hours or sets holiday closed status in `/admin`, the Visit section automatically reflects the new hours.

## 3. Production Environment Variables

Configure these in Vercel or your hosting container:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `SESSION_SECRET` | **Yes** | 32+ character random secret for HMAC token signing |
| `ADMIN_PASSWORD` | Optional | Override master password for administrative accounts |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonical site URL (e.g. `https://musafircafe.com`) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Optional | Firebase Project ID if using Firestore |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Optional | Firebase Web API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Optional | Firebase Auth Domain |

## 4. Rollback & Disaster Recovery

1. **Vercel Rollback**: Instant one-click rollback to any previous deployment hash in the Vercel dashboard.
2. **Database Snapshot**: The persistent data store resides in `.data/musafircafe-db.json` (or Firestore automated backups). Routine daily backups should export this collection.
