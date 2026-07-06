import { MessageCircle, Smartphone, Landmark } from "lucide-react";
import { gcashAccounts, bankAccounts } from "./siteData";
export default function Donation() {
  return (
    <section className="iv-section" id="donation">
      <div className="iv-container">
        <div className="iv-section-head">
          <div>
            <div className="iv-section-kicker">Donation</div>
            <h2 className="iv-display">Support the server</h2>
          </div>
          <p className="iv-section-sub">
            Donations help cover hosting, maintenance, and future events.
            Send to any GCash or bank account listed below.
          </p>
        </div>

        <div className="iv-donate-group">
          <small className="iv-donate-group-label">GCash Accounts</small>
          <div className="iv-donate-grid">
            {gcashAccounts.map((acc) => (
              <div className="iv-donate-card disabled" key={acc.name}>
                <Smartphone size={20} />
                <small>{acc.name}</small>
                <strong>{acc.number}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="iv-donate-group">
          <small className="iv-donate-group-label">Bank Accounts</small>
          <div className="iv-donate-grid">
            {bankAccounts.map((acc) => (
              <div className="iv-donate-card" key={acc.bank}>
                <Landmark size={20} />
                <small>{acc.bank} — {acc.accountName}</small>
                <strong>{acc.accountNumber}</strong>
              </div>
            ))}
          </div>
        </div>

        <ol className="iv-donate-steps">
          <li>Send your donation to any account listed above.</li>
          <li>Double-check the account name before confirming.</li>
          <li>Screenshot your payment confirmation once it goes through.</li>
          <li>Send the screenshot with your in-game character name to us on Discord or Facebook.</li>
          <li>Your donation perks will be credited in-game once an admin confirms it.</li>
        </ol>

        <div className="iv-donate-note">
          <MessageCircle size={22} />
          <p>
            Need help or want to confirm a donation? Message us on Discord
            or Facebook and our team will assist you.
          </p>
        </div>
      </div>
    </section>
  );
}