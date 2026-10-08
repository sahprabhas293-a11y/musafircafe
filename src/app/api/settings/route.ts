import { NextResponse } from "next/server";
import { getCafeSettings, updateCafeSettings } from "@/lib/services/repository";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { cafeSettingsSchema } from "@/lib/validation/schemas";

export async function GET() {
  try {
    const settings = await getCafeSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role === "EDITOR") {
      return NextResponse.json(
        { error: "Forbidden: Editors cannot modify cafe settings" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const partialSchema = cafeSettingsSchema.partial();
    const parsed = partialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid settings payload" },
        { status: 400 }
      );
    }

    const updated = await updateCafeSettings(
      parsed.data,
      session.email,
      session.role
    );

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Settings PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
