# Projects page — Update stale project statuses and data

**Description:** Move hardcoded projects array from src/app/projects/page.tsx to external JSON file. Create public/data/projects.json containing the current projects array data structure. In src/app/projects/page.tsx, remove the hardcoded `const projects: Project[] = [...]` declaration (lines ~15-50+) and replace with dynamic import/fetch of public/data/projects.json. Update project statuses: change 'Sponsor Detection v5 Retrain' status from 'Blocked' to current state, verify 'Inbound Email Engine' blocked status, refresh Agentio stats numbers, and confirm 'Channel Qualification' paused status. The Project interface definition remains unchanged.
**Success criteria:** Project statuses reflect current reality. No stale blockers or outdated numbers.
**Off limits:** 
**Max files:** 2
