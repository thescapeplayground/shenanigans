import { NextResponse } from "next/server";
import { getInstagramFollowers } from "@/lib/social-counts/instagram";

export async function GET() {
  const count = await getInstagramFollowers();
  return NextResponse.json({ count });
}