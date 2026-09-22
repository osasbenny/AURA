# Deployment

Separate local/dev/staging/prod. CI: lint, typecheck, tests, build, dependency/secret scans. Deploy staging first; review migrations; run smoke/golden path; require explicit approval for production, live payments, public fundraising and payouts. Document rollback and database compatibility.
