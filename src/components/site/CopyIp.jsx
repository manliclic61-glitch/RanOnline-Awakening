import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SERVER_IP } from "./siteData";

export default function CopyIp() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
    } catch {
      // Clipboard can be blocked outside a secure browser context.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className="iv-ip-card" type="button" onClick={handleCopy}>
      <span>
        <small>Server IP</small>
        <strong>{SERVER_IP}</strong>
      </span>
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}
