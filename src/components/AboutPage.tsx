import { useState, useEffect, type ReactNode } from 'react';

function computeAge(birthDate: Date): number {
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const CURRENT_AGE = computeAge(new Date('2005-07-01T00:00:00+08:00'));

const infoWidgets = [
  { title: "Timezone", value: "+8:00", unit: "PHT / GMT+8" },
  { title: "Nationality", value: "PH", unit: "(Filipino)" },
  { title: "Age", value: String(CURRENT_AGE), unit: "Years Old" },
  { title: "Location", value: "DVO", unit: "Davao, PH" },
  { title: "Camera", value: "700D", unit: "Canon EOS" },
  { title: "Instruction", value: "IT", unit: "Braintrust" },
  { title: "Collective", value: "Scape", unit: "Network" },
  { title: "Status", value: "Open", unit: "For Work" }
];

const gamesList = [
  {
    title: "Valorant",
    genre: "Tactical FPS",
    description: "Tactical 5v5 character-based hero shooter with precise gunplay and adaptive agent abilities.",
    platforms: [
      { label: "PC", href: "https://playvalorant.com" }
    ]
  }
];

interface SetupCardItem {
  tag: string;
  title: string;
  specs: string[];
  className: string;
  icon: ReactNode;
}

const setupItems: SetupCardItem[] = [
  {
    tag: '// WORKSTATION PC',
    title: 'Ryzen 7 5700X3D & RTX 4060',
    specs: ['MSI MAG B550 Tomahawk', '32GB FURY DDR4', '1TB 990 EVO NVMe'],
    className: 'card-monitor span-7',
    icon: (
      <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="13" rx="1.5" />
        <path d="M12 16v5M8 21h8" />
      </svg>
    ),
  },
  {
    tag: '// INPUT',
    title: 'Aula F75 & HHKB Pro',
    specs: ['75% Wireless Gasket', 'HHKB Professional'],
    className: 'card-keyboard span-5',
    icon: (
      <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6" />
      </svg>
    ),
  },
  {
    tag: '// LAPTOP',
    title: 'Lenovo Ryzen 5 7530U',
    specs: ['16GB DDR4-3200', '512GB NVMe • 15.6" FHD'],
    className: 'card-tablet span-4',
    icon: (
      <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    tag: '// PHONE',
    title: 'Samsung Galaxy S24 5G',
    specs: ['Exynos 2400', '120Hz AMOLED 2X'],
    className: 'card-phone span-4',
    icon: (
      <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: '// MOUSE',
    title: 'ATKGEAR A9 Pro Plus 2.0',
    specs: ['PAW3395', '32,000 DPI • 1K NK'],
    className: 'card-mouse span-4',
    icon: (
      <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C9.24 2 7 4.24 7 7v10c0 2.76 2.24 5 5 5s5-2.24 5-5V7c0-2.76-2.24-5-5-5z" />
        <path d="M12 2v7M7 9h10" />
      </svg>
    ),
  },
  {
    tag: '// CAMERA',
    title: 'Canon EOS 700D',
    specs: ['EF 50mm f/1.8 STM', 'EF-S 18-55mm IS STM', 'Street & Portraits'],
    className: 'card-iem-1 span-6',
    icon: (
      <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    tag: '// AUDIO / IEM & DAC',
    title: 'Simgot EW300 & TRN Black Pearl',
    specs: ['1DD + Planar + PZT', 'TRN T2 16 Core', 'CS43131 DAC / CB5100 Amp'],
    className: 'card-iem-2 span-6',
    icon: (
      <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9" />
        <rect x="3" y="12" width="4" height="6" rx="1.5" />
        <rect x="17" y="12" width="4" height="6" rx="1.5" />
        <path d="M7 15h10M9 18h6" />
      </svg>
    ),
  },
];

interface LastFMTrack {
  name: string;
  artist: {
    "#text": string;
    name?: string;
  };
  album?: {
    "#text": string;
  };
  image?: string;
  url: string;
  "@attr"?: {
    nowplaying: "true" | "false";
  };
}

interface LastFMTopArtist {
  name: string;
  playcount: string;
  url: string;
}

interface LastFMStats {
  user: {
    playcount: string;
    name: string;
    url: string;
    realname?: string;
    registered?: {
      unixtime: string;
    };
    image?: { "#text": string; size: string }[];
  };
  recentTracks?: LastFMTrack[];
  topArtist?: LastFMTopArtist;
  topTracks?: LastFMTrack[];
  weeklyPlaycount?: string;
}

interface LastFMImageItem {
  '#text': string;
  size: string;
}

interface LastFMRawRecentTrack {
  name: string;
  artist: { '#text': string; name?: string };
  album?: { '#text': string };
  image?: LastFMImageItem[];
  url: string;
  '@attr'?: { nowplaying: 'true' | 'false' };
}

interface LastFMRawTopTrack {
  name: string;
  artist?: { name?: string };
  url: string;
  playcount?: string;
}

interface AboutPageProps {
  username: string;
  apiKey: string;
}

export function AboutPage({ username, apiKey }: AboutPageProps) {
  const [stats, setStats] = useState<LastFMStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const baseUrl = "https://ws.audioscrobbler.com/2.0";

        const [userInfo, recentTracks, topArtists, topTracks, weeklyChart] = await Promise.all([
          fetch(`${baseUrl}/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`).then((res) => res.json().catch(() => null)),
          fetch(`${baseUrl}/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=8`).then((res) => res.json().catch(() => null)),
          fetch(`${baseUrl}/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&limit=1&period=overall`).then((res) => res.json().catch(() => null)),
          fetch(`${baseUrl}/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&format=json&limit=1&period=overall`).then((res) => res.json().catch(() => null)),
          fetch(`${baseUrl}/?method=user.getweeklytrackchart&user=${username}&api_key=${apiKey}&format=json`).then((res) => res.json().catch(() => null)),
        ]);

        const recentTracksList = (recentTracks?.recenttracks?.track as LastFMRawRecentTrack[] | undefined)?.map((track) => {
          const imgUrl = track.image?.find((i) => i.size === 'extralarge' || i.size === 'large')?.['#text'] || track.image?.[0]?.['#text'] || '';
          return {
            name: track.name,
            artist: track.artist,
            album: track.album,
            image: imgUrl,
            url: track.url,
            "@attr": track["@attr"],
          };
        }) || [];

        const topArtist = topArtists?.topartists?.artist?.[0];

        const topTracksList = (topTracks?.toptracks?.track as LastFMRawTopTrack[] | undefined)?.map((track) => ({
          name: track.name,
          artist: { "#text": track.artist?.name || "" },
          url: track.url,
          playcount: track.playcount,
        })) || [];

        const weeklyPlaycount = weeklyChart?.weeklytrackchart?.["@attr"]?.total || "0";

        if (userInfo && userInfo.user) {
          setStats({
            user: userInfo.user,
            recentTracks: recentTracksList,
            topArtist: topArtist ? {
              name: topArtist.name,
              playcount: topArtist.playcount,
              url: topArtist.url,
            } : undefined,
            topTracks: topTracksList,
            weeklyPlaycount,
          });
        }
      } catch (error) {
        console.error("Error fetching LastFM stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [username, apiKey]);

  return (
    <div className="page-view-container fade-in">
      <header className="page-header">
        <span className="page-label">leonardo // isaiahscape</span>
        <h1 className="page-title">about me.</h1>
      </header>

      {/* Biography Section */}
      <h2 className="category-title" style={{ marginTop: '24px' }}>BIOGRAPHY</h2>
      <div className="about-md-body" style={{ padding: '0 0 24px 0', marginBottom: '24px' }}>
        <p className="body-para">
          I'm Isiaih Rafael Pavia (also known as Leonardo / @isaiahscape), a {CURRENT_AGE}-year-old
          photographer, graphic designer, and developer based in Davao, Philippines. I've always
          been drawn to the intersection of creativity and technology — whether it's framing the
          perfect shot, crafting visual identities, or building tools that make life a little easier.
        </p>
        <p className="body-para" style={{ marginTop: '14px' }}>
          I started my journey in the creative space through social media organizing and content
          editing under The Scape Network, which naturally led to web development, Android apps,
          and automation. I also worked as a part-time IT instructor at Braintrust Computer Systems,
          technical support at Alorica Philippines, and with the HCDC College of Technology Students
          Organization Productions Committee. I believe in keeping things real, minimal, and functional.
          No fluff, just honest work.
        </p>
      </div>

      {/* Quick Facts / Widgets Section */}
      <h2 className="category-title" style={{ marginTop: '24px' }}>QUICK FACTS</h2>
      <div className="about-md-body" style={{ padding: '16px 0 24px 0', marginBottom: '24px' }}>
        <div className="about-widget-grid">
          {infoWidgets.map((item, i) => (
            <div key={i} className="about-widget-card">
              <div className="about-widget-header">
                {item.title}
              </div>
              <div className="about-widget-body">
                <span className="about-widget-val">{item.value}</span>
                <span className="about-widget-unit">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Setup Section */}
      <h2 className="category-title" id="setup" style={{ marginTop: '24px' }}>MY SETUP</h2>
      <div className="about-md-body" style={{ padding: '16px 0 24px 0', marginBottom: '24px' }}>
        <p className="body-para" style={{ marginBottom: '20px' }}>
          A curated record of custom hardware configurations, camera gear, audio kits, and daily drivers.
        </p>
        <div className="setup-grid">
          {setupItems.map((item) => (
            <div key={item.tag} className={`setup-card ${item.className}`}>
              <div className="setup-card-header">
                <span className="setup-tag">{item.tag}</span>
                <div className="setup-icon-wrapper">{item.icon}</div>
              </div>
              <div className="setup-card-body">
                <h3 className="setup-item-title">{item.title}</h3>
                <div className="setup-specs">
                  {item.specs.map((spec) => (
                    <span key={spec} className="spec-tag">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last.fm Music Section */}
      <h2 className="category-title" style={{ marginTop: '24px' }}>LAST.FM MUSIC & SCROBBLES</h2>
      <div className="about-md-body" style={{ padding: '0 0 24px 0', marginBottom: '24px' }}>
        {loading ? (
          <p className="body-para" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading music stats...</p>
        ) : stats ? (
          <div>
            {/* Profile Info Row */}
            <div className="lastfm-profile-card">
              <img
                src={stats.user.image?.[2]?.['#text'] || '/assets/hero.jpg'}
                alt={stats.user.name}
                className="lastfm-avatar"
                onError={(e) => { e.currentTarget.src = '/assets/hero.jpg' }}
              />
              <div className="lastfm-profile-details">
                <span className="lastfm-username">@{stats.user.name}</span>
                <span className="lastfm-realname">{stats.user.realname || 'Leonardo'}</span>
                {stats.user.registered && (
                  <span className="lastfm-registered">
                    Scrobbled since {new Date(Number(stats.user.registered.unixtime) * 1000).toLocaleDateString()}
                  </span>
                )}
              </div>
              <a
                href={stats.user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rom-download-action-btn secondary-btn"
                style={{ width: 'auto', padding: '8px 16px', fontSize: '12px' }}
              >
                View Profile
              </a>
            </div>

            <p className="body-para" style={{ fontSize: '14px', marginBottom: '20px' }}>
              When I'm not behind a camera or a keyboard, I'm usually exploring new music and tinkering with audio gear. My rotation leans toward OPM, indie, dreampop, and late-night tracks — artists like wave to earth, Mazzy Star, Arthur Nery, and Unique Salonga.
            </p>

            {/* Stats & Weekly Chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: '32px' }}>
              <div className="lastfm-stat-box">
                <span className="lastfm-stat-lbl">Total Scrobbles</span>
                <span className="lastfm-stat-val">{Number(stats.user.playcount).toLocaleString()}</span>
              </div>
              {stats.topArtist && (
                <div className="lastfm-stat-box">
                  <span className="lastfm-stat-lbl">Top Artist</span>
                  <span className="lastfm-stat-val" style={{ fontSize: '16px', fontWeight: '600' }}>{stats.topArtist.name}</span>
                  <span className="lastfm-stat-lbl" style={{ fontSize: '9px', marginTop: '2px' }}>
                    {Number(stats.topArtist.playcount).toLocaleString()} plays
                  </span>
                </div>
              )}
              {stats.topTracks && stats.topTracks[0] && (
                <div className="lastfm-stat-box">
                  <span className="lastfm-stat-lbl">Top Track</span>
                  <span className="lastfm-stat-val" style={{ fontSize: '16px', fontWeight: '600' }}>{stats.topTracks[0].name}</span>
                  <span className="lastfm-stat-lbl" style={{ fontSize: '9px', marginTop: '2px' }}>
                    by {stats.topTracks[0].artist['#text']}
                  </span>
                </div>
              )}
            </div>

            {/* 2-Column Recent Tracks List */}
            <h3 className="category-title" style={{ fontSize: '13px', marginBottom: '16px', fontFamily: 'var(--mono)' }}>
              Recent Tracks
            </h3>
            <div className="lastfm-track-grid">
              {stats.recentTracks?.map((track, idx) => (
                <div key={idx} className="lastfm-track-card">
                  <div className="lastfm-track-main">
                    <img
                      src={track.image || '/assets/hero.jpg'}
                      alt={track.name}
                      className="lastfm-track-art"
                      onError={(e) => { e.currentTarget.src = '/assets/hero.jpg' }}
                    />
                    <div className="lastfm-track-info">
                      <span className="lastfm-track-title truncate" title={track.name}>
                        {track.name}
                      </span>
                      <span className="lastfm-track-artist truncate" title={track.artist['#text']}>
                        {track.artist['#text']}
                      </span>
                      <span className="lastfm-track-album truncate" title={track.album?.['#text']}>
                        {track.album?.['#text'] || 'Single'}
                      </span>
                    </div>
                  </div>
                  <div className="lastfm-track-actions">
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="game-link-badge text-center"
                      style={{ padding: '6px 8px' }}
                    >
                      LastFM
                    </a>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${track.name} - ${track.artist['#text']}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="game-link-badge text-center"
                      style={{ padding: '6px 8px' }}
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="body-para" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Could not load scrobbler stats.</p>
        )}
      </div>

      {/* Games Section */}
      <h2 className="category-title" style={{ marginTop: '24px' }}>GAMES & MEDIA</h2>
      <div className="about-md-body" style={{ padding: '16px 0 0 0' }}>
        <div className="about-games-grid">
          {gamesList.map((game, i) => (
            <div key={i} className="game-card-modern game-theme-ww">
              <div className="game-card-badge-modern">{game.genre}</div>
              <h3 className="game-card-title-modern">{game.title}</h3>
              <p className="game-card-desc-modern">{game.description}</p>

              <div className="game-spec-links" style={{ marginTop: 'auto' }}>
                {game.platforms.map((plat, idx) => (
                  <a
                    key={idx}
                    href={plat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-link-badge-modern"
                  >
                    {plat.label}
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
