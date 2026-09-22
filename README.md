# AURA — Human Generosity, Amplified by AI

AURA is a documentation-first foundation for a Nigeria-first, WhatsApp-led fundraising platform where AI reduces friction without weakening trust.

## Start here

1. Read [`MANUS.md`](MANUS.md) and [`RULES.md`](RULES.md).
2. Read [`docs/AURA_MASTER.md`](docs/AURA_MASTER.md) for the product and architecture source of truth.
3. Read [`docs/PRD.md`](docs/PRD.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/TASKS.md`](docs/TASKS.md), and [`docs/MANUS_BUILD_PROMPT.md`](docs/MANUS_BUILD_PROMPT.md).
4. Treat legal, payment, privacy, provider-approval, and production-readiness gates as blocking controls.

## Repository status

The repository currently contains the reconciled project documentation and legal working drafts. Application source, infrastructure, and tests are not yet implemented in this baseline. Do not infer that AWS, Vercel, WhatsApp, payment, identity, or production systems are configured from documentation alone.

## Intended structure

```text
apps/          web, api, worker, admin
packages/      shared UI, database, auth, payments, verification, AI, WhatsApp, and platform modules
infrastructure/ AWS infrastructure as code and environments
docs/          product, technical, operational, legal, and build documentation
scripts/       development and operational utilities
tests/         unit, integration, end-to-end, security, and failure tests
```

## Safety baseline

AURA is donation-based, not investment crowdfunding, lending, securities, crypto, or an internal wallet. AI must use typed, authorized tools; provider-verified events and an append-only ledger establish payment truth; private evidence and audit logs are mandatory; and sensitive or uncertain cases require human review.
