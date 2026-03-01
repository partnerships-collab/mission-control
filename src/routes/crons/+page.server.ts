import type { PageServerLoad } from './$types';
import realCronData from './real-cron-data';

export const load: PageServerLoad = async () => {
  try {
    // Use real-cron-data.ts as fallback
    return {
      data: {
        crons: realCronData.crons,
        lastUpdated: new Date().toISOString(),
        source: 'real-cron-data.ts (fallback)'
      }
    };
  } catch (error) {
    console.error('Error loading cron data:', error);
    return {
      data: {
        crons: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        lastUpdated: new Date().toISOString()
      }
    };
  }
};
