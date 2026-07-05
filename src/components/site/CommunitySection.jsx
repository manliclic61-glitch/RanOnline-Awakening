import { MessageCircle } from "lucide-react";
import communityImage from "../../assets/ran_hero1.png";
import { communityLinks } from "./siteData";

export default function CommunitySection() {
  return (
    <section className="iv-section" id="community">
      <div className="iv-container iv-community-layout">
        <div
          className="iv-community-image"
          style={{ "--community-image": `url(${communityImage})` }}
        >
          <strong className="iv-display">Guilds, rivalries, raids, and campus pride.</strong>
        </div>

        <div className="iv-community-panel">
          <div>
            <div className="iv-section-kicker">Community</div>
            <h2 className="iv-display">Tara na!</h2>
            <p className="iv-section-sub">
              
            </p>
          </div>

          <div className="iv-community-list">
            {communityLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="iv-community-item"
                  key={item.label}
                >
                  <span><Icon size={20} /></span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.value}</small>
                  </span>
                </a>
              );})}
          </div>

          <div className="iv-hero-actions">
            <a className="iv-primary" href="#community">
              <MessageCircle size={17} /> Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}