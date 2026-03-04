import Link from "next/link";
import { realCronJobs } from "../crons/real-cron-data";

function parseRelativeTime(str: string): number {
  if (str === "never") return -Infinity;
  const match = str.match(/(\d+)\s*(min|hour|hours|day|days|hrs)/);
  if (!match) return 0;
  const n = parseInt(match[1], 10);
  const unit = match[2];
  if (unit.startsWith("min")) return -n;
  if (unit.startsWith("hour") || unit === "hrs") return -n * 60;
  if (unit.startsWith("day")) return -n * 1440;
  return 0;
}

export function RecentActivityHome() {
  const sorted = [...realCronJobs]
    .filter((j) => j.lastRun !== "never")
    .sort((a, b) => parseRelativeTime(a.lastRun) - parseRelativeTime(b.lastRun))
    .reverse()
    .slice(0, 5);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-100">Recent Activity</h2>
        <Link href="/activity" className="text-xs text-emerald-400 hover:text-emerald-300">
          View all →
        </Link>
      </div>

      <div className="space-y-2">
        {sorted.map((job) => (
          <div
            key={job.id}
            className="flex items-center gap-3 py-2 px-3 rounded-lg bg-slate-800/30 border border-slate-800/50"
          >
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                job.lastStatus === "success" && job.consecutiveErrors === 0
                  ? "bg-emerald-400"
                  : job.lastStatus === "error" || job.consecutiveErrors >= 3
                    ? "bg-red-400"
                    : "bg-yellow-400"
              }`}
            ></div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-slate-200 truncate block">{job.name}</span>
            </div>
            <span className="text-xs text-slate-500 shrink-0">{job.agent}</span>
            <span className="text-xs text-slate-600 shrink-0">{job.lastRun}</span>
            <span
              className={`text-xs font-medium shrink-0 ${
                job.lastStatus === "success" && job.consecutiveErrors === 0
                  ? "text-emerald-400"
                  : job.lastStatus === "error" || job.consecutiveErrors >= 3
                    ? "text-red-400"
                    : "text-yellow-400"
              }`}
            >
              {job.consecutiveErrors >= 3 ? "error" : job.lastStatus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
