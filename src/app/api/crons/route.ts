import { NextResponse } from 'next/server';
import realCronData from '../../../routes/crons/real-cron-data';

export async function GET() {
  try {
    // In a real implementation, this would fetch from OpenClaw
    // For now, we'll use the real-cron-data.ts as fallback
    // with simulated "lastRun" times

    // Simulate live data by updating lastRun times
    const liveData = JSON.parse(JSON.stringify(realCronData.crons));
    liveData.forEach((cron: any) => {
      cron.lastRun = new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString();
    });

    return NextResponse.json({
      data: {
        crons: liveData,
        lastUpdated: new Date().toISOString(),
        source: 'OpenClaw (simulated)'
      }
    });
  } catch (error) {
    console.error('Error fetching cron data:', error);
    return NextResponse.json(
      {
        data: {
          crons: [],
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          lastUpdated: new Date().toISOString()
        }
      },
      { status: 500 }
    );
  }
}
