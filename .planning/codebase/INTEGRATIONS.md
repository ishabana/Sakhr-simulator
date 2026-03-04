# External Integrations

**Analysis Date:** 2026-01-11

## APIs & External Services

**Not applicable** - This is a self-contained client-side application with no external service dependencies.

## Data Storage

**File System:**
- Local file system only - Static HTML, JavaScript, CSS, JSON, images, audio files
- No database
- No cloud storage
- Configuration: JSON files (`ch1/sc1/scene.json`, `ch1/scenes.json`)

**Caching:**
- Browser cache only (automatic)
- No Redis, Memcached, or custom caching

## Authentication & Identity

**Not applicable** - No authentication system. This is a public, standalone simulator.

## Monitoring & Observability

**Error Tracking:**
- Browser console only (`console.log`, `console.warn`, `console.error`)
- Example: `engine/engine.js` logs "Unknown action" warnings
- No Sentry, Rollbar, or error reporting service

**Analytics:**
- None

**Logs:**
- Browser DevTools console only

## CI/CD & Deployment

**Hosting:**
- Not hosted - Runs locally via file:// protocol
- Target platform: Raspberry Pi local filesystem

**CI Pipeline:**
- None - Manual file copying for deployment

## Environment Configuration

**Development:**
- No environment variables
- Configuration embedded in HTML files
- Example: `ch1/ch1-player.html` has inline `CHAPTER_CONFIG`

**Staging:**
- Not applicable

**Production:**
- Same as development - static files copied to Raspberry Pi
- No secrets or environment-specific configs

## Webhooks & Callbacks

**Not applicable** - No server-side functionality, webhooks, or external callbacks.

---

*Integration audit: 2026-01-11*
*Update when adding/removing external services*
