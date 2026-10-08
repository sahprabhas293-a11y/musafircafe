# MUSAFIRCAFE — Immersive Digital Experience
**Owned by SAH Family · Kathmandu, Nepal**

[![Production Status](https://img.shields.io/badge/status-PRODUCTION%20READY-emerald.svg)](#)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-green.svg)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-SmoothScroll-orange.svg)](https://github.com/darkroomengineering/lenis)

---

## ✦ Overview

MusafirCafe is a bespoke, cinematic digital experience created for a luxury café brand owned by the **SAH Family** in Kathmandu, Nepal. Inspired by the word *"Musafir"* (traveler), the application rejects conventional restaurant templates and presents an Awwwards-caliber interactive journey across typography, macro food photography, and Himalayan memories.

---

## ✦ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 & Custom Design Tokens
- **Cinematic Animations**: GSAP 3 & ScrollTrigger (synchronized ticker)
- **Smooth Scrolling**: Lenis SmoothScroll
- **Backend & CMS**: Centralized Repository Service (Zero-Code Owner Control)
- **Database**: Dual Mode — Persistent Storage Engine + Firebase Firestore Adapter
- **Authentication**: HTTP-Only Signed Session Cookies & Role-Based Access Control (RBAC)
- **Icons**: Lucide React
- **Typography**: Cormorant Garamond (Editorial Serif) & Manrope (Modern Sans)
- **Audio**: Web Audio API Procedural Ambient Soundscape (default OFF)

---

## ✦ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open browser
http://localhost:3000
```

To access the Management Console:
```bash
http://localhost:3000/admin/login
```
- **Admin Email**: `sahfamily@musafircafe.com`
- **Development Password**: `MusafirSah2026!` (or `Musafir2026!`)

---

## ✦ Architecture & Separation of Concerns

The codebase is strictly separated into modular architectural layers:

1. **Presentation Layer**: Custom responsive components in `src/components/`
2. **Animation Layer**: GSAP ScrollTrigger scrubbing & Lenis ticker synchronization
3. **Content / Data Layer**: Centralized repository in `src/lib/services/repository.ts`
4. **Authentication & Security Layer**: `src/lib/auth/session.ts` with HMAC tokens & rate limiting
5. **Database Layer**: Persistent JSON store + Firestore production adapter (`firestore.rules`)
6. **API / Server Layer**: Next.js App Router endpoints in `src/app/api/`

---

## ✦ Documentation Index

- [PRODUCTION.md](./PRODUCTION.md) — Production architecture, checklists, and operations
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Step-by-step Vercel and custom domain setup
- [DATABASE.md](./DATABASE.md) — Schema models, Firestore rules, and CMS data access
- [SECURITY.md](./SECURITY.md) — Threat model, security headers, rate limiting, and RBAC
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) — Owner manual for editing prices, menus, and reservations
- [API.md](./API.md) — Complete REST API specifications
- [FINAL_QA_REPORT.md](./FINAL_QA_REPORT.md) — Full automated QA pass results

---

## ✦ License & Ownership

Copyright © 2026 **SAH Family**. All rights reserved. Kathmandu, Nepal.
