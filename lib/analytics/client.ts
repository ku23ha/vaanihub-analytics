/**
 * GA4 Analytics Data API client — SERVER-ONLY
 * Uses OAuth2 user credentials (required for Firebase-managed GA4 properties,
 * which reject service-account / service-principal authentication).
 *
 * Auth flow:
 *   OAuth2Client is initialised with the user's client_id + client_secret and
 *   a stored refresh_token. google-auth-library auto-refreshes the access token
 *   before each GA4 request, so no manual token management is required.
 *
 * One-time setup:
 *   Run `npm run oauth:setup` and follow the printed URL to generate a
 *   refresh token, then add it to .env.local.
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { OAuth2Client } from 'google-auth-library';

// Module-level singletons — created once per process/serverless cold-start
let _oauth2Client: OAuth2Client | null = null;
let _analyticsClient: BetaAnalyticsDataClient | null = null;

/**
 * Returns (or lazily creates) the OAuth2Client.
 * Exported so the oauth-setup script can reuse the same factory logic.
 */
export function getOAuth2Client(): OAuth2Client {
  if (_oauth2Client) return _oauth2Client;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing OAuth2 credentials. ' +
        'Set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET in .env.local. ' +
        'Run `npm run oauth:setup` to generate a refresh token.',
    );
  }

  if (!refreshToken) {
    throw new Error(
      'Missing GOOGLE_OAUTH_REFRESH_TOKEN. ' +
        'Run `npm run oauth:setup` to generate one, then add it to .env.local.',
    );
  }

  _oauth2Client = new OAuth2Client(clientId, clientSecret);

  // Set the stored refresh token — google-auth-library will auto-exchange it
  // for a short-lived access token before the first GA4 API call, and will
  // refresh it automatically whenever it expires.
  _oauth2Client.setCredentials({ refresh_token: refreshToken });

  return _oauth2Client;
}

/**
 * Returns a cached BetaAnalyticsDataClient authenticated via OAuth2.
 * Throws (and falls back to demo data in the API route) if credentials are absent.
 */
export function getAnalyticsClient(): BetaAnalyticsDataClient {
  if (_analyticsClient) return _analyticsClient;

  const authClient = getOAuth2Client();

  _analyticsClient = new BetaAnalyticsDataClient({ authClient });

  return _analyticsClient;
}

/** Returns the GA4 property resource string, e.g. "properties/347321374" */
export function getPropertyId(): string {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error('Missing GA4_PROPERTY_ID environment variable.');
  return `properties/${id}`;
}
