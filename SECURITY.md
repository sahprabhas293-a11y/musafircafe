# MUSAFIRCAFE — SECURITY SPECIFICATION

## 1. Threat Mitigation Matrix

| Threat | Mitigation Implementation |
| :--- | :--- |
| **Cross-Site Scripting (XSS)** | React JSX auto-escaping, strict CSP in `next.config.ts`, no `eval`, dangerous HTML strictly sanitized |
| **Cross-Site Request Forgery (CSRF)** | SameSite=Lax/Strict session cookies, JSON content-type validation on mutation routes |
| **Brute Force & Flooding** | Sliding window rate limiting on `/api/auth/login` (5/15m) and `/api/reservations` (5/10m) |
| **Spam Submissions** | Hidden honeypot field (`website`) on public forms immediately rejecting bots |
| **Broken Access Control (IDOR)** | Server-side role checks (`SUPER_ADMIN`, `ADMIN`, `EDITOR`) on all mutation APIs |
| **Customer Data Leakage** | Public reservation endpoint returns only reference code; GET `/api/reservations` is strictly admin-only |
| **File Upload Exploits** | Strict image MIME verification (`image/(jpeg|png|webp|avif)`), 5MB size ceiling, SVG rejection |
| **Clickjacking** | `X-Frame-Options: DENY` and `frame-ancestors: 'none'` CSP directive |
| **MIME Sniffing** | `X-Content-Type-Options: nosniff` |

---

## 2. Security Headers

Configured in `next.config.ts`:

- `Content-Security-Policy`: Restricts scripts, fonts (Google Fonts), images (Unsplash, Firebase), and styles.
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`

---

## 3. Secret Protection

- No secrets or service account keys are stored in source control.
- `.gitignore` protects `.env*`, `.data/`, `*.pem`, `*.key`, and `service-account*.json`.
