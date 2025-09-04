import { NextResponse } from "next/server";
import { getTwitterFollowers } from "@/lib/social-counts/twitter";

export async function GET() {
  const count = await getTwitterFollowers();
  return NextResponse.json({ count });
}
