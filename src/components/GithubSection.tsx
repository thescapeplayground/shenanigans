interface GithubSectionProps {
  gh: {
    loading: boolean;
    error: boolean;
    contributions: Array<{ level: number; count: number; date: string }>;
    totalContributions: number;
    streak: number;
    dailyAvg: number;
    publicRepos: number;
  };
}

export function GithubSection({ gh }: GithubSectionProps) {
  return (
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
                        }).filter((m): m is string => m !== null).map(m => <span key={m}>{m}</span>)
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
  );
}
