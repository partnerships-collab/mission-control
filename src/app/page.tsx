import { NeedsApple } from "./components/NeedsApple";
import { RevenueTracker } from "./components/RevenueTracker";
import { ActiveProjects } from "./components/ActiveProjects";
import { SystemHealth } from "./components/SystemHealth";
import { RecentActivityHome } from "./components/RecentActivityHome";
import { DateLine } from "./components/DateLine";

export default function HomePage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-100">Good morning, Apple</h1>
        <DateLine />
      </div>

      {/* A — Needs Apple */}
      <NeedsApple />

      {/* B — Revenue Tracker */}
      <RevenueTracker />

      {/* C — Active Projects */}
      <ActiveProjects />

      {/* D — System Health Strip */}
      <SystemHealth />

      {/* E — Recent Activity */}
      <RecentActivityHome />
    </div>
  );
}
