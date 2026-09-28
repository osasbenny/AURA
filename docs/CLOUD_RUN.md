# AURA Google Cloud Run Runbook

## Ownership and project

All setup must use the authorized Google account `osasbernie@gmail.com`. The Firebase/Google Cloud project is `aura-4c3a5`. The configured backend service is named `aura`, uses `europe-west1`, and exposes the existing Express entrypoint on the container `PORT` (default `8080`).

## Prerequisites

A project administrator must enable the Cloud Run Admin API and Artifact Registry API, then grant the authorized deployer permission to build/push the container and create or update Cloud Run services. These APIs are now enabled and the GitHub Cloud Build trigger is connected to `osasbenny/AURA` on `main`.

## Deployment shape

Build the repository `Dockerfile` from the project root and deploy it as a Cloud Run web service. The service must receive a public HTTPS URL so that Vercel can call `/api/health`, `/api/trpc`, and `/api/whatsapp/webhook`. Configure ingress for normal public HTTPS traffic, allow unauthenticated invocation for the public campaign experience, and use application-level Firebase token verification for protected procedures.

## Runtime configuration

Set these values in Google Secret Manager or Cloud Run runtime variables; never commit them to Git:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL/TiDB connection string |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin service-account email |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin private key, with escaped newlines handled by the server |
| `WHATSAPP_VERIFY_TOKEN` | Meta webhook verification token |
| `WHATSAPP_APP_SECRET` | Meta webhook HMAC secret |
| `WHATSAPP_ACCESS_TOKEN` | WhatsApp Cloud API token, when outbound messaging is activated |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp business phone number ID |
| `CORS_ORIGINS` | Comma-separated Vercel origin(s) |
| `NODE_ENV` | `production` |

`VITE_*` Firebase web configuration belongs in Vercel, not Cloud Run. `VITE_API_URL` must be set in Vercel to the final Cloud Run service URL after deployment and health verification.

## Verification sequence

After deployment, verify `GET https://<cloud-run-url>/api/health` returns a healthy response, then exercise the public campaigns query and authenticated Firebase request from the Vercel deployment. Configure Meta's callback URL as `https://<cloud-run-url>/api/whatsapp/webhook`, complete the verify-token challenge, and send a signed test event before enabling production WhatsApp delivery.

## Current deployment status

The first container build reached dependency installation but failed because the runtime image did not include the committed pnpm patch directory required by `pnpm install --prod --frozen-lockfile`. The Dockerfile now copies `patches/` into both build stages. Local typecheck, tests (8/8), and production build pass; rerun the connected Cloud Build trigger from `main` to publish the corrected image and obtain the service URL.
