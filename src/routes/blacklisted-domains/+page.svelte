<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  // Format date for display
  const formattedDate = new Date(data.data.lastUpdated).toLocaleString();
</script>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Blacklisted Domains</h1>

    {#if data.data.error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        Error loading data: {data.data.error}
      </div>
    {/if}

    <div class="bg-gray-50 p-6 rounded-lg">
      <p class="text-gray-600 mb-4">
        Data last updated: {formattedDate}
        {#if data.data.source}
          | Source: <code class="text-sm">{data.data.source}</code>
        {/if}
      </p>

      {#if data.data.blacklistedDomains.length > 0}
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-4 text-left">Domain</th>
                <th class="py-2 px-4 text-left">Reason</th>
                <th class="py-2 px-4 text-left">Added</th>
              </tr>
            </thead>
            <tbody>
              {#each data.data.blacklistedDomains as domain}
                <tr class="border-b">
                  <td class="py-2 px-4">{domain.domain}</td>
                  <td class="py-2 px-4">{domain.reason || 'N/A'}</td>
                  <td class="py-2 px-4">{domain.addedDate ? new Date(domain.addedDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {else}
        <p class="text-gray-500">No blacklisted domains found.</p>
      {/if}
    </div>
  </div>
</main>
