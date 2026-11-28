import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { ReactLenis } from 'lenis/react'
import { PaperTexture } from '@paper-design/shaders-react'
import { FAB } from './components/FAB'
import { Hero } from './components/Hero'
import { CoreTechnologiesSection } from './components/CoreTechnologiesSection'
import { useGitHubData } from './hooks/useGitHubData'
import { ContactFormCard, DigitalSpacesCard } from './components/ContactSection'
import './App.css'

const routeLoaders = {
  about: () => import('./components/AboutPage'),
  projects: () => import('./components/ProjectsPage'),
  services: () => import('./components/ServicesPage'),
  gallery: () => import('./components/GalleryPage'),
  blogs: () => import('./components/BlogsPage'),
} as const

const AboutPage = lazy(() => routeLoaders.about().then((m) => ({ default: m.AboutPage })))
const ProjectsPage = lazy(() => routeLoaders.projects().then((m) => ({ default: m.ProjectsPage })))
const ServicesPage = lazy(() => routeLoaders.services().then((m) => ({ default: m.ServicesPage })))
const GalleryPage = lazy(() => routeLoaders.gallery().then((m) => ({ default: m.GalleryPage })))
const BlogsPage = lazy(() => routeLoaders.blogs().then((m) => ({ default: m.BlogsPage })))

const WORDS = [
  'Hello',       // English
  'Kumusta',     // Filipino / Bisaya
  'Bonjour',     // French
  'Ciao',        // Italian
  'Hola',        // Spanish
  'こんにちは',    // Japanese
  'Olá',         // Portuguese
  '你好',        // Chinese
  'Hallo'        // German
]

function computeAge(birthDate: Date): number {
  const now = new Date()
  let age = now.getFullYear() - birthDate.getFullYear()
  const monthDiff = now.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const BIRTHDAY = new Date('2005-07-01T00:00:00+08:00')
const CURRENT_AGE = computeAge(BIRTHDAY)

interface ProjectItem {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  visitUrl?: string
  githubUrl?: string
  status: string
  photos?: string[]
}

interface ProjectMockups {
  back: {
    title: string
    items: Array<{ name: string; gradient: string }>
  }
  middle: {
    gradient: string
  }
  front: {
    title: string
    walls: string[]
  }
}

const LOCAL_DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: '00-windiffuse',
    title: 'Diffuse for Windows',
    category: 'Windows App',
    description: 'A native Windows 11 port of Diffuse Music Live Wallpaper featuring a WinUI 3 floating tray flyout, Direct3D 11 + DirectComposition fluid shaders, SMTC Now Playing sync, and WASAPI Live Beats.',
    tech: ['C#', '.NET', 'WinUI 3', 'Direct3D 11'],
    visitUrl: 'https://github.com/isaiahscape/windiffuse/releases',
    githubUrl: 'https://github.com/isaiahscape/windiffuse',
    status: 'Active',
    photos: [
      'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/ss-3.png',
      'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/ss-1.png',
      'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/ss-2.png',
      'https://raw.githubusercontent.com/isaiahscape/windiffuse/main/assets/banner.png'
    ]
  },
  {
    id: '07-nectarlink-services',
    title: 'Nectarlink Services',
    category: 'Android System',
    description: 'A privileged Android priv-app AIDL Binder service for custom ROMs providing screen mirroring, input injection, virtual displays, device/call audio streaming, and clipboard sync for NectarLink without ADB or root.',
    tech: ['Android', 'Kotlin', 'AIDL', 'AOSP'],
    visitUrl: '',
    githubUrl: 'https://github.com/isaiahscape/nectarlink-services',
    status: 'Active',
    photos: [
      '/assets/nectarlink-services.png',
      '/projects/07-nectarlink-services/preview.svg'
    ]
  },
  {
    id: '08-nectarlink-module',
    title: 'Nectarlink Module',
    category: 'Root Module',
    description: 'A systemless root module for Magisk, KernelSU, and APatch/FolkPatch that deploys Nectarlink Services as a privileged system_ext app with SELinux UHID rules and automated CI release bundling.',
    tech: ['Android', 'Shell', 'Magisk', 'GitHub Actions'],
    visitUrl: 'https://github.com/isaiahscape/nectarlink-module/releases',
    githubUrl: 'https://github.com/isaiahscape/nectarlink-module',
    status: 'Active',
    photos: [
      '/assets/nectarlink-module.png',
      '/projects/08-nectarlink-module/preview.svg'
    ]
  },
  {
    id: '01-material-explorer',
    title: 'Material Explorer',
    category: 'Android App',
    description: 'An Android APK explorer and file manager built with Material Design 3 principles for intuitive navigation, APK inspection, and dynamic theming.',
    tech: ['Android', 'Kotlin', 'Material Design 3'],
    visitUrl: 'https://github.com/isaiahscape/materialexp/releases',
    githubUrl: 'https://github.com/isaiahscape/materialexp',
    status: 'Active',
    photos: ['/projects/01-material-explorer/preview.svg']
  },
  {
    id: '02-bedrock',
    title: 'Bedrock',
    category: 'Android App',
    description: 'A minimalist monochrome notes editor for Android with Markdown live preview, interactive checklists, SHA-256 local encryption, and offline sync.',
    tech: ['Kotlin', 'Jetpack Compose', 'Android', 'Markdown'],
    visitUrl: 'https://foss.isaiahthings.me',
    githubUrl: 'https://github.com/isaiahscape/bedrock',
    status: 'Active',
    photos: ['/projects/02-bedrock/preview.svg']
  },
  {
    id: '03-snapweb',
    title: 'Snapseed for Web',
    category: 'Web App',
    description: 'A zero-server client-side photo processing web app inspired by Snapseed, featuring tactile gesture tuning, histograms, and RAW-like filters.',
    tech: ['TypeScript', 'Tailwind CSS', 'HTML5'],
    visitUrl: 'https://snapweb.isaiahthings.me/',
    githubUrl: 'https://github.com/isaiahscape/snapweb-remixed',
    status: 'Active',
    photos: ['/projects/03-snapweb/preview.svg']
  },
  {
    id: '04-mikrotik-manager',
    title: 'Mikrotik Manager',
    category: 'Network Utility',
    description: 'An automated helper utility designed to manage DHCP & IP allocations, prevent IP conflicts, and query active subnets on Mikrotik routers.',
    tech: ['TypeScript', 'Node.js'],
    visitUrl: '',
    githubUrl: 'https://github.com/isaiahscape/mikrotik-ipoemgr',
    status: 'Completed',
    photos: ['/projects/04-mikrotik-manager/preview.svg']
  },
  {
    id: '05-the-scape-network',
    title: 'The Scape Network',
    category: 'Community',
    description: 'A digital social update log, creative archive channel, and interactive developer/design hub built around Telegram under the Scape Sandbox banner.',
    tech: ['Telegram', 'Figma'],
    visitUrl: 'https://telegram.me/thescapenetwork',
    githubUrl: '',
    status: 'Active',
    photos: ['/projects/05-the-scape-network/preview.svg']
  },
  {
    id: '06-kairo-bot',
    title: "Kairo's Old Bot",
    category: 'Automation',
    description: 'A legacy open-source modular Telegram utility bot built for fast channel administrative workflows, automated triggers, and group utilities.',
    tech: ['Python', 'Telegram'],
    visitUrl: '',
    githubUrl: 'https://github.com/isaiahscape/KairoKangedBot',
    status: 'Archived',
    photos: ['/projects/06-kairo-bot/preview.svg']
  }
]

const DEFAULT_MOCKUPS: Record<string, { logo: string; mockups: ProjectMockups }> = {
  '00-windiffuse': {
    logo: 'd',
    mockups: {
      back: {
        title: 'Shader Pipeline',
        items: [
          { name: 'SMTC Sync', gradient: 'linear-gradient(135deg, #609BFF, #8A7CFF)' },
          { name: 'Fluted Glass', gradient: 'linear-gradient(135deg, #F1A5A0, #8A7CFF)' },
          { name: 'Live Beats', gradient: 'linear-gradient(135deg, #1f4068, #609BFF)' }
        ]
      },
      middle: {
        gradient: 'linear-gradient(135deg, #0f172a, #1e1b4b)'
      },
      front: {
        title: 'Diffuse for Windows',
        walls: []
      }
    }
  },
  '01-material-explorer': {
    logo: 'm',
    mockups: {
      back: {
        title: 'File Operations',
        items: [
          { name: 'APKs', gradient: 'linear-gradient(135deg, #1f4068, #162447)' },
          { name: 'Storage', gradient: 'linear-gradient(135deg, #F1A5A0, #4e1a3d)' },
          { name: 'Material You', gradient: 'linear-gradient(135deg, #ffd369, #393e46)' }
        ]
      },
      middle: {
        gradient: 'linear-gradient(to top, #08060d, #cdc8c5)'
      },
      front: {
        title: 'Material Explorer',
        walls: []
      }
    }
  },
  '02-bedrock': {
    logo: 'b',
    mockups: {
      back: {
        title: 'Local Vault',
        items: [
          { name: 'Markdown', gradient: 'linear-gradient(135deg, #0f2027, #203a43)' },
          { name: 'SHA-256', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
          { name: 'Offline Sync', gradient: 'linear-gradient(135deg, #8a2387, #e94057)' }
        ]
      },
      middle: {
        gradient: 'linear-gradient(135deg, #141e30, #243b55)'
      },
      front: {
        title: 'Bedrock',
        walls: []
      }
    }
  },
  '03-snapweb': {
    logo: 's',
    mockups: {
      back: {
        title: 'Canvas Pipeline',
        items: [
          { name: 'Ambiance', gradient: 'linear-gradient(135deg, #f857a6, #ff5858)' },
          { name: 'Histogram', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
          { name: 'Zero Server', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' }
        ]
      },
      middle: {
        gradient: 'linear-gradient(135deg, #000428, #004e92)'
      },
      front: {
        title: 'SnapWeb',
        walls: []
      }
    }
  },
  '04-mikrotik-manager': {
    logo: 'mk',
    mockups: {
      back: {
        title: 'IPoE Subnets',
        items: [
          { name: 'DHCP Leases', gradient: 'linear-gradient(135deg, #3a1c1c, #6b2d2d)' },
          { name: 'Conflict Check', gradient: 'linear-gradient(135deg, #1c2a3a, #2d4f6b)' },
          { name: 'RouterOS API', gradient: 'linear-gradient(135deg, #1c3a27, #2d6b45)' }
        ]
      },
      middle: {
        gradient: 'linear-gradient(to top, #0f172a, #1e293b)'
      },
      front: {
        title: 'Mikrotik Manager',
        walls: []
      }
    }
  }
}

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY || 'c0a8e935644458896a1bda5e8468ec52'
const LASTFM_USER = import.meta.env.VITE_LASTFM_USER || 'isaiahthings'
const LASTFM_PROFILE_URL = `https://www.last.fm/user/${LASTFM_USER}`

type MusicTrack = {
  title: string
  artist: string
  url: string
  imageUrl: string
  isNowPlaying: boolean
}

const FALLBACK_ALBUM_ART = 'https://lastfm-img.freetls.fastly.net/i/u/300x300/9efc83368bf5ec624dcf258499d8051c.jpg'

const FALLBACK_MUSIC_TRACK: MusicTrack = {
  title: 'seasons',
  artist: 'wave to earth',
  url: 'https://www.last.fm/music/wave+to+earth/_/seasons',
  imageUrl: FALLBACK_ALBUM_ART,
  isNowPlaying: false
}

function getBestLastFmImage(images?: Array<{ '#text': string; size: string }>) {
  const image = [...(images ?? [])]
    .reverse()
    .find((item) => item['#text'] && !item['#text'].includes('2a96cbd8b46e442fc41c2b86b821562f'))

  return image?.['#text'] ?? ''
}

async function getItunesArtwork(title: string, artist: string, signal: AbortSignal) {
  try {
    const params = new URLSearchParams({
      term: `${artist} ${title}`,
      media: 'music',
      entity: 'song',
      limit: '1'
    })

    const response = await fetch(`https://itunes.apple.com/search?${params.toString()}`, { signal })
    if (!response.ok) return ''

    const data = await response.json()
    const artworkUrl = data?.results?.[0]?.artworkUrl100

    return typeof artworkUrl === 'string' ? artworkUrl.replace('100x100bb', '600x600bb') : ''
  } catch {
    return ''
  }
}

async function getLatestMusicTrack(signal: AbortSignal): Promise<MusicTrack> {
  if (!LASTFM_USER || !LASTFM_API_KEY) {
    return FALLBACK_MUSIC_TRACK
  }
  const params = new URLSearchParams({
    method: 'user.getrecenttracks',
    user: LASTFM_USER,
    api_key: LASTFM_API_KEY,
    format: 'json',
    limit: '1'
  })

  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${params.toString()}`, { signal })
  if (!response.ok) throw new Error('Could not load Last.fm recent tracks')

  const data = await response.json()
  if (data?.error) throw new Error(data.message || 'Last.fm API error')

  const recentTrack = data?.recenttracks?.track
  const track = Array.isArray(recentTrack) ? recentTrack[0] : recentTrack

  if (!track?.name) {
    return FALLBACK_MUSIC_TRACK
  }

  const artist = track.artist?.['#text'] || track.artist?.name || 'unknown artist'
  const title = track.name
  const lastFmImage = getBestLastFmImage(track.image)
  const itunesImage = lastFmImage ? '' : await getItunesArtwork(title, artist, signal)

  return {
    title,
    artist,
    url: track.url || LASTFM_PROFILE_URL,
    imageUrl: lastFmImage || itunesImage || FALLBACK_MUSIC_TRACK.imageUrl,
    isNowPlaying: track['@attr']?.nowplaying === 'true'
  }
}

function getTechIconUrl(tech: string): string {
  const slug = tech
    .toLowerCase()
    .trim()
    .replace(/\.js$/, 'js')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '')

  const customMapping: Record<string, string> = {
    'css': 'css3',
    'css3': 'css3',
    'html': 'html5',
    'html5': 'html5',
    'cpp': 'cplusplus',
    'cplusplus': 'cplusplus',
    'c': 'c',
    'motion': 'framer',
    'framermotion': 'framer',
    'framer': 'framer',
    'designplatform': 'figma',
    'nextjs': 'nextdotjs',
    'node': 'nodedotjs',
    'nodejs': 'nodedotjs',
    'threejs': 'threedotjs',
    'vue': 'vuedotjs',
    'nuxt': 'nuxtdotjs',
    'tailwind': 'tailwindcss',
    'tailwindcss': 'tailwindcss',
    'radix': 'radixui',
    'radixui': 'radixui',
    'linux': 'linux',
    'android': 'android',
    'java': 'openjdk',
    'kotlin': 'kotlin',
    'jetpackcompose': 'jetpackcompose',
    'materialdesign3': 'materialdesign',
    'markdown': 'markdown',
    'telegram': 'telegram',
    'python': 'python',
    'figma': 'figma',
    'typescript': 'typescript',
    'csharp': 'dotnet',
    'net': 'dotnet',
    'winui3': 'windows11',
    'direct3d11': 'opengl',
    'shell': 'gnubash',
    'magisk': 'magisk',
    'githubactions': 'githubactions',
  }

  const finalSlug = customMapping[slug] || slug
  return `https://cdn.simpleicons.org/${finalSlug}`
}

function App() {
  const [wordIndex, setWordIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [localTime, setLocalTime] = useState('')
  const [musicTrack, setMusicTrack] = useState<MusicTrack>(FALLBACK_MUSIC_TRACK)
  const [musicError, setMusicError] = useState(false)
  const getSystemTheme = (): 'light' | 'dark' =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme-mode')
      if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved
    } catch {
      // Ignore storage access errors and fall back to auto
    }
    return 'auto'
  })
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme())
  const resolvedTheme = themeMode === 'auto' ? systemTheme : themeMode
  const gh = useGitHubData()
  const getPageFromLocation = (pathname: string, rawHash = ''): 'home' | 'about' | 'projects' | 'services' | 'gallery' | 'blogs' => {
    const cleanPath = pathname.replace(/^\/+|\/+$/g, '').toLowerCase()
    const cleanHash = rawHash.replace(/^#\/?/, '').toLowerCase()
    const route = cleanPath || cleanHash
    if (route === 'blogs' || route.startsWith('blogs/') || route === 'blog' || route.startsWith('blog/')) {
      return 'blogs'
    }
    if (route === 'gallery' || route.startsWith('gallery/')) {
      return 'gallery'
    }
    if (route === 'services' || route.startsWith('services/')) {
      return 'services'
    }
    if (route === 'projects' || route.startsWith('projects/')) {
      return 'projects'
    }
    if (route === 'about') {
      return 'about'
    }
    return 'home'
  }

  const getProjectTargetFromPath = (pathname: string): string | undefined => {
    const match = pathname.replace(/\/+$/, '').match(/^\/projects\/([^/]+)$/i)
    return match ? decodeURIComponent(match[1]) : undefined
  }

  const getGalleryAlbumFromPath = (pathname: string): string | undefined => {
    const match = pathname.replace(/\/+$/, '').match(/^\/gallery\/([^/]+)$/i)
    return match ? decodeURIComponent(match[1]) : undefined
  }

  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'projects' | 'services' | 'gallery' | 'blogs'>(() => {
    return getPageFromLocation(window.location.pathname, window.location.hash)
  })
  const [initialScrollTarget, setInitialScrollTarget] = useState<string | undefined>(() => {
    return getProjectTargetFromPath(window.location.pathname)
  })
  const [initialGalleryAlbum, setInitialGalleryAlbum] = useState<string | undefined>(() => {
    return getGalleryAlbumFromPath(window.location.pathname)
  })
  const [manifestProjects, setManifestProjects] = useState<ProjectItem[]>(LOCAL_DEFAULT_PROJECTS)
  const [failedIcons, setFailedIcons] = useState<Record<string, boolean>>({})
  const [pageTransitionStage, setPageTransitionStage] = useState<'idle' | 'exiting' | 'entering'>('idle')
  const [initialHomeEntrance, setInitialHomeEntrance] = useState(true)
  const transitionTimerRef = useRef<number | null>(null)
  const pendingContactScrollRef = useRef(false)
  const navigationSeqRef = useRef(0)

  useEffect(() => {
    fetch('/manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error('Manifest not found')
        return res.json()
      })
      .then((data) => {
        if (data.projects && data.projects.length > 0) {
          setManifestProjects(data.projects)
        }
      })
      .catch((err) => {
        console.warn('Could not fetch manifest.json, using local fallback:', err)
      })
  }, [])

  const displayProjects = manifestProjects.map((p) => {
    const config = DEFAULT_MOCKUPS[p.id] || {
      logo: p.title.charAt(0).toLowerCase(),
      mockups: {
        back: { title: 'Details', items: [] },
        middle: { gradient: 'linear-gradient(135deg, #262626, #0a0a0a)' },
        front: { title: p.title, walls: [] }
      }
    }
    return {
      ...p,
      logo: config.logo,
      mockups: config.mockups
    }
  })

  const clearTransitionTimer = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }
  }

  const triggerEnterTransition = () => {
    clearTransitionTimer()
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPageTransitionStage('idle')
      return
    }
    setPageTransitionStage('entering')
    transitionTimerRef.current = window.setTimeout(() => {
      setPageTransitionStage('idle')
      transitionTimerRef.current = null
    }, 340)
  }

  useEffect(() => {
    return () => clearTransitionTimer()
  }, [])

  useEffect(() => {
    if (!showContent) return
    const warmRoutes = () => {
      Object.values(routeLoaders).forEach((load) => {
        void load().catch(() => {})
      })
    }
    if (typeof window.requestIdleCallback === 'function' && typeof window.cancelIdleCallback === 'function') {
      const id = window.requestIdleCallback(warmRoutes, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = window.setTimeout(warmRoutes, 400)
    return () => window.clearTimeout(timer)
  }, [showContent])

  useEffect(() => {
    if (currentPage === 'home' && pendingContactScrollRef.current) {
      pendingContactScrollRef.current = false
      const scrollTimer = window.setTimeout(() => {
        const contactEl = document.getElementById('contact')
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 60)
      return () => window.clearTimeout(scrollTimer)
    }
  }, [currentPage])

  const handlePageChange = (page: 'home' | 'about' | 'projects' | 'services' | 'gallery' | 'blogs', nextPath?: string) => {
    const targetPath = nextPath ?? (page === 'home' ? '/' : `/${page}`)
    const isSameRoute = page === currentPage && window.location.pathname === targetPath && !window.location.hash

    if (isSameRoute && !pendingContactScrollRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    clearTransitionTimer()
    const seq = ++navigationSeqRef.current
    const preloadPromise = page === 'home' ? Promise.resolve() : routeLoaders[page]().catch(() => {})

    const applyPageSwap = () => {
      if (seq !== navigationSeqRef.current) return
      if (page !== 'home') {
        setInitialHomeEntrance(false)
      }
      if (!nextPath) {
        setInitialScrollTarget(undefined)
        setInitialGalleryAlbum(undefined)
      }
      setCurrentPage(page)
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState(null, '', targetPath)
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      triggerEnterTransition()
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      void preloadPromise.then(applyPageSwap)
      return
    }

    setPageTransitionStage('exiting')
    const exitDelay = new Promise<void>((resolve) => {
      transitionTimerRef.current = window.setTimeout(() => {
        transitionTimerRef.current = null
        resolve()
      }, 140)
    })
    void Promise.all([exitDelay, preloadPromise]).then(applyPageSwap)
  }

  const handleGoToContact = () => {
    if (currentPage === 'home') {
      const contactEl = document.getElementById('contact')
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    pendingContactScrollRef.current = true
    handlePageChange('home')
  }

  const handleViewProjectDetails = (targetId: string) => {
    setInitialScrollTarget(targetId)
    handlePageChange('projects', `/projects/${encodeURIComponent(targetId)}`)
  }

  useEffect(() => {
    const handlePopState = () => {
      navigationSeqRef.current++
      setInitialHomeEntrance(false)
      setCurrentPage(getPageFromLocation(window.location.pathname, window.location.hash))
      setInitialScrollTarget(getProjectTargetFromPath(window.location.pathname))
      setInitialGalleryAlbum(getGalleryAlbumFromPath(window.location.pathname))
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      triggerEnterTransition()
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mql) return

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    document.documentElement.style.colorScheme = resolvedTheme
    try {
      localStorage.removeItem('theme')
      if (themeMode === 'auto') {
        localStorage.removeItem('theme-mode')
      } else {
        localStorage.setItem('theme-mode', themeMode)
      }
    } catch {
      // Ignore storage access errors
    }
  }, [resolvedTheme, themeMode])

  const toggleTheme = () => {
    const getNextMode = (prev: 'auto' | 'light' | 'dark'): 'auto' | 'light' | 'dark' => {
      if (prev === 'auto') {
        return systemTheme === 'dark' ? 'light' : 'dark'
      }
      if (prev === 'light') {
        return systemTheme === 'light' ? 'auto' : 'dark'
      }
      return systemTheme === 'dark' ? 'auto' : 'light'
    }

    if (!document.startViewTransition) {
      setThemeMode(getNextMode)
      return
    }
    document.startViewTransition(() => {
      setThemeMode(getNextMode)
    })
  }

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Manila'
      }
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    const updateMusicTrack = async () => {
      try {
        const track = await getLatestMusicTrack(controller.signal)
        if (!isMounted) return

        setMusicTrack(track)
        setMusicError(false)
      } catch {
        if (!isMounted || controller.signal.aborted) return
        setMusicError(true)
      }
    }

    updateMusicTrack()
    const interval = setInterval(updateMusicTrack, 60_000)

    return () => {
      isMounted = false
      controller.abort()
      clearInterval(interval)
    }
  }, [])

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev + 1) % displayProjects.length)
  }

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length)
  }

  const project = displayProjects[activeProjectIndex] || displayProjects[0] || LOCAL_DEFAULT_PROJECTS[0]

  // Cycle through the greeting words
  useEffect(() => {
    if (wordIndex < WORDS.length - 1) {
      const timer = setTimeout(() => {
        setWordIndex((prev) => prev + 1)
      }, 180) // 180ms per word
      return () => clearTimeout(timer)
    } else {
      // Pause on the final word, then trigger exit transition
      const timer = setTimeout(() => {
        setExiting(true)
        const exitTimer = setTimeout(() => {
          setLoading(false)
          setShowContent(true)
        }, 850) // Transition duration matching CSS
        return () => clearTimeout(exitTimer)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [wordIndex])

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.classList.add('loading')
    } else {
      document.body.classList.remove('loading')
    }
    return () => {
      document.body.classList.remove('loading')
    }
  }, [loading])

  // Set up Intersection Observer for scroll animations
  useEffect(() => {
    if (!showContent) return

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -10% 0px', // trigger slightly before entering viewport fully
      threshold: 0.1 // trigger when 10% of element is visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const targets = document.querySelectorAll('.reveal-on-scroll')
    targets.forEach((target) => observer.observe(target))

    return () => {
      targets.forEach((target) => observer.unobserve(target))
    }
  }, [showContent, currentPage])

  return (
    <ReactLenis root>
      {/* Global Tactile Paper Texture Overlay */}
      <div className="global-paper-overlay">
        <PaperTexture
          width="100%"
          height="100%"
          colorBack="#ffffff"
          colorFront="#d4d4d4"
          contrast={0.25}
          roughness={0.35}
          fiber={0.25}
          fiberSize={0.15}
          crumples={0.2}
          crumpleSize={0.3}
          folds={0.4}
          foldCount={4}
          drops={0.1}
          fade={0}
          seed={12.5}
          scale={0.8}
          fit="cover"
        />
      </div>
      {/* Hello Languages Loader */}
      {loading && (
        <div className={`preloader ${exiting ? 'exiting' : ''}`}>
          <div className="preloader-content">
            <span className="preloader-dot"></span>
            <span key={wordIndex} className="preloader-text">
              {WORDS[wordIndex]}
            </span>
          </div>
        </div>
      )}

      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Technical Header */}
        <header className="tech-header">
          <div className="tech-header-col col-1">
            <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange('home'); }} className="tech-logo" style={{ cursor: 'pointer' }}>isaiahscape</a>
          </div>
          <div className="tech-header-col col-3">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={`Theme mode: ${themeMode} (active: ${resolvedTheme}). Click to switch.`}
              title={
                themeMode === 'auto'
                  ? `Auto (${resolvedTheme} from system) — click to override`
                  : `Theme: ${themeMode} — click to cycle`
              }
            >
              {themeMode === 'auto' ? (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              ) : themeMode === 'dark' ? (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
              <span className="theme-toggle-text">
                {themeMode.toUpperCase()}
              </span>
            </button>
          </div>
        </header>

        <div key={currentPage} className={`page-transition-stage page-transition--${pageTransitionStage}`}>
          {currentPage === 'home' ? (
            <>
              {/* Main Home Page Section */}
              <main className="hero-section" id="home">
                <Hero
                showContent={showContent}
                animateEntrance={initialHomeEntrance}
                onOpenGallery={() => handlePageChange('gallery')}
              />
              </main>

              {/* About Info Grid Section */}
            <section className="about-section" id="about">
              <div className="about-header reveal-on-scroll delay-1">
                <h2 className="about-title-large">so, who am i?</h2>
              </div>

              <div className="info-grid">
                {/* Box 1: Location & Bio */}
                <div className="grid-box box-1 reveal-on-scroll reveal-left delay-2">
                  <h4 className="box-title">I am from Davao, Philippines</h4>
                  <p className="box-subtitle">
                  <span className="cursive-text">{CURRENT_AGE} years old</span>
                  </p>
                  <div className="badge-row">
                    <span className="badge">photographer</span>
                    <span className="badge">graphic designer</span>
                    <span className="badge">web dev</span>
                    <span className="badge">it instructor</span>
                  </div>
                  <p className="and-more-text">and much more...</p>
                </div>

                {/* Box 2: Experience Timeline */}
                <div className="grid-box box-2 reveal-on-scroll delay-3">
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-left">
                        <div className="timeline-badge badge-coral">
                          <img src="/edu.svg" alt="Experience" className="edu-icon" />
                        </div>
                        <div className="timeline-connector">
                          <span className="diamond top-diamond"></span>
                          <span className="line"></span>
                          <span className="diamond bottom-diamond"></span>
                        </div>
                      </div>
                      <div className="timeline-content">
                        <h5>The Scape Network</h5>
                        <p className="degree">Founder & Editor | 2023 - Present</p>
                      </div>
                    </div>

                    <div className="timeline-item">
                      <div className="timeline-left">
                        <div className="timeline-badge badge-gray">
                          <img src="/edu.svg" alt="Experience" className="edu-icon" />
                        </div>
                        <div className="timeline-connector last-connector">
                          <span className="diamond top-diamond"></span>
                          <span className="line"></span>
                        </div>
                      </div>
                      <div className="timeline-content">
                        <h5>Braintrust Computer Systems</h5>
                        <p className="degree">IT Instructor | 2023 - 2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 3: Mesh Gradient Circle */}
                <div className="box-3-wrapper reveal-on-scroll reveal-scale delay-4">
                  <div className="gradient-circle"></div>
                </div>

                {/* Box 4: Creative Collective & Projects */}
                <div className="grid-box box-4 reveal-on-scroll delay-2">
                  <h4 className="box-title">I shoot photos, design visuals and create random stuff.</h4>
                  <p className="box-subtitle-project">
                    founder of <a href="https://telegram.me/thescapenetwork" target="_blank" rel="noopener noreferrer" className="highlight-link">The Scape Network</a> and maker of Snapseed for Web & Diffuse for Windows
                  </p>

                  <div className="project-cards-row">
                    <div className="project-card">
                      <h6>The Scape Network</h6>
                      <div className="project-links">
                        <a href="https://telegram.me/thescapenetwork" target="_blank" rel="noopener noreferrer">Channel ↗</a>
                        <a href="https://t.me/isaiahscape" target="_blank" rel="noopener noreferrer">Contact ↗</a>
                      </div>
                    </div>

                    <div className="project-card">
                      <h6>SnapWeb Editor</h6>
                      <div className="project-links">
                        <a href="https://snapweb.isaiahthings.me/" target="_blank" rel="noopener noreferrer">Live App ↗</a>
                        <a href="https://github.com/isaiahscape/snapweb-remixed" target="_blank" rel="noopener noreferrer">Repo ↗</a>
                      </div>
                    </div>

                    <div className="project-card">
                      <h6>FOSS Releases</h6>
                      <div className="project-links">
                        <a href="https://isaiahthings.me/projects" target="_blank" rel="noopener noreferrer">Portal ↗</a>
                        <a href="https://github.com/isaiahscape/windiffuse" target="_blank" rel="noopener noreferrer">Diffuse for Windows ↗</a>
                      </div>
                    </div>

                    <div className="project-card">
                      <h6>Playground</h6>
                      <div className="project-links">
                        <a href="https://isaiahplayground.vercel.app" target="_blank" rel="noopener noreferrer">Visit ↗</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 5: Last.fm listening activity */}
                <div className="grid-box box-5 reveal-on-scroll reveal-right delay-3">
                  <div className="music-content">
                    <div className="music-text-top">
                      <p className="music-label">
                        {musicError ? 'last played' : musicTrack.isNowPlaying ? 'now playing' : 'last played'}
                      </p>
                      <h4 className="music-title">{musicTrack.title}</h4>
                      <p className="music-artist">{musicTrack.artist}</p>
                    </div>
                    <a href={musicTrack.url} target="_blank" rel="noopener noreferrer" className="music-link">lastfm ↗</a>
                  </div>
                  <div className="vinyl-container">
                    <img
                      src={musicTrack.imageUrl}
                      alt={`${musicTrack.title} cover`}
                      className="vinyl-disc-img"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_MUSIC_TRACK.imageUrl
                      }}
                    />
                    <div className="vinyl-gloss"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Works/Projects Section */}
            <section className="works-section" id="projects">
              <h2 className="works-section-title reveal-on-scroll reveal-left delay-1">stuff i have worked on</h2>

              <div className="works-container reveal-on-scroll delay-2">
                {/* Left Panel: Project Info */}
                <div className="project-info-panel">
                  <div className="project-top-row">
                    <span className="project-index">
                      {String(activeProjectIndex + 1).padStart(2, '0')} of {String(displayProjects.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="project-title-row">
                    <h3 className="project-name" onClick={() => handleViewProjectDetails(project.id)} style={{ cursor: 'pointer' }}>{project.title}</h3>
                    <span className="project-logo-badge" onClick={() => handleViewProjectDetails(project.id)} style={{ cursor: 'pointer' }}>{project.logo}</span>
                  </div>

                  <p className="project-desc">{project.description}</p>

                  <div className="project-tech-section">
                    <p className="tech-title">Made with:</p>
                    <div className="tech-icons-row">
                      {project.tech
                        .filter((techKey: string) => !failedIcons[techKey])
                        .map((techKey: string) => (
                          <div className="tech-icon-wrapper" key={techKey} title={techKey}>
                            <img
                              src={getTechIconUrl(techKey)}
                              alt={techKey}
                              onError={() => setFailedIcons(prev => ({ ...prev, [techKey]: true }))}
                              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="project-actions-row">
                    <div className="action-buttons">
                      {project.visitUrl || project.githubUrl ? (
                        <>
                          {project.visitUrl && (
                            <a href={project.visitUrl} target="_blank" rel="noopener noreferrer" className="btn-visit">
                              VISIT SITE <span className="arrow">↗</span>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-github">
                              GITHUB REPO <span className="arrow">↗</span>
                            </a>
                          )}
                        </>
                      ) : (
                        <span className={`project-status-tag ${project.status ? project.status.toLowerCase() : ''}`}>
                          {project.status}
                        </span>
                      )}
                    </div>

                    <div className="pagination-buttons">
                      <button onClick={handlePrev} className="pag-btn" aria-label="Previous project">
                        &lt;
                      </button>
                      <button onClick={handleNext} className="pag-btn" aria-label="Next project">
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Project Preview Image */}
                <div className="project-preview-panel" onClick={() => handleViewProjectDetails(project.id)} style={{ cursor: 'pointer' }}>
                  {project.photos && project.photos[0] ? (
                    <img
                      src={project.photos[0]}
                      alt={`${project.title} Preview`}
                      className="project-preview-image"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                        boxShadow: '0 8px 30px rgba(8, 6, 13, 0.08)'
                      }}
                    />
                  ) : (
                    <div
                      className="project-preview-fallback"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: project.mockups?.middle?.gradient || 'var(--preview-bg)',
                        borderRadius: '6px'
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="works-divider"></div>

              <div className="design-redirect-banner reveal-on-scroll delay-1">
                <div className="design-redirect-info">
                  <span className="design-redirect-tag">// CREATIVE WORK</span>
                  <h3 className="design-redirect-title">Looking for my design & photography?</h3>
                  <p className="design-redirect-desc">
                    Explore my projects, brand marks, visual experiments, and street photography work under The Scape Network.
                  </p>
                </div>
                <div className="design-redirect-actions">
                  <a href="/gallery" onClick={(e) => { e.preventDefault(); handlePageChange('gallery'); }} className="design-redirect-btn btn-photography">
                    Gallery & Photography <span className="arrow">↗</span>
                  </a>
                  <a href="/projects/graphic-design" onClick={(e) => { e.preventDefault(); handleViewProjectDetails('graphic-design'); }} className="design-redirect-btn btn-design">
                    Graphic Design <span className="arrow">↗</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section" id="skills">
              <div className="skills-container">
                {/* Left Column: Narrative & CTA */}
                <div className="skills-left reveal-on-scroll reveal-left delay-1">
                  <span className="skills-sub">my expertise</span>
                  <h2 className="skills-main-title">
                    crafting visual <span className="cursive-title-text">stories</span> & functional code.
                  </h2>
                  <p className="skills-philosophy">
                    Drawn to the intersection of creativity and technology — framing clean shots, building minimalist web apps, Android tools, and reliable network utilities.
                  </p>
                  <div className="skills-cta-box">
                    <span className="cta-spark">✦</span>
                    <p className="cta-text">Definitely not a fakerist: from photography and branding to hardware builds and full-stack tooling.</p>
                  </div>
                </div>

                {/* Right Column: Skills Categories */}
                <div className="skills-right">
                  <div className="skills-category reveal-on-scroll delay-2">
                    <h3 className="category-title">01 / Frontend & Web</h3>
                    <ul className="skills-list">
                      <li className="skill-item">
                        <span className="skill-num">01</span>
                        <span className="skill-name">React, Vite & Next.js</span>
                        <span className="skill-dot"></span>
                      </li>
                    </ul>
                  </div>

                  <div className="skills-category reveal-on-scroll delay-3">
                    <h3 className="category-title">02 / Design & Visuals</h3>
                    <ul className="skills-list">
                      <li className="skill-item">
                        <span className="skill-num">05</span>
                        <span className="skill-name">Photography & Light Tuning</span>
                        <span className="skill-dot"></span>
                      </li>
                      <li className="skill-item">
                        <span className="skill-num">06</span>
                        <span className="skill-name">Graphic UI/UX Designer</span>
                        <span className="skill-dot"></span>
                      </li>
                    </ul>
                  </div>

                  <div className="skills-category reveal-on-scroll delay-4">
                    <h3 className="category-title">03 / Mobile, Systems & IT</h3>
                    <ul className="skills-list">
                      <li className="skill-item">
                        <span className="skill-num">09</span>
                        <span className="skill-name">Kotlin & Jetpack Compose</span>
                        <span className="skill-dot"></span>
                      </li>
                      <li className="skill-item">
                        <span className="skill-num">11</span>
                        <span className="skill-name">Mikrotik & IPoE Networking</span>
                        <span className="skill-dot"></span>
                      </li>
                      <li className="skill-item">
                        <span className="skill-num">12</span>
                        <span className="skill-name">PC Builds and Diagnostics</span>
                        <span className="skill-dot"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* GitHub Contribution Graph Section */}
            <section className="github-section">
              <div className="github-container">
                <h2 className="github-title reveal-on-scroll reveal-left delay-1">github activity.</h2>
                <div className={`github-graph-wrapper reveal-on-scroll reveal-scale delay-2${gh.loading ? ' github-loading' : ''}`}>
                  {/* DESKTOP LAYOUT */}
                  <div className="github-desktop-layout">
                    <div className="github-graph-header">
                      <div className="github-graph-header-left">
                        <span className="github-graph-dot-indicator"></span>
                        <span className="github-graph-user">github / isaiahscape</span>
                      </div>
                      <div className="github-graph-header-right">
                        {gh.loading
                          ? <span className="github-graph-badge">loading…</span>
                          : gh.error
                            ? <span className="github-graph-badge">unavailable</span>
                            : <span className="github-graph-badge">active contributions</span>
                        }
                      </div>
                    </div>

                    <div className="github-graph-main">
                      <div className="github-graph-days">
                        <span className="day-empty"></span>
                        <span>Mon</span>
                        <span className="day-empty"></span>
                        <span>Wed</span>
                        <span className="day-empty"></span>
                        <span>Fri</span>
                        <span className="day-empty"></span>
                      </div>
                      <div className="github-graph-scroll-container">
                        <div className="github-graph-inner">
                          <div className="github-graph-months">
                            {(() => {
                              const months = []
                              const date = new Date()
                              for (let i = 11; i >= 0; i--) {
                                const d = new Date(date.getFullYear(), date.getMonth() - i, 1)
                                months.push(d.toLocaleString('en-US', { month: 'short' }))
                              }
                              return months.map(m => (
                                <span key={m}>{m}</span>
                              ))
                            })()}
                          </div>
                          <div className="github-graph">
                            {(() => {
                              // Build a 53-week grid (371 cells) from real data, padded if needed
                              const cells = gh.contributions.length >= 7
                                ? gh.contributions.slice(-7 * 53)
                                : gh.contributions
                              const padded = Array.from({ length: 7 * 53 }, (_, i) => {
                                const c = cells[cells.length - (7 * 53) + i]
                                return c ?? { level: 0, count: 0, date: '' }
                              })
                              return padded.map((day, i) => (
                                <span
                                  key={i}
                                  className={`contrib-square level-${day.level}`}
                                  title={day.date ? `${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}` : undefined}
                                ></span>
                              ))
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="github-graph-footer">
                      <span className="contrib-total">
                        {gh.loading ? '— contributions in the last 12 months' : gh.error ? 'could not load contributions' : `${gh.totalContributions.toLocaleString()} contributions in the last 12 months`}
                      </span>
                      <div className="github-graph-legend">
                        <span className="contrib-square level-0"></span>
                        <span className="contrib-square level-1"></span>
                        <span className="contrib-square level-2"></span>
                        <span className="contrib-square level-3"></span>
                        <span className="contrib-square level-4"></span>
                      </div>
                    </div>
                  </div>

                  {/* MOBILE LAYOUT */}
                  <div className="github-mobile-layout">
                    <div className="github-mobile-header">
                      <div className="github-profile-row">
                        <div className="github-avatar-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mobile-github-svg">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </div>
                        <div className="github-username-info">
                          <span className="github-mobile-user">isaiahscape</span>
                          <span className="github-mobile-status"><span className="status-dot"></span>{gh.loading ? 'Loading…' : gh.error ? 'Unavailable' : 'Active'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="github-stats-grid">
                      <div className="github-stat-card">
                        <span className="stat-label">Contributions</span>
                        <span className="stat-value">{gh.loading ? '—' : gh.error ? '—' : gh.totalContributions.toLocaleString()}</span>
                        <span className="stat-sub">past year</span>
                      </div>
                      <div className="github-stat-card">
                        <span className="stat-label">Current Streak</span>
                        <span className="stat-value">{gh.loading ? '—' : gh.error ? '—' : `${gh.streak} day${gh.streak !== 1 ? 's' : ''}`}</span>
                        <span className="stat-sub">active now</span>
                      </div>
                      <div className="github-stat-card">
                        <span className="stat-label">Daily Avg</span>
                        <span className="stat-value">{gh.loading ? '—' : gh.error ? '—' : gh.dailyAvg}</span>
                        <span className="stat-sub">commits/day</span>
                      </div>
                      <div className="github-stat-card">
                        <span className="stat-label">Public Repos</span>
                        <span className="stat-value">{gh.loading ? '—' : gh.error ? '—' : gh.publicRepos}</span>
                        <span className="stat-sub">on GitHub</span>
                      </div>
                    </div>

                    <div className="github-mobile-graph-section">
                      <div className="mobile-graph-title">Recent Activity (Last 12 Weeks)</div>
                      <div className="github-mobile-graph-container">
                        <div className="github-graph-days">
                          <span className="day-empty"></span>
                          <span>Mon</span>
                          <span className="day-empty"></span>
                          <span>Wed</span>
                          <span className="day-empty"></span>
                          <span>Fri</span>
                          <span className="day-empty"></span>
                        </div>
                        <div className="github-graph-scroll-container">
                          <div className="github-graph-inner">
                            <div className="github-graph-months">
                              {(() => {
                                const last12 = gh.contributions.slice(-84)
                                const monthSet = new Set<string>()
                                return last12.map(d => {
                                  const m = new Date(d.date).toLocaleString('en-US', { month: 'short' })
                                  if (!monthSet.has(m)) { monthSet.add(m); return m }
                                  return null
                                }).filter(Boolean).map(m => <span key={m as string}>{m}</span>)
                              })()}
                            </div>
                            <div className="github-graph mobile-only-grid">
                              {(() => {
                                const last84 = gh.contributions.slice(-84)
                                const padded = Array.from({ length: 84 }, (_, i) => {
                                  const c = last84[last84.length - 84 + i]
                                  return c ?? { level: 0, count: 0, date: '' }
                                })
                                return padded.map((day, i) => (
                                  <span
                                    key={i}
                                    className={`contrib-square level-${day.level}`}
                                    title={day.date ? `${day.date}: ${day.count}` : undefined}
                                  ></span>
                                ))
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section" id="contact">
              <div className="contact-container">
                <div className="contact-header reveal-on-scroll reveal-left delay-1">
                  <h2 className="contact-main-title">get in touch.</h2>
                </div>

                <div className="contact-grid">
                  {/* Box 1: Collaboration */}
                  <div className="contact-box contact-box-collab reveal-on-scroll reveal-left delay-2">
                    <h3 className="contact-box-title">let's build something.</h3>
                    <p className="contact-box-desc">
                      Have a project in mind, need photography & graphic design, or looking for PC builds, repairs, and tech help in Davao? Let's collaborate.
                    </p>
                    <div className="contact-info-tags">
                      <span className="info-tag">Freelance</span>
                      <span className="info-tag">Design & Photo</span>
                      <span className="info-tag">Tech & PC Services</span>
                    </div>
                  </div>

                  {/* Box 2: Status & Location */}
                  <div className="contact-box contact-box-status reveal-on-scroll delay-3">
                    <span className="status-label">CURRENT STATUS</span>
                    <div className="status-indicator-row">
                      <span className="pulse-dot"></span>
                      <span className="status-text">Available for new opportunities</span>
                    </div>
                    <div className="location-info">
                      <span className="location-label">BASED IN</span>
                      <p className="location-text">Davao, Philippines 🇵🇭</p>
                    </div>
                  </div>

                  {/* Box 3: Resend Contact Form */}
                  <ContactFormCard className="reveal-on-scroll delay-2" />

                  {/* Box 4: Social Channels */}
                  <DigitalSpacesCard className="reveal-on-scroll reveal-right delay-3" />
                </div>
              </div>
            </section>

            {/* Core Technologies Section */}
            <CoreTechnologiesSection />
          </>
          ) : (
            <Suspense fallback={<div className="page-view-container page-loading-fallback" aria-hidden="true" />}>
              {currentPage === 'about' && <AboutPage username={LASTFM_USER} apiKey={LASTFM_API_KEY} />}
              {currentPage === 'projects' && <ProjectsPage initialScrollTarget={initialScrollTarget} clearScrollTarget={() => setInitialScrollTarget(undefined)} />}
              {currentPage === 'services' && <ServicesPage onContactClick={handleGoToContact} />}
              {currentPage === 'gallery' && <GalleryPage key={initialGalleryAlbum || 'all'} initialAlbum={initialGalleryAlbum} />}
              {currentPage === 'blogs' && <BlogsPage />}
            </Suspense>
          )}
        </div>

        {/* Blueprint Layout Footer Section */}
        <footer className="footer-section">
          <div className="footer-container">
            {/* Column 1: System Info */}
            <div className="footer-column-item">
              <span className="column-label">Made by</span>
              <div className="column-value">
                Leonardo (isaiahscape)<br />
                Scape Collective Series: it's coffee time.
              </div>
            </div>

            {/* Column 2: Tech Engine */}
            <div className="footer-column-item">
              <span className="column-label">Main Engine</span>
              <div className="column-value">
                Powered with Vite, React,<br />
                shenanigans, and realm.
              </div>
            </div>

            {/* Column 3: Site Navigation */}
            <div className="footer-column-item">
              <span className="column-label">NAVIGATION</span>
              <div className="footer-links-grid">
                <a href="/" onClick={(e) => { e.preventDefault(); handlePageChange('home'); }} className="footer-nav-link">Home</a>
                <a href="/about" onClick={(e) => { e.preventDefault(); handlePageChange('about'); }} className="footer-nav-link">About</a>
                <a href="/projects" onClick={(e) => { e.preventDefault(); handlePageChange('projects'); }} className="footer-nav-link">Projects</a>
                <a href="/services" onClick={(e) => { e.preventDefault(); handlePageChange('services'); }} className="footer-nav-link">Services</a>
                <a href="/gallery" onClick={(e) => { e.preventDefault(); handlePageChange('gallery'); }} className="footer-nav-link">Gallery</a>
                <a href="/blogs" onClick={(e) => { e.preventDefault(); handlePageChange('blogs'); }} className="footer-nav-link">Blogs</a>
              </div>
            </div>

            {/* Column 4: Access Status */}
            <div className="footer-column-item status-col">
              <span className="column-label">Salamat</span>
              <span className="status-badge">Cya!</span>
            </div>
          </div>

          <div className="footer-bottom-row">
            <div className="footer-status">
              <span className="status-dot"></span>
              <span>Available for freelance, design & tech services anytime if I'm active</span>
            </div>
            <div className="footer-time">
              <span>Davao, Philippines — {localTime}</span>
            </div>
          </div>
        </footer>

      </div> {/* Close page-wrapper */}

      {/* Floating Action Button Quick Navigation */}
      {!loading && <FAB currentPage={currentPage} onPageChange={handlePageChange} />}
    </ReactLenis>
  )
}

export default App
