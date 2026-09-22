# PROJECT AURA V1 — Unified Master Document

**Status:** Product + architecture foundation
**Version:** 1.0
**Date:** September 2026

> **Human generosity, amplified by AI.**

## Executive Summary
AURA is an AI-powered global donation and fundraising platform beginning in Nigeria. Its defining interface is WhatsApp: a person can describe their need in ordinary language, including a voice note, and AURA can guide them through campaign creation, evidence collection, verification, publication, donation management and updates. The public web provides discovery, trust, campaign presentation and donation checkout.

AURA is donation-based. It is not investment crowdfunding, lending, securities, or an internal wallet.

## Core Thesis
**Raise money by simply having a conversation.**

## Product Promise
AURA reduces the technical and emotional friction of asking for help while increasing transparency and trust.

## Architecture
Web + WhatsApp → AURA Agent → AI Orchestrator → typed application tools → Campaign Engine / Trust Engine / Payment Engine → PostgreSQL / S3 / AWS services / approved payment and verification providers.

The AI is an orchestration layer, not the financial or verification source of truth.

## Trust Architecture
AURA separates four questions:
1. Person — who is the fundraiser?
2. Claim — what is being claimed?
3. Evidence — what supports it?
4. Financial — where can funds settle?

Tier 1 uses contact verification, campaign evidence and automated risk analysis. Tier 2 adds enhanced KYC/beneficiary/financial checks. A campaign threshold such as ₦500,000 is a configurable AURA product policy, not a claim about Nigerian law.

## Evidence Intelligence
AURA Evidence Intelligence™ processes uploaded evidence through validation, malware scanning, hashing, metadata extraction, OCR, duplicate detection, visual/context analysis, manipulation signals, geographic consistency, claim consistency and risk scoring. EXIF/GPS is only a signal; it is not proof because metadata can be stripped or altered.

## Financial Architecture
AURA uses an append-only ledger. Payment-provider webhooks are idempotently reconciled into AURA records. Campaign totals are projections. AURA should not implement an internal stored-value wallet.

## Stripe Gate
Stripe currently treats crowdfunding platforms as a restricted category with limited availability and says an approved crowdfunding platform is one approved by Stripe to use Stripe Connect to enable fundraising. Therefore production payment integration must wait for explicit provider approval and confirmation of the exact Connect architecture.

## MVP Golden Path
WhatsApp → conversation → campaign draft → verification → publication → campaign URL → donor → approved payment flow → donation confirmation → ledger → campaign progress → fundraiser notification.

## Technology
- Next.js / React / TypeScript / Tailwind
- NestJS / Node.js
- PostgreSQL / Prisma
- AWS RDS, S3, CloudFront, ECS/Fargate or App Runner, SQS, EventBridge, Secrets Manager, WAF, CloudWatch
- WhatsApp Business/API
- Stripe Connect subject to approval
- Dojah for Tier 2 verification
- Google OAuth

## Repository Structure
apps/web, apps/api, apps/worker, apps/admin; packages for UI, database, auth, payments, verification, AI, WhatsApp, notifications, storage, events, config and types; infrastructure and documentation directories.

## Core Data Model
Users, profiles, OAuth accounts, organizations, beneficiaries, campaigns, media, updates, donations, payments, payment attempts, ledger entries, payouts, beneficiary bank accounts, verification cases/checks/evidence, risk signals, fraud cases, reports, disputes, conversations/messages, AI sessions/tool calls, notifications/deliveries, admin users/actions and audit logs.

## Security
Least privilege, private evidence, signed uploads, encryption, secret management, rate limiting, webhook verification, idempotency, malware scanning, audit logging, admin MFA, dependency/security scanning, incident response and tested backups.

## AI Safety
No fabricated facts. No fabricated evidence. No unsupported verification claims. No arbitrary database access. No direct financial mutation by the model. No unrestricted KYC context. Consequential actions require confirmation. High-risk or uncertain cases go to human review.

## Brand
AURA is human, warm, intelligent, calm, trustworthy, hopeful, modern and global. Avoid cold fintech or bureaucratic charity aesthetics. Visual language should suggest connection, light, presence and human energy.

## Revenue Options
Platform fee, optional donor contribution, premium campaign promotion, NGO subscriptions/analytics/CRM, and future API/infrastructure products, subject to provider, regulatory and commercial approval.

## Launch Strategy
Nigeria-first invite-only beta. Initial campaign categories: medical, emergency, education, family/community. Expand toward diaspora giving and broader African/global markets after trust, payment and operational controls are proven.

## Explicit Non-Goals
Investment crowdfunding, lending, crypto, internal wallets, blockchain, social network, native mobile apps, ad marketplace and excessive provider complexity.

## Build Gate
Before production: payment-provider approval, legal/compliance review, data-protection assessment, trust-and-safety procedures, payout/reconciliation design, security review and end-to-end golden-path testing.

## Artifact Index
- `01_Product_Foundation.md`
- `02_PRD_v1.0.md`
- `03_Brand_Identity.md`
- `04_UX_Technical_Architecture.md`
- `05_Engineering_Master_Plan.md`
- `06_PostgreSQL_and_Prima_Schema.md`
- `07_REST_API_and_OpenAPI.md`
- `08_AWS_Infrastructure.md`
- `09_Stripe_Connect_Integration_Guide.md`
- `10_Dojah_Integration_Guide.md`
- `11_WhatsApp_Integration_Guide.md`
- `12_Google_OAuth_Guide.md`
- `13_AURA_Agent_System_Prompt_and_Tools.md`
- `14_Evidence_Intelligence.md`
- `15_Admin_Dashboard_Spec.md`
- `16_Security_Compliance_Checklist.md`
- `17_CI_CD_Deployment.md`
- `18_MVP_Task_Backlog.md`
- `19_Developer_Master_Build_Prompt.md`
- `20_OpenAPI_Starter.yaml`

## Important Current Provider Note
Stripe's current published policy (May 13, 2026) places crowdfunding platforms under restricted businesses with limited availability and directs prospective platforms to contact Stripe. Stripe's FAQ defines an approved crowdfunding platform as one approved to use Stripe Connect for donor fundraising. This is a production gate, not an optional recommendation.

## Final Product Definition
AURA is a conversational generosity platform: a human can tell AURA what help is needed, AURA helps turn the story into a structured and reviewable fundraising campaign, trust controls increase confidence, approved payment infrastructure enables giving, and the same agent helps manage the human relationship after the campaign goes live.