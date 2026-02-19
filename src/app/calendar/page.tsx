'use client';

import { useState } from "react";

interface CronJob {
  name: string;
  time: string;
  frequency: 'daily' | 'hourly' | 'weekly' | 'interval';
  agent: 'ari' | 'arlo' | 'axel';
  duration?: number; // minutes
}

interface Agent {
  id: string;
  name: string;
  emoji: string;
  color: string;
  colorClass: string;
}

const agents: Agent[] = [
  {
    id: 'ari',
    name: 'Ari',
    emoji: '🧠',
    color: 'emerald',
    colorClass: 'bg-emerald-500'
  },
  {
    id: 'arlo', 
    name: 'Arlo',
    emoji: '📊',
    color: 'amber',
    colorClass: 'bg-amber-500'
  },
  {
    id: 'axel',
    name: 'Axel', 
    emoji: '⚡',
    color: 'cyan',
    colorClass: 'bg-cyan-500'
  }
];

const cronJobs: CronJob[] = [
  // Ari cron jobs
  { name: 'Morning Brief', time: '07:00', frequency: 'daily', agent: 'ari', duration: 15 },
  { name: 'Email Scan', time: '07:00', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Scan', time: '07:15', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Scan', time: '07:30', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Scan', time: '07:45', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Scan', time: '08:00', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Scan', time: '08:15', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Scan', time: '08:30', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Scan', time: '08:45', frequency: 'interval', agent: 'ari', duration: 5 },
  { name: 'Email Check', time: '09:00', frequency: 'daily', agent: 'ari', duration: 10 },
  { name: 'Heartbeat', time: '08:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '09:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '10:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '11:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '12:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Email Check', time: '13:00', frequency: 'daily', agent: 'ari', duration: 10 },
  { name: 'Heartbeat', time: '13:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '14:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '15:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '16:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '17:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Email Check', time: '18:00', frequency: 'daily', agent: 'ari', duration: 10 },
  { name: 'Heartbeat', time: '18:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '19:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '20:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Heartbeat', time: '21:00', frequency: 'hourly', agent: 'ari', duration: 3 },
  { name: 'Creator Enrichment', time: '01:00', frequency: 'daily', agent: 'ari', duration: 30 },

  // Arlo cron jobs  
  { name: 'Meeting Briefs', time: '06:00', frequency: 'daily', agent: 'arlo', duration: 20 },
  { name: 'Follow-up Engine', time: '09:00', frequency: 'daily', agent: 'arlo', duration: 15 },
  { name: 'Heartbeat', time: '08:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '09:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '10:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '11:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '12:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '13:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '14:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '15:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '16:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '17:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '18:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '19:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Heartbeat', time: '20:00', frequency: 'hourly', agent: 'arlo', duration: 3 },
  { name: 'Daily Digest', time: '21:00', frequency: 'daily', agent: 'arlo', duration: 10 },
  { name: 'Standup', time: '20:45', frequency: 'daily', agent: 'arlo', duration: 5 },

  // Axel cron jobs
  { name: 'Morning Standup', time: '09:00', frequency: 'daily', agent: 'axel', duration: 10 },
  { name: 'Build Health', time: '08:00', frequency: 'interval', agent: 'axel', duration: 5 },
  { name: 'Build Health', time: '10:00', frequency: 'interval', agent: 'axel', duration: 5 },
  { name: 'Build Health', time: '12:00', frequency: 'interval', agent: 'axel', duration: 5 },
  { name: 'Build Health', time: '14:00', frequency: 'interval', agent: 'axel', duration: 5 },
  { name: 'Build Health', time: '16:00', frequency: 'interval', agent: 'axel', duration: 5 },
  { name: 'Build Health', time: '18:00', frequency: 'interval', agent: 'axel', duration: 5 },
  { name: 'Build Health', time: '20:00', frequency: 'interval', agent: 'axel', duration: 5 },
  { name: 'GitHub Watch', time: '08:00', frequency: 'interval', agent: 'axel', duration: 3 },
  { name: 'GitHub Watch', time: '12:00', frequency: 'interval', agent: 'axel', duration: 3 },
  { name: 'GitHub Watch', time: '16:00', frequency: 'interval', agent: 'axel', duration: 3 },
  { name: 'GitHub Watch', time: '20:00', frequency: 'interval', agent: 'axel', duration: 3 },
  { name: 'Security Check', time: '06:00', frequency: 'daily', agent: 'axel', duration: 15 },
  { name: 'Heartbeat', time: '08:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '09:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '10:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '11:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '12:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '13:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '14:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '15:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '16:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '17:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '18:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '19:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Heartbeat', time: '20:00', frequency: 'hourly', agent: 'axel', duration: 3 },
  { name: 'Standup', time: '20:45', frequency: 'daily', agent: 'axel', duration: 5 }
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6am to 10pm

export default function CalendarPage() {
  const [compactMode, setCompactMode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const getJobsForTimeSlot = (hour: number) => {
    const hourStr = hour.toString().padStart(2, '0') + ':00';
    return cronJobs.filter(job => job.time === hourStr);
  };

  const getAgentColor = (agentId: string, opacity = 100) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return 'bg-gray-500';
    
    const opacityMap: { [key: number]: string } = {
      100: '',
      75: '/75',
      50: '/50',
      25: '/25'
    };
    
    return `bg-${agent.color}-500${opacityMap[opacity]}`;
  };

  const filteredJobs = selectedAgent 
    ? cronJobs.filter(job => job.agent === selectedAgent)
    : cronJobs;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Team Calendar</h2>
          <p className="text-sm text-zinc-400 mt-1">Agent cron job schedules</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCompactMode(!compactMode)}
            className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-md hover:bg-zinc-600 text-sm border border-zinc-600"
          >
            {compactMode ? 'Full View' : 'Compact'}
          </button>
        </div>
      </div>

      {/* Agent Filter Buttons */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-zinc-400">Filter:</span>
        <button
          onClick={() => setSelectedAgent(null)}
          className={`px-3 py-1 rounded-md text-sm border ${
            selectedAgent === null
              ? 'bg-zinc-600 text-zinc-100 border-zinc-500'
              : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
          }`}
        >
          All Agents
        </button>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent.id)}
            className={`px-3 py-1 rounded-md text-sm border flex items-center space-x-2 ${
              selectedAgent === agent.id
                ? `bg-${agent.color}-600 text-white border-${agent.color}-500`
                : `bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700`
            }`}
          >
            <span>{agent.emoji}</span>
            <span>{agent.name}</span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-zinc-200 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${agent.colorClass}`}></div>
              <span className="text-sm text-zinc-300">
                {agent.emoji} {agent.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-6 bg-zinc-900 border-b border-zinc-700">
              <div className="p-3 text-sm font-semibold text-zinc-300 border-r border-zinc-700">
                Time
              </div>
              {weekDays.map((day) => (
                <div key={day} className="p-3 text-sm font-semibold text-zinc-300 text-center border-r border-zinc-700 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {hours.map((hour) => {
              const jobs = getJobsForTimeSlot(hour);
              const filteredHourJobs = selectedAgent 
                ? jobs.filter(job => job.agent === selectedAgent)
                : jobs;

              return (
                <div key={hour} className="grid grid-cols-6 border-b border-zinc-700 last:border-b-0">
                  {/* Time Label */}
                  <div className="p-3 text-sm text-zinc-400 border-r border-zinc-700 bg-zinc-900/50">
                    {formatHour(hour)}
                  </div>

                  {/* Days */}
                  {weekDays.map((day) => (
                    <div key={`${day}-${hour}`} className="p-1 border-r border-zinc-700 last:border-r-0 min-h-[60px] relative">
                      {compactMode ? (
                        /* Compact Mode - Dots */
                        <div className="flex flex-wrap gap-1">
                          {filteredHourJobs.map((job, index) => (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-full ${getAgentColor(job.agent)} cursor-pointer`}
                              title={`${agents.find(a => a.id === job.agent)?.emoji} ${job.name}`}
                            ></div>
                          ))}
                        </div>
                      ) : (
                        /* Full Mode - Blocks */
                        <div className="space-y-1">
                          {filteredHourJobs.map((job, index) => (
                            <div
                              key={index}
                              className={`${getAgentColor(job.agent, 75)} border ${getAgentColor(job.agent)} border-opacity-50 rounded px-2 py-1 text-xs text-zinc-900 font-medium cursor-pointer hover:opacity-80 transition-opacity`}
                              title={`${agents.find(a => a.id === job.agent)?.emoji} ${job.name} (${job.duration || 5}min)`}
                            >
                              <div className="truncate">
                                {agents.find(a => a.id === job.agent)?.emoji} {job.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Schedule Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const agentJobs = cronJobs.filter(job => job.agent === agent.id);
            const dailyJobs = agentJobs.filter(job => job.frequency === 'daily').length;
            const hourlyJobs = agentJobs.filter(job => job.frequency === 'hourly').length;
            const intervalJobs = agentJobs.filter(job => job.frequency === 'interval').length;
            
            return (
              <div key={agent.id} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">{agent.emoji}</span>
                  <h4 className="text-lg font-semibold text-zinc-100">{agent.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${agent.colorClass}`}></div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Total Jobs:</span>
                    <span className="text-zinc-300 font-medium">{agentJobs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Daily:</span>
                    <span className="text-zinc-300">{dailyJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Hourly:</span>
                    <span className="text-zinc-300">{hourlyJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Interval:</span>
                    <span className="text-zinc-300">{intervalJobs}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}