import { useEffect, useState, useRef } from "react";
import "./FAB.css";

export function FAB({
  currentPage,
  onPageChange,
}: {
  currentPage: 'home' | 'about' | 'projects' | 'services' | 'gallery' | 'blogs';
  onPageChange: (page: 'home' | 'about' | 'projects' | 'services' | 'gallery' | 'blogs') => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Close popover when clicking outside the FAB container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Track window scroll coordinates
  useEffect(() => {
    const trackScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", trackScroll);

    return () => {
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <div className="fab-container" ref={menuRef}>
      {/* Scroll to Top Button */}
      <button
        className={`fab-btn scroll-top-btn ${scrollY > 200 ? "visible" : ""} ${open ? "menu-open" : ""}`}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="fab-icon">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Main FAB Toggle Button */}
      <button
        className={`fab-btn main-fab-btn ${open ? "open" : ""}`}
        onClick={handleOpen}
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="fab-icon toggle-icon">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Popover Menu Card */}
      {open && (
        <div className="fab-menu-card">
          {/* Top Banner Image */}
          <div className="fab-menu-banner">
            <img src="/assets/folder-texture.jpg" alt="Menu banner" className="fab-menu-banner-img" />
          </div>

          <div className="fab-menu-header">
            <img src="/logo.svg" alt="Logo" className="menu-header-logo" style={{ objectFit: 'contain', padding: '1px' }} />
            <span className="menu-header-title">leonardo.</span>
          </div>

          <nav className="fab-menu-links">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("home");
                setOpen(false);
              }}
              className={`fab-menu-link ${currentPage === "home" ? "active" : ""}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
              <span className="link-arrow">→</span>
            </a>

            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("about");
                setOpen(false);
              }}
              className={`fab-menu-link ${currentPage === "about" ? "active" : ""}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>About</span>
              <span className="link-arrow">→</span>
            </a>

            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("projects");
                setOpen(false);
              }}
              className={`fab-menu-link ${currentPage === "projects" ? "active" : ""}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>Projects</span>
              <span className="link-arrow">→</span>
            </a>

            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("services");
                setOpen(false);
              }}
              className={`fab-menu-link ${currentPage === "services" ? "active" : ""}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span>Services</span>
              <span className="link-arrow">→</span>
            </a>

            <a
              href="/gallery"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("gallery");
                setOpen(false);
              }}
              className={`fab-menu-link ${currentPage === "gallery" ? "active" : ""}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Gallery</span>
              <span className="link-arrow">→</span>
            </a>

            <a
              href="/blogs"
              onClick={(e) => {
                e.preventDefault();
                onPageChange("blogs");
                setOpen(false);
              }}
              className={`fab-menu-link ${currentPage === "blogs" ? "active" : ""}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M16 8h2" />
                <path d="M16 12h2" />
                <path d="M6 8h6v8H6z" />
              </svg>
              <span>Blogs</span>
              <span className="link-arrow">→</span>
            </a>
          </nav>

          <div className="fab-menu-footer">
            <a href="https://github.com/isaiahscape" target="_blank" rel="noopener noreferrer" className="footer-social-link">GitHub</a>
            <span className="footer-divider">•</span>
            <a href="https://instagram.com/isaiahscape" target="_blank" rel="noopener noreferrer" className="footer-social-link">Instagram</a>
            <span className="footer-divider">•</span>
            <a href="https://t.me/isaiahscape" target="_blank" rel="noopener noreferrer" className="footer-social-link">Telegram</a>
            <span className="footer-divider">•</span>
            <a href="https://youtube.com/@isaiahscape" target="_blank" rel="noopener noreferrer" className="footer-social-link">YouTube</a>
            <span className="footer-divider">•</span>
            <a href="https://twitch.tv/isaiahscape" target="_blank" rel="noopener noreferrer" className="footer-social-link">Twitch</a>
            <span className="footer-divider">•</span>
            <a href="mailto:isaiahscape@duck.com" className="footer-social-link">Email</a>
          </div>
        </div>
      )}
    </div>
  );
}
