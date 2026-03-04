import Link from "next/link";

interface Project {
  name: string;
  status: "In Progress" | "Blocked" | "Done" | "On Hold";
  owner: string;
  detail?: string;
}

const projects: Project[] = [
  { name: "Mission Control v2", status: "In Progress", owner: "Axel", detail: "Phase 1 build" },
  { name: "Inbound Email Engine", status: "Blocked", owner: "Ari", detail: "Needs gmail.send scope" },
  { name: "Ventures Playbook", status: "Done", owner: "Axel" },
  { name: "Label Cleaning", status: "Blocked", owner: "Axel", detail: "88% done, API key issue" },
  { name: "Channel Discovery", status: "In Progress", owner: "Axel", detail: "Perpetual, Mini" },
  { name: "Sponsor Detection v5", status: "On Hold", owner: "Apple", detail: "Apple directive" },
];

const statusConfig = {
  "In Progress": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" },
  "Blocked": { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", dot: "bg-red-400" },
  "Done": { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20", dot: "bg-slate-400" },
  "On Hold": { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20", dot: "bg-yellow-400" },
};

const columns: Array<{ label: string; status: Project["status"] }> = [
  { label: "In Progress", status: "In Progress" },
  { label: "Blocked", status: "Blocked" },
  { label: "Done", status: "Done" },
  { label: "On Hold", status: "On Hold" },
];

export function ActiveProjects() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-100">Active Projects</h2>
        <Link href="/projects" className="text-xs text-emerald-400 hover:text-emerald-300">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colProjects = projects.filter((p) => p.status === col.status);
          const cfg = statusConfig[col.status];
          return (
            <div key={col.status}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${cfg.dot}`}></div>
                <span className={`text-xs font-medium ${cfg.text}`}>{col.label}</span>
                <span className="text-xs text-slate-600">{colProjects.length}</span>
              </div>
              <div className="space-y-2">
                {colProjects.map((p) => (
                  <div
                    key={p.name}
                    className={`rounded-lg border p-3 ${cfg.bg} ${cfg.border}`}
                  >
                    <div className="text-sm font-medium text-slate-200">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{p.owner}</div>
                    {p.detail && (
                      <div className={`text-xs mt-1 ${cfg.text} opacity-80`}>{p.detail}</div>
                    )}
                  </div>
                ))}
                {colProjects.length === 0 && (
                  <div className="text-xs text-slate-600 italic py-2">None</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
