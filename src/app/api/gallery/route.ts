import { NextResponse } from "next/server";
import {
  getGallery,
  getAllGalleryAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/services/repository";
import { getCurrentAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    if (isAdmin) {
      const session = await getCurrentAdminSession();
      if (session) {
        const adminItems = await getAllGalleryAdmin();
        return NextResponse.json(adminItems);
      }
    }

    const items = await getGallery();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const item = await createGalleryItem(body, session.email, session.role);
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
