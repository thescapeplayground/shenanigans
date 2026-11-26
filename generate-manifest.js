import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'manifest.json');

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

function isImage(file) {
  return IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase());
}

function getImageDimensions(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.svg') {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      // Look for viewBox="x y width height"
      const viewBoxMatch = content.match(/viewBox=["']\s*([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)\s*["']/i);
      if (viewBoxMatch) {
        return { width: parseFloat(viewBoxMatch[3]), height: parseFloat(viewBoxMatch[4]) };
      }
      const widthMatch = content.match(/width=["']\s*([0-9.-]+)(px|%)?\s*["']/i);
      const heightMatch = content.match(/height=["']\s*([0-9.-]+)(px|%)?\s*["']/i);
      if (widthMatch && heightMatch) {
        return { width: parseFloat(widthMatch[1]), height: parseFloat(heightMatch[1]) };
      }
    } catch (e) {
      console.warn('Failed to parse SVG dimensions:', e);
    }
    return null;
  }

  let fd;
  try {
    fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(30);
    fs.readSync(fd, buffer, 0, 30, 0);

    if (ext === '.png') {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { width, height };
    }

    if (ext === '.webp') {
      const type = buffer.toString('ascii', 8, 12);
      if (type !== 'WEBP') return null;

      const format = buffer.toString('ascii', 12, 16);
      if (format === 'VP8 ') {
        const width = buffer.readUInt16LE(26) & 0x3fff;
        const height = buffer.readUInt16LE(28) & 0x3fff;
        return { width, height };
      } else if (format === 'VP8L') {
        const b = buffer.readUInt32LE(20);
        const width = ((b >> 1) & 0x3fff) + 1;
        const height = ((b >> 15) & 0x3fff) + 1;
        return { width, height };
      } else if (format === 'VP8X') {
        const width = (buffer.readUIntLE(24, 3) & 0xffffff) + 1;
        const height = (buffer.readUIntLE(27, 3) & 0xffffff) + 1;
        return { width, height };
      }
      return null;
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) return null;
      let offset = 2;
      const size = fs.fstatSync(fd).size;
      const scanBuffer = Buffer.alloc(10);
      while (offset < size) {
        fs.readSync(fd, scanBuffer, 0, 4, offset);
        if (scanBuffer[0] !== 0xFF) return null;
        const marker = scanBuffer[1];
        const length = scanBuffer.readUInt16BE(2);
        const isSOF = (marker >= 0xC0 && marker <= 0xC3) ||
                      (marker >= 0xC5 && marker <= 0xC7) ||
                      (marker >= 0xC9 && marker <= 0xCB) ||
                      (marker >= 0xCD && marker <= 0xCF);
        if (isSOF) {
          fs.readSync(fd, scanBuffer, 0, 9, offset + 4);
          const height = scanBuffer.readUInt16BE(1);
          const width = scanBuffer.readUInt16BE(3);
          return { width, height };
        }
        offset += length + 2;
      }
    }
  } catch (e) {
    // Fail silently, fallback aspect ratio isn't breaking
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
  return null;
}

function scanProjects() {
  const projects = [];
  const projectsDir = path.join(PUBLIC_DIR, 'projects');

  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const folderName = entry.name;
      const folderPath = path.join(projectsDir, folderName);
      const infoPath = path.join(folderPath, 'info.json');

      if (fs.existsSync(infoPath)) {
        try {
          const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
          const files = fs.readdirSync(folderPath);
          const localPhotos = files
            .filter(file => isImage(file) && file !== 'logo.svg' && file !== 'logo.png')
            .map(file => `/projects/${folderName}/${file}`);
          const photos = Array.isArray(info.photos) && info.photos.length > 0 ? info.photos : localPhotos;

          projects.push({
            _order: typeof info.order === 'number' ? info.order : 999,
            id: folderName,
            title: info.title || folderName,
            category: info.category || 'General',
            description: info.description || '',
            tech: info.tech || [],
            visitUrl: info.visitUrl || '',
            githubUrl: info.githubUrl || '',
            status: info.status || 'Active',
            photos: photos
          });
        } catch (err) {
          console.error(`Error parsing info.json in project ${folderName}:`, err);
        }
      }
    }
  }
  return projects
    .sort((a, b) => a._order - b._order || a.id.localeCompare(b.id))
    .map(({ _order, ...project }) => project);
}

function scanDesigns() {
  const designs = {};
  const designsDir = path.join(PUBLIC_DIR, 'designs');

  if (fs.existsSync(designsDir)) {
    const subfolders = fs.readdirSync(designsDir, { withFileTypes: true });
    for (const sub of subfolders) {
      if (sub.isDirectory()) {
        const subPath = path.join(designsDir, sub.name);
        const files = fs.readdirSync(subPath).filter(file => isImage(file));
        const images = [];

        for (const file of files) {
          const fullPath = path.join(subPath, file);
          const dims = getImageDimensions(fullPath);
          const aspect = dims && dims.height > 0 ? parseFloat((dims.width / dims.height).toFixed(4)) : 1.0;
          images.push({
            path: `/designs/${sub.name}/${file}`,
            aspect: aspect
          });
        }

        designs[sub.name] = images;
      }
    }
  }
  return designs;
}

function scanLogos() {
  const logos = [];
  const logosDir = path.join(PUBLIC_DIR, 'logos');

  if (fs.existsSync(logosDir)) {
    const subfolders = fs.readdirSync(logosDir, { withFileTypes: true });
    for (const sub of subfolders) {
      if (sub.isDirectory()) {
        const subPath = path.join(logosDir, sub.name);
        const files = fs.readdirSync(subPath);

        // Find description json
        const jsonFile = files.find(file => file.endsWith('.json'));
        // Find logo image (png or svg)
        const imageFile = files.find(file => isImage(file) && !file.endsWith('.json'));

        if (imageFile) {
          // Parse title from folder name: "my-project" → "My Project"
          const folderTitle = sub.name
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

          let tag = '// BRAND MARK';
          let desc = '';

          if (jsonFile) {
            try {
              const descData = JSON.parse(fs.readFileSync(path.join(subPath, jsonFile), 'utf8'));
              tag = descData.tag || tag;
              desc = descData.desc || desc;
            } catch (err) {
              console.error(`Error parsing logo json in ${sub.name}:`, err);
            }
          }

          logos.push({
            id: sub.name,
            title: folderTitle,
            tag,
            desc,
            imagePath: `/logos/${sub.name}/${imageFile}`
          });
        }
      }
    }
  }
  return logos;
}

function scanPhotography() {
  const photographyDir = path.join(PUBLIC_DIR, 'photography');
  if (fs.existsSync(photographyDir)) {
    const files = fs.readdirSync(photographyDir).filter(file => isImage(file));
    const images = [];

    for (const file of files) {
      const fullPath = path.join(photographyDir, file);
      const dims = getImageDimensions(fullPath);
      const aspect = dims && dims.height > 0 ? parseFloat((dims.width / dims.height).toFixed(4)) : 1.0;
      images.push({
        path: `/photography/${file}`,
        aspect: aspect
      });
    }
    return images;
  }
  return [];
}

function main() {
  console.log('Generating assets manifest...');
  const manifest = {
    projects: scanProjects(),
    designs: scanDesigns(),
    logos: scanLogos(),
    photography: scanPhotography()
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Manifest written to: ${MANIFEST_PATH}`);
  console.log(`- Scanned ${manifest.projects.length} projects`);
  console.log(`- Scanned ${Object.keys(manifest.designs).length} design subfolders`);
  console.log(`- Scanned ${manifest.logos.length} logos`);
  console.log(`- Scanned ${manifest.photography.length} photography images`);
}

main();
