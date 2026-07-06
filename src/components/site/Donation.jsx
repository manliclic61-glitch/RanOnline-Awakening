import { useState } from "react";
import {
  MessageCircle,
  Smartphone,
  Landmark,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { useGcashAccounts, useBankAccounts } from "./siteData";

const steps = [
  {
    title: "Send your donation",
    body: "Pick any account above and send your donation there.",
  },
  {
    title: "Double-check the name",
    body: "Confirm the account name matches before you hit confirm.",
  },
  {
    title: "Screenshot the receipt",
    body: "Keep proof once the payment goes through.",
  },
  {
    title: "Message us",
    body:
      "Send the screenshot with your in-game character name on Discord or Facebook.",
  },
  {
    title: "Get your perks",
    body: "An admin confirms the payment and credits your perks in-game.",
  },
];

function CopyableCard({ icon: Icon, label, sub, value, id, copiedId, onCopy }) {
  const isCopied = copiedId === id;
  return (
    <button
      className="iv-donate-card iv-donate-card--copyable"
      onClick={() => onCopy(value, id)}
      aria-label={`Copy ${label}`}
    >
      <Icon size={20} />
      <small>{sub}</small>
      <span className="iv-donate-copy-row">
        <strong>{value}</strong>
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </span>
    </button>
  );
}

export default function Donation() {
  const gcash = useGcashAccounts();
  const bank = useBankAccounts();
  const [method, setMethod] = useState("gcash");
  const [copiedId, setCopiedId] = useState(null);

  const active = method === "gcash" ? gcash : bank;

  const handleCopy = (value, id) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
      })
      .catch(console.error);
  };

  return (
    <section className="iv-section" id="donation">
      <div className="iv-container">
        <div className="iv-section-head">
          <div>
            <div className="iv-section-kicker">Donation</div>
            <h2 className="iv-display">Support the server</h2>
          </div>
          <p className="iv-section-sub">
            Donations help cover hosting, maintenance, and future events —
            pick a method below and tap an account to copy it.
          </p>
        </div>

        <div className="iv-donate-panel">
          <div className="iv-donate-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={method === "gcash"}
              className={`iv-donate-tab${method === "gcash" ? " active" : ""}`}
              onClick={() => setMethod("gcash")}
            >
              <Smartphone size={16} /> GCash
            </button>
            <button
              role="tab"
              aria-selected={method === "bank"}
              className={`iv-donate-tab${method === "bank" ? " active" : ""}`}
              onClick={() => setMethod("bank")}
            >
              <Landmark size={16} /> Bank
            </button>
            <span
              className="iv-donate-tab-indicator"
              style={{
                transform:
                  method === "gcash" ? "translateX(0%)" : "translateX(100%)",
              }}
            />
          </div>

          {active.status === "loading" && (
            <div className="iv-donate-grid">
              {[0, 1, 2].map((i) => (
                <div className="iv-donate-card" key={i}>
                  <div className="iv-skeleton-line iv-skeleton-line--sm" />
                  <div className="iv-skeleton-line iv-skeleton-line--lg" />
                </div>
              ))}
            </div>
          )}

          {active.status === "error" && (
            <div className="iv-fetch-status iv-fetch-status--error">
              <AlertCircle size={22} />
              <strong>
                Couldn't load {method === "gcash" ? "GCash" : "bank"} accounts.
              </strong>
              <button className="iv-secondary" onClick={active.reload}>
                Retry
              </button>
            </div>
          )}

          {active.status === "ready" && active.data.length === 0 && (
            <div className="iv-fetch-status">
              {method === "gcash" ? (
                <Smartphone size={22} />
              ) : (
                <Landmark size={22} />
              )}
              <strong>
                No {method === "gcash" ? "GCash" : "bank"} accounts listed yet
              </strong>
            </div>
          )}

          {active.status === "ready" && active.data.length > 0 && (
            <div className="iv-donate-grid">
              {method === "gcash"
                ? gcash.data.map((acc, i) => (
                    <CopyableCard
                      key={`${acc.number}-${i}`}
                      icon={Smartphone}
                      label={`GCash number for ${acc.name}`}
                      sub={acc.name}
                      value={acc.number}
                      id={`gcash-${i}`}
                      copiedId={copiedId}
                      onCopy={handleCopy}
                    />
                  ))
                : bank.data.map((acc, i) => (
                    <CopyableCard
                      key={`${acc.accountNumber}-${i}`}
                      icon={Landmark}
                      label={`${acc.bank} account number`}
                      sub={`${acc.bank} — ${acc.accountName}`}
                      value={acc.accountNumber}
                      id={`bank-${i}`}
                      copiedId={copiedId}
                      onCopy={handleCopy}
                    />
                  ))}
            </div>
          )}
        </div>

        <div className="iv-quest-log">
          <small className="iv-donate-group-label">How it works</small>
          <ol className="iv-quest-steps">
            {steps.map((step, i) => (
              <li className="iv-quest-step" key={step.title}>
                <span className="iv-quest-num">{i + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="iv-donate-note">
          <MessageCircle size={22} />
          <p>
            Need help or want to confirm a donation? Message us on Discord or
            Facebook and our team will assist you.
          </p>
        </div>
      </div>
    </section>
  );
}