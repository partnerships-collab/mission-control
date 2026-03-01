### src/app/projects/page.tsx
```
'use client';

import React from 'react';

interface Project {
  id: string;
  name: string;
  status: string;
  category: string;
  categoryColor: string;
  description: string;
  detail: string;
  progress?: number | null;
  blocker?: string | null;
  stats: Record<string, string>;
  link?: string | null;
}

const projects: Project[] = [
  {"id": "sponsor-v5", "name": "Sponsor Detection v5 Retrain", "status": "Blocked", "category": "AI/ML", "categoryColor": "pink", "description": "Targeting 95%+ recall — OOM crash at loss calc, needs config fix", "detail": "Training: OOM at iter 0/3000 - needs config fix. 1:1 balanced (335K examples), 6 LoRA layers, rank 12.", "progress": 0, "blocker": null, "stats": {"v4 Recall": "53%", "target": "95%+"}, "link": null},
  {"id": "inbound-engine", "name": "Inbound Email Engine", "status": "Blocked", "category": "Automation", "categoryColor": "violet", "description": "Built and tested, blocked on gmail.send scope for service account", "detail": "Creator identification, brand research via Perplexity, agent assignment, email drafting all working. Cannot send until gmail.send scope added.", "progress": 60, "blocker": "Need gmail.send scope added to service account", "stats": {}, "link": null},
  {"id": "pipeline", "name": "Sponsor Detection Pipeline", "status": "Running", "category": "Data Infrastructure", "categoryColor": "cyan", "description": "2,178,548 videos, 1,379,400 descriptions, 188K sponsorships", "detail": "Pipeline flow running continuously. Merging, harvesting, fetching.", "progress": 85, "stats": {"channels": "42,214", "videos": "2,178,548", "descriptions": "1,379,400", "sponsored": "187,915"}, "link": "/pipeline"},
  {"id": "agentio", "name": "Agentio Creator Sourcing", "status": "Running", "category": "Sales", "categoryColor": "orange", "description": "L1: 18,647/22,760 scanned. L2: 1365 processed, 671 passed. 111 pushed to sheet.", "detail": "8 L1 workers running. L2 uses Ollama llama3.3:70b. Watchdog auto-merges L1 results and pushes L2 passes to Charlie's Google Sheet every 30 min.", "progress": 81, "stats": {"pool": "22,760", "l1_scanned": "18,647", "l1_passed": "9,104", "l2_processed": "1,365", "l2_passed": "671", "pushed": "111"}, "link": null},
  {"id": "discovery", "name": "Perpetual Channel Discovery", "status": "Running", "category": "Data Infrastructure", "categoryColor": "cyan", "description": "Perpetual yt-dlp discovery on Mini. 100K+ candidates found, qualification ongoing.", "detail": "Always-on engine cycling 180+ queries across 27 niches. Candidates feed into qualification pipeline.", "progress": null, "stats": {"candidates": "100,303", "niches": "27"}, "link": null},
  {"id": "email-drip", "name": "Email Drip Campaigns", "status": "Running", "category": "Marketing", "categoryColor": "green", "description": "4-segment weekly drip via Mailchimp. 20 campaigns scheduled.", "detail": "6-week schedule across 4 segments. 1 email/week per segment, rotating weekdays.", "progress": null, "stats": {"segments": "4", "emails": "20"}, "link": null},
  {"id": "local-models", "name": "Local Model Utilization", "status": "Running", "category": "Infrastructure", "categoryColor": "gray", "description": "Ollama running llama3.3:70b + phi4 + nomic-embed-text + mixtral:8x22b", "detail": "Powering qualification niche detection, Agentio L2, niche classification (29K+ done). 24/7 utilization.", "progress": null, "stats": {"classifications Completed": "29,582"}, "link": null},
  {"id": "channel-qualification", "name": "Channel Qualification", "status": "Paused", "category": "Data Infrastructure", "categoryColor": "cyan", "description": "17,228 total qualified (idle)", "detail": "Batch progress: 49,400/49,477 checked. Rate: 17.5%.", "progress": 99, "stats": {"qualified": "17,228", "checked_this_batch": "49,400", "batch_total": "49,477", "workers": "0"}, "link": null},
  {"id": "scoring-v3", "name": "Scoring Model V3", "status": "Complete", "category": "Sales Intelligence", "categoryColor"
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
