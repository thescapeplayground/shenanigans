import { NextResponse } from "next/server";
import { DEFAULT_GALLERY_ALBUMS } from "@/src/data/gallery";

export async function GET() {
  return NextResponse.json(DEFAULT_GALLERY_ALBUMS);
}
