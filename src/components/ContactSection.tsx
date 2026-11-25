export function ContactSection() {
  return (
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

          {/* Box 3: Direct Email */}
          <div className="contact-box contact-box-email reveal-on-scroll delay-2">
            <h4 className="email-label">DIRECT EMAIL</h4>
            <a href="mailto:isaiahscape@duck.com" className="email-address-link">
              isaiahscape@duck.com
            </a>
            <div className="email-actions">
              <a href="mailto:isaiahscape@duck.com" className="email-btn-send">
                SEND MESSAGE <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Box 4: Social Channels */}
          <div className="contact-box contact-box-socials reveal-on-scroll reveal-right delay-3">
            <h4 className="socials-label">DIGITAL SPACES</h4>
            <div className="socials-grid-links">
              <a href="https://github.com/isaiahscape" target="_blank" rel="noopener noreferrer" className="social-grid-item">
                <span className="social-name">GitHub</span>
                <span className="social-arrow">↗</span>
              </a>
              <a href="https://instagram.com/isaiahscape" target="_blank" rel="noopener noreferrer" className="social-grid-item">
                <span className="social-name">Instagram</span>
                <span className="social-arrow">↗</span>
              </a>
              <a href="https://t.me/isaiahscape" target="_blank" rel="noopener noreferrer" className="social-grid-item">
                <span className="social-name">Telegram</span>
                <span className="social-arrow">↗</span>
              </a>
              <a href="https://linkedin.com/in/isaiahscape" target="_blank" rel="noopener noreferrer" className="social-grid-item">
                <span className="social-name">LinkedIn</span>
                <span className="social-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
