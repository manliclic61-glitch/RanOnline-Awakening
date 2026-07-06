import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import ranLogo from "../../assets/ran_logo.png";
import { navLinks, serverFlag } from "./siteData";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleLinks = navLinks.filter(
    ([, href]) => serverFlag || href !== "#donation"
  );

  return (
    <nav className="iv-nav">
      <div className="iv-container iv-nav-inner">
        <a className="iv-brand" href="#landing" aria-label="RAN Online Awakening home">
          <img src={ranLogo} alt="RAN Online Awakening logo" />
          <span>
            <strong className="iv-display">AWAKENING</strong>
            <small>RAN Online</small>
          </span>
        </a>

        <div className="iv-nav-links">
          {visibleLinks.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </div>

        <a className="iv-nav-cta" href="#download">
          <Download size={16} />
          Download
        </a>

        <button
          className="iv-menu-btn"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`iv-container iv-mobile-menu ${menuOpen ? "open" : ""}`}>
        {visibleLinks.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>
    </nav>
  );
}