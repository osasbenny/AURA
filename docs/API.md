# API Baseline

Candidate resources: auth, campaigns, evidence, trust cases, donations/checkout, provider webhooks, payouts, updates, WhatsApp webhooks, support, reports and admin audit. Validate paths/schemas against code. Protected routes require server authz; validate inputs; use idempotency for consequential writes; stable errors, pagination, rate limits and safe logs. AI tools: create/update campaign draft, submit verification, get status/financial summary/history, request evidence, create update, prepare notification, get withdrawal status, escalate to human.
