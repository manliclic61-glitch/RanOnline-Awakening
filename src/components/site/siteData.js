import { useState, useEffect, useCallback, useRef } from "react";
import Papa from "papaparse";
import {
  Crosshair,
  Download,
  Globe2,
  Hand,
  MessageCircle,
  MonitorDown,
  Shield,
  Sparkles,
  Swords,
  Users,
  Zap,
} from "lucide-react";

export const SERVER_IP = "play.ro-awakening.gg";

export const navLinks = [
  ["Home", "#landing"],
  ["Server Information", "#server"],
  ["Download", "#download"],
  ["Donation", "#donation"],
  ["Updates", "#updates"],
  ["Community", "#community"],
];

export const serverFacts = [
  { label: "Server", value: "RAN Online: Awakening", icon: Sparkles },
  { label: "Max Level", value: "135", icon: Zap },
  { label: "Max Skill", value: "127", icon: Shield },
  { label: "Classes", value: "4 balanced classes", icon: Users },
];

export const serverFeatures = [
  "Low rate EXP",
  "Low drop rate",
  "EXP x1 / Drop x1",
  "Quest-based progression",
  "Party leveling",
  "Classic 2006 gameplay",
  "Last weapon: Sparring",
  "Last map: Prison",
];

export const characterClasses = [
  {
    name: "Swordsman",
    role: "Frontline damage",
    body: "A melee fighter built for direct pressure, duels, and leading the charge in campus wars.",
    icon: Swords,
  },
  {
    name: "Archer",
    role: "Ranged control",
    body: "A long-range class focused on kiting, burst windows, and picking targets from a safe distance.",
    icon: Crosshair,
  },
  {
    name: "Brawler",
    role: "Close-combat bruiser",
    body: "A fast hand-to-hand fighter with aggressive combos, strong chase tools, and brawl-ready pressure.",
    icon: Hand,
  },
  {
    name: "Shaman",
    role: "Support and magic",
    body: "A utility-focused class with buffs, sustain, and skills that can shift the tempo of party fights.",
    icon: Sparkles,
  },
];

export const communityLinks = [
  {
    label: "Discord",
    value: "Live support and announcements",
    icon: MessageCircle,
    href: "https://discord.gg/your-invite",
  },
  {
    label: "Facebook",
    value: "Events, Promotionals, and updates",
    icon: Globe2,
    href: "https://www.facebook.com/profile.php?id=61590630241347",
  },
];

export const updates = [
  {
    date: "July 6, 2026",
    title: "Server maintenance completed",
    body: "Fixed login issues and improved server stability.",
  },
  {
    date: "July 1, 2026",
    title: "New event: Double EXP weekend",
    body: "Enjoy 2x EXP rates this weekend only.",
  },
];

export const serverFlag = false;

/* ---------------------------------------------------------------------- */
/* Donation accounts — sourced live from published Google Sheets           */
/* ---------------------------------------------------------------------- */

const GCASH_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPAtB9yRxaDuGRdrMBEuRvVgv7IaKp4l_dI8IKS6dUv2oojSddFe6nN__huI6Bbdo6uUjBUP3aq8GC/pub?gid=1708314952&single=true&output=csv";

// Same steps, but for a sheet/tab with BANK, ACCOUNT NAME, ACCOUNT NUMBER columns.
// Adjust the column names in the mapRow below if yours differ.
const BANK_SHEET_URL = "PASTE_YOUR_PUBLISHED_BANK_CSV_LINK_HERE";

function useCsvSheet(url, mapRow) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  // mapRow is an inline function at every call site, so it gets a new
  // reference on every render. Keeping it in a ref (instead of a useCallback
  // dependency) means `load` only changes when `url` changes, which is what
  // actually determines whether we need to re-fetch.
  const mapRowRef = useRef(mapRow);
  mapRowRef.current = mapRow;

  const load = useCallback(() => {
    setStatus("loading");
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then((csv) => {
        const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
        const rows = (result.data || [])
          .map((r) => mapRowRef.current(r))
          .filter(Boolean);
        setData(rows);
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, status, reload: load };
}

export function useGcashAccounts() {
  return useCsvSheet(GCASH_SHEET_URL, (r) => {
    const number = r["GCASH NUMBER"]?.trim();
    const name = r["GCASH NAME"]?.trim();
    return number && name ? { number, name } : null;
  });
}

export function useBankAccounts() {
  return useCsvSheet(BANK_SHEET_URL, (r) => {
    const bank = r["BANK"]?.trim();
    const accountName = r["ACCOUNT NAME"]?.trim();
    const accountNumber = r["ACCOUNT NUMBER"]?.trim();
    return bank && accountName && accountNumber
      ? { bank, accountName, accountNumber }
      : null;
  });
}

/* ---------------------------------------------------------------------- */
/* Download mirrors — sourced live from a published Google Sheet           */
/* ---------------------------------------------------------------------- */

// Sheet/tab columns expected: TITLE, META, BODY, HREF
// File > Share > Publish to web > select that tab > format: CSV > Publish
const DOWNLOAD_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPAtB9yRxaDuGRdrMBEuRvVgv7IaKp4l_dl8lKS6dUv2oojSddFe6nN__huI6Bbdo6uUjBUP3aq8GC/pub?gid=216938593&single=true&output=csv";

// The sheet can't carry a React icon component, so we look one up by title.
// Anything not in this map falls back to the generic Download icon.
const downloadIconMap = {
  mega: MonitorDown,
  "google drive": Download,
  "media fire": Download,
};

function getDownloadIcon(title) {
  return downloadIconMap[title?.toLowerCase()] || Download;
}

export function useDownloadItems() {
  return useCsvSheet(DOWNLOAD_SHEET_URL, (r) => {
    const title = r["TITLE"]?.trim();
    const meta = r["META"]?.trim();
    const body = r["BODY"]?.trim();
    const href = r["HREF"]?.trim();
    return title && href
      ? { title, meta, body, href, icon: getDownloadIcon(title) }
      : null;
  });
}