export function SkillsSection() {
  return (
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
            <p className="cta-text">No fluff, just honest work — from photography and branding to hardware builds and full-stack tooling.</p>
          </div>
        </div>

        {/* Right Column: Skills Categories */}
        <div className="skills-right">
          <div className="skills-category reveal-on-scroll delay-2">
            <h3 className="category-title">01 / Frontend & Web</h3>
            <ul className="skills-list">
              <li className="skill-item">
                <span className="skill-num">01</span>
                <span className="skill-name">React & Next.js</span>
                <span className="skill-dot"></span>
              </li>
              <li className="skill-item">
                <span className="skill-num">02</span>
                <span className="skill-name">TypeScript / JavaScript</span>
                <span className="skill-dot"></span>
              </li>
              <li className="skill-item">
                <span className="skill-num">03</span>
                <span className="skill-name">Tailwind CSS & Framer Motion</span>
                <span className="skill-dot"></span>
              </li>
              <li className="skill-item">
                <span className="skill-num">04</span>
                <span className="skill-name">Node.js (Express) & Vite</span>
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
                <span className="skill-name">Graphic Design & Identities</span>
                <span className="skill-dot"></span>
              </li>
              <li className="skill-item">
                <span className="skill-num">07</span>
                <span className="skill-name">Figma & UI Systems</span>
                <span className="skill-dot"></span>
              </li>
              <li className="skill-item">
                <span className="skill-num">08</span>
                <span className="skill-name">HTML5 Canvas & WebGL</span>
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
                <span className="skill-num">10</span>
                <span className="skill-name">Android & Material Design 3</span>
                <span className="skill-dot"></span>
              </li>
              <li className="skill-item">
                <span className="skill-num">11</span>
                <span className="skill-name">Mikrotik & IPoE Networking</span>
                <span className="skill-dot"></span>
              </li>
              <li className="skill-item">
                <span className="skill-num">12</span>
                <span className="skill-name">PC Builds, Linux & Diagnostics</span>
                <span className="skill-dot"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
