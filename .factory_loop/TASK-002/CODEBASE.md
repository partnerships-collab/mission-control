### src/app/components/HealthSummary.tsx
```
export function HealthSummary() {
  const cronHealthy = 32;
  const cronTotal = 66;
  const cronErrors = 18;
  const cronIdle = 16;
  const healthPercentage = Math.round((cronHealthy / cronTotal) * 100);

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-zinc-100 mb-4">System Health</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
            <span className="text-sm text-zinc-300">Gateway Status</span>
          </div>
          <span className="text-sm font-medium text-green-400">Online</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${healthPercentage >= 90 ? 'bg-green-500' : healthPercentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-zinc-300">Cron Health</span>
          </div>
          <span className="text-sm font-medium text-zinc-300">
            {cronHealthy}/{cronTotal} ({healthPercentage}\u0025)
          </span>
        </div>

        <div className="w-full bg-zinc-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${healthPercentage >= 90 ? 'bg-green-500' : healthPercentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${healthPercentage}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-green-400">{cronHealthy}</div>
            <div className="text-xs text-zinc-400">Healthy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-400">{cronIdle}</div>
            <div className="text-xs text-zinc-400">Idle</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-red-400">{cronErrors}</div>
            <div className="text-xs text-zinc-400">Error</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### src/app/crons/real-cron-data.ts
```
// Real cron data extracted from OpenClaw
export interface CronJob {
  id: string;
  name: string;
  agent: string;
  schedule: string;
  lastStatus: 'success' | 'warning' | 'error';
  lastRun: string;
  consecutiveErrors: number;
  errorMessage?: string;
  duration: string;
  nextRun: string;
}

export const realCronJobs: CronJob[] = [
  {
    id: "1",
    name: "russ-deal-notifier",
    agent: "Ari",
    schedule: "every 30m",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "59 mins ago",
    consecutiveErrors: 13,
    errorMessage: "model not allowed: anthropic/claude-sonnet-4-6",
    duration: "0.0s",
    nextRun: "In 0 mins",
  },
  {
    id: "2",
    name: "Channel Analysis Queue",
    agent: "Ari",
    schedule: "every 20m",
    lastStatus: "success" as "success" | "warning" | "error",
    lastRun: "11 mins ago",
    consecutiveErrors: 0,
    duration: "95.1s",
    nextRun: "In 8 mins",
  },
  {
    id: "3",
    name: "inbound-email-monitor",
    agent: "Ari",
    schedule: "*/5 * * * *",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "42 mins ago",
    consecutiveErrors: 15,
    errorMessage: "model not allowed: anthropic/claude-sonnet-4-6",
    duration: "0.0s",
    nextRun: "In 17 mins",
  },
  {
    id: "4",
    name: "new-creator-monitor",
    agent: "Ari",
    schedule: "every 30m",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "21 mins ago",
    consecutiveErrors: 11,
    errorMessage: "model not allowed: anthropic/claude-sonnet-4-6",
    duration: "0.0s",
    nextRun: "In 38 mins",
  },
  {
    id: "5",
    name: "local-model-dispatcher",
    agent: "Ari",
    schedule: "every 30m",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "16 mins ago",
    consecutiveErrors: 13,
    errorMessage: "model not allowed: anthropic/claude-sonnet-4-6",
    duration: "0.0s",
    nextRun: "In 43 mins",
  },
  {
    id: "6",
    name: "creator-enrichment-1am",
    agent: "Ari",
    schedule: "0 1 * * *",
    lastStatus: "success" as "success" | "warning" | "error",
    lastRun: "23 hours ago",
    consecutiveErrors: 0,
    duration: "556.1s",
    nextRun: "In 52 mins",
  },
  {
    id: "7",
    name: "brand-db-enrich-1",
    agent: "Ari",
    schedule: "0 1 * * *",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "22 hours ago",
    consecutiveErrors: 1,
    errorMessage: "Error: cron: job execution timed out",
    duration: "900.0s",
    nextRun: "In 52 mins",
  },
  {
    id: "8",
    name: "contract-matcher",
    agent: "Ari",
    schedule: "0 * * * *",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "6 mins ago",
    consecutiveErrors: 10,
    errorMessage: "model not allowed: anthropic/claude-sonnet-4-6",
    duration: "0.0s",
    nextRun: "In 53 mins",
  },
  {
    id: "9",
    name: "agentio-pipeline-watchdog",
    agent: "Ari",
    schedule: "*/30 * * * *",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "4 mins ago",
    consecutiveErrors: 14,
    errorMessage: "model not allowed: anthropic/claude-sonnet-4-6",
    duration: "0.0s",
    nextRun: "In 55 mins",
  },
  {
    id: "10",
    name: "brand-reports-enrich-1",
    agent: "Ari",
    schedule: "30 1 * * *",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "22 hours ago",
    consecutiveErrors: 1,
    errorMessage: "Error: cron: job execution timed out",
    duration: "900.0s",
    nextRun: "In 1 hours",
  },
  {
    id: "11",
    name: "creator-enrichment-2am",
    agent: "Ari",
    schedule: "0 2 * * *",
    lastStatus: "success" as "success" | "warning" | "error",
    lastRun: "22 hours ago",
    consecutiveErrors: 0,
    duration: "343.9s",
    nextRun: "In 1 hours",
  },
  {
    id: "12",
    name: "brand-db-enrich-2",
    agent: "Ari",
    schedule: "0 2 * * *",
    lastStatus: "error" as "success" | "warning" | "error",
    lastRun: "22 hours ago",
    consecutive
```

CODEBASE KNOWLEDGE:
# Code Factory — Codebase Skills
*Auto-updated after every successful task. The factory reads this before starting any work.*

## How to use this file
The factory reads this before planning any task. It tells Qwen what patterns are
established in this codebase so it writes consistent, idiomatic code without
re-learning conventions every run.

---

## Component Patterns
*(How UI components are structured in this project)*

## API Route Patterns
*(How SvelteKit API routes are written here)*
- SvelteKit load functions always return {data: T} — never return raw primitives

## Database Patterns
*(Prisma conventions, query patterns, migration approach)*

## Auth Patterns
*(How auth/session/user checks are done in this codebase)*

## State & Data Flow
*(How data flows from server to components)*

## Naming Conventions
*(File names, variable names, component names)*

## Known Anti-Patterns
*(Things that have been tried and rejected — don't do these)*

## Recently Learned
- **2026-02-28** (API Route Patterns): SvelteKit load functions always return {data: T} — never return raw primitives
- **2026-02-28** (API Route Patterns): SvelteKit load functions always return {data: T} — never return raw primitives


---
*Last updated: 2026-02-28*
