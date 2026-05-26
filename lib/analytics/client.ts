/**
 * GA4 Analytics Data API client — SERVER-ONLY
 * Never import this in client components or browser code.
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Module-level singleton to avoid re-instantiating on every request
let _client: BetaAnalyticsDataClient | null = null;

/** Return a cached GA4 BetaAnalyticsDataClient instance. */
export function getAnalyticsClient(): BetaAnalyticsDataClient {
  if (_client) return _client;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // The private key in .env uses literal \n — convert to real newlines
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error(
      'Missing GA4 credentials. ' +
        'Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in your .env.local file.',
    );
  }

  _client = new BetaAnalyticsDataClient({
    credentials: { client_email: clientEmail, private_key: privateKey },
  });

  return _client;
}

/** Returns the GA4 property resource string, e.g. "properties/347321374" */
export function getPropertyId(): string {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error('Missing GA4_PROPERTY_ID environment variable.');
  return `properties/${id}`;
}
