# Changelog

## 2026-09-23 — Firebase, Aura-V3, and WhatsApp backend savepoint
- Replaced the Manus OAuth/runtime scaffold with Firebase Admin verification and Firebase Google sign-in; Google provider is enabled in Firebase project `aura-4c3a5`.
- Integrated the existing Aura-V3 frontend source without redesigning it, restored Firebase-authenticated tRPC transport, and retained the Cactus Digital Media footer credit.
- Added signed Meta-compatible WhatsApp webhook verification at `/api/whatsapp/webhook`, idempotent event capture, conversation/message persistence, and focused webhook tests.
- Added migration `0003_careless_riptide.sql` and applied the three WhatsApp persistence tables plus indexes to the managed database.
- Verified `pnpm check`, `pnpm test` (4 files / 8 tests), `pnpm build`, managed API health, webhook rejection behavior, and the deployed Aura-V3 Vercel frontend (HTTP 200).
- Managed checkpoint: `17d6c5d2`.
- WhatsApp provider credentials, Meta Business approval, API hosting URL, and Vercel environment-variable wiring remain required before live delivery; no outbound WhatsApp messages are sent yet.

## 2026-09-22 — GitHub author correction savepoint
- Rewrote the AURA `main` history so all four commits use the `osasbenny` GitHub identity.
- Force-pushed the corrected history to `osasbenny/AURA` after explicit user approval.
- Verified remote `origin/main`: `31c3935fdcad2f6de1d6e579da1046b157e134df`.
- Preserved a local recovery ref at `backup/pre-author-rewrite`; it is not a remote branch.

## 2026-09-22 — first application execution savepoint
- Initialized the managed full-stack AURA project from the comprehensive build prompt.
- Implemented the public landing experience and authenticated private campaign-draft flow.
- Added the initial auditable `campaigns` schema, migration, public discovery procedure, creator listing procedure, and validated draft-creation procedure.
- Added focused tests for public discovery, authentication, and input validation.
- Verification: `pnpm check` passed; 2 test files / 4 tests passed; `pnpm build` passed with a non-blocking bundle-size warning.
- Managed project checkpoint: `bc18023f`.
- The managed scaffold uses Drizzle with MySQL/TiDB rather than the preferred PostgreSQL/Prisma target in the product prompt; this is recorded as a provisional execution constraint and is not a final architecture decision.
- Payment, WhatsApp, identity, evidence processing, production infrastructure, real-money flows, and provider approvals remain pending or gated.
- GitHub synchronization is limited to source, schema, tests, and build configuration; no external provider or production changes were made.

## 2026-09-22 — repository foundation savepoint
- Audited the authenticated central repository before editing; it contained only the initial README commit.
- Merged the AURA documentation pack, legal working drafts, environment template, and repository rules without replacing existing Git history.
- Updated the root README to distinguish documented intent from implemented or externally configured systems.
- No secrets, cloud resources, deployments, payments, payouts, DNS, IAM, or production changes were made.
- Tests were not run because this savepoint contains documentation only.
- Commit: `3571f9eafa6250096600f75211c369aac7083cf5` (`chore: establish AURA documentation foundation`).
- GitHub push: verified; `origin/main` matched the commit after push.

## 2026-09-22 — documentation baseline
- Organized AURA project documentation and legal working drafts into a standard structure.
- Live repository state, tests, deployment, commit and push are not verified by this pack creation.
