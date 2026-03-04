import { ActivityFeed } from "../components/ActivityFeed";

export default function ActivityPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Activity</h1>
        <p className="text-sm text-slate-500 mt-1">Recent cron activity across all agents</p>
      </div>
      <ActivityFeed />
    </div>
  );
}
