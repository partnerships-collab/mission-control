import { NextResponse } from "next/server";
import fs from "fs";

const CLOSE_API_KEY_PATH = "/Users/aurora/.openclaw/workspaces/axel/.secrets/close_api_key.txt";
const CLOSE_BASE_URL = "https://api.close.com/api/v1";
const GOAL_USD = 25_000_000;

interface CloseOpportunity {
  value: number | null;
  date_won: string | null;
  lead_name: string | null;
  status_label: string | null;
  user_name: string | null;
}

interface CloseResponse {
  data: CloseOpportunity[];
  has_more: boolean;
}

export async function GET() {
  try {
    const apiKey = fs.readFileSync(CLOSE_API_KEY_PATH, "utf-8").trim();
    const authHeader = "Basic " + Buffer.from(`${apiKey}:`).toString("base64");

    const allOpportunities: CloseOpportunity[] = [];
    let skip = 0;
    const limit = 100;

    while (true) {
      const url = `${CLOSE_BASE_URL}/opportunity/?status_type=won&_limit=${limit}&_skip=${skip}`;
      const res = await fetch(url, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Close API error: ${res.status}`);

      const body: CloseResponse = await res.json();
      allOpportunities.push(...body.data);

      if (!body.has_more || body.data.length < limit) break;
      skip += limit;
    }

    const currentYear = new Date().getFullYear();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let totalYtdUsd = 0;
    let last30DayUsd = 0;

    for (const opp of allOpportunities) {
      if (!opp.date_won) continue;

      const dateWon = new Date(opp.date_won);
      if (dateWon.getFullYear() !== currentYear) continue;

      const val = opp.value || 0;
      totalYtdUsd += val;

      if (dateWon >= thirtyDaysAgo) {
        last30DayUsd += val;
      }
    }

    const projectedAnnualUsd =
      last30DayUsd > 0 ? Math.round((last30DayUsd / 30) * 365) : 0;

    return NextResponse.json({
      totalYtdUsd,
      goalUsd: GOAL_USD,
      last30DayUsd,
      projectedAnnualUsd,
      sources: {
        copper: totalYtdUsd, // key kept for frontend (RevenueTracker.tsx) compatibility
        impact: null,
        redVentures: null,
        adsByMoney: null,
        msn: null,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Revenue route error:", err);
    return NextResponse.json(
      { error: String(err), totalYtdUsd: 0, goalUsd: GOAL_USD },
      { status: 500 }
    );
  }
}
