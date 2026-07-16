# RESEARCH_REPORT.md

## Project: rhixe_scans

**Type:** Comic/scan reader platform
**Stack:** Next.js 15, React 19, TypeScript strict, Prisma 6, PostgreSQL, Tailwind 3, shadcn/ui, NextAuth v5, Zustand,
TanStack Query, Stripe, PayPal, UploadThing, Resend, WebSocket
**Status:** Active

---

## Similar Projects

| Project | Why Relevant |
|---------|--------------|
| comicwise (workspace) | Shared comic reader; Stripe + NextAuth + Tailwind |
| rhixecompany-comics (workspace) | Consolidation target; shared comic patterns |
| MangaReader (GitHub: siwachs) | Next.js manga reader, client-side patterns |

---

## Key Findings

**Docker multi-stage build** — 3-stage (deps → builder → runner) with `output: "standalone"` cuts image from ~1.6GB to ~200MB. Run Prisma migrations in a **separate init container** to avoid multi-replica race conditions.

**Prisma 6** (verified 2026) — Global singleton on `globalThis` prevents hot-reload leaks. Set `connection_limit` + `pool_timeout` in DATABASE_URL; PgBouncer transaction pooling saves serverless connections. CUID over UUID. `relationLoadStrategy: "join"` for relational queries. Prisma 6.19 added pooled Postgres connections.

**Dual payments** — Stripe webhooks need `request.text()` (raw body) before `constructEvent()`. PayPal: client approves → server calls `POST /v2/checkout/orders/{id}/capture`; verify `COMPLETED` server-side. Unify in `Subscription` table with `@@unique([provider, providerId])`. Use `PayPal-Request-Id` header for 6-hour idempotency. 2026 guidance: acknowledge webhooks fast, process async via queue, wrap idempotency + business logic in one DB transaction, run daily reconciliation.

**WebSockets** — Do not work on Vercel serverless. Use SSE (built-in, lower overhead) or custom Node/Fly.io server.

**Tailwind v4 note** — if migrating, v4 is CSS-first (`@import "tailwindcss"` + `@theme`), Rust engine (3–10× faster builds), drops `tailwind.config.js`.

---

## Docker Details

| Practice | Detail |
|----------|--------|
| Multi-stage | deps → builder (prisma generate + build) → runner (Alpine, non-root) |
| Standalone | `output: "standalone"` in next.config.ts |
| Init container | `prisma migrate deploy` — never from app replicas |
| Alpine | Add `libc6-compat` if native modules fail; use `sh` not `bash` |

---

## Dual Payment Strategy
Stripe Checkout (primary) + PayPal Orders v2 API (secondary). Unified `Subscription` model tracks `provider` + `providerId`. Webhook handlers use database transaction dedup for idempotency.

---

## Best Practices
1. Prisma singleton on `globalThis` with explicit `connection_limit`
2. Webhook idempotency via DB event-id dedup + `PayPal-Request-Id`
3. `request.text()` for Stripe raw body before signature verification
4. SSE over WebSocket for serverless real-time
5. Zod at every API boundary — never `as` cast
6. Server Actions for mutations (`"use server"`)

---

## Common Pitfalls

| Pitfall | Avoidance |
|---------|-----------|
| WebSocket on Vercel | SSE or custom Node server |
| Stripe body parsed as JSON | `request.text()` before parsing |
| Prisma connection leaks | Singleton + connection_limit |
| Missing idempotency | DB event ID dedup |
| Migrations from app container | Separate init container |
| Webhook routes behind auth middleware | Exclude `/api/webhooks/*` in matcher |

---

## Performance
1. **Composite indexes** — `@@index([comicId, chapterNumber])` for listing queries
2. **Prisma JOIN strategy** — `relationLoadStrategy: "join"` for relational data
3. **TanStack Query caching** — cache listings, invalidate on releases
4. **Standalone Docker** — ~8x smaller production images
5. **Preload next chapter** — TanStack Query prefetch or `<link rel="prefetch">`

---

## Security
1. **Webhook verification** — Stripe `constructEvent()` with raw body; PayPal header/cert validation
2. **Paywalled content** — verify subscription server-side before serving pages/API; signed URLs prevent bypass
3. **Preview gate** — server-side filter: unauthenticated users get first N pages
4. **NextAuth v5 CSRF** — built-in; never disable
5. **Rate limit auth + payment endpoints**
6. **Env validation** — Zod schema at startup; never commit `.env`

---

## Related Workspace Projects

| Project | Relevance |
|---------|-----------|
| comicwise | Stripe + NextAuth + Tailwind patterns |
| rhixecompany-comics | Consolidation target, shared domain |
| university-libary-jsm | Next.js + Prisma + PostgreSQL catalog |

---

## Resources

| Topic | URL |
|-------|-----|
| Next.js 15 | https://nextjs.org/docs |
| Prisma 6 | https://www.prisma.io/docs |
| Stripe Webhooks | https://docs.stripe.com/webhooks |
| PayPal Orders v2 | https://developer.paypal.com/docs/api/orders/v2 |
| Zod | https://zod.dev |
| UploadThing | https://docs.uploadthing.com |

**Methodology:** 9 web queries + 8 source extractions + official docs. Prisma 6 pooling, dual-payment idempotency, Tailwind v4 verified (2026-07-16).
