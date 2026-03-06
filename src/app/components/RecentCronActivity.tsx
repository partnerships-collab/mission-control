'use client';

import { useState, useEffect } from "react";

interface CronJob {
  id: string;
  name: string;
  agent: string;
  lastStatus: 'success' | 'warning' | 'error';
  consecutiveErrors: number;
  lastRun: string;
  duration: string;
  errorMessage?: string;
}

function parseRelativeTime(str: string): number {
  if (str === "never" || str === "—") return -Infinity;
  if (str === "just now") return 0;
  const match = str.match(/(\d+)\s*(min|mins|hour|hours|day|days|hrs|h|d)/);
  if (!match) return 0;
  const n = parseInt(match[1], 10);
  const unit = match[2];
  if (unit.startsWith("min")) return -n;
  if (unit.startsWith("hour") || unit === "hrs" || unit === "h") return -n * 60;
  if (unit.startsWith("day") || unit === "d") return -n * 1440;
  return 0;
}

function getRunStatus(job: CronJob): { label: string; className: string } {
  if (job.lastStatus === "error" || job.consecutiveErrors >= 3) {
    return { label: "error", className: "bg-red-500/15 text-red-400" };
  }
  if (job.consecutiveErrors >= 1 || job.lastStatus === "warning") {
    return { label: "warning", className: "bg-yellow-500/15 text-yellow-400" };
  }
  return { label: "ok", className: "bg-emerald-500/15 text-emerald-400" };
}

export function RecentCronActivity() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/crons')
      .then(r => r.json())
      .then((data: CronJob[]) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const recentRuns = jobs
    .filter(j => j.lastRun !== "never" && j.lastRun !== "—")
    .sort((a, b) => parseRelativeTime(b.lastRun) - parseRelativeTime(a.lastRun))
    .slice(0, 10);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800">
        <h2 className="text-base font-semibold text-slate-100">Recent Cron Runs</h2>
        <p className="text-xs text-slate-500 mt-0.5">Last 10 jobs by run time · live from OpenClaw</p>
      </div>

      {loading ? (
        <div className="px-5 py-8 text-center text-sm text-slate-500 animate-pulse">
          Loading cron activity…
        </div>
      ) : recentRuns.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-slate-500">
          No recent cron runs found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="text-left px-5 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Job Name</th>
                <th className="text-left px-5 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Agent</th>
                <th className="text-left px-5 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Ran At</th>
                <th className="text-right px-5 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</th>
                <th className="text-right px-5 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRuns.map((job) => {
                const status = getRunStatus(job);
                const isError = job.lastStatus === "error" || job.consecutiveErrors >= 3;
                return (
                  <tr key={job.id} className={`border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors ${isError ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-3">
                      <div className={`text-sm font-medium ${isError ? "text-red-300" : "text-slate-200"}`}>
                        {job.name}
                      </div>
                      {job.errorMessage && (
                        <div className="text-xs text-red-400/80 mt-0.5 truncate max-w-xs">{job.errorMessage}</div>
                      )}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-400">{job.agent}</td>
                    <td className="px-5 py-3 text-sm text-slate-400">{job.lastRun}</td>
                    <td className="px-5 py-3 text-sm text-slate-400 text-right">{job.duration}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
