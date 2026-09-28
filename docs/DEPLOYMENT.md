# Deployment

Separate local/dev/staging/prod. CI: lint, typecheck, tests, build, dependency/secret scans. Deploy staging first; review migrations; run smoke/golden path; require explicit approval for production, live payments, public fundraising and payouts. Document rollback and database compatibility.

## Intended deployment boundary

The frontend is the existing Aura-V3 Vercel deployment. The backend is a Google Cloud Run service in Firebase project `aura-4c3a5`, using Firebase Admin for token verification and the existing MySQL/TiDB database for persistence. The frontend transport reads `VITE_API_URL`; it must point to the permanent Cloud Run service URL, never to a Manus preview URL. Configure the Firebase public web variables in Vercel and Firebase Admin/WhatsApp/database secrets in Google Secret Manager or Cloud Run runtime variables.

The Cloud Run GitHub trigger is configured under the authorized Google Cloud account `osasbernie@gmail.com` for project `aura-4c3a5` and service `aura` in `europe-west1`. The first image build failed during the runtime-stage frozen dependency install because `patches/` was omitted from that stage; the Dockerfile now includes it in both stages. Local typecheck, tests (8/8), and production build pass. Rerun the trigger from `main`, then set `VITE_API_URL` to the resulting service URL after `/api/health` verification.

Before live WhatsApp activation, configure the Meta callback URL to the deployed API webhook path, set the verify token and app secret, confirm HMAC verification with a signed test event, and only then enable message delivery. The current webhook intentionally persists inbound events but does not send outbound messages.
