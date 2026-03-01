<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  // Initial data from load function
  export let data: PageData;

  // State for live data
  let liveCrons = data.crons;
  let isLoading = false;
  let error: string | null = null;

  // Polling interval
  let pollingInterval: number | null = null;

  // Format date for display
  function formatLastRun(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return `${Math.floor(diffMins / 1440)} days ago`;
  }

  // Fetch live data
  async function fetchLiveData() {
    if (isLoading) return;
    isLoading = true;
    error = null;

    try {
      const response = await fetch('/api/crons');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      liveCrons = result.data.crons;
    } catch (err) {
      console.error('Error fetching live cron data:', err);
      error = err instanceof Error ? err.message : 'Failed to fetch live cron data';
      // Fallback to initial data if live fetch fails
      liveCrons = data.crons;
    } finally {
      isLoading = false;
    }
  }

  // Start polling
  function startPolling() {
    // Initial fetch
    fetchLiveData();

    // Set up polling
    pollingInterval = window.setInterval(fetchLiveData, 60000) as unknown as number;
  }

  // Clean up polling on unmount
  onMount(() => {
    startPolling();
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  });
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Cron Jobs</h1>

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      {error}
    </div>
  {/if}

  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-3 px-4 border-b text-left">Name</th>
          <th class="py-3 px-4 border-b text-left">Schedule</th>
          <th class="py-3 px-4 border-b text-left">Last Run</th>
          <th class="py-3 px-4 border-b text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {#each liveCrons as cron}
          <tr class="hover:bg-gray-50">
            <td class="py-3 px-4 border-b">{cron.name}</td>
            <td class="py-3 px-4 border-b">{cron.schedule}</td>
            <td class="py-3 px-4 border-b">
              {formatLastRun(cron.lastRun)}
            </td>
            <td class="py-3 px-4 border-b">
              <span class={`px-2 py-1 rounded-full text-xs ${cron.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {cron.enabled ? 'Active' : 'Disabled'}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="mt-4 text-sm text-gray-500">
    {#if isLoading}
      <span>Refreshing data...</span>
    {/if}
    Last updated: {new Date().toLocaleTimeString()}
  </div>
</div>
