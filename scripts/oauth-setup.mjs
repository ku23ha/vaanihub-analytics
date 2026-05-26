#!/usr/bin/env node
/**
 * scripts/oauth-setup.mjs
 *
 * One-time helper: exchanges a Google OAuth2 authorisation code for a
 * refresh token that you then store in GOOGLE_OAUTH_REFRESH_TOKEN.
 *
 * Usage
 * ─────
 *   1.  Fill in GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET
 *       in .env.local (leave GOOGLE_OAUTH_REFRESH_TOKEN blank for now).
 *
 *   2.  npm run oauth:setup
 *
 *   3.  Open the printed URL in the browser that is signed in to the Google
 *       account which owns the Firebase / GA4 project.
 *
 *   4.  Grant access when prompted.
 *
 *   5.  The script prints the refresh token — paste it into .env.local as
 *       GOOGLE_OAUTH_REFRESH_TOKEN=<value>
 *
 *   6.  Restart the dev server.  Real GA4 data should now appear.
 *
 * Security notes
 * ──────────────
 * • This script only runs locally — never deploy it.
 * • The refresh token is a long-lived secret; treat it like a password.
 * • The local HTTP server (port 9876) starts, handles one callback, then exits.
 * • .env.local is gitignored, so the token stays off version control.
 */

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// ── Load .env.local without a full dotenv dependency ─────────────────────────

const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dir, '..', '.env.local');

try {
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env.local may not exist yet — values must come from the env directly
}

// ── Validate inputs ───────────────────────────────────────────────────────────

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || CLIENT_ID === '') {
  console.error('\n❌  GOOGLE_OAUTH_CLIENT_ID is not set in .env.local\n');
  console.error(
    '    Create an OAuth 2.0 Client ID at:\n' +
      '    https://console.cloud.google.com/apis/credentials\n',
  );
  process.exit(1);
}
if (!CLIENT_SECRET || CLIENT_SECRET === '') {
  console.error('\n❌  GOOGLE_OAUTH_CLIENT_SECRET is not set in .env.local\n');
  process.exit(1);
}

// ── OAuth2 flow ───────────────────────────────────────────────────────────────

const REDIRECT_URI = 'http://localhost:9876/oauth/callback';
const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

// Build the authorisation URL manually — no extra deps needed
const authParams = new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  response_type: 'code',
  scope: SCOPES.join(' '),
  access_type: 'offline',
  prompt: 'consent',  // ensures refresh_token is always returned
});

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${authParams}`;

console.log('\n' + '─'.repeat(70));
console.log('  Vaani Hub — GA4 OAuth2 Setup');
console.log('─'.repeat(70));
console.log('\n  1. Open this URL in the browser signed in to your Firebase/GA4 account:\n');
console.log(`     ${authUrl}\n`);
console.log('  2. Grant access when prompted.');
console.log('  3. Your refresh token will appear here automatically.\n');
console.log('─'.repeat(70) + '\n');
console.log('  Waiting for OAuth callback on http://localhost:9876 …\n');

// ── One-request local HTTP server to capture the code ────────────────────────

const server = createServer(async (req, res) => {
  if (!req.url?.startsWith('/oauth/callback')) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const url = new URL(req.url, 'http://localhost:9876');
  const code = url.searchParams.get('code');
  const errorParam = url.searchParams.get('error');

  if (errorParam) {
    const msg = `OAuth error: ${errorParam}`;
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end(msg);
    console.error(`\n❌  ${msg}\n`);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('No authorisation code in callback URL');
    server.close();
    process.exit(1);
  }

  // Exchange authorisation code for tokens
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();

    if (!tokenRes.ok || !tokens.refresh_token) {
      throw new Error(
        tokens.error_description ??
          tokens.error ??
          `Token exchange failed (HTTP ${tokenRes.status}). ` +
            'Make sure the OAuth consent screen is configured and ' +
            'this account has access to the GA4 property.',
      );
    }

    // ── Success ───────────────────────────────────────────────────────────────

    const successHtml = `
<!DOCTYPE html>
<html>
<head><title>OAuth Setup Complete</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 640px; margin: 3rem auto; padding: 0 1.5rem; }
  pre  { background:#f4f4f5; border-radius:8px; padding:1rem; overflow-x:auto; font-size:0.85rem; }
  .ok  { color:#10b981; font-weight:700; font-size:1.1rem; }
  .label { color:#6b7280; font-size:0.85rem; margin-bottom:0.25rem; }
</style>
</head>
<body>
  <p class="ok">✅ Refresh token obtained successfully!</p>
  <p>Add the following line to your <code>.env.local</code>, then restart the dev server:</p>
  <p class="label">GOOGLE_OAUTH_REFRESH_TOKEN=</p>
  <pre>${tokens.refresh_token}</pre>
  <p style="color:#6b7280;font-size:0.85rem;">You can close this window.</p>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(successHtml);

    console.log('✅  Success!\n');
    console.log('  Add this line to your .env.local:\n');
    console.log(`  GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    console.log('  Then restart the dev server:  npm run dev\n');
    console.log('─'.repeat(70) + '\n');

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${msg}`);
    console.error(`\n❌  Token exchange failed: ${msg}\n`);
  } finally {
    server.close();
  }
});

server.listen(9876, () => {
  // Server ready — waiting for browser callback
});

server.on('error', (err) => {
  if (/** @type {any} */ (err).code === 'EADDRINUSE') {
    console.error('\n❌  Port 9876 is already in use. Stop any process using it and retry.\n');
  } else {
    console.error('\n❌  Server error:', err.message, '\n');
  }
  process.exit(1);
});
