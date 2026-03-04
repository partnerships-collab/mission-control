import { NextResponse } from "next/server";
import { readFileSync } from "fs";

const HANDOFFS_PATH = "/Users/aurora/.openclaw/workspaces/axel/data/agent-handoffs.jsonl";
const PENDING_WORK_PATH = "/Users/aurora/.openclaw/workspaces/axel/memory/pending-work.md";

interface HandoffEntry {
  ts?: string;
  timestamp?: string;
  from?: string;
  to?: string;
  type?: string;
  summary?: string;
  status?: string;
  handled?: boolean;
  acked?: boolean;
}

interface NeedsAppleItem {
  id: string;
  agent: string;
  timestamp: string;
  description: string;
  source: "handoff" | "pending-work";
}

export const dynamic = "force-dynamic";

export async function GET() {
  const items: NeedsAppleItem[] = [];

  // 1. Parse agent-handoffs.jsonl
  try {
    const raw = readFileSync(HANDOFFS_PATH, "utf-8");
    const lines = raw.trim().split("\n");
    for (const line of lines) {
      try {
        const entry: HandoffEntry = JSON.parse(line);
        const isToApple = entry.to === "apple";
        const isBlocked = entry.status === "blocked";
        const isHandled = entry.handled === true || entry.acked === true;

        if ((isToApple || isBlocked) && !isHandled) {
          items.push({
            id: `handoff-${items.length}`,
            agent: (entry.from || "system").charAt(0).toUpperCase() + (entry.from || "system").slice(1),
            timestamp: entry.ts || entry.timestamp || "",
            description: entry.summary || "No description",
            source: "handoff",
          });
        }
      } catch {
        // skip malformed lines
      }
    }
  } catch {
    // file not found — not an error
  }

  // 2. Parse pending-work.md — lines under "Blocked on Apple" starting with "- [ ]"
  try {
    const raw = readFileSync(PENDING_WORK_PATH, "utf-8");
    const lines = raw.split("\n");
    let inAppleSection = false;

    for (const line of lines) {
      if (line.includes("Blocked on Apple")) {
        inAppleSection = true;
        continue;
      }
      if (inAppleSection && line.startsWith("###") && !line.includes("Blocked on Apple")) {
        inAppleSection = false;
        continue;
      }
      if (inAppleSection && line.startsWith("- [ ]")) {
        const desc = line.replace("- [ ] ", "").replace(/\*\*/g, "").trim();
        items.push({
          id: `pending-${items.length}`,
          agent: "System",
          timestamp: "",
          description: desc,
          source: "pending-work",
        });
      }
    }
  } catch {
    // file not found
  }

  return NextResponse.json({ items });
}
