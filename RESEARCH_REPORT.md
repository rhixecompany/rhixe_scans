# RESEARCH_REPORT.md

## Project: rhixe_scans

**Type:** Comic / scan reader platform
**Tech Stack:** Next.js 15, React 19, TypeScript strict, Prisma 6, PostgreSQL, Tailwind 3, shadcn/ui, Radix, NextAuth v5, Zustand, TanStack Query, Stripe, PayPal, UploadThing, Resend, WebSocket
**Status:** Active

---

## Similar Projects

| Project | URL | Why Relevant |
|---------|-----|--------------|
| comicwise | `projects/comicwise` | Shared comic reader; Stripe + NextAuth + Tailwind |
| rhixecompany-comics | `projects/rhixecompany-comics` | Shared comic reader; consolidation target |
| university-libary-jsm | `projects/university-libary-jsm` | Shared Next.js + Prisma + PostgreSQL catalog |
| Banking | `projects/Banking` | Shared NextAuth + payment patterns |

---

## Key Findings

### Next.js 15 App Router + WebSocket Streams
- WebSockets do NOT work on Vercel serverless — require custom Node server or Fly.io
- **Alternative**: Server-Sent Events (SSE) for serverless-compatible real-time updates
- SSE is built-in browser API, works over standard HTTP, ideal for notifications/progress
- For WebSocket: use custom Node server with `ws` library or Socket.io with adapter

### Prisma 6 Patterns
- Global singleton in `lib/prisma.ts` prevents hot-reload connection leaks
- `prisma.config.ts` (new in 6.x) for configuration; migration from 5.x updates setup
- Prisma Accelerate for serverless connection pooling
- **Performance**: JOIN strategy selection (`relationLoadStrategy: "join" | "query"`)
- Nested creates batched in single round-trip since v5.11

### Stripe + PayPal Dual Payment
- Stripe webhooks in App Router: **must use `request.text()` (not `request.json()`)** for signature verification
- PayPal: `@paypal/react-paypal-js` frontend + server-side order capture validation
- Always idempotent webhook handlers using database transactions
- Webhook router pattern: typed handlers per event type for maintainability

---

## Cheatsheets & Quick Reference

| Topic | Resource | Type |
|-------|----------|------|
| Next.js 15 App Router | <https://nextjs.org/docs/app> | Docs |
| Prisma 6 | <https://www.prisma.io/docs> | Docs |
| Stripe Webhooks | <https://docs.stripe.com/webhooks> | Guide |
| PayPal Orders API | <https://developer.paypal.com/docs/api/orders/v2> | API Docs |

---

## Best Practices

1. **Prisma singleton** — global instance in `lib/prisma.ts` for connection lifecycle
2. **Webhook idempotency** — database-event-id dedup before processing
3. **SSE over WebSocket** — when targeting Vercel serverless deployment
4. **Stripe `request.text()` before parsing** — signature verification requires raw body
5. **Dual payment provider fallback** — PayPal as Stripe backup reduces left-on-table

---

## Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| WebSocket on Vercel | Runtime failure | Use SSE or custom Node server |
| Stripe raw body parsing | Signature verify fails | `request.text()` before JSON parsing |
| Prisma connection leaks | Memory exhaustion | Global singleton pattern |
| Missing idempotency | Duplicate charges | DB event ID dedup in webhook handlers |

---

## Performance

1. **Prisma JOIN strategy** — `relationLoadStrategy: "join"` for relational data
2. **TanStack Query caching** — cache chapter listings, invalidate on new releases
3. **Image optimization** — UploadThing CDN for comic page images
4. **SSE for real-time** — lower overhead than WebSocket for serverless
5. **Preload next chapter** — prefetch via `<link rel="preload">` or TanStack Query prefetch

---

## Security

1. **Stripe webhook verification** — `constructEvent()` with endpoint secret
2. **Signed image URLs** — UploadThing secure URL tokens for paywalled content
3. **NextAuth v5 CSRF** — built-in protection for all auth flows
4. **Rate limit auth endpoints** — protect against brute force
5. **Idempotent webhooks** — prevent duplicate payment processing

---

## Related Projects (in workspace)

- **comicwise** — shared comic reader; Stripe + NextAuth + Tailwind patterns
- **rhixecompany-comics** — consolidation target; shared comic domain patterns
- **university-libary-jsm** — Next.js + Prisma + PostgreSQL catalog reference
- **Banking** — shared NextAuth + payment flow patterns

---

## Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Next.js 15 | <https://nextjs.org/docs> | Framework documentation |
| Prisma 6 | <https://www.prisma.io/docs> | ORM documentation |
| Stripe Webhooks | <https://docs.stripe.com/webhooks> | Webhook integration |
| UploadThing | <https://docs.uploadthing.com> | File uploads |

### Research Methodology
- **Web search:** web_search (2026 Next.js + Prisma patterns)
- **Documentation:** web_extract (Prisma, Stripe, PayPal docs)
- **Real-time research:** SSE vs WebSocket for serverless
- **Last verified:** 2026-07-16
