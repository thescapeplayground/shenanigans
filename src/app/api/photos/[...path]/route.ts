import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;

    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("Path is required", { status: 400 });
    }

    // Decode URL component for filenames containing spaces or special characters
    const decodedSegments = pathSegments.map((seg) => decodeURIComponent(seg));
    const relativePath = decodedSegments.join("/");
    const ext = path.extname(relativePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

    const headers = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    };

    const token = process.env.GITHUB_PHOTOS_TOKEN || process.env.GITHUB_TOKEN;

    // 1. Try fetching from private GitHub repository if token is present
    if (token) {
      const githubUrl = `https://raw.githubusercontent.com/isaiahscape/private-photos/main/${encodeURI(relativePath)}`;
      try {
        const ghResponse = await fetch(githubUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3.raw",
          },
          next: { revalidate: 86400 }, // Cache for 24 hours in Next.js data cache
        });

        if (ghResponse.ok) {
          const imageBuffer = await ghResponse.arrayBuffer();
          return new Response(imageBuffer, { status: 200, headers });
        }
      } catch (ghErr) {
        console.warn("[api/photos] Failed to fetch from GitHub raw:", ghErr);
      }
    }

    // 2. Local filesystem fallback (Downloads/private-photos)
    const localBasePath = "C:\\Users\\Leonardo\\Downloads\\private-photos";
    const localFilePath = path.join(localBasePath, ...decodedSegments);

    if (fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return new Response(fileBuffer, { status: 200, headers });
    }

    return new NextResponse("Photo not found", { status: 404 });
  } catch (error) {
    console.error("[api/photos] Error serving photo:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
