import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.jfif': 'image/jpeg',
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg', '.bmp', '.jfif'])

const ALBUM_META: Record<string, { id: string; name: string; description: string; order: number }> = {
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
}

const FOLDER_ALIASES: Record<string, string> = {
  photography: 'masonry',
  thesocialclub: 'socialclub',
}

interface AlbumEntry {
  id: string
  name: string
  description: string
  coverImage: string
  folder: string
  order: number
  items: Array<{ id: string; src: string; alt: string; title: string; folder: string }>
}

function resolveAlbumMeta(parts: string[]) {
  const dirs = parts.slice(0, -1)
  for (let i = 0; i < dirs.length; i++) {
    const segKey = dirs[i].toLowerCase().replace(/[^a-z0-9]/g, '')
    const mappedKey = FOLDER_ALIASES[segKey] || segKey
    if (ALBUM_META[mappedKey]) {
      return { folder: dirs[i], meta: ALBUM_META[mappedKey] }
    }
    if (mappedKey.includes('socialclub')) {
      return { folder: dirs[i], meta: ALBUM_META.socialclub }
    }
    if (i + 1 < dirs.length) {
      const pairKey = `${segKey}${dirs[i + 1].toLowerCase().replace(/[^a-z0-9]/g, '')}`
      const mappedPair = FOLDER_ALIASES[pairKey] || pairKey
      if (ALBUM_META[mappedPair]) {
        return { folder: `${dirs[i]}/${dirs[i + 1]}`, meta: ALBUM_META[mappedPair] }
      }
    }
  }

  const folder = dirs.length > 0 ? dirs[0] : 'misc'
  return {
    folder,
    meta: {
      id: folder.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: folder.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      description: `Visual captures and assets from ${folder}.`,
      order: 99,
    },
  }
}

function buildAlbumsFromPaths(paths: string[]) {
  const albumMap = new Map<string, AlbumEntry>()
  for (const relPath of paths) {
    const ext = path.extname(relPath).toLowerCase()
    if (!IMAGE_EXTENSIONS.has(ext)) continue
    const parts = relPath.split('/').filter(Boolean)
    if (parts.length === 0) continue

    const { folder, meta } = resolveAlbumMeta(parts)
    if (!albumMap.has(meta.id)) {
      albumMap.set(meta.id, { ...meta, coverImage: '', folder, items: [] })
    }
    const album = albumMap.get(meta.id)!
    const src = `/api/photos/${parts.map((p) => encodeURIComponent(p)).join('/')}`
    const title = path.basename(relPath, ext).replace(/[_-]+/g, ' ').trim() || 'Untitled'
    if (!album.coverImage) album.coverImage = src
    album.items.push({ id: `${meta.id}-${album.items.length + 1}`, src, alt: title, title, folder: meta.id })
  }

  return Array.from(albumMap.values())
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
    .map(({ order: _order, ...rest }) => {
      void _order
      return rest
    })
}

function scanLocalPhotos(baseDir: string, prefix = ''): string[] {
  if (!baseDir || !fs.existsSync(baseDir)) return []
  const results: string[] = []
  for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    const full = path.join(baseDir, entry.name)
    if (entry.isDirectory()) {
      results.push(...scanLocalPhotos(full, rel))
    } else if (entry.isFile()) {
      results.push(rel)
    }
  }
  return results
}

function privatePhotosDevApi(
  token: string,
  resendConfig: { apiKey: string; fromAddress: string; toAddress: string }
): Plugin {
  return {
    name: 'private-photos-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost')

        if (url.pathname === '/api/contact') {
          const contactHandler = (await import('./api/contact.js')).default
          if (!process.env.RESEND_API_KEY && resendConfig.apiKey) {
            process.env.RESEND_API_KEY = resendConfig.apiKey
          }
          if (!process.env.RESEND_FROM_ADDRESS && resendConfig.fromAddress) {
            process.env.RESEND_FROM_ADDRESS = resendConfig.fromAddress
          }
          if (!process.env.CONTACT_TO_ADDRESS && resendConfig.toAddress) {
            process.env.CONTACT_TO_ADDRESS = resendConfig.toAddress
          }
          const wrappedRes = Object.assign(res, {
            status(code: number) {
              res.statusCode = code
              return wrappedRes
            },
            json(payload: unknown) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
              return wrappedRes
            },
          })
          await contactHandler(req, wrappedRes)
          return
        }

        if (url.pathname === '/api/gallery') {
          res.setHeader('Content-Type', 'application/json')
          if (token) {
            try {
              const ghRes = await fetch(
                'https://api.github.com/repos/isaiahscape/private-photos/git/trees/HEAD?recursive=1',
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github+json',
                    'User-Agent': 'shenanigans-v3',
                  },
                }
              )
              if (ghRes.ok) {
                const data = (await ghRes.json()) as { tree?: Array<{ type: string; path?: string }> }
                const tree = Array.isArray(data.tree) ? data.tree : []
                const paths = tree
                  .filter((node) => node.type === 'blob' && Boolean(node.path))
                  .map((node) => node.path as string)
                const albums = buildAlbumsFromPaths(paths)
                res.statusCode = 200
                res.end(JSON.stringify({ source: 'github', albums }))
                return
              }
            } catch {
              // Fall through to local/fallback
            }
          }

          const localBase = path.join(process.env.USERPROFILE || '', 'Downloads', 'private-photos')
          const localPaths = scanLocalPhotos(localBase)
          if (localPaths.length > 0) {
            const albums = buildAlbumsFromPaths(localPaths)
            res.statusCode = 200
            res.end(JSON.stringify({ source: 'local', albums }))
            return
          }

          res.statusCode = 200
          res.end(JSON.stringify({ source: 'fallback', albums: null }))
          return
        }

        if (url.pathname.startsWith('/api/photos/')) {
          const rawPath = url.pathname.replace(/^\/api\/photos\//, '')
          const segments = rawPath.split('/').filter(Boolean).map((s) => decodeURIComponent(s))
          if (segments.length === 0 || segments.some((s) => s === '.' || s === '..')) {
            res.statusCode = 400
            res.end('Invalid path')
            return
          }

          const filename = segments[segments.length - 1]
          const ext = path.extname(filename).toLowerCase()
          res.setHeader('Content-Type', CONTENT_TYPES[ext] || 'application/octet-stream')

          if (token) {
            const githubPath = segments.map((s) => encodeURIComponent(s)).join('/')
            const rawRes = await fetch(`https://raw.githubusercontent.com/isaiahscape/private-photos/HEAD/${githubPath}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3.raw',
                'User-Agent': 'shenanigans-v3',
              },
            })
            if (rawRes.ok) {
              const buf = Buffer.from(await rawRes.arrayBuffer())
              res.statusCode = 200
              res.end(buf)
              return
            }

            const contentsRes = await fetch(`https://api.github.com/repos/isaiahscape/private-photos/contents/${githubPath}?ref=HEAD`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.raw+json',
                'User-Agent': 'shenanigans-v3',
              },
            })
            if (contentsRes.ok) {
              const buf = Buffer.from(await contentsRes.arrayBuffer())
              res.statusCode = 200
              res.end(buf)
              return
            }
          }

          const localPath = path.join(process.env.USERPROFILE || '', 'Downloads', 'private-photos', ...segments)
          if (fs.existsSync(localPath)) {
            res.statusCode = 200
            res.end(fs.readFileSync(localPath))
            return
          }

          res.statusCode = 404
          res.end('Photo not found')
          return
        }

        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const token = env.GITHUB_PHOTOS_TOKEN || process.env.GITHUB_PHOTOS_TOKEN || env.GITHUB_TOKEN || process.env.GITHUB_TOKEN || ''
  const resendConfig = {
    apiKey: env.RESEND_API_KEY || process.env.RESEND_API_KEY || '',
    fromAddress: env.RESEND_FROM_ADDRESS || process.env.RESEND_FROM_ADDRESS || '',
    toAddress: env.CONTACT_TO_ADDRESS || process.env.CONTACT_TO_ADDRESS || '',
  }

  return {
    plugins: [react(), privatePhotosDevApi(token, resendConfig)],
  }
})
