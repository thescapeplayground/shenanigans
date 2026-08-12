import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FOLDERS = ["tv", "tangiblestuff", "masonry"];

export async function GET() {
  const token = process.env.GITHUB_PHOTOS_TOKEN || process.env.GITHUB_TOKEN;
  const result: Record<string, string[]> = {};

  for (const folder of FOLDERS) {
    result[folder] = [];

    // 1. Try GitHub REST API if token exists
    if (token) {
      try {
        const ghUrl = `https://api.github.com/repos/isaiahscape/private-photos/contents/${folder}`;
        const res = await fetch(ghUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "isaiahthings-app",
          },
          next: { revalidate: 3600 },
        });

        if (res.ok) {
          const files = (await res.json()) as Array<{ name: string; type: string }>;
          result[folder] = files
            .filter((f) => f.type === "file" && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.name))
            .map((f) => f.name);
          continue;
        }
      } catch (err) {
        console.warn(`[api/photos] GitHub API list failed for ${folder}:`, err);
      }
    }

    // 2. Fallback to local filesystem
    const localFolderPath = path.join("C:\\Users\\Leonardo\\Downloads\\private-photos", folder);
    if (fs.existsSync(localFolderPath)) {
      try {
        const files = fs.readdirSync(localFolderPath);
        result[folder] = files.filter((f) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f));
      } catch (err) {
        console.warn(`[api/photos] Local read failed for ${folder}:`, err);
      }
    }
  }

  return NextResponse.json(result);
}
