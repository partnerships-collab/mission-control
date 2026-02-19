'use client';

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  icon: string;
  model: string;
  role: string;
  workspacePath: string;
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  lastActivity: string;
  assignedCrons: string[];
  stats: {
    cronJobsManaged: number;
    successRate: string;
    avgResponseTime: string;
    memoryUsage: string;
  };
}

interface StandupAgent {
  agent: string;
  emoji: string;
  shipped: string[];
  in_progress: string[];
  tomorrow: string[];
  blockers: string[];
  fyi: string[];
}

interface StandupData {
  date: string;
  agents: StandupAgent[];
}

const agents: Agent[] = [
  {
    id: "ari",
    name: "Ari",
    icon: "🧠",
    model: "Opus 4.6",
    role: "main ops",
    workspacePath: "/Users/aurora/.openclaw/workspace",
    status: "healthy",
    uptime: "99.2\u0025",
    lastActivity: "2 mins ago",
    assignedCrons: [
      "Daily 7am Morning Brief for Apple",
      "apple-email-scan",
      "contract-matcher",
      "creator-enrichment-1am",
      "brand-db-enrich-1",
      "security-watchdog",
      "aaron-daily-briefing",
      "daily-backup",
      "agentio-pipeline-watchdog",
      "80K Discovery Checkpoint",
      "memory-filing",
      "email-check-9am",
      "aaron-typo-roast",
      "email-check-1pm",
      "email-check-6pm",
      "nightly-tier-classification",
      "api-cost-monitor",
      "weekly-read-later-digest",
      "Weekly Feature Requests Digest",
      "weekly-avg-views-update",
      "weekly-security-audit",
      "weekly-sponsorship-monitor",
      "context-pruning",
      "weekly-creator-drought-monitor",
      "monthly-email-draft",
      "reengagement-check"
    ],
    stats: {
      cronJobsManaged: 52,
      successRate: "61.5\u0025",
      avgResponseTime: "45.2s",
      memoryUsage: "2.8GB",
    },
  },
  {
    id: "arlo",
    name: "Arlo",
    icon: "📊",
    model: "Sonnet 4",
    role: "sales",
    workspacePath: "/Users/aurora/.openclaw/workspaces/arlo",
    status: "healthy",
    uptime: "98.7\u0025",
    lastActivity: "5 mins ago",
    assignedCrons: [
      "daily-meeting-briefs",
      "arlo-memory-filing",
      "followup-engine",
      "arlo-heartbeat",
      "arlo-daily-digest",
      "followup-weekly-summary",
      "arlo-context-pruning",
      "cross-sell-weekly"
    ],
    stats: {
      cronJobsManaged: 8,
      successRate: "87.5\u0025",
      avgResponseTime: "18.3s",
      memoryUsage: "1.2GB",
    },
  },
  {
    id: "axel",
    name: "Axel",
    icon: "⚡",
    model: "Sonnet 4",
    role: "dev",
    workspacePath: "/Users/aurora/.openclaw/workspaces/axel",
    status: "healthy",
    uptime: "97.8\u0025",
    lastActivity: "8 mins ago",
    assignedCrons: [
      "axel-security-check",
      "axel-build-health",
      "axel-github-watch",
      "axel-memory-filing",
      "axel-morning-standup",
      "axel-context-pruning"
    ],
    stats: {
      cronJobsManaged: 6,
      successRate: "16.7\u0025",
      avgResponseTime: "0.5s",
      memoryUsage: "0.8GB",
    },
  },
];

// Mock standup data
const mockStandupData: StandupData = {
  date: "2026-02-19",
  agents: [
    {
      agent: "ari",
      emoji: "🧠",
      shipped: ["Compiled agent standup", "Set up Axel agent"],
      in_progress: ["Pipeline v5 training data audit"],
      tomorrow: ["Continue v5 work", "Review Aaron's roadmap"],
      blockers: ["Sponsor detection OOM"],
      fyi: ["Axel is now live on Slack"]
    },
    {
      agent: "arlo",
      emoji: "📊",
      shipped: ["Follow-up engine ran", "Cross-sell alerts sent"],
      in_progress: ["Annie's proposal for Relief App"],
      tomorrow: ["Dormant brand outreach"],
      blockers: [],
      fyi: ["Annie closed ThriveCart deal"]
    },
    {
      agent: "axel",
      emoji: "⚡",
      shipped: ["Mission Control dashboard with real data", "Projects + Pipeline pages"],
      in_progress: ["Standup panel for dashboard"],
      tomorrow: ["Wire live data API"],
      blockers: [],
      fyi: ["agent-unassigned.json is 62MB, may need git-lfs"]
    }
  ]
};

// Mock past dates for "Last 7 Days" toggle
const pastStandupDates = [
  "2026-02-18",
  "2026-02-17", 
  "2026-02-14",
  "2026-02-13",
  "2026-02-12",
  "2026-02-11",
  "2026-02-10"
];

export default function AgentsPage() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [showLast7Days, setShowLast7Days] = useState(false);

  const toggleAgent = (agentId: string) => {
    setExpandedAgent(expandedAgent === agentId ? null : agentId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-zinc-100">Agents</h2>
      
      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-zinc-800 border border-zinc-700 rounded-lg">
            {/* Agent Header */}
            <div 
              className="p-6 cursor-pointer hover:bg-zinc-700/50 transition-colors"
              onClick={() => toggleAgent(agent.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{agent.icon}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold text-zinc-100">{agent.name}</h3>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor(agent.status)}`}></div>
                    </div>
                    <p className="text-sm text-zinc-400">{agent.role}</p>
                    <p className="text-sm text-zinc-500">Model: {agent.model}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm text-zinc-300">Uptime: {agent.uptime}</div>
                    <div className="text-sm text-zinc-400">Last: {agent.lastActivity}</div>
                  </div>
                  <div className="text-zinc-400">
                    {expandedAgent === agent.id ? '▼' : '▶'}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedAgent === agent.id && (
              <div className="border-t border-zinc-700 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Agent Stats */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-zinc-200">Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-zinc-400">Cron Jobs Managed:</span>
                        <span className="text-sm text-zinc-300">{agent.stats.cronJobsManaged}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-zinc-400">Success Rate:</span>
                        <span className="text-sm text-green-400">{agent.stats.successRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-zinc-400">Avg Response Time:</span>
                        <span className="text-sm text-zinc-300">{agent.stats.avgResponseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-zinc-400">Memory Usage:</span>
                        <span className="text-sm text-zinc-300">{agent.stats.memoryUsage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-zinc-400">Workspace:</span>
                        <span className="text-sm font-mono text-zinc-400 truncate">{agent.workspacePath}</span>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Cron Jobs */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-zinc-200">Assigned Cron Jobs</h4>
                    <div className="space-y-2">
                      {agent.assignedCrons.map((cronName, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-2 bg-zinc-700/50 rounded-md"
                        >
                          <span className="text-sm font-mono text-zinc-300">{cronName}</span>
                          <span className="text-xs text-zinc-500">Active</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-zinc-700">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                      View Logs
                    </button>
                    <button className="px-4 py-2 bg-zinc-600 text-zinc-200 rounded-md hover:bg-zinc-500 text-sm">
                      Manage Crons
                    </button>
                    <button className="px-4 py-2 bg-zinc-600 text-zinc-200 rounded-md hover:bg-zinc-500 text-sm">
                      Agent Config
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Agent Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100">
              {agents.length}
            </div>
            <div className="text-sm text-zinc-400">Total Agents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {agents.filter(a => a.status === 'healthy').length}
            </div>
            <div className="text-sm text-zinc-400">Healthy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100">
              {agents.reduce((sum, agent) => sum + agent.stats.cronJobsManaged, 0)}
            </div>
            <div className="text-sm text-zinc-400">Total Cron Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">98.6\u0025</div>
            <div className="text-sm text-zinc-400">Overall Uptime</div>
          </div>
        </div>
      </div>

      {/* Daily Standup Section */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-zinc-100">
            Daily Standup — {new Date(mockStandupData.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </h3>
          <button
            onClick={() => setShowLast7Days(!showLast7Days)}
            className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-md hover:bg-zinc-600 text-sm border border-zinc-600"
          >
            {showLast7Days ? 'Show Today' : 'Last 7 Days'}
          </button>
        </div>

        {!showLast7Days ? (
          /* Current Standup */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStandupData.agents.map((standupAgent) => (
              <div key={standupAgent.agent} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">{standupAgent.emoji}</span>
                  <h4 className="text-lg font-semibold text-zinc-100 capitalize">{standupAgent.agent}</h4>
                </div>

                <div className="space-y-4">
                  {/* Shipped */}
                  {standupAgent.shipped.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-green-400 mb-2">Shipped</h5>
                      <ul className="space-y-1">
                        {standupAgent.shipped.map((item, index) => (
                          <li key={index} className="text-sm text-zinc-300 flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* In Progress */}
                  {standupAgent.in_progress.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-blue-400 mb-2">In Progress</h5>
                      <ul className="space-y-1">
                        {standupAgent.in_progress.map((item, index) => (
                          <li key={index} className="text-sm text-zinc-300 flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tomorrow */}
                  {standupAgent.tomorrow.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-zinc-400 mb-2">Tomorrow</h5>
                      <ul className="space-y-1">
                        {standupAgent.tomorrow.map((item, index) => (
                          <li key={index} className="text-sm text-zinc-300 flex items-start">
                            <span className="text-zinc-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Blockers */}
                  {standupAgent.blockers.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-red-400 mb-2">Blockers</h5>
                      <ul className="space-y-1">
                        {standupAgent.blockers.map((item, index) => (
                          <li key={index} className="text-sm text-zinc-300 flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* FYI */}
                  {standupAgent.fyi.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-yellow-400 mb-2">FYI</h5>
                      <ul className="space-y-1">
                        {standupAgent.fyi.map((item, index) => (
                          <li key={index} className="text-sm text-zinc-300 flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Last 7 Days List */
          <div className="space-y-2">
            <div className="text-sm text-zinc-400 mb-4">Click any date to view that standup (coming soon)</div>
            {pastStandupDates.map((date) => (
              <button
                key={date}
                className="w-full text-left p-3 bg-zinc-900 border border-zinc-700 rounded-md hover:bg-zinc-700/50 transition-colors"
                onClick={() => {
                  // TODO: Implement detail view later
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="text-zinc-500 text-sm">3 agents</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}