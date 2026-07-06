import { ArrowRight, Download } from "lucide-react";
import heroTrailer from "../../assets/Ran Online Awakening Official Trailer.mp4";
import StatusPulse from "./StatusPulse";
import { serverFlag } from "./siteData";
export default function HeroSection() {
  return (
    <header className="iv-hero" id="landing">
      <video
        className="iv-hero-bg"
        src={heroTrailer}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="iv-container iv-hero-grid">
        <div>
          <div className="iv-kicker">
            <StatusPulse online={serverFlag} />
            {serverFlag ? "Server Online" : "Coming Very Soon!"}
          </div>
          <h1 className="iv-display">
            RAN Online <span>Awakening</span>
          </h1>
          <p className="iv-hero-copy">
            The true Classic 2006 Ran Online experience is making its comeback,
            bringing back the classic gameplay that defined a generation and
            kept thousands of players hooked for countless hours. This isn’t
            just a server. It’s a journey back to the memories that shaped our
            childhood. Get ready to relive the golden era.
          </p>
          <div className="iv-hero-actions iv-hero-actions-center">
            <a className="iv-primary" href="#download">
              <Download size={17} /> Download client
            </a>
            <a className="iv-secondary" href="#server">
              Server info <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <aside className="iv-hero-panel" aria-label="Server summary">
          <div className="iv-panel-title">
            <strong>Server</strong>
          </div>
          <div className="iv-quick-stats">
            <div className="iv-quick-stat">
              <small>Version</small>
              <strong>Awakening</strong>
            </div>
            <div className="iv-quick-stat">
              <small>Class</small>
              <strong>All schools</strong>
            </div>
            <div className="iv-quick-stat">
              <small>Events</small>
              <strong>Club Wars & Tyranny</strong>
            </div>
            <div className="iv-quick-stat">
              <small>Security</small>
              <strong>Anti-DDoS</strong>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
