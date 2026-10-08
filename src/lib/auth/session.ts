import { cookies } from "next/headers";
import crypto from "crypto";
import { AdminRole, AdminUser } from "@/types";

const SESSION_COOKIE = "musafir_admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "musafir_cafe_nepal_secret_signing_key_2026_sah_family";

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
}

// Simple signed token generator (HMAC SHA-256)
export function createSessionToken(user: AdminUser): string {
  const payload: SessionData = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(str)
    .digest("base64url");
  return `${str}.${signature}`;
}

export function verifySessionToken(token: string): SessionData | null {
  try {
    const [payloadStr, signature] = token.split(".");
    if (!payloadStr || !signature) return null;

    const expectedSig = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadStr)
      .digest("base64url");

    if (
      signature.length !== expectedSig.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
    ) {
      return null;
    }

    const payload: SessionData = JSON.parse(
      Buffer.from(payloadStr, "base64url").toString("utf-8")
    );

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// In-memory rate limiter table
const rateLimits = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(
  identifier: string,
  maxAllowed: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimits.get(identifier);

  if (!record || now > record.expiresAt) {
    rateLimits.set(identifier, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: maxAllowed - 1 };
  }

  if (record.count >= maxAllowed) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: maxAllowed - record.count };
}

// Clean up stale rate limits every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimits.entries()) {
      if (now > val.expiresAt) rateLimits.delete(key);
    }
  }, 10 * 60 * 1000);
}
