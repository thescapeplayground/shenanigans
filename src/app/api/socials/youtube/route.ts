import { NextResponse } from "next/server";
import { getYouTubeSubscribers } from "@/lib/social-counts/youtube";

export async function GET() {
  const count = await getYouTubeSubscribers();
  return NextResponse.json({ count });
}
