# Test Plan

Unit: campaign transitions, authz, evidence rules, ledger math/idempotency, AI schemas. Integration: DB, storage, identity/payment sandboxes, webhooks, queues, WhatsApp and audit. E2E golden path: draft→evidence→identity/review→publish→test donation→verified webhook→ledger/reconciliation→notification/update→support handoff. Include duplicate/replay, unauthorized access, malicious upload, provider outage, queue failure, refund/dispute/payout sandbox and restore tests.
