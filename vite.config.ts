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
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

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
}

function privatePhotosDevApi(token: string): Plugin {
  return {
    name: 'private-photos-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost')

        if (url.pathname === '/api/gallery') {
          res.setHeader('Content-Type', 'application/json')
          if (!token) {
            res.statusCode = 200
            res.end(JSON.stringify({ source: 'fallback', albums: null }))
            return
          }
          try {
            const ghRes = await fetch(
              'https://api.github.com/repos/isaiahscape/private-photos/git/trees/main?recursive=1',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/vnd.github+json',
                  'User-Agent': 'shenanigans-v3',
                },
              }
            )
            if (!ghRes.ok) {
              res.statusCode = 200
              res.end(JSON.stringify({ source: 'fallback', albums: null }))
              return
            }
            const data = (await ghRes.json()) as { tree?: Array<{ type: string; path?: string }> }
            const tree = Array.isArray(data.tree) ? data.tree : []
            const albumMap = new Map<string, { id: string; name: string; description: string; coverImage: string; folder: string; order: number; items: Array<{ id: string; src: string; alt: string; title: string; folder: string }> }>()

            for (const node of tree) {
              if (node.type !== 'blob' || !node.path) continue
              const ext = path.extname(node.path).toLowerCase()
              if (!IMAGE_EXTENSIONS.has(ext)) continue
              const parts = node.path.split('/')
              const folder = parts.length > 1 ? parts[0] : 'misc'
              const meta = ALBUM_META[folder] || {
                id: folder.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                name: folder.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                description: `Visual captures and assets from ${folder}.`,
                order: 99,
              }
              if (!albumMap.has(folder)) {
                albumMap.set(folder, { ...meta, coverImage: '', folder, items: [] })
              }
              const album = albumMap.get(folder)!
              const src = `/api/photos/${parts.map((p) => encodeURIComponent(p)).join('/')}`
              const title = path.basename(node.path, ext).replace(/[_-]+/g, ' ').trim() || 'Untitled'
              if (!album.coverImage) album.coverImage = src
              album.items.push({ id: `${meta.id}-${album.items.length + 1}`, src, alt: title, title, folder: meta.id })
            }

            const albums = Array.from(albumMap.values())
              .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
              .map(({ order: _order, ...rest }) => {
                void _order
                return rest
              })

            res.statusCode = 200
            res.end(JSON.stringify({ source: 'github', albums }))
            return
          } catch {
            res.statusCode = 200
            res.end(JSON.stringify({ source: 'fallback', albums: null }))
            return
          }
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
            const ghRes = await fetch(`https://raw.githubusercontent.com/isaiahscape/private-photos/main/${githubPath}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3.raw',
                'User-Agent': 'shenanigans-v3',
              },
            })
            if (ghRes.ok) {
              const buf = Buffer.from(await ghRes.arrayBuffer())
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

  return {
    plugins: [react(), privatePhotosDevApi(token)],
  }
})
