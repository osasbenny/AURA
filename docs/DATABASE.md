# Database & Data Lifecycle

Entities: User/Profile/Organization/Beneficiary/Campaign/Media/Update/Donation/Payment/Attempt/LedgerEntry/Payout/BankAccount/VerificationCase/Check/Evidence/RiskSignal/FraudCase/Report/Dispute/Conversation/Message/AISession/AIToolCall/Notification/AdminUser/Action/AuditLog. Enforce FK/unique provider event and idempotency keys, transactional transitions, append-only ledger, actor attribution and migration review. Minimize sensitive data; define access, retention, deletion and restore tests.
