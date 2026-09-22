# Architecture

WhatsApp/Web → API/auth → AI orchestration → typed tools → Campaign/Trust/Evidence/Payments/Support services → PostgreSQL + private object storage + queue/events → approved external providers. Suggested stack: Next.js/TypeScript/Tailwind, Node/NestJS or existing backend, PostgreSQL, Vercel, AWS managed services, private S3, queues, secret manager, CloudWatch. Reconcile against live repo. Server-side authorization; isolated environments; webhook idempotency; tested backups/restores.
