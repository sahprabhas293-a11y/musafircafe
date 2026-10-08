# MUSAFIRCAFE — REST API Reference

Base URL: `https://your-domain.com`

All timestamps are ISO 8601. All responses are `application/json`.  
Admin endpoints require a valid session cookie (`musafir_admin_session`) obtained via `POST /api/auth/login`.

---

## Authentication

### POST /api/auth/login

Authenticate as an admin user. Sets an HTTP-only session cookie.

**Rate limit:** 5 requests per 15 minutes per IP.

**Request body:**
```json
{
  "username": "admin",
  "password": "MusafirSah2026!"
}
```

**Response 200:**
```json
{
  "ok": true,
  "user": {
    "id": "admin-1",
    "username": "admin",
    "role": "SUPER_ADMIN"
  }
}
```

**Response 401:**
```json
{ "error": "Invalid credentials" }
```

**Response 429:**
```json
{ "error": "Too many login attempts. Try again in 15 minutes." }
```

---

### POST /api/auth/logout

Clear the session cookie. No body required.

**Response 200:**
```json
{ "ok": true }
```

---

### GET /api/auth/me

Returns the currently authenticated user or 401 if not logged in.

**Response 200:**
```json
{
  "user": {
    "id": "admin-1",
    "username": "admin",
    "role": "SUPER_ADMIN"
  }
}
```

**Response 401:**
```json
{ "error": "Unauthorized" }
```

---

## Menu

### GET /api/menu

Returns all published menu items (public). Optionally filter by category.

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `category` | string | Filter by category slug (e.g., `coffee`, `food`) |
| `featured` | boolean | `true` to return only featured items |
| `admin` | boolean | `true` returns all items including unavailable (auth required) |

**Response 200:**
```json
{
  "items": [
    {
      "id": "item-1",
      "name": "Musafir Latte",
      "categoryId": "coffee",
      "price": 340,
      "description": "Our signature espresso with steamed mountain milk and a hint of cardamom.",
      "available": true,
      "featured": true,
      "isVeg": true,
      "tags": ["signature", "featured"],
      "imageUrl": null,
      "createdAt": "2026-10-01T00:00:00.000Z",
      "updatedAt": "2026-10-01T00:00:00.000Z"
    }
  ],
  "categories": [
    {
      "id": "cat-1",
      "name": "Coffee",
      "slug": "coffee",
      "description": "...",
      "order": 1
    }
  ]
}
```

---

### POST /api/menu

Create a new menu item. **Auth required (EDITOR+).**

**Request body:**
```json
{
  "name": "Himalayan Chai",
  "categoryId": "tea",
  "price": 220,
  "description": "Spiced black tea with mountain herbs and condensed milk.",
  "available": true,
  "featured": false,
  "isVeg": true,
  "tags": ["veg", "new"]
}
```

**Response 201:**
```json
{
  "item": { ...created item object... }
}
```

**Response 400:**
```json
{
  "error": "Validation failed",
  "details": [{ "field": "price", "message": "Price must be a positive number" }]
}
```

---

### PATCH /api/menu/[id]

Update an existing menu item. **Auth required (EDITOR+).**

**Request body** — any subset of item fields:
```json
{
  "price": 360,
  "available": false
}
```

**Response 200:**
```json
{ "item": { ...updated item object... } }
```

**Response 404:**
```json
{ "error": "Item not found" }
```

---

### DELETE /api/menu/[id]

Delete a menu item. **Auth required (EDITOR+).**

**Response 200:**
```json
{ "ok": true }
```

---

## Settings

### GET /api/settings

Returns public café settings.

**Response 200:**
```json
{
  "settings": {
    "name": "MUSAFIRCAFE",
    "tagline": "A Place For Every Journey",
    "owner": "SAH Family",
    "location": "Kathmandu, Nepal",
    "city": "Kathmandu",
    "country": "Nepal",
    "openingHours": "7:00 AM — 10:00 PM",
    "timezone": "Nepal Time",
    "gmtOffset": "GMT +5:45",
    "coordinates": { "lat": 27.7172, "lng": 85.324 },
    "phone": null,
    "email": null,
    "isReservationsEnabled": true,
    "isHolidayClosed": false
  }
}
```

---

### PATCH /api/settings

Update café settings. **Auth required (ADMIN+). EDITOR role is forbidden.**

**Request body** — any subset of settings:
```json
{
  "openingHours": "8:00 AM — 11:00 PM",
  "isHolidayClosed": true,
  "email": "hello@musafircafe.com"
}
```

**Response 200:**
```json
{ "settings": { ...updated settings object... } }
```

---

## Reservations

### POST /api/reservations

Submit a reservation request (public). Rate-limited to 3 per 10 minutes per IP.

**Request body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "+977-9812345678",
  "date": "2026-11-15",
  "time": "19:00",
  "partySize": 4,
  "message": "Anniversary dinner — window seat if possible.",
  "honeypot": ""
}
```

> **Note:** `honeypot` must be an empty string. If bots fill it in, the request is silently dropped.

**Response 201:**
```json
{
  "ok": true,
  "id": "res-abc123",
  "message": "Your reservation request has been received. We will confirm shortly."
}
```

**Response 400:**
```json
{
  "error": "Validation failed",
  "details": [{ "field": "date", "message": "Date must be in YYYY-MM-DD format" }]
}
```

---

### GET /api/reservations

List all reservations. **Auth required (ADMIN+). EDITOR role is forbidden.**

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `status` | string | Filter: `pending`, `confirmed`, `completed`, `cancelled` |
| `date` | string | Filter by date: `YYYY-MM-DD` |

**Response 200:**
```json
{
  "reservations": [
    {
      "id": "res-abc123",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "+977-9812345678",
      "date": "2026-11-15",
      "time": "19:00",
      "partySize": 4,
      "message": "Anniversary dinner",
      "status": "pending",
      "createdAt": "2026-10-08T12:00:00.000Z",
      "updatedAt": "2026-10-08T12:00:00.000Z"
    }
  ]
}
```

---

### PATCH /api/reservations/[id]

Update reservation status. **Auth required (ADMIN+).**

**Request body:**
```json
{ "status": "confirmed" }
```

Valid status values: `pending` | `confirmed` | `completed` | `cancelled`

**Response 200:**
```json
{ "reservation": { ...updated reservation object... } }
```

---

## Gallery

### GET /api/gallery

Returns published gallery items (public). Pass `?admin=true` with auth to get all items.

**Response 200:**
```json
{
  "items": [
    {
      "id": "gal-1",
      "image": "/images/cafe-interior.jpg",
      "title": "Sanctuary of Warmth",
      "category": "atmosphere",
      "caption": "...",
      "aspectRatio": "cinema",
      "order": 1,
      "published": true
    }
  ]
}
```

---

### POST /api/gallery

Add a gallery item. **Auth required (EDITOR+).**

**Request body:**
```json
{
  "image": "https://cdn.example.com/photo.jpg",
  "title": "Morning Light",
  "category": "atmosphere",
  "caption": "Sunlight through the windows at 7am.",
  "aspectRatio": "wide",
  "order": 10,
  "published": true
}
```

**Response 201:**
```json
{ "item": { ...created gallery item... } }
```

---

## Destinations

### GET /api/destinations

Returns all 6 Nepal destination cards.

**Response 200:**
```json
{
  "destinations": [
    {
      "id": "dest-1",
      "name": "Pokhara",
      "distance": "200km from Kathmandu",
      "description": "...",
      "imageUrl": "...",
      "tags": ["lake", "mountains", "paragliding"]
    }
  ]
}
```

---

### PATCH /api/destinations

Update a destination. **Auth required (EDITOR+).**

**Request body:**
```json
{
  "id": "dest-1",
  "description": "Updated description for Pokhara.",
  "tags": ["lake", "adventure"]
}
```

**Response 200:**
```json
{ "destination": { ...updated destination... } }
```

---

## Audit Logs

### GET /api/audit-logs

Returns the last 500 audit log entries. **Auth required (ADMIN+). EDITOR role is forbidden.**

**Query parameters:**

| Param | Type | Description |
|---|---|---|
| `limit` | number | Max entries to return (default: 100, max: 500) |
| `action` | string | Filter by action type (e.g., `menu.create`, `settings.update`) |

**Response 200:**
```json
{
  "logs": [
    {
      "id": "log-1",
      "timestamp": "2026-10-08T12:00:00.000Z",
      "userId": "admin-1",
      "username": "admin",
      "action": "menu.create",
      "entityType": "MenuItem",
      "entityId": "item-99",
      "before": null,
      "after": { "name": "Himalayan Chai", "price": 220 }
    }
  ]
}
```

---

## Error Responses

All error responses follow this shape:

```json
{
  "error": "Human-readable error message",
  "details": [ ...optional validation detail objects... ]
}
```

| HTTP Status | Meaning |
|---|---|
| 400 | Bad request / validation error |
| 401 | Not authenticated |
| 403 | Authenticated but insufficient role |
| 404 | Resource not found |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## RBAC Quick Reference

| Endpoint | Public | EDITOR | ADMIN | SUPER_ADMIN |
|---|---|---|---|---|
| GET /api/menu | ✅ | ✅ | ✅ | ✅ |
| POST/PATCH/DELETE /api/menu | ❌ | ✅ | ✅ | ✅ |
| GET /api/settings | ✅ | ✅ | ✅ | ✅ |
| PATCH /api/settings | ❌ | ❌ | ✅ | ✅ |
| POST /api/reservations | ✅ | ✅ | ✅ | ✅ |
| GET /api/reservations | ❌ | ❌ | ✅ | ✅ |
| PATCH /api/reservations/[id] | ❌ | ❌ | ✅ | ✅ |
| GET /api/gallery | ✅ | ✅ | ✅ | ✅ |
| POST /api/gallery | ❌ | ✅ | ✅ | ✅ |
| GET/PATCH /api/destinations | ✅/❌ | ✅ | ✅ | ✅ |
| GET /api/audit-logs | ❌ | ❌ | ✅ | ✅ |

---

*MusafirCafe API v1 — A SAH Family Experience*
