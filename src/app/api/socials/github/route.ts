import { NextResponse } from "next/server";
import { getGithubFollowers } from "@/lib/social-counts/github";

export async function GET() {
  const count = await getGithubFollowers();
  return NextResponse.json({ count });
}
