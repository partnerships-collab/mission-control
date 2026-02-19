interface AgentCardProps {
  name: string;
  icon: string;
  model: string;
  role: string;
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  lastActivity: string;
}

export function AgentCard({ name, icon, model, role, status, uptime, lastActivity }: AgentCardProps) {
  const statusColor = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }[status];

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-zinc-100">{name}</h3>
            <p className="text-sm text-zinc-400">{role}</p>
          </div>
        </div>
        <div className={`w-2 h-2 rounded-full animate-pulse ${statusColor}`}></div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-zinc-400">Model:</span>
          <span className="text-sm text-zinc-300">{model}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-400">Uptime:</span>
          <span className="text-sm text-zinc-300">{uptime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-400">Last Activity:</span>
          <span className="text-sm text-zinc-300">{lastActivity}</span>
        </div>
      </div>
    </div>
  );
}