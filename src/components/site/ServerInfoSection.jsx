import { characterClasses, serverFacts, serverFeatures } from "./siteData";

export default function ServerInfoSection() {
  return (
    <section className="iv-section" id="server">
      <div className="iv-container">
        <div className="iv-section-head">
          <div>
            <div className="iv-section-kicker">Server Information</div>
            <h2 className="iv-display">Built for classic campus war</h2>
          </div>
          <p className="iv-section-sub">
            Low-rate, quest-based progression with party leveling and classic
            2006 gameplay at the center of the server.
          </p>
        </div>

        <div className="iv-info-grid">
          {serverFacts.map((item) => {
            const Icon = item.icon;
            return (
              <div className="iv-info-card" key={item.label}>
                <Icon size={25} />
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </div>
            );
          })}
        </div>

        <div className="iv-school-row">
          <small>Schools</small>
          <strong>
            <span>Sacred Gate</span>
            <span>Phoenix</span>
            <span>Mystic Peak</span>
          </strong>
        </div>

        <div className="iv-feature-strip" aria-label="Server features">
          {serverFeatures.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>

        <div className="iv-lore-row">
          <div className="iv-lore">
            <strong>Low-rate progression</strong>
            <p>EXP x1 and Drop x1 keep leveling, farming, and upgrades close to the classic grind.</p>
          </div>
          <div className="iv-lore">
            <strong>Party leveling</strong>
            <p>Progression is built around quests and group play, giving parties a real reason to form.</p>
          </div>
          <div className="iv-lore">
            <strong>Classic limits</strong>
            <p>Max level 135, max skill 127, last weapon Sparring, and last map Prison.</p>
          </div>
        </div>

        <div className="iv-class-section">
          <div className="iv-section-kicker">RAN Online Character Classes</div>
          <div className="iv-class-grid">
            {characterClasses.map((item) => {
              const Icon = item.icon;
              return (
                <article className="iv-class-card" key={item.name}>
                  <span className="iv-class-icon"><Icon size={22} /></span>
                  <small>{item.role}</small>
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
