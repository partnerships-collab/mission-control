import type { PageServerLoad } from './$types';
import { CA_DATA_URL } from '$lib/env';

/**
 * Server load function for blacklisted domains page
 * This serves as the reference implementation for data fetching patterns
 * in this SvelteKit application.
 */
export const load: PageServerLoad = async () => {
  try {
    // Validate environment before making requests
    if (!CA_DATA_URL) {
      throw new Error('CA_DATA_URL environment variable is not set');
    }

    // Fetch data from the configured endpoint
    const response = await fetch(CA_DATA_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      data: {
        blacklistedDomains: data,
        lastUpdated: new Date().toISOString(),
        source: CA_DATA_URL
      }
    };
  } catch (error) {
    console.error('Error loading blacklisted domains:', error);
    return {
      data: {
        blacklistedDomains: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        lastUpdated: new Date().toISOString()
      }
    };
  }
};
