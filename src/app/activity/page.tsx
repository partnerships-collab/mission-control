'use client';

import { useState } from "react";
import { ActivityFeed } from "../components/ActivityFeed";
import { RecentCronActivity } from "../components/RecentCronActivity";

type AgentFilter = "All" | "Ari" | "Arlo" | "Axel" | "System";

const AGENT_FILTERS: AgentFilter[] = ["All", "Ari", "Arlo", "Axel", "System"];

export default function ActivityPage() {
  const [agentFilter, setAgentFilter] = useState<AgentFilter>("All");

  return (
    <div className="p-6 lg:p-8 max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Activity</h1>
          <p className="text-sm text-slate-500 mt-1">Live cron runs and agent activity</p>
        </div>

        {/* Agent filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 rounded-lg p-1">
          {AGENT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setAgentFilter(filter)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                agentFilter === filter
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Cron Activity — last 10 runs, most recent first */}
      <RecentCronActivity />

      {/* Full activity feed — filtered by selected agent */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100">All Activity</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {agentFilter === "All" ? "All agents" : agentFilter} · last 20 runs
          </p>
        </div>
        <ActivityFeed agentFilter={agentFilter} />
      </div>
    </div>
  );
}
