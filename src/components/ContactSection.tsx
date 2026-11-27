import { useState, type FormEvent } from 'react';

const CONTACT_EMAIL = 'isaiahscape@duck.com';

const DIGITAL_SPACES = [
  { name: 'GitHub', href: 'https://github.com/isaiahscape' },
  { name: 'Instagram', href: 'https://instagram.com/isaiahscape' },
  { name: 'Telegram', href: 'https://t.me/isaiahscape' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/isaiahscape' },
  { name: 'YouTube', href: 'https://youtube.com/@isaiahscape' },
  { name: 'Twitch', href: 'https://twitch.tv/isaiahscape' },
  { name: 'TikTok', href: 'https://tiktok.com/@isaiahscape' },
  { name: 'X / Twitter', href: 'https://x.com/isaiahscape' },
  { name: 'Threads', href: 'https://threads.net/@isaiahscape' },
  { name: 'Facebook', href: 'https://facebook.com/isaiahscape' },
];

export function DigitalSpacesCard({ className = '' }: { className?: string }) {
  return (
    <div className={`contact-box contact-box-socials ${className}`.trim()}>
      <div className="contact-socials-header">
        <h4 className="socials-label">DIGITAL SPACES</h4>
        <span className="contact-handle-pill">@isaiahscape</span>
      </div>
      <div className="socials-grid-links">
        {DIGITAL_SPACES.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-grid-item"
          >
            <span className="social-name">{item.name}</span>
            <span className="social-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ContactFormCard({ className = '' }: { className?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSending(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errText =
          (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string' && data.error) ||
          'Failed to deliver your message. Please try again later.';
        throw new Error(errText);
      }

      setFormSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to deliver your message. Please try again later.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`contact-box contact-box-email ${className}`.trim()}>
      <div className="contact-email-header">
        <h4 className="email-label">DIRECT MESSAGE</h4>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="contact-copy-btn"
          title="Copy email address"
        >
          <span>{copied ? 'Copied!' : CONTACT_EMAIL}</span>
        </button>
      </div>

      {!formSubmitted ? (
        <form onSubmit={handleSendMessage} className="contact-form">
          <div className="contact-field">
            <label htmlFor="contact-name" className="contact-label">
              How should I call you? *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Robin"
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email" className="contact-label">
              Your return address *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. robin@domain.com"
              className="contact-input contact-input-mono"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message" className="contact-label">
              Tell me about your idea *
            </label>
            <textarea
              id="contact-message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I'm planning to build..."
              className="contact-textarea"
            />
          </div>

          {errorMessage && (
            <p className="contact-error-msg" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={sending} className="email-btn-send contact-submit-btn">
            <span>{sending ? 'DELIVERING NOTE...' : 'DELIVER NOTE'}</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </button>
        </form>
      ) : (
        <div className="contact-success-state">
          <div className="contact-success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h5 className="contact-success-title">Note Delivered!</h5>
          <p className="contact-success-desc">
            Your message has been queued successfully. I will get back to your return address as soon as possible.
          </p>
          <button
            type="button"
            onClick={() => setFormSubmitted(false)}
            className="contact-reset-btn"
          >
            Send Another Message
          </button>
        </div>
      )}
    </div>
  );
}

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

          {/* Box 3: Contact Form */}
          <ContactFormCard className="reveal-on-scroll delay-2" />

          {/* Box 4: Social Channels */}
          <DigitalSpacesCard className="reveal-on-scroll reveal-right delay-3" />
        </div>
      </div>
    </section>
  );
}
