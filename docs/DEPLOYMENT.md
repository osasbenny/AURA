# Deployment

Separate local/dev/staging/prod. CI: lint, typecheck, tests, build, dependency/secret scans. Deploy staging first; review migrations; run smoke/golden path; require explicit approval for production, live payments, public fundraising and payouts. Document rollback and database compatibility.

## Current deployment boundary

The frontend is the existing Aura-V3 Vercel deployment. The backend is the managed AURA API and exposes `/api/health`, `/api/trpc`, and `/api/whatsapp/webhook`. The frontend transport reads `VITE_API_URL`; set it to the deployed API origin in Vercel rather than committing an environment file. Configure Firebase public web variables in Vercel and Firebase Admin/WhatsApp secrets in the backend secret store.

Before live WhatsApp activation, configure the Meta callback URL to the deployed API webhook path, set the verify token and app secret, confirm HMAC verification with a signed test event, and only then enable message delivery. The current webhook intentionally persists inbound events but does not send outbound messages.
