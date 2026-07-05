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

export const downloadItems = [
  {
    title: "Mega",
    meta: "Full client mirror",
    body: "Download the complete RAN Online: Awakening client through Mega.",
    icon: MonitorDown,
    href: "https://mega.nz/",
  },
  {
    title: "Google Drive",
    meta: "Alternative mirror",
    body: "Use the Google Drive mirror if Mega is slow or unavailable in your region.",
    icon: Download,
    href: "https://drive.google.com/",
  },
];

export const communityLinks = [
  { label: "Discord", value: "Live support and announcements", icon: MessageCircle, href: "https://discord.gg/your-invite" },
  { label: "Facebook", value: "Events, Promotionals, and updates", icon: Globe2, href: "https://www.facebook.com/profile.php?id=61590630241347" },
];