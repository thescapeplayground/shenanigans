import path from 'path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

const ALBUM_META = {
  masonry: {
    id: 'photography',
    name: 'Photography',
    description: 'A collection of street shots, urban captures, portraits, and light plays.',
    order: 0,
  },
  tv: {
    id: 'tv',
    name: 'TV Showcase',
    description: 'Custom TV graphics, visual banners, and display concepts.',
    order: 1,
  },
  tangiblestuff: {
    id: 'tangiblestuff',
    name: 'Tangible Stuff',
    description: 'Multi-part physical renders, artwork iterations, and tangible experiments.',
    order: 2,
  },
  socialclub: {
    id: 'social-club',
    name: 'Social Club',
    description: 'Social Club visual series, community captures, and creative archives.',
    order: 3,
  },
};

const KNOWN_ITEM_DETAILS = {
  'masonry/IMG_20260623_205128.jpg': {
    title: 'Nightscape Shot',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/1.8', shutterSpeed: '1/60s', iso: 'ISO 800', aspectRatio: '3:2', dateTaken: 'Jun 23, 2024 • 20:51' },
  },
  'masonry/0065_3_4_img_260608_180608.jpg': {
    title: 'Golden Hour Frame',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF-S 18-55mm f/3.5-5.6 IS STM', focalLength: '35mm', aperture: 'f/4.5', shutterSpeed: '1/320s', iso: 'ISO 100', aspectRatio: '2:3', dateTaken: 'Jun 08, 2024 • 18:06' },
  },
  'masonry/IMG_20260623_204532.png': {
    title: 'Urban Perspective',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF-S 18-55mm f/3.5-5.6 IS STM', focalLength: '24mm', aperture: 'f/3.5', shutterSpeed: '1/80s', iso: 'ISO 400', aspectRatio: '3:2', dateTaken: 'Jun 23, 2024 • 20:45' },
  },
  'masonry/DSC_20230726_174759_Lmc8.4_R17_Prashant_Premium(beta2).jpg': {
    title: 'Portrait Tone I',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/2.2', shutterSpeed: '1/250s', iso: 'ISO 200', aspectRatio: '3:2', dateTaken: 'Jul 26, 2023 • 17:47' },
  },
  'masonry/noob_v2.2_13-Feb-24_20.24.22.Profile2.jpg': {
    title: 'Aesthetic Profile',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/2.0', shutterSpeed: '1/100s', iso: 'ISO 400', aspectRatio: '3:2', dateTaken: 'Feb 13, 2024 • 20:24' },
  },
  'masonry/IMG_20260623_204813.jpg': {
    title: 'Shadow & Light',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF-S 18-55mm f/3.5-5.6 IS STM', focalLength: '28mm', aperture: 'f/4.0', shutterSpeed: '1/125s', iso: 'ISO 200', aspectRatio: '3:2', dateTaken: 'Jun 23, 2024 • 20:48' },
  },
  'masonry/AGC_20260515_173533357.jpg': {
    title: 'Monochrome Capture',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/2.8', shutterSpeed: '1/500s', iso: 'ISO 100', aspectRatio: '3:2', dateTaken: 'May 15, 2024 • 17:35' },
  },
  'masonry/DSC_20230611_101123_Lmc8.4_R17_Prashant_Premium(beta2).jpg': {
    title: 'Daylight Focus',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF-S 18-55mm f/3.5-5.6 IS STM', focalLength: '18mm', aperture: 'f/5.6', shutterSpeed: '1/800s', iso: 'ISO 100', aspectRatio: '3:2', dateTaken: 'Jun 11, 2023 • 10:11' },
  },
  'masonry/IMG_Veux_20240218_074746_lmc_8.4~2.jpg': {
    title: 'Morning Mist',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/1.8', shutterSpeed: '1/400s', iso: 'ISO 100', aspectRatio: '3:2', dateTaken: 'Feb 18, 2024 • 07:47' },
  },
  'masonry/tower 1.png': {
    title: 'Tower Structure',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF-S 18-55mm f/3.5-5.6 IS STM', focalLength: '45mm', aperture: 'f/5.6', shutterSpeed: '1/640s', iso: 'ISO 100', aspectRatio: '3:2', dateTaken: 'Mar 10, 2024 • 15:12' },
  },
  'masonry/light 1.png': {
    title: 'Light & Glow',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/1.8', shutterSpeed: '1/80s', iso: 'ISO 400', aspectRatio: '3:2', dateTaken: 'Mar 14, 2024 • 21:05' },
  },
  'masonry/IMG_7691 1.png': {
    title: 'Vintage Mood',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/2.2', shutterSpeed: '1/320s', iso: 'ISO 200', aspectRatio: '3:2', dateTaken: 'Apr 04, 2024 • 16:30' },
  },
  'masonry/IMG_7663 1.png': {
    title: 'Candid Angle',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF-S 18-55mm f/3.5-5.6 IS STM', focalLength: '35mm', aperture: 'f/4.0', shutterSpeed: '1/500s', iso: 'ISO 100', aspectRatio: '3:2', dateTaken: 'Apr 04, 2024 • 16:15' },
  },
  'masonry/ghost 1.png': {
    title: 'Ghost Silhouette',
    metadata: { make: 'Canon', model: 'EOS 700D', lens: 'EF 50mm f/1.8 STM', focalLength: '50mm', aperture: 'f/1.8', shutterSpeed: '1/60s', iso: 'ISO 1600', aspectRatio: '3:2', dateTaken: 'May 02, 2024 • 22:40' },
  },
  'tv/TV - 1, Fixed.png': {
    title: 'TV Fixed Pt. I',
    metadata: { make: 'Digital Render', model: 'Blender 4.0 / Figma', lens: '50mm Virtual Cine Lens', dimensions: '3840 × 2160', aspectRatio: '16:9', software: 'Cycles Engine' },
  },
  'tv/TV Showcase - 1.png': {
    title: 'TV Showcase Pt. I',
    metadata: { make: 'Digital Render', model: 'Blender 4.0', lens: '35mm Virtual Cine Lens', dimensions: '3840 × 2160', aspectRatio: '16:9', software: 'Cycles Engine' },
  },
  'tv/TV Showcase - 2.png': {
    title: 'TV Showcase Pt. II',
    metadata: { make: 'Digital Render', model: 'Blender 4.0', lens: '85mm Telephoto Virtual', dimensions: '3840 × 2160', aspectRatio: '16:9', software: 'Cycles Engine' },
  },
};

function formatTitle(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  return base.replace(/[_-]+/g, ' ').trim() || 'Untitled';
}

function formatFolderName(folder) {
  return folder
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = process.env.GITHUB_PHOTOS_TOKEN || process.env.GITHUB_TOKEN;
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  if (!token) {
    return res.status(200).json({ source: 'fallback', albums: null });
  }

  try {
    const treeRes = await fetch(
      'https://api.github.com/repos/isaiahscape/private-photos/git/trees/main?recursive=1',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'shenanigans-v3',
        },
      }
    );

    if (!treeRes.ok) {
      return res.status(200).json({ source: 'fallback', albums: null });
    }

    const data = await treeRes.json();
    const tree = Array.isArray(data.tree) ? data.tree : [];
    const albumMap = new Map();

    for (const node of tree) {
      if (node.type !== 'blob' || !node.path) continue;
      const ext = path.extname(node.path).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(ext)) continue;

      const parts = node.path.split('/');
      const folder = parts.length > 1 ? parts[0] : 'misc';
      const folderKey = folder.toLowerCase().replace(/[^a-z0-9]/g, '');
      const meta = ALBUM_META[folderKey] || {
        id: folder.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: formatFolderName(folder),
        description: `Visual captures and assets from ${folder}.`,
        order: 99,
      };

      if (!albumMap.has(folder)) {
        albumMap.set(folder, {
          id: meta.id,
          name: meta.name,
          description: meta.description,
          coverImage: '',
          folder,
          order: meta.order,
          items: [],
        });
      }

      const encodedPath = parts.map((p) => encodeURIComponent(p)).join('/');
      const src = `/api/photos/${encodedPath}`;
      const known = KNOWN_ITEM_DETAILS[node.path];
      const album = albumMap.get(folder);

      const item = {
        id: `${meta.id}-${album.items.length + 1}`,
        src,
        alt: known?.title || formatTitle(node.path),
        title: known?.title || formatTitle(node.path),
        folder: meta.id,
        metadata: known?.metadata,
      };

      if (!album.coverImage) {
        album.coverImage = src;
      }
      album.items.push(item);
    }

    const albums = Array.from(albumMap.values())
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
      .map(({ order: _order, ...rest }) => rest);

    return res.status(200).json({ source: 'github', albums });
  } catch (err) {
    console.warn('[api/gallery] Falling back to static album list:', err);
    return res.status(200).json({ source: 'fallback', albums: null });
  }
}
