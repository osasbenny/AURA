# Project Memory

## Provider account rule

All Firebase and Google Cloud setup for AURA must use the authorized owner account `osasbernie@gmail.com`. Do not switch to another Google account during project creation, Firebase Authentication configuration, Cloud Run deployment, or secret setup.

## 2026-09-23 Firebase, Aura-V3, and WhatsApp savepoint

The managed AURA checkpoint `17d6c5d2` contains Firebase-backed auth transport, the unchanged Aura-V3 frontend design, campaign-draft wiring, and the first WhatsApp backend core. Firebase project `aura-4c3a5` is owned under `osasbernie@gmail.com`; Google sign-in is enabled. The API verifies Meta webhook HMAC signatures, deduplicates inbound events, and persists conversations and messages in MySQL/TiDB tables. The live Vercel frontend and managed API health endpoint were both reachable during verification.

Live WhatsApp delivery is intentionally not claimed: `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`, `WHATSAPP_PHONE_NUMBER_ID`, and `WHATSAPP_ACCESS_TOKEN` still need to be provisioned through the deployment secret workflow, and Meta webhook configuration/approval remains pending. No credentials belong in this file.

AURA — Human generosity, amplified by AI. Core promise: raise money by simply having a conversation. Nigeria-first, Africa ambition; WhatsApp + web + human support. Pillars: AURA AI, Trust, Payments, Human. Production money flows require legal and provider approval. Keep secrets and unnecessary personal data out of this file.

## 2026-09-22 GitHub author correction

The central `osasbenny/AURA` `main` history was rewritten with explicit approval so the four existing commits are attributed to `osasbenny` using the verified GitHub noreply identity. Remote verification matched `31c3935fdcad2f6de1d6e579da1046b157e134df`. The Aura-V3 frontend repository is a separate existing source of truth and has been cloned for integration; its visual design is to remain unchanged.

## 2026-09-22 repository foundation savepoint

The authenticated central repository `osasbenny/AURA` was audited before editing. Its `main` branch contained only the initial README commit. The documentation pack and legal working drafts were merged into the repository as the first foundation savepoint. No application code, infrastructure, provider configuration, deployment, or production payment capability is claimed by this savepoint.

Foundation commit `3571f9eafa6250096600f75211c369aac7083cf5` was pushed and independently verified against `origin/main`.

## 2026-09-22 first application execution savepoint

The managed AURA project checkpoint `bc18023f` contains the first verified product slice: public landing experience, authenticated private campaign-draft creation, initial campaigns schema and tRPC procedures, and focused unit tests. Type checking, four tests, and production build passed. The managed scaffold uses Drizzle with MySQL/TiDB rather than the preferred PostgreSQL/Prisma target; treat that as provisional until the architecture is deliberately reconciled. Payments, WhatsApp, identity, evidence processing, production infrastructure, and real-money flows remain pending or gated.
