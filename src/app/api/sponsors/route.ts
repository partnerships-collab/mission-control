import { NextRequest, NextResponse } from "next/server";

const CA_DATA_URL = "https://ca-data.vercel.app";
const TOKEN = process.env.CA_DATA_BEARER_TOKEN;

export async function GET(req: NextRequest) {
  if (!TOKEN) {
    return NextResponse.json({ error: "Missing CA_DATA_BEARER_TOKEN" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams({
    limit:        searchParams.get("limit")        || "50",
    offset:       searchParams.get("offset")       || "0",
    sort:         searchParams.get("sort")         || "channels",
    min_channels: searchParams.get("min_channels") || "1",
    min_videos:   searchParams.get("min_videos")   || "0",
  });
  const search = searchParams.get("search");
  if (search) params.set("search", search);

  try {
    const res = await fetch(`${CA_DATA_URL}/sponsors?${params}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }
    return NextResponse.json(await res.json());
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
