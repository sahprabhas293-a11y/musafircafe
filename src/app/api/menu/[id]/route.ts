import { NextResponse } from "next/server";
import { updateMenuItem, deleteMenuItem } from "@/lib/services/repository";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { menuItemSchema } from "@/lib/validation/schemas";

// Protected Admin PATCH: Update menu item (price, availability, etc.)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const partialSchema = menuItemSchema.partial();
    const parsed = partialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid update payload" },
        { status: 400 }
      );
    }

    const updated = await updateMenuItem(
      id,
      parsed.data,
      session.email,
      session.role
    );

    if (!updated) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Menu item update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Protected Admin DELETE: Delete menu item
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteMenuItem(id, session.email, session.role);

    if (!deleted) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Menu item delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
