export function RecentCronActivity() {
  const recentRuns = [
    { name: "morning-brief", agent: "Ari", status: "success", time: "09:00", duration: "2.3s" },
    { name: "email-scan", agent: "Ari", status: "success", time: "08:45", duration: "4.1s" },
    { name: "followup-engine", agent: "Arlo", status: "success", time: "08:30", duration: "12.8s" },
    { name: "contract-matcher", agent: "Ari", status: "error", time: "08:15", duration: "45.2s" },
    { name: "meeting-briefs", agent: "Ari", status: "success", time: "08:00", duration: "6.7s" },
    { name: "creator-enrichment", agent: "Arlo", status: "success", time: "07:45", duration: "89.3s" },
    { name: "brand-enrichment", agent: "Arlo", status: "warning", time: "07:30", duration: "34.5s" },
    { name: "pipeline-watchdog", agent: "Ari", status: "success", time: "07:15", duration: "1.9s" },
    { name: "security-watchdog", agent: "Ari", status: "success", time: "07:00", duration: "0.8s" },
    { name: "channel-discovery", agent: "Arlo", status: "success", time: "06:45", duration: "156.7s" },
  ];

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg">
      <div className="px-6 py-4 border-b border-zinc-700">
        <h3 className="text-lg font-semibold text-zinc-100">Recent Cron Activity</h3>
        <p className="text-sm text-zinc-400">Last 10 runs</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left px-6 py-3 text-sm font-medium text-zinc-300">Job</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-zinc-300">Agent</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-zinc-300">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-zinc-300">Time</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-zinc-300">Duration</th>
            </tr>
          </thead>
          <tbody>
            {recentRuns.map((run, index) => (
              <tr key={index} className="border-b border-zinc-700 hover:bg-zinc-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      run.status === 'success' ? 'bg-green-500' :
                      run.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-zinc-200">{run.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-300">{run.agent}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    run.status === 'success' ? 'bg-green-500/10 text-green-400' :
                    run.status === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {run.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-300">{run.time}</td>
                <td className="px-6 py-4 text-sm text-zinc-300">{run.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}