/**
 * Environment variables configuration
 * This file centralizes environment variable access to ensure consistency
 * across the application and provide proper TypeScript typing.
 */

export const CA_DATA_URL = process.env.CA_DATA_URL;

if (!CA_DATA_URL) {
  throw new Error('CA_DATA_URL environment variable is not set');
}

/**
 * Environment validation utility
 * Throws an error if required environment variables are missing
 */
export function validateEnvironment() {
  if (!CA_DATA_URL) {
    throw new Error('CA_DATA_URL environment variable is required');
  }
}
