'use client';

import { useState } from "react";

interface CronJob {
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

const mockCronJobs: CronJob[] = [
  {
    id: "1",
    name: "morning-brief",
    agent: "Ari",
    schedule: "0 9 * * *",
    lastStatus: "success",
    lastRun: "2 mins ago",
    consecutiveErrors: 0,
    duration: "2.3s",
    nextRun: "Tomorrow 9:00 AM",
  },
  {
    id: "2",
    name: "email-scan",
    agent: "Ari",
    schedule: "*/15 * * * *",
    lastStatus: "success",
    lastRun: "15 mins ago",
    consecutiveErrors: 0,
    duration: "4.1s",
    nextRun: "In 0 mins",
  },
  {
    id: "3",
    name: "contract-matcher",
    agent: "Ari",
    schedule: "0 */2 * * *",
    lastStatus: "error",
    lastRun: "1 hour ago",
    consecutiveErrors: 9,
    errorMessage: "Airtable API rate limit exceeded",
    duration: "45.2s",
    nextRun: "In 1 hour",
  },
  {
    id: "4",
    name: "followup-engine",
    agent: "Arlo",
    schedule: "0 */6 * * *",
    lastStatus: "success",
    lastRun: "3 hours ago",
    consecutiveErrors: 0,
    duration: "12.8s",
    nextRun: "In 3 hours",
  },
  {
    id: "5",
    name: "meeting-briefs",
    agent: "Ari",
    schedule: "0 8 * * 1-5",
    lastStatus: "success",
    lastRun: "1 hour ago",
    consecutiveErrors: 0,
    duration: "6.7s",
    nextRun: "Tomorrow 8:00 AM",
  },
  {
    id: "6",
    name: "creator-enrichment",
    agent: "Arlo",
    schedule: "0 */4 * * *",
    lastStatus: "success",
    lastRun: "2 hours ago",
    consecutiveErrors: 0,
    duration: "89.3s",
    nextRun: "In 2 hours",
  },
  {
    id: "7",
    name: "brand-enrichment",
    agent: "Arlo",
    schedule: "0 */8 * * *",
    lastStatus: "warning",
    lastRun: "4 hours ago",
    consecutiveErrors: 2,
    errorMessage: "Some brand profiles incomplete",
    duration: "34.5s",
    nextRun: "In 4 hours",
  },
  {
    id: "8",
    name: "pipeline-watchdog",
    agent: "Ari",
    schedule: "*/5 * * * *",
    lastStatus: "success",
    lastRun: "5 mins ago",
    consecutiveErrors: 0,
    duration: "1.9s",
    nextRun: "In 0 mins",
  },
  {
    id: "9",
    name: "security-watchdog",
    agent: "Ari",
    schedule: "*/10 * * * *",
    lastStatus: "success",
    lastRun: "10 mins ago",
    consecutiveErrors: 0,
    duration: "0.8s",
    nextRun: "In 0 mins",
  },
  {
    id: "10",
    name: "channel-discovery",
    agent: "Arlo",
    schedule: "0 6 * * *",
    lastStatus: "success",
    lastRun: "3 hours ago",
    consecutiveErrors: 0,
    duration: "156.7s",
    nextRun: "Tomorrow 6:00 AM",
  },
  {
    id: "11",
    name: "revenue-report",
    agent: "Ari",
    schedule: "0 7 * * 1",
    lastStatus: "success",
    lastRun: "2 days ago",
    consecutiveErrors: 0,
    duration: "23.4s",
    nextRun: "Monday 7:00 AM",
  },
  {
    id: "12",
    name: "backup-routine",
    agent: "Ari",
    schedule: "0 2 * * *",
    lastStatus: "success",
    lastRun: "7 hours ago",
    consecutiveErrors: 0,
    duration: "312.1s",
    nextRun: "Tomorrow 2:00 AM",
  },
  {
    id: "13",
    name: "deal-alerts",
    agent: "Arlo",
    schedule: "0 */3 * * *",
    lastStatus: "warning",
    lastRun: "1 hour ago",
    consecutiveErrors: 1,
    errorMessage: "Slack webhook timeout",
    duration: "8.7s",
    nextRun: "In 2 hours",
  },
  {
    id: "14",
    name: "heartbeat-check",
    agent: "Ari",
    schedule: "*/30 * * * *",
    lastStatus: "success",
    lastRun: "30 mins ago",
    consecutiveErrors: 0,
    duration: "0.3s",
    nextRun: "In 0 mins",
  },
  {
    id: "15",
    name: "cleanup-logs",
    agent: "Ari",
    schedule: "0 1 * * 0",
    lastStatus: "success",
    lastRun: "3 days ago",
    consecutiveErrors: 0,
    duration: "45.9s",
    nextRun: "Sunday 1:00 AM",
  },
];

type SortField = keyof CronJob;
type SortDirection = 'asc' | 'desc';

export default function CronsPage() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterAgent, setFilterAgent] = useState<string>('');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedJobs = mockCronJobs
    .filter(job => filterAgent === '' || job.agent === filterAgent)
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * direction;
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * direction;
      }
      
      return 0;
    });

  const getStatusColor = (status: string, consecutiveErrors: number) => {
    if (status === 'error' || consecutiveErrors >= 3) return 'bg-red-500';
    if (status === 'warning' || consecutiveErrors >= 1) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-zinc-100">Cron Jobs</h2>
        <select
          value={filterAgent}
          onChange={(e) => setFilterAgent(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-zinc-100"
        >
          <option value="">All Agents</option>
          <option value="Ari">Ari</option>
          <option value="Arlo">Arlo</option>
        </select>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-700">
              <tr>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'agent', label: 'Agent' },
                  { key: 'schedule', label: 'Schedule' },
                  { key: 'lastStatus', label: 'Last Status' },
                  { key: 'lastRun', label: 'Last Run' },
                  { key: 'consecutiveErrors', label: 'Errors' },
                ].map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key as SortField)}
                    className="text-left px-6 py-3 text-sm font-medium text-zinc-200 cursor-pointer hover:bg-zinc-600"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {sortField === column.key && (
                        <span className="text-zinc-400">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="text-left px-6 py-3 text-sm font-medium text-zinc-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedJobs.map((job) => (
                <tr key={job.id} className="border-b border-zinc-700 hover:bg-zinc-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor(job.lastStatus, job.consecutiveErrors)}`}></div>
                      <span className="text-sm font-medium text-zinc-200">{job.name}</span>
                    </div>
                    {job.errorMessage && (
                      <div className="text-xs text-red-400 mt-1">{job.errorMessage}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{job.agent}</td>
                  <td className="px-6 py-4 text-sm font-mono text-zinc-300">{job.schedule}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      job.lastStatus === 'success' && job.consecutiveErrors === 0 ? 'bg-green-500/10 text-green-400' :
                      job.lastStatus === 'warning' || job.consecutiveErrors >= 1 ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {job.consecutiveErrors >= 3 ? 'error' : job.consecutiveErrors >= 1 ? 'warning' : job.lastStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{job.lastRun}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${
                      job.consecutiveErrors === 0 ? 'text-zinc-400' :
                      job.consecutiveErrors >= 3 ? 'text-red-400 font-semibold' :
                      'text-yellow-400 font-semibold'
                    }`}>
                      {job.consecutiveErrors}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      View Logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}