/**
 * Vercel Serverless Function: Automated Global Safe SEO Push
 * Endpoint: /api/auto-seo-push
 * 
 * Features:
 * - Secured via SEO_PUSH_SECRET or Vercel CRON_SECRET
 * - Invokes core engine from /scripts/auto-seo-push.mjs
 * - Returns structured JSON status for monitoring and cron health checks
 */

import { runAutoSeoPush } from '../scripts/auto-seo-push.mjs';

export default async function handler(req, res) {
  // Allow only GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({
      ok: false,
      error: `Method ${req.method} not allowed. Use GET or POST.`
    });
  }

  // Security Check: authenticate via Bearer token, header x-seo-secret, or query param
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : '';
  const customHeader = req.headers['x-seo-secret'] || '';
  const querySecret = (req.query && req.query.secret) || '';

  const expectedSecret = process.env.SEO_PUSH_SECRET;
  const cronSecret = process.env.CRON_SECRET;

  const isConfigured = Boolean(expectedSecret || cronSecret);

  if (isConfigured) {
    const isAuthorized =
      (expectedSecret && (token === expectedSecret || customHeader === expectedSecret || querySecret === expectedSecret)) ||
      (cronSecret && token === cronSecret);

    if (!isAuthorized) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized: Missing or invalid secret token.'
      });
    }
  }

  try {
    const isForce = req.query && (req.query.force === 'true' || req.query.force === '1');
    const isDryRun = req.query && (req.query.dry_run === 'true' || req.query.dry_run === '1');

    const result = await runAutoSeoPush({
      force: isForce,
      dryRun: isDryRun
    });

    const statusCode = result.ok ? 200 : 500;
    return res.status(statusCode).json({
      ok: result.ok,
      urlsPinged: result.urlsPinged,
      indexNowSubmitted: result.indexNowSubmitted,
      schemaChecked: result.schemaChecked,
      linksRotated: result.linksRotated,
      sitemapUpdated: result.sitemapUpdated,
      timestamp: result.timestamp,
      durationMs: result.durationMs,
      details: result.details,
      warning: !isConfigured ? 'Warning: SEO_PUSH_SECRET not set in environment. Set it in Vercel project settings for strict security.' : undefined
    });
  } catch (error) {
    console.error('[API /api/auto-seo-push] Uncaught error:', error);
    return res.status(500).json({
      ok: false,
      error: error.message || 'Internal server error during SEO push execution.',
      timestamp: new Date().toISOString()
    });
  }
}
