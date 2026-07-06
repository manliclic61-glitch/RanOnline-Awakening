import { useEffect, useState, useCallback } from "react";
import Papa from "papaparse";
import {
  Calendar,
  ScrollText,
  X,
  AlertCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPAtB9yRxaDuGRdrMBEuRvVgv7IaKp4l_dl8lKS6dUv2oojSddFe6nN__huI6Bbdo6uUjBUP3aq8GC/pub?gid=0&single=true&output=csv";

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(value) {
  const d = parseDate(value);
  if (!d) return value || "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function excerpt(text, len = 110) {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
}

export default function UpdatesSection() {
  const [updates, setUpdates] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const loadUpdates = useCallback(() => {
    setStatus("loading");
    fetch(SHEET_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then((csv) => {
        const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
        const rows = (result.data || []).filter((r) => r.Title);
        rows.sort((a, b) => {
          const da = parseDate(a.Date);
          const db = parseDate(b.Date);
          if (!da || !db) return 0;
          return db - da;
        });
        setUpdates(rows);
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    loadUpdates();
  }, [loadUpdates]);

  useEffect(() => {
    if (!selectedUpdate) return;
    const onKey = (e) => e.key === "Escape" && setSelectedUpdate(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedUpdate]);

  return (
    <section className="iv-section" id="updates">
      <div className="iv-container">
        <div className="iv-section-head">
          <div>
            <div className="iv-section-kicker">Server Updates</div>
            <h2>Awakening Updates</h2>
          </div>
          <p className="iv-section-sub">
            Events, Updates and Announcements will be posted here. Check back often for the latest news and updates about the server.
          </p>
        </div>

        {status === "loading" && (
          <div className="iv-updates-timeline">
            {[0, 1, 2].map((i) => (
              <div className="iv-update-node" key={i}>
                <div className="iv-update-dot iv-update-dot--skeleton" />
                <div className="iv-update-card iv-update-card--skeleton">
                  <div className="iv-skeleton-line iv-skeleton-line--sm" />
                  <div className="iv-skeleton-line iv-skeleton-line--lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="iv-updates-error">
            <AlertCircle size={28} />
            <strong>The chronicle didn't load.</strong>
            <p>Something went wrong reaching the log.</p>
            <button className="iv-secondary" onClick={loadUpdates}>
              Retry
            </button>
          </div>
        )}

        {status === "ready" && updates.length === 0 && (
          <div className="iv-updates-empty">
            <ScrollText size={28} />
            <strong>No entries yet</strong>
            <p>Nothing's been logged. Check back after the next update.</p>
          </div>
        )}

        {status === "ready" && updates.length > 0 && (
          <div className="iv-updates-timeline">
            {updates.map((u, index) => (
              <div
                className="iv-update-node"
                key={`${u.Date}-${u.Title}-${index}`}
              >
                <div
                  className={`iv-update-dot${
                    index === 0 ? " iv-update-dot--new" : ""
                  }`}
                />
                <article
                  className={`iv-update-card${
                    index === 0 ? " iv-update-card--featured" : ""
                  }`}
                  onClick={() => setSelectedUpdate(u)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedUpdate(u)}
                >
                  {index === 0 && (
                    <span className="iv-update-badge">
                      <Sparkles size={12} /> Latest
                    </span>
                  )}
                  <div className="iv-update-date">
                    <Calendar size={13} />
                    {formatDate(u.Date)}
                  </div>
                  <h3>{u.Title}</h3>
                  {u.Body && (
                    <p className="iv-update-excerpt">{excerpt(u.Body)}</p>
                  )}
                  <span className="iv-update-readmore">
                    Read entry <ChevronRight size={14} />
                  </span>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUpdate && (
        <div
          className="iv-modal-overlay"
          onClick={() => setSelectedUpdate(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="iv-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="iv-modal-close"
              onClick={() => setSelectedUpdate(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="iv-modal-date">
              <Calendar size={13} />
              {formatDate(selectedUpdate.Date)}
            </div>
            <h2>{selectedUpdate.Title}</h2>
            <p>{selectedUpdate.Body}</p>
          </div>
        </div>
      )}
    </section>
  );
}
