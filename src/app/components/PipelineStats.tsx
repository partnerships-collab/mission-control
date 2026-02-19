export function PipelineStats() {
  const stats = [
    {
      label: "Channels",
      value: "41,821",
      icon: "📺",
      change: "+2.3%",
      changeType: "positive" as const,
    },
    {
      label: "Videos Processed",
      value: "1.83M",
      icon: "🎬",
      change: "+5.7%",
      changeType: "positive" as const,
    },
    {
      label: "Brands Matched",
      value: "12,847",
      icon: "🏢",
      change: "+1.9%",
      changeType: "positive" as const,
    },
    {
      label: "Active Deals",
      value: "328",
      icon: "🤝",
      change: "-4.2%",
      changeType: "negative" as const,
    },
  ];

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-zinc-100 mb-4">Pipeline Stats</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm text-zinc-400">{stat.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-zinc-100">{stat.value}</span>
              <span className={`text-xs font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">Last updated:</span>
          <span className="text-zinc-300">2 minutes ago</span>
        </div>
      </div>
    </div>
  );
}