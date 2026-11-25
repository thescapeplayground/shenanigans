import { useState, useEffect } from 'react'

export interface ContribDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface Commit {
  repo: string
  message: string
  date: string // ISO string
}

export interface GitHubData {
  loading: boolean
  error: boolean
  totalContributions: number
  streak: number
  dailyAvg: number
  publicRepos: number
  contributions: ContribDay[] // full year, ordered oldest → newest
  recentCommits: Commit[]
}

const GITHUB_USER = 'isaiahscape'

function calcStreak(days: ContribDay[]): number {
  // Walk backwards from today
  const sorted = [...days].sort((a, b) => (a.date > b.date ? -1 : 1))
  let streak = 0
  for (const day of sorted) {
    if (day.count > 0) streak++
    else break
  }
  return streak
}

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  return `${months} month${months !== 1 ? 's' : ''} ago`
}

const FALLBACK: GitHubData = {
  loading: false,
  error: true,
  totalContributions: 0,
  streak: 0,
  dailyAvg: 0,
  publicRepos: 0,
  contributions: [],
  recentCommits: [],
}

export function useGitHubData(): GitHubData {
  const [data, setData] = useState<GitHubData>({ ...FALLBACK, loading: true, error: false })

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    async function fetchAll() {
      try {
        const [contribRes, eventsRes, userRes] = await Promise.all([
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, { signal }),
          fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=50`, { signal }),
          fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal }),
        ])

        if (!contribRes.ok) throw new Error('contributions failed')

        const contribJson = await contribRes.json()
        const contributions: ContribDay[] = (contribJson.contributions ?? []).map((d: { date: string; count: number; level: number }) => ({
          date: d.date,
          count: d.count,
          level: Math.min(4, d.level) as 0 | 1 | 2 | 3 | 4,
        }))

        const totalContributions: number = contribJson.total?.lastYear ?? contributions.reduce((s: number, d: ContribDay) => s + d.count, 0)
        const streak = calcStreak(contributions)
        const dailyAvg = contributions.length > 0
          ? parseFloat((totalContributions / contributions.length).toFixed(1))
          : 0

        // Recent commits from push events
        const recentCommits: Commit[] = []
        if (eventsRes.ok) {
          const events: Array<{ type: string; repo: { name: string }; created_at: string; payload: { commits?: Array<{ message: string }> } }> = await eventsRes.json()
          for (const ev of events) {
            if (ev.type !== 'PushEvent') continue
            const msgs = ev.payload?.commits ?? []
            for (const c of msgs) {
              if (recentCommits.length >= 4) break
              recentCommits.push({
                repo: ev.repo.name.replace(`${GITHUB_USER}/`, ''),
                message: c.message.split('\n')[0].trim(),
                date: timeAgo(ev.created_at),
              })
            }
            if (recentCommits.length >= 4) break
          }
        }

        // Public repos count
        let publicRepos = 0
        if (userRes.ok) {
          const user = await userRes.json()
          publicRepos = user.public_repos ?? 0
        }

        setData({
          loading: false,
          error: false,
          totalContributions,
          streak,
          dailyAvg,
          publicRepos,
          contributions,
          recentCommits,
        })
      } catch (err) {
        if (signal.aborted) return
        console.warn('GitHub data fetch failed:', err)
        setData({ ...FALLBACK, loading: false, error: true })
      }
    }

    fetchAll()
    return () => controller.abort()
  }, [])

  return data
}
