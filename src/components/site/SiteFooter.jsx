import ranLogo from "../../assets/ran_logo.png";

export default function SiteFooter() {
  return (
    <footer className="iv-footer">
      <div className="iv-container iv-footer-inner">
        <span className="iv-footer-brand">
          <img src={ranLogo} alt="" aria-hidden="true" />
          RAN Online: Awakening
        </span>
        <span>
COPYRIGHT 2026. RAN ONLINE : AWAKENING. ALL RIGHTS RESERVED. ALL TRADEMARKS ARE PROPERTY OF THEIR RESPECTIVE OWNERS</span>
      </div>
    </footer>
  );
}
