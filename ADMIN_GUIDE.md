# MUSAFIRCAFE — Admin Guide

> **Owner's Manual** — No code knowledge required.  
> Everything on the public website can be changed from this dashboard.

---

## 1. Accessing the Admin Dashboard

1. Open your browser and go to:  
   `https://your-domain.com/admin/login`

2. Enter your credentials:

   | Field | Value |
   |---|---|
   | Username | `admin` |
   | Password | `MusafirSah2026!` *(change this after first login)* |

3. You will be redirected to the **Admin Dashboard** at `/admin`.

> **Security tip:** The login page is rate-limited to 5 attempts per 15 minutes per IP address to prevent brute-force attacks.

---

## 2. Dashboard Overview

The dashboard has **7 tabs** across the top:

| Tab | What you can do |
|---|---|
| **Overview** | See today's reservation count, pending items, and a quick status summary |
| **Menu** | Add, edit, delete menu items and toggle availability |
| **Reservations** | View all bookings, confirm, mark complete, or cancel |
| **Destinations** | Edit the 6 Nepal destination cards shown on the website |
| **Gallery** | Manage photos shown in the gallery section |
| **Settings** | Change opening hours, address, email, reservation toggle |
| **Audit Trail** | View a log of all changes made by any admin user |

---

## 3. Managing the Menu

### Viewing items
- Click the **Menu** tab.
- Items are grouped by category (Coffee, Tea, Food, etc.).
- Use the search bar to find any item quickly.

### Adding a new item
1. Click **"+ Add Item"** button (top right of the menu table).
2. Fill in:
   - **Name** — e.g., `Himalayan Chai`
   - **Category** — choose from the dropdown
   - **Price** — in NPR (e.g., `280`)
   - **Description** — short description shown in the menu
   - **Tags** — optional: `veg`, `featured`, `new`
   - **Available** — toggle on/off
3. Click **Save**.

The new item appears on the public website menu immediately.

### Editing a price or description
1. Find the item in the table.
2. Click the **pencil icon** on the right.
3. Change any field.
4. Click **Save**.

### Removing an item
1. Find the item.
2. Click the **trash icon**.
3. Confirm deletion.

> The item is removed from the public menu immediately.

### Toggling availability (sold out / back in stock)
- Click the **toggle switch** in the "Available" column for that item.
- When toggled off, the item is hidden from the public menu until re-enabled.

### Featuring an item
- Click the **star icon** to mark an item as featured.
- Featured items appear first in filtered views and may be highlighted on the site.

---

## 4. Managing Reservations

1. Click the **Reservations** tab.
2. You will see all bookings with:
   - Guest name
   - Date & time
   - Party size
   - Phone number
   - Status (Pending / Confirmed / Completed / Cancelled)

### Confirming a reservation
- Click **"Confirm"** next to a Pending reservation.
- The status changes to Confirmed.
- *(Email notification: if email is configured, a confirmation is sent automatically.)*

### Marking as completed
- After the guest visits, click **"Complete"** to archive it.

### Cancelling
- Click **"Cancel"** if the booking cannot be accommodated.

> All reservation status changes are logged in the Audit Trail.

---

## 5. Café Settings

Click the **Settings** tab to change:

| Setting | Description |
|---|---|
| **Opening Hours** | Text shown on the public website (e.g., `7:00 AM – 10:00 PM`) |
| **Address** | Physical address displayed in the Visit section |
| **Contact Email** | Email shown publicly for inquiries |
| **Contact Phone** | Phone number shown publicly |
| **Accept Reservations** | Toggle to enable/disable the reservation form site-wide |
| **Holiday Closed** | Toggle to show a "Currently Closed" notice during holidays |

After making changes, click **Save Settings**. Changes reflect on the public site within seconds.

---

## 6. Gallery Management

1. Click the **Gallery** tab.
2. Current photos are listed with their category and visibility.

### Adding a photo
1. Click **"+ Add Photo"**.
2. Provide:
   - **Image URL** — a direct link to the image (upload to Firebase Storage or any CDN first)
   - **Title** — shown in the lightbox
   - **Caption** — description text
   - **Category** — `atmosphere`, `coffee`, `culinary`, `people`, `travel`
   - **Aspect Ratio** — `cinema`, `wide`, `square`, `tall`
3. Click **Save**.

### Hiding/showing a photo
- Use the **Published** toggle to show or hide any gallery item without deleting it.

---

## 7. Destinations

The **Journey** section on the website shows 6 Nepal destinations.

1. Click the **Destinations** tab.
2. Click the **pencil icon** on any destination to edit:
   - Name
   - Distance from Kathmandu
   - Description
   - Image URL
   - Tags (e.g., `trek`, `heritage`, `adventure`)

> You cannot add or remove destinations from the dashboard — this requires a code change. Contact your developer to add new destinations.

---

## 8. Audit Trail

The **Audit Trail** tab shows a complete history of every admin action:

- Who made the change
- What was changed
- When it happened
- The before/after values

This log helps you track all content modifications and is useful for accountability.

> The audit log keeps the last **500 entries**. Older entries are automatically pruned.

---

## 9. Logging Out

- In the dashboard header, click your username or look for the **Logout** option.
- Alternatively, navigate to `/api/auth/logout` directly.
- Your session expires automatically after **24 hours**.

---

## 10. Changing Your Password

Password changes require a developer at this stage — the self-service password reset UI is on the development roadmap.

**Temporary procedure:**
1. Contact your developer.
2. They will update the admin credentials in the environment configuration.
3. A server restart propagates the new password.

---

## 11. What Requires a Developer

The following changes are **NOT** possible from the admin dashboard and require code changes:

| Change | Why |
|---|---|
| Adding new menu **categories** | Category slugs are typed in the codebase |
| Adding/removing **destination cards** | Hard-coded count of 6 |
| Changing the website **design/colors** | CSS/Tailwind changes |
| Adding new **admin users** | Currently via environment config |
| Uploading images directly | Use Firebase Storage console or CDN |
| Sending email confirmations | Requires email service API key setup |

---

## 12. Recommended Workflow for Menu Changes

> **Every Friday**, review the week's reservations and update the menu:

1. Go to **Reservations** → filter by "Pending" → confirm or cancel each.
2. Go to **Menu** → toggle off any items that are sold out or seasonal.
3. If adding a seasonal special, click **"+ Add Item"** → mark as **Featured**.
4. Go to **Settings** → verify opening hours are correct for the upcoming week.

---

*Last updated: October 2026 | MusafirCafe — A SAH Family Experience*
