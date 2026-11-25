import fs from 'fs';
import path from 'path';

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

function decodeSegment(seg) {
  let decoded = seg;
  try {
    while (decoded.includes('%')) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
  } catch {
    // Ignore malformed URI sequences
  }
  return decoded;
}

function extractSegments(req) {
  const rawQueryPath = req.query?.path;
  if (rawQueryPath) {
    const joined = Array.isArray(rawQueryPath) ? rawQueryPath.join('/') : String(rawQueryPath);
    return joined.split('/').filter(Boolean).map(decodeSegment);
  }

  const reqUrl = new URL(req.url || '/', 'http://localhost');
  const trimmed = reqUrl.pathname.replace(/^\/api\/photos\/?/, '');
  return trimmed.split('/').filter(Boolean).map(decodeSegment);
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const segments = extractSegments(req);
    if (segments.length === 0 || segments.some((s) => s === '.' || s === '..' || s.includes('\\'))) {
      return res.status(400).send('Invalid photo path');
    }

    const filename = segments[segments.length - 1];
    const ext = path.extname(filename).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400');

    const token = process.env.GITHUB_PHOTOS_TOKEN || process.env.GITHUB_TOKEN;
    if (token) {
      const githubPath = segments.map((s) => encodeURIComponent(s)).join('/');
      const githubUrl = `https://raw.githubusercontent.com/isaiahscape/private-photos/main/${githubPath}`;

      const ghResponse = await fetch(githubUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3.raw',
          'User-Agent': 'shenanigans-v3',
        },
      });

      if (ghResponse.ok) {
        const buffer = Buffer.from(await ghResponse.arrayBuffer());
        return res.status(200).send(buffer);
      }
    }

    // Optional local fallback during local development
    const localBasePath = path.join(process.env.USERPROFILE || '', 'Downloads', 'private-photos');
    const localFilePath = path.join(localBasePath, ...segments);
    if (localBasePath && fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return res.status(200).send(fileBuffer);
    }

    return res.status(404).send('Photo not found');
  } catch (err) {
    console.error('[api/photos] Error serving photo:', err);
    return res.status(500).send('Internal Server Error');
  }
}
