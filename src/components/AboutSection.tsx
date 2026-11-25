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

interface AboutSectionProps {
  musicTrack: {
    title: string;
    artist: string;
    url: string;
    imageUrl: string;
    isNowPlaying: boolean;
  };
  musicError: boolean;
  FALLBACK_MUSIC_TRACK: {
    title: string;
    artist: string;
    url: string;
    imageUrl: string;
    isNowPlaying: boolean;
  };
}

export function AboutSection({ musicTrack, musicError, FALLBACK_MUSIC_TRACK }: AboutSectionProps) {
  return (
    <section className="about-section" id="about">
      <div className="about-header reveal-on-scroll delay-1">
        <h2 className="about-title-small">now you might wonder</h2>
        <h3 className="about-title-large">who is this guy even...</h3>
      </div>

      <div className="info-grid">
        {/* Box 1: Location & Bio */}
        <div className="grid-box box-1 reveal-on-scroll reveal-left delay-2">
          <h4 className="box-title">I am from Davao, Philippines</h4>
          <p className="box-subtitle">
            <span className="cursive-text">&</span> i am a <span className="cursive-text">{CURRENT_AGE} y.o</span>
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
          <h4 className="box-title">I shoot photos, design visuals & build practical tools</h4>
          <p className="box-subtitle-project">
            founder of <a href="https://telegram.me/thescapenetwork" target="_blank" rel="noopener noreferrer" className="highlight-link">The Scape Network</a> and maker of SnapWeb & Bedrock
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
                <a href="https://foss.isaiahthings.me" target="_blank" rel="noopener noreferrer">Portal ↗</a>
                <a href="https://github.com/isaiahscape/bedrock" target="_blank" rel="noopener noreferrer">Bedrock ↗</a>
              </div>
            </div>

            <div className="project-card">
              <h6>Playground</h6>
              <div className="project-links">
                <a href="https://play.isaiahthings.me" target="_blank" rel="noopener noreferrer">Visit ↗</a>
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
  );
}
