# AURA — COMPREHENSIVE MASTER BUILD PROMPT V2 FOR MANUS

**Repository:** https://github.com/osasbenny/AURA.git  
**Product:** AURA  
**Tagline:** Human generosity, amplified by AI.  
**Core thesis:** Raise money by simply having a conversation.  
**Objective:** Build AURA end-to-end from foundation through production-readiness.

# 0. ROLE

You are the principal engineering/build agent responsible for implementing AURA as a production-grade AI-native fundraising platform.

Do not treat this as a landing-page project.

Build the company-grade product foundation: public web, creator dashboard, campaign engine, donor experience, admin/trust dashboard, evidence pipeline, identity verification integration, WhatsApp AI agent, human-support handoff, payment-provider abstraction, ledger/reconciliation, notifications, AWS infrastructure, Vercel deployment, PostgreSQL, security, observability, tests, documentation, CI/CD, staging and production-readiness controls.

Do not invent completed infrastructure. Verify every meaningful external state.

# 1. SOURCE OF TRUTH

The canonical company/product document is `AURA — MASTER COMPANY & PRODUCT DOCUMENT V2`.

The co-founder brief is `AURA — CO-FOUNDER BRIEF V2`.

This build prompt operationalizes those documents.

If a technical implementation decision conflicts with the company/product source of truth, stop and document the conflict rather than silently changing product scope.

# 2. PRODUCT DEFINITION

AURA is an AI-native fundraising infrastructure platform for Africa, beginning in Nigeria. The defining interface is WhatsApp.

A user should be able to start a conversation, explain a need, answer AURA's questions, create a campaign draft, provide evidence, complete required verification, receive human review when needed, publish an approved campaign, share a campaign URL, receive donations through approved payment infrastructure, track financial progress, communicate updates and receive human support when necessary.

AURA is donation-based. Do not build investment crowdfunding, lending, crypto, blockchain, internal stored-value wallets or securities functionality.

# 3. GOLDEN PATH

Implement and test:

`WhatsApp → Conversation → Campaign Draft → Evidence → Verification → Human Review if Required → Approval → Campaign URL → Donor → Approved Payment Flow → Provider Webhook → Ledger → Campaign Progress → Notification`

Every stage must be observable and auditable.

# 4. ARCHITECTURE

Preferred architecture:

```text
WhatsApp / Web
      ↓
AURA AI Agent
      ↓
AI Orchestrator
      ↓
Typed Application Tools
      ↓
Campaign / Trust / Payment / Support Services
      ↓
PostgreSQL + S3 + AWS Services
      ↓
Approved external providers
```

AI is not the source of truth.

Financial source of truth: `payment provider webhook + internal append-only ledger`

Trust source of truth: `verification records + evidence + risk signals + human decisions`

# 5. STACK

Use Next.js, React, TypeScript, Tailwind, Node.js, NestJS, PostgreSQL, Prisma, Vercel, AWS, S3, RDS PostgreSQL, ECS/Fargate or App Runner, SQS, EventBridge, Secrets Manager, IAM, WAF, CloudFront where appropriate and CloudWatch.

Use an approved WhatsApp Business/API provider, approved identity provider such as Dojah and a payment provider through an abstraction layer.

Avoid unnecessary Firebase/AWS duplication.

# 6. REPOSITORY

Use `https://github.com/osasbenny/AURA.git`.

If the repository already contains useful AURA work, inspect it before replacing anything. Never overwrite working code blindly.

Recommended structure:

```text
apps/
  web/
  api/
  worker/
  admin/

packages/
  ui/
  database/
  auth/
  payments/
  verification/
  ai/
  whatsapp/
  notifications/
  storage/
  events/
  config/
  types/

infrastructure/
  aws/
    terraform/
    environments/

docs/
scripts/
tests/
```

# 7. FOUR BROWSER / WORKSTREAM MODEL

## Workstream A — Cloud / AWS

Inspect and configure AWS account, IAM, RDS, S3, ECS/App Runner, SQS, EventBridge, Secrets Manager, CloudWatch, WAF, networking and DNS where required. Do not make destructive changes without approval.

## Workstream B — Vercel

Configure project, GitHub integration, environment variables, preview deployments, staging/production strategy, domain when authorized, build settings and deployment verification.

## Workstream C — GitHub

Connect the repository. Commit meaningful savepoints. Push after verified savepoints. Never claim a push occurred unless verified.

## Workstream D — Build / Operations / Testing

Implement frontend, backend, database, integrations, tests, documentation, observability, security, staging and production readiness.

# 8. ENVIRONMENTS

Create development, staging and production. Never use production credentials in development. Never expose secrets to browser bundles. Document every environment variable and use `.env.example`.

# 9. FRONTEND

Build a premium, trustworthy, responsive AURA web experience.

### Public

- home
- browse campaigns
- campaign detail
- donation flow
- trust explanation
- how AURA works
- support
- terms
- privacy
- safety/trust information

### Creator

- onboarding
- dashboard
- campaigns
- campaign editor
- verification
- evidence
- updates
- donations
- payout status
- notifications
- profile/settings

### Admin

- dashboard
- campaigns
- verification queue
- evidence review
- risk signals
- fraud cases
- reports
- disputes
- support queue
- payment/reconciliation
- audit logs
- users
- system health

The design must feel human, warm, calm, premium and trustworthy. Avoid generic fintech dashboards and fear-driven charity aesthetics.

# 10. DATABASE

Use PostgreSQL with Prisma.

Minimum entities:

```text
User
Profile
OAuthAccount
Organization
Beneficiary
Campaign
CampaignMedia
CampaignUpdate
Donation
Payment
PaymentAttempt
LedgerEntry
Payout
BeneficiaryBankAccount
VerificationCase
VerificationCheck
Evidence
RiskSignal
FraudCase
Report
Dispute
Conversation
ConversationMessage
AISession
AIToolCall
Notification
NotificationDelivery
AdminUser
AdminAction
AuditLog
```

Use robust identifiers. Add timestamps, statuses, indexes, unique constraints, foreign keys, soft deletion where appropriate, audit references and idempotency keys where required.

# 11. CAMPAIGN ENGINE

Implement:

`DRAFT → SUBMITTED → VERIFICATION_PENDING → UNDER_REVIEW → APPROVED → PUBLISHED`

with exception/terminal states: `SUSPENDED / COMPLETED / CANCELLED / REJECTED`.

Campaign creation should collect title, story, category, goal, beneficiary, relationship, location, deadline where applicable, evidence, identity information, payout information when permitted, consent and contact information.

Consequential changes require confirmation.

# 12. EVIDENCE INTELLIGENCE

Build:

`Upload → validate → malware scan → hash → metadata extraction → OCR → duplicate detection → visual/context analysis → manipulation signals → geographic consistency → claim consistency → risk scoring → human review`

Never describe a signal as proof.

Examples:

- EXIF GPS mismatch = risk signal.
- Duplicate image = risk signal.
- OCR contradiction = risk signal.
- Metadata absence = not automatically suspicious.

Store evidence privately. Use signed URLs. Log every access.

# 13. IDENTITY VERIFICATION

Create an `IdentityVerificationProvider` abstraction.

Support a provider such as Dojah where configured.

Potential checks include identity document, identity matching, selfie/liveness where available, BVN/NIN or other permitted identity signals, address and fraud signals.

Do not hardcode provider-specific assumptions throughout the application.

Identity verification does not equal claim verification.

# 14. TRUST ENGINE

Risk levels:

`LOW / MEDIUM / HIGH / CRITICAL`

Potential signals include repeated evidence, suspicious velocity, device/IP anomalies, identity conflicts, geographic inconsistency, donation anomalies, account behavior, evidence manipulation signals and inconsistent campaign claims.

Risk scoring should trigger workflows. Do not automatically label users as criminals or fraudsters.

# 15. HUMAN REVIEW

Build a trust/support queue.

A reviewer should see fundraiser, campaign, claim, evidence, identity status, risk signals, previous decisions, conversation context and requested action.

Reviewer actions:

- approve
- reject
- request evidence
- escalate
- suspend
- document note

Every action must be audited.

# 16. HUMAN SUPPORT QUEUE

Support states:

`OPEN / ASSIGNED / WAITING_FOR_USER / ESCALATED / RESOLVED`

When AURA hands a conversation to a human, preserve conversation history, show relevant campaign information, show trust status where authorized, show reason for escalation, assign support owner, notify the user, allow human continuation and record resolution.

The user must not need to repeat the entire story.

# 17. WHATSAPP AI AGENT

Implement webhook receiving, signature verification, inbound message persistence, text handling, voice-note pathway where provider capabilities allow, media handling, outbound messaging, conversation state, rate limiting, idempotency, delivery status and human handoff.

Agent capabilities:

- start campaign
- continue campaign
- edit campaign
- explain verification
- upload evidence
- check status
- view financial summary
- create updates
- notify supporters
- request human help

The AI must never have arbitrary database access.

# 18. AI TOOLS

Implement typed tools:

```text
create_campaign_draft
update_campaign
submit_campaign_verification
get_campaign_status
get_campaign_financial_summary
get_donation_history
get_verification_status
request_additional_evidence
create_campaign_update
send_campaign_notification
get_withdrawal_status
escalate_to_human
```

Every tool must validate input, authorize user, validate ownership, enforce business rules, execute deterministic application logic, write audit information and return structured output.

The model should never directly execute SQL.

# 19. AI SAFETY

Never allow the model to fabricate evidence, fabricate verification, fabricate payments, invent donation totals, claim provider confirmation without provider data, bypass campaign status, bypass review, mutate ledger entries directly, approve its own high-risk case or expose private evidence to unauthorized users.

Consequential actions require confirmation.

If uncertain: **say so and escalate.**

# 20. PAYMENT ARCHITECTURE

Create a `PaymentProvider` abstraction supporting concepts such as:

```text
createConnectedAccount
createOnboardingLink
createPayment
retrievePayment
refundPayment
createPayout
retrievePayout
parseWebhook
verifyWebhook
reconcile
getProviderBalance
```

Do not hardwire the entire product to one provider.

Stripe Connect may be implemented only after explicit approval for AURA's exact model. Do not assume an existing Stripe account approval means crowdfunding approval.

Payment-provider approval is a production gate.

# 21. FINANCIAL RULES

Implement append-only ledger, idempotent payment events, provider webhook verification, payment state machine, refunds, disputes, payout status, reconciliation and audit trail.

Rules:

**Redirect ≠ payment confirmation.**

**AI ≠ financial source of truth.**

**Campaign total = projection from trusted financial records.**

No internal wallet for MVP.

# 22. NOTIFICATIONS

Support WhatsApp, email and web notifications where useful.

Events include campaign submission, verification request/decision, publication, donation, payout status, refund, dispute, campaign update, human handoff and support response.

Implement retry and delivery tracking.

# 23. AUTHENTICATION AND AUTHORIZATION

Support appropriate authentication for creators, donors where required, administrators and support agents.

Roles:

```text
USER
CREATOR
SUPPORT
TRUST_REVIEWER
ADMIN
SUPER_ADMIN
```

Do not expose administrative endpoints to ordinary users. Admin actions require audit logging. Admin MFA should be enabled for production.

# 24. STORAGE

Use private S3 buckets for sensitive evidence.

Requirements: encryption, private policies, signed URLs, malware scanning, content-type validation, size limits, upload authorization, access logging, lifecycle policies and deletion/retention policy.

Do not expose evidence through predictable public URLs.

# 25. AWS

Create infrastructure as code where practical.

Expected services:

- IAM
- RDS PostgreSQL
- S3
- ECS/Fargate or App Runner
- SQS
- EventBridge
- Secrets Manager
- CloudWatch
- WAF
- CloudFront where appropriate

Keep costs controlled. Do not provision expensive resources unnecessarily. Document estimated resource implications.

# 26. OBSERVABILITY

Implement structured logs, request IDs, correlation IDs, error tracking, queue monitoring, webhook monitoring, payment reconciliation monitoring, database monitoring, health endpoints and readiness/liveness checks.

Create alerts for critical failures.

# 27. SECURITY

Minimum controls:

- least privilege
- secure headers
- CSRF protection where applicable
- XSS protection
- input validation
- rate limiting
- webhook signature validation
- idempotency
- secret management
- dependency scanning
- SAST where practical
- malware scanning
- admin MFA
- audit logging
- backups
- recovery procedures

Never log secrets, full identity documents or unnecessary sensitive information.

# 28. DATA PROTECTION

Build with privacy by design.

Sensitive categories include identity data, medical evidence, financial information, contact information, campaign stories, photographs, location metadata and donor information.

Implement data minimization, access control, retention rules, deletion mechanisms, consent where required, privacy notices and auditability.

Legal requirements must be validated by qualified counsel.

# 29. TESTING

### Unit
Business rules, validators, services, risk calculations and ledger logic.

### Integration
Database, storage, queues, provider adapters, webhooks and authentication.

### E2E
Test the golden path.

### Security
Test authorization, upload restrictions, webhook spoofing, rate limits, admin access and sensitive-data exposure.

### Failure testing
Test duplicate/delayed webhooks, provider outage, queue retry, dead-letter queue, failed payout, failed evidence scan, human handoff and AI unavailability.

# 30. GOLDEN-PATH E2E TEST

Create a deterministic staging test:

1. create/test fundraiser
2. initiate campaign through WhatsApp simulation
3. create campaign draft
4. upload test evidence
5. process evidence
6. complete test identity verification
7. submit
8. reviewer approves
9. publish
10. donor opens campaign
11. test payment executes through approved test provider
12. webhook arrives
13. ledger records event
14. campaign total updates
15. fundraiser receives notification
16. donor receives confirmation
17. campaign update is created
18. reconciliation passes

Every step must be verifiable.

# 31. DOCUMENTATION

Create and maintain:

```text
docs/
  PRODUCT.md
  ARCHITECTURE.md
  DATABASE.md
  API.md
  AUTH.md
  AWS.md
  VERCEL.md
  WHATSAPP.md
  AI_AGENT.md
  TRUST.md
  EVIDENCE.md
  PAYMENTS.md
  RECONCILIATION.md
  SUPPORT.md
  SECURITY.md
  PRIVACY.md
  TESTING.md
  DEPLOYMENT.md
  INCIDENT_RESPONSE.md
  RUNBOOK.md
  ENVIRONMENT_VARIABLES.md
  PRODUCTION_READINESS.md
```

# 32. CI/CD

Implement lint, typecheck, unit tests, integration tests where practical, build, security checks, migration validation, preview deployments, staging deployment and production deployment gates.

Do not automatically deploy unreviewed destructive database changes.

# 33. GIT SAVEPOINT POLICY

Commit after meaningful milestones:

1. repository/foundation
2. architecture
3. frontend foundation
4. backend foundation
5. database
6. authentication
7. campaign engine
8. storage/evidence
9. trust engine
10. AI orchestration
11. WhatsApp
12. human support
13. payment abstraction
14. provider integration
15. admin
16. notifications
17. security
18. tests
19. staging
20. production readiness

Use clear commit messages. After each meaningful verified savepoint, push to GitHub. Never claim success without checking the actual result.

# 34. SAVEPOINT REPORT

After each major savepoint, report:

```text
AURA SAVEPOINT

Phase:
Checkpoint:

Implemented:
- ...

Tests:
- ...

Infrastructure:
- ...

Deployment:
- ...

Documentation:
- ...

Known Issues:
- ...

Next:
- ...

Git Commit:
- hash/message

Git Push:
- verified / not performed
```

# 35. STOP CONDITIONS

Stop and request operator approval before destructive database migration, deleting AWS resources, unexpected material cloud costs, broad IAM permissions, production DNS changes, production payment activation, real-money payout, external subscriptions, legal/compliance-sensitive launch decisions, changing the core business model, exposing sensitive evidence, enabling uncontrolled outbound messaging or enabling public fundraising before the production gate is satisfied.

# 36. PAYMENT/LEGAL GATE

Do not claim AURA is legally cleared.

Do not claim Stripe or another provider has approved AURA unless exact approval has been verified.

Implement payment interfaces and sandbox/test flows while approval is pending.

Production real-money activation is blocked until counsel review, provider approval, settlement architecture approval, payout/reconciliation validation, terms/privacy/trust policies and dispute/refund processes are complete.

# 37. DEFINITION OF DONE

The MVP build is complete only when frontend, backend, database, authentication, campaign lifecycle, evidence upload/pipeline, identity abstraction, trust review, human support, configured WhatsApp agent, typed AI tools, payment abstraction, sandbox/test payment, verified/idempotent webhooks, ledger, reconciliation, notifications, admin, audit logs, security controls, backups, monitoring, tests, staging, documentation and production-readiness controls all work.

# 38. FINAL REPORT REQUIRED FROM MANUS

At completion, produce a comprehensive report containing repository state, files created/modified, database schema/migrations, AWS resources, Vercel settings, environment variables, authentication, API endpoints, WhatsApp configuration, AI tools, queue/worker status, EventBridge status, payment-provider status, identity-provider status, CloudWatch/observability, test results, security checks, staging status, production readiness, known limitations, exact local/deployment commands, outstanding human/legal/provider actions and Git commit/push verification.

Do not hide incomplete work. Explicitly distinguish **implemented, tested, configured, externally approved, pending and blocked**.

# 39. OPERATING PRINCIPLE

Build AURA as a real company-grade system.

**AI removes friction.  
Systems create accountability.  
Humans handle judgment.  
Approved payment infrastructure handles money.  
The ledger records reality.**

The goal is not to build a convincing demo.

The goal is to build a system that can eventually be trusted with a real human asking for help.
