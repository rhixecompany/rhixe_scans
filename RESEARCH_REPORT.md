# RESEARCH_REPORT.md

## Project: rhixe_scans

**Type:** Comic / scan reader platform
**Tech Stack:** Next.js 15, React 19, TypeScript strict, Prisma 6, PostgreSQL, Tailwind 3, shadcn/ui, NextAuth v5, Zustand, TanStack Query, Stripe, PayPal, UploadThing, Resend, WebSocket
**Status:** Active

---

## Similar Projects

| Project               | Relevance                                                             |
| --------------------- | --------------------------------------------------------------------- |
| comicwise             | Shared comic reader; Stripe + NextAuth + Tailwind + Drizzle migration |
| rhixecompany-comics   | Shared comic domain; consolidation target                             |
| university-libary-jsm | Shared Next.js + Prisma + PostgreSQL catalog patterns                 |
| Banking               | Shared NextAuth + payment flow patterns                               |

---

## Key Findings

### Prisma 6 Production Patterns (2026)

- **Global singleton** — prevents hot-reload connection leaks; configure per-environment
- **Connection pooling** — `DATABASE_URL` (pooled) + `DATABASE_DIRECT_URL` (migrations)
- **Prisma Accelerate** — production pooling for serverless; $49/mo Starter with free tier
- **Prisma 7 note:** TypeScript-only engine (3× faster queries); migrate when ecosystem matures

### Stripe + PayPal Dual Payment 2026

- **Stripe webhooks:** always `req.text()` then `constructEvent()`; return 200 fast, process async
- **PayPal:** `@paypal/react-paypal-js` frontend + server-side order capture verification
- **Embedded Checkout** — Stripe promotes iframe-based checkout keeping users on-domain
- **Webhook idempotency** — DB event-ID dedup prevents duplicate charges

### SSE vs WebSocket for Serverless

- **WebSocket breaks on Vercel serverless** — needs custom Node server or Fly.io
- **SSE (Server-Sent Events)** — built-in browser API, works over HTTP, ideal for notifications
- **Upstash QStash** — alternative for event-driven messaging without persistent connections

---

## Cheatsheets

| Topic           | Resource                                          |
| --------------- | ------------------------------------------------- |
| Next.js 15      | <https://nextjs.org/docs/app>                     |
| Prisma 6        | <https://www.prisma.io/docs>                      |
| Stripe Webhooks | <https://docs.stripe.com/webhooks>                |
| PayPal Orders   | <https://developer.paypal.com/docs/api/orders/v2> |
| UploadThing     | <https://docs.uploadthing.com>                    |

---

## Best Practices

1. **Prisma singleton** — global instance in `lib/prisma.ts` for connection lifecycle
2. **Separate connection strings** — `DATABASE_DIRECT_URL` for migrations, pooled URL for app
3. **Stripe `req.text()` first** — raw body required for signature verification
4. **Webhook idempotency** — database-event-id dedup before processing
5. **SSE over WebSocket** — when targeting Vercel serverless deployment
6. **Dual payment provider fallback** — PayPal as Stripe backup reduces left-on-table

---

## Common Pitfalls

| Pitfall                             | Impact                        | Avoidance                                   |
| ----------------------------------- | ----------------------------- | ------------------------------------------- |
| WebSocket on Vercel                 | Runtime failure               | Use SSE or custom Node server               |
| Stripe `req.json()`                 | Signature verify fails        | Always `req.text()` before parsing          |
| Prisma connection leaks             | Memory exhaustion             | Global singleton pattern                    |
| Missing idempotency                 | Duplicate charges             | DB event ID dedup in webhook handlers       |
| Single connection string for Prisma | Migration vs pooling conflict | Separate `DATABASE_DIRECT_URL` + pooled URL |

---

## Performance

1. **Prisma JOIN strategy** — `relationLoadStrategy: "join"` for relational data
2. **TanStack Query caching** — cache chapter listings; invalidate on new releases
3. **Image optimization** — UploadThing CDN for comic page images
4. **SSE for real-time** — lower overhead than WebSocket for serverless
5. **Preload next chapter** — prefetch via `<link rel="preload">` or TanStack Query prefetch

---

## Security

1. **Stripe webhook verification** — `constructEvent()` with endpoint secret
2. **PayPal order validation** — server-side capture verification (never trust client-only)
3. **Signed image URLs** — UploadThing secure URL tokens for paywalled content
4. **Rate limit auth endpoints** — protect against brute force (5 req/15min per IP)
5. **Idempotent webhooks** — prevent duplicate payment processing
6. **TanStack Query staleTime** — configurable cache invalidation to prevent stale data leaks

---

## Related Projects (in workspace)

- **comicwise** — shared comic reader; Stripe + NextAuth + Tailwind; Drizzle migration patterns
- **rhixecompany-comics** — consolidation target; shared comic domain architecture
- **Banking** — shared NextAuth + payment flow patterns
- **university-libary-jsm** — shared Next.js + Prisma/PostgreSQL catalog reference

---

## Resources

| Resource        | URL                                                                   |
| --------------- | --------------------------------------------------------------------- |
| Next.js 15      | <https://nextjs.org/docs>                                             |
| Prisma 6        | <https://www.prisma.io/docs>                                          |
| Stripe Webhooks | <https://docs.stripe.com/webhooks>                                    |
| PayPal API      | <https://developer.paypal.com/docs/api/orders/v2>                     |
| SSE MDN         | <https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events> |

### Research Methodology

- **Web search:** Tavily search (2026 Prisma 6, Stripe, PayPal, SSE patterns)
- **Last verified:** 2026-07-28
