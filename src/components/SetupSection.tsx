export function SetupSection() {
  return (
    <section className="setup-section" id="setup">
      <div className="setup-container">
        <div className="setup-header reveal-on-scroll reveal-left delay-1">
          <h2 className="setup-main-title">my setup.</h2>
          <p className="setup-philosophy">
            A curated record of custom hardware configurations, camera gear, audio kits, and daily drivers.
          </p>
        </div>

        <div className="setup-grid">
          {/* Workstation PC Card: Spans 7 Columns */}
          <div className="setup-card card-monitor span-7 reveal-on-scroll delay-2">
            <div className="setup-card-header">
              <span className="setup-tag">// WORKSTATION PC</span>
              <div className="setup-icon-wrapper">
                <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="13" rx="1.5" />
                  <path d="M12 16v5M8 21h8" />
                </svg>
              </div>
            </div>
            <div className="setup-card-body">
              <h3 className="setup-item-title">Ryzen 7 5700X3D & RTX 4060</h3>
              <div className="setup-specs">
                <span className="spec-tag">MSI MAG B550 Tomahawk</span>
                <span className="spec-tag">32GB FURY DDR4</span>
                <span className="spec-tag">1TB 990 EVO NVMe</span>
              </div>
            </div>
          </div>

          {/* Keyboard Card: Spans 5 Columns */}
          <div className="setup-card card-keyboard span-5 reveal-on-scroll delay-3">
            <div className="setup-card-header">
              <span className="setup-tag">// INPUT</span>
              <div className="setup-icon-wrapper">
                <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6" />
                </svg>
              </div>
            </div>
            <div className="setup-card-body">
              <h3 className="setup-item-title">Aula F75 & HHKB Pro</h3>
              <div className="setup-specs">
                <span className="spec-tag">75% Wireless Gasket</span>
                <span className="spec-tag">HHKB Professional</span>
              </div>
            </div>
          </div>

          {/* Laptop Card: Spans 4 Columns */}
          <div className="setup-card card-tablet span-4 reveal-on-scroll delay-2">
            <div className="setup-card-header">
              <span className="setup-tag">// LAPTOP</span>
              <div className="setup-icon-wrapper">
                <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M2 20h20" />
                </svg>
              </div>
            </div>
            <div className="setup-card-body">
              <h3 className="setup-item-title">Lenovo Ryzen 5 7530U</h3>
              <div className="setup-specs">
                <span className="spec-tag">16GB DDR4-3200</span>
                <span className="spec-tag">512GB NVMe • 15.6" FHD</span>
              </div>
            </div>
          </div>

          {/* Phone Card: Spans 4 Columns */}
          <div className="setup-card card-phone span-4 reveal-on-scroll delay-3">
            <div className="setup-card-header">
              <span className="setup-tag">// PHONE</span>
              <div className="setup-icon-wrapper">
                <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="setup-card-body">
              <h3 className="setup-item-title">Samsung Galaxy S24 5G</h3>
              <div className="setup-specs">
                <span className="spec-tag">Exynos 2400</span>
                <span className="spec-tag">120Hz AMOLED 2X</span>
              </div>
            </div>
          </div>

          {/* Mouse Card: Spans 4 Columns */}
          <div className="setup-card card-mouse span-4 reveal-on-scroll delay-4">
            <div className="setup-card-header">
              <span className="setup-tag">// MOUSE</span>
              <div className="setup-icon-wrapper">
                <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C9.24 2 7 4.24 7 7v10c0 2.76 2.24 5 5 5s5-2.24 5-5V7c0-2.76-2.24-5-5-5z" />
                  <path d="M12 2v7M7 9h10" />
                </svg>
              </div>
            </div>
            <div className="setup-card-body">
              <h3 className="setup-item-title">Pulsar TenZ Signature</h3>
              <div className="setup-specs">
                <span className="spec-tag">XS-1 Sensor</span>
                <span className="spec-tag">32,000 DPI • 8K PR</span>
              </div>
            </div>
          </div>

          {/* Camera Card: Spans 6 Columns */}
          <div className="setup-card card-iem-1 span-6 reveal-on-scroll delay-2">
            <div className="setup-card-header">
              <span className="setup-tag">// CAMERA</span>
              <div className="setup-icon-wrapper">
                <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </div>
            <div className="setup-card-body">
              <h3 className="setup-item-title">Canon EOS 700D</h3>
              <div className="setup-specs">
                <span className="spec-tag">EF 50mm f/1.8 STM</span>
                <span className="spec-tag">EF-S 18-55mm IS STM</span>
                <span className="spec-tag">Street & Portraits</span>
              </div>
            </div>
          </div>

          {/* Audio / IEM & DAC Card: Spans 6 Columns */}
          <div className="setup-card card-iem-2 span-6 reveal-on-scroll delay-3">
            <div className="setup-card-header">
              <span className="setup-tag">// AUDIO / IEM & DAC</span>
              <div className="setup-icon-wrapper">
                <svg className="setup-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9" />
                  <rect x="3" y="12" width="4" height="6" rx="1.5" />
                  <rect x="17" y="12" width="4" height="6" rx="1.5" />
                  <path d="M7 15h10M9 18h6" />
                </svg>
              </div>
            </div>
            <div className="setup-card-body">
              <h3 className="setup-item-title">Simgot EW300 & TRN Black Pearl</h3>
              <div className="setup-specs">
                <span className="spec-tag">1DD + Planar + PZT</span>
                <span className="spec-tag">TRN T2 16 Core</span>
                <span className="spec-tag">CS43131 DAC / CB5100 Amp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
