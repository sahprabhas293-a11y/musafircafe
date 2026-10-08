import { NextResponse } from "next/server";
import {
  getMenuItems,
  getMenuCategories,
  createMenuItem,
} from "@/lib/services/repository";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { menuItemSchema } from "@/lib/validation/schemas";

// Public GET: Retrieve all menu items and categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category") || undefined;
    const availableOnly = searchParams.get("available") === "true";

    const [items, categories] = await Promise.all([
      getMenuItems({ categoryId, availableOnly }),
      getMenuCategories(),
    ]);

    return NextResponse.json({
      categories,
      items,
      count: items.length,
    });
  } catch (error) {
    console.error("Menu GET error:", error);
    return NextResponse.json({ error: "Failed to load menu" }, { status: 500 });
  }
}

// Protected Admin POST: Add new menu item
export async function POST(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = menuItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid menu item data" },
        { status: 400 }
      );
    }

    const item = await createMenuItem(
      parsed.data,
      session.email,
      session.role
    );

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("Menu item creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
