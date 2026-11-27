import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ServiceCategory {
  id: string;
  title: string;
  price: string;
  tagline: string;
  items: string[];
  note?: string;
  icon: ReactNode;
}

export interface ServiceFaq {
  question: string;
  answer: string;
  icon: ReactNode;
}

const SERVICE_TAGS = ['maintenance', 'building', 'upgrades', 'repairing', 'designing'];

const DEFAULT_SERVICES: ServiceCategory[] = [
  {
    id: 'repairs',
    title: 'Troubleshoots & Repairs',
    price: 'Starts at ₱500',
    tagline: 'Diagnostic and hardware fixes for PCs, laptops, and mobile devices.',
    items: [
      'PC / Laptop not turning on, no power, or not charging',
      'Phone running slow, bootlooping, stuck at logo, or crashing',
      'Broken USB ports (Type-C, HDMI, Type-A, etc.)',
      'Display & part replacements (LCD/OLED screens, peripherals)',
      'Factory Reset & installation/boot issue resolution',
    ],
    note: 'Checking and diagnosing is free! Payment is only collected once the device is successfully fixed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: 'software',
    title: 'Software & OS Installation',
    price: 'Starts at ₱300',
    tagline: 'Operating system deployment, software suites, and licenses.',
    items: [
      'Windows 10 / 11 Pro with Free License',
      'Linux-based OS (Ubuntu, CachyOS, Fedora, Arch, etc.)',
      'Latest Microsoft Office Suite with Free License',
      'Custom editing & productivity software of your choice',
    ],
    note: 'Available via online remote setup or in-home service. Select basic installs provided hassle-free.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  },
  {
    id: 'cleaning',
    title: 'PC / Laptop Maintenance & Cleaning',
    price: 'Starts at ₱2,000',
    tagline: 'Deep physical cleaning, thermal paste refresh, and cable routing.',
    items: [
      'Thermal Paste Replacement (any premium paste per request)',
      'Peripherals Deep Cleaning (keyboard, monitor, enclosures)',
      'Case Fans, Heatsink & Motherboard Dust Blowout',
      'Clean Internal Cable Management & Repositioning',
    ],
    note: '5-hour same-day turnaround time for full desktop and laptop maintenance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M12 18v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M3 12h3M18 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'desktop-build',
    title: 'Desktop Installation & Building',
    price: 'Starts at ₱500',
    tagline: 'Custom PC assembly, part upgrades, and initial setup.',
    items: [
      'Component Installation / Replacement (CPU Cooler, Motherboard, AIO, RAM, PSU)',
      'Case Fans Setup, Rehousing & Cable Routing',
      'Essential Apps Included (MS Office, Chrome, Adobe Suite)',
    ],
    note: 'Want me to source and purchase parts for your build? Sourcing service available upon agreement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8M8 10h8M12 16h.01" />
      </svg>
    ),
  },
  {
    id: 'shenanigans',
    title: 'Other Shenanigans',
    price: 'Starts at ₱1,500',
    tagline: 'Web development, multimedia production, and design work.',
    items: [
      'Full-stack web application development (React, Next.js, JavaScript, etc.)',
      'Photography & Videography production',
      'Graphic Designing (custom themes, banners, & occasions)',
      'Custom bots, tools, & tech consultation',
    ],
    note: 'For specialized art and graphic designs, you can also connect with @thysvl.co on Instagram.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
];

const DEFAULT_SERVICE_FAQS: ServiceFaq[] = [
  {
    question: 'Do I have to pay first or not?',
    answer:
      'It depends. If the service requires pre-ordering specific hardware parts, upfront payment for materials is needed. Otherwise, repair labor is paid after completion.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    question: 'So if no fix = no pay?',
    answer:
      'Definitely, without any regrets. Checking and diagnosing your device is 100% free if it cannot be repaired.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    question: 'How long does cleaning, repairing, and building take?',
    answer:
      '• 5 hours for same-day cleaning (desktop & laptop)\n• 2 hours to 1 day for repairs (depending on issue complexity)\n• 3 hours minimum for building a desktop from scratch',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    question: 'Are you willing to do home service?',
    answer:
      'Yes! No extra travel charges if you are located near Matina, Davao. Locations outside Matina will have minimal additional transportation fees.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

interface ServicesPageProps {
  onContactClick: () => void;
}

export function ServicesPage({ onContactClick }: ServicesPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="page-view-container">
      <header className="page-header services-page-header">
        <div className="services-meta-badges">
          <span className="services-brand-pill">Leonardo&apos;s Tangible Stuff</span>
          <span className="services-updated-label">2026 Updated Price List</span>
        </div>
        <h1 className="page-title">services.</h1>
        <p className="page-description-sub">
          From hardware diagnostics and thermal overhauls to software installations and custom web development. Transparent pricing with free diagnosis.
        </p>

        <div className="services-tags-row">
          {SERVICE_TAGS.map((tag) => (
            <span key={tag} className="service-meta-pill">
              • {tag}
            </span>
          ))}
        </div>
      </header>

      <section className="services-section-block">
        <h2 className="category-title services-section-heading">AVAILABLE SERVICES</h2>

        <div className="services-grid">
          {DEFAULT_SERVICES.map((service) => (
            <article key={service.id} id={`service-card-${service.id}`} className="service-card">
              <div className="service-card-top">
                <div className="service-card-header">
                  <div className="service-card-identity">
                    <div className="service-icon-box" aria-hidden="true">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-tagline">{service.tagline}</p>
                    </div>
                  </div>
                  <span className="service-price-badge">{service.price}</span>
                </div>

                <ul className="service-items-list">
                  {service.items.map((item) => (
                    <li key={item} className="service-item-row">
                      <svg
                        className="service-check-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.note && (
                <div className="service-note-box">
                  <svg
                    className="service-note-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>{service.note}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="services-section-block services-faq-section">
        <div className="services-faq-header">
          <h2 className="category-title services-section-heading">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="services-faq-sub">
            Got questions about diagnosis, payment, or turnarounds?
          </p>
        </div>

        <div className="services-faq-grid">
          {DEFAULT_SERVICE_FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className={`service-faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="service-faq-trigger"
                  aria-expanded={isOpen}
                >
                  <div className="service-faq-question-wrap">
                    <span className="service-faq-icon" aria-hidden="true">
                      {faq.icon}
                    </span>
                    <span className="service-faq-question">{faq.question}</span>
                  </div>
                  <svg
                    className={`service-faq-chevron ${isOpen ? 'rotated' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="service-faq-answer-wrap"
                    >
                      <div className="service-faq-answer">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="services-cta-banner">
        <div className="services-cta-copy">
          <h3 className="services-cta-title">Ready to fix, clean, or build your device?</h3>
          <p className="services-cta-desc">
            Ask questions directly or submit a collaboration note. Free diagnostic checks included.
          </p>
        </div>

        <div className="services-cta-actions">
          <a
            href="https://t.me/isaiahscape"
            target="_blank"
            rel="noopener noreferrer"
            className="services-cta-btn secondary"
          >
            Telegram ↗
          </a>
          <button type="button" onClick={onContactClick} className="services-cta-btn primary">
            Get in Touch <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    </div>
  );
}
