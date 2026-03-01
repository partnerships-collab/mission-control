# Home page — HealthSummary: replace hardcoded cron health numbers

**Description:** In src/app/components/HealthSummary.tsx, replace the four hardcoded constant declarations (lines 2-5: `const cronHealthy = 32;`, `const cronTotal = 66;`, `const cronErrors = 18;`, `const cronIdle = 16;`) with dynamic calculations. Add import statement for `realCronJobs` from `src/app/crons/real-cron-data.ts`. Replace constants with: `const cronTotal = realCronJobs.length;`, `const cronHealthy = realCronJobs.filter(job => job.lastStatus === 'success').length;`, `const cronErrors = realCronJobs.filter(job => job.lastStatus === 'error').length;`, `const cronIdle = cronTotal - cronHealthy - cronErrors;`. The rest of the component logic remains unchanged.
**Success criteria:** Health summary numbers match the actual cron data on the Crons page.
**Off limits:** 
**Max files:** 2
