'use client';

import { useEffect, useState } from "react";

interface NeedsAppleItem {
  id: string;
  agent: string;
  timestamp: string;
  description: string;
  source: "handoff" | "pending-work";
}

function agentColor(agent: string): string {
  switch (agent.toLowerCase()) {
    case "ari": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    case "arlo": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "axel": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    default: return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  }
}

function formatTimestamp(ts: string): string {
  if (!ts) return "";
  try {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHrs > 0) return `${diffHrs}h ago`;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins > 0) return `${diffMins}m ago`;
    return "just now";
  } catch {
    return "";
  }
}

export function NeedsApple() {
  const [items, setItems] = useState<NeedsAppleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/needs-apple")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
        <h2 className="text-base font-semibold text-slate-100">Needs Apple</h2>
        {!loading && (
          <span className="text-xs text-slate-500 ml-auto">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-emerald-400 font-medium">
          Nothing blocked. You&apos;re clear.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="flex items-start gap-3 py-2 px-3 rounded-lg bg-slate-800/40 border border-slate-800/60"
            >
              <span className="text-xs text-slate-500 font-mono mt-0.5 min-w-[1.5rem]">
                {i + 1}.
              </span>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded border mt-0.5 ${agentColor(item.agent)}`}>
                {item.agent}
              </span>
              <span className="text-sm text-slate-300 flex-1">{item.description}</span>
              {item.timestamp && (
                <span className="text-xs text-slate-600 mt-0.5 shrink-0">
                  {formatTimestamp(item.timestamp)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
