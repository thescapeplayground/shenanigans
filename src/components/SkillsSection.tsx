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
            Why do we need philosophy? I'm so done bro.
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
                <span className="skill-name">React, Vite and Next.js</span>
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
  );
}
