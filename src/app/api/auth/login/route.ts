import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/services/repository";
import { createSessionToken, checkRateLimit } from "@/lib/auth/session";
import { adminLoginSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const rateCheck = checkRateLimit(`login-${ip}`, 5, 15 * 60 * 1000); // 5 attempts per 15 mins

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 15 minutes before retrying." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid credentials format" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const user = await verifyAdminCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or administrative password" },
        { status: 401 }
      );
    }

    const token = createSessionToken(user);
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set("musafir_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "Internal authentication error" },
      { status: 500 }
    );
  }
}
