# Web Research: rhixe_scans — Full-Stack Comic Reader Platform

## Research Question

What are the best practices, common pitfalls, security considerations, and performance optimization tips for building a production-grade comic/manga reader platform using PostgreSQL, React, Next.js 15, TypeScript (strict), Prisma 6, Docker, Stripe, PayPal, and Tailwind CSS?

---

## Source Map

| # | Title | URL | Authority |
|---|-------|-----|-----------|
| 1 | Prisma ORM Production Guide: Next.js Complete Setup 2025 | https://www.digitalapplied.com/blog/prisma-orm-production-guide-nextjs | Production engineering blog |
| 2 | Next.js and Prisma in Docker — textbook | https://blog.jonrshar.pe/2024/Dec/24/nextjs-prisma-docker.html | Engineering blog |
| 3 | Stripe for Next.js: Complete Integration Guide (Webhooks, Subscriptions, Payments) | https://designrevision.com/blog/stripe-nextjs | SaaS engineering blog |
| 4 | Complete Next.js Security Guide 2026 | https://www.turbostarter.dev/blog/complete-nextjs-security-guide-2025-authentication-api-protection-and-best-practices | SaaS starter blog |
| 5 | How to integrate Next.js and Prisma with PostgreSQL Using Docker | https://www.rootstrap.com/blog/how-to-integrate-next-js-and-prisma-with-postgresql-using-docker | Engineering consultancy blog |
| 6 | Docker Compose Next.js + PostgreSQL + Redis Stack | https://oneuptime.com/blog/post/2026-02-08-how-to-set-up-a-nextjs-postgresql-redis-stack-with-docker-compose/view | DevOps blog |
| 7 | Full-Stack TypeScript for 2026: Next.js, Node, Postgres | https://nirajiitr.com/blog/full-stack-typescript-2026-nextjs-node-postgres | Developer blog |
| 8 | Next.js 15 Project Structure: Full-Stack Guide (2026) | https://www.groovyweb.co/blog/nextjs-project-structure-full-stack | Engineering blog |
| 9 | How to Handle Stripe and Paystack Webhooks in Next.js (App Router) | https://dev.to/thekarlesi/how-to-handle-stripe-and-paystack-webhooks-in-nextjs-the-app-router-way-5bgi | DEV Community |
| 10 | PayPal Orders v2 API Reference | https://developer.paypal.com/docs/api/orders/v2/ | Official PayPal docs |
| 11 | MangaReader — Full-Stack Next.js Manga Reader | https://github.com/siwachs/Manga-Reader | GitHub reference project |
| 12 | Next.js 16.2 Tutorial: 400% Faster Dev Server (2026) | https://tech-insider.org/nextjs-tutorial-full-stack-app-2026 | Tutorial blog |
| 13 | An Inconsistent Truth: Next.js and Type Safety | https://t3.gg/blog/post/types-and-nextjs | t3.gg engineering blog |
| 14 | Warning: Think Twice Before Using Prisma in Large Projects (Reddit) | https://www.reddit.com/r/nextjs/comments/1i9zvyy/warning_think_twice_before_using_prisma_in_large | r/nextjs community discussion |

---

## 1. PostgreSQL + Prisma 6

### Best Practices

#### Singleton Client Pattern (Critical)
In Next.js development, hot-reloading creates new `PrismaClient` instances without a singleton. Each instance opens its own connection pool (`num_cpus * 2 + 1` connections). The standard production pattern stores the client on `globalThis` to survive hot reloads:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
export default prisma
```
*Source: Digital Applied, Prisma ORM Production Guide*

#### Connection Pooling Configuration
- Default pool size: `num_cpus * 2 + 1`
- For serverless: **start with `connection_limit=1`** and optimize upward
- Pool timeout should be set explicitly (e.g., `pool_timeout=30`)
- Connect timeout protects against hanging initial connections

Example production connection string:
```
DATABASE_URL="postgresql://user:password@db.example.com:5432/production?schema=public&connection_limit=5&pool_timeout=20&connect_timeout=10"
```
*Source: Digital Applied*

#### Schema Design Guidelines
- **Use native database types** — `@db.VarChar(255)`, `@db.Text`, `@db.Timestamptz(3)` instead of generic Prisma types
- **Index strategically** — add `@@index([foreignKey])` on all foreign keys, composite indexes for common query patterns
- **Cascade deletes** — use `onDelete: Cascade` for dependent records (e.g., chapters deleted when a comic is deleted)
- **Table naming** — `@@map("snake_case_name")` for DB tables while keeping PascalCase in Prisma models
- **ID strategy** — CUID is recommended over UUID for Next.js apps (collision-resistant, URL-safe, sortable by creation time)
*Source: Digital Applied*

#### Migration Strategy
- Development: `prisma migrate dev`
- Production: `prisma migrate deploy` — **never** run `db:push` in production
- Run migrations as a separate init container in Docker/Kubernetes to avoid race conditions between multiple app instances
*Source: Jonathan Sharpe blog, Digital Applied*

### Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Missing singleton on hot reload | Connection pool exhaustion -> "too many connections" | globalThis pattern (see above) |
| No connection_limit in serverless | Database connection exhaustion from concurrent functions | Start at connection_limit=1, scale up |
| Forgetting `npx prisma generate` in Docker build | Runtime client not found | Add RUN step in Docker builder stage |
| Prisma bigint causing JS issues | Number overflow in large datasets | Avoid BigInt where possible; use String for IDs |
| Memory leaks in long-running containers | Heap growth over time | Singleton + connection pooling limits |
| Running migrations from app container on multi-instance | Race conditions | Separate init container for migrations |
| Query performance from N+1 on relational data | Slow page loads | Use `include` / `relationLoadStrategy: "join"` | 
*Sources: Digital Applied, GitHub vercel/next.js discussion #53580, r/nextjs community*

### Performance Tips
- Use `relationLoadStrategy: "join"` for relational queries (since Prisma 5.x)
- Enable `fullTextSearch` and `fullTextIndex` preview features for full-text search on comic descriptions/titles
- Batch nested creates — since Prisma 5.11, nested creates execute in a single round-trip
- Prisma Accelerate provides HTTP-based connection pooling + global caching for serverless deployments
*Source: Digital Applied, Prisma docs*

### Known Concerns for Large Projects
Prisma has trade-offs at scale: type generation can slow on large schemas, query performance limitations with deeply nested relations, and migration complexity. For a comic reader with moderate schema complexity, Prisma is appropriate — but monitor query performance as the data model grows.
*Source: r/nextjs "Warning: Think twice before using Prisma in large projects"*

---

## 2. React + Next.js 15 App Router

### Best Practices

#### Project Structure (2026)
Modern Next.js 15 structure with App Router (default):

```
my-app/
├── app/
│   ├── (auth)/          # Route group for auth pages
│   │   └── login/page.tsx
│   ├── (reader)/        # Route group for reader pages
│   │   ├── comic/[slug]/page.tsx
│   │   └── chapter/[id]/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── webhooks/stripe/route.ts
│   │   └── webhooks/paypal/route.ts
│   └── layout.tsx       # Root layout
├── components/          # Shared components
├── lib/                 # Shared utilities
├── prisma/              # Schema + migrations
└── next.config.ts
```
*Source: Niraj Kumar, GroovyWeb*

#### Server Components by Default
- Every file in `/app` is a React Server Component by default unless `"use client"` is specified
- Fetch data directly in Server Components — no need for API routes for initial data
- Server Actions handle form submissions and mutations without explicit API routes
*Source: GroovyWeb, Next.js 16.2 Tutorial*

#### Type Safety Recommendations
Next.js has an "inconsistent" type safety story — types from `params`, `searchParams`, and database queries don't automatically connect. Best practices:
- Use Zod for runtime validation at every API boundary
- Infer types from Prisma models using `Prisma.UserGetPayload<{...}>`
- Never type-assert without validation — prefer `.parse()` over `as` casts
*Source: t3.gg "An Inconsistent Truth", Niraj Kumar*

### Common Pitfalls

| Pitfall | Impact | Avoidance |
|---------|--------|-----------|
| Forgetting `"use client"` on interactive components | Hydration errors, broken event handlers | Explicit `"use client"` directive at top of file |
| Stripe webhook body parsed as JSON | Signature verification fails | Use `req.text()` before parsing, never `req.json()` |
| Global middleware protecting webhook routes | Payment providers hit login page | Exclude webhook paths in middleware `config.matcher` |
| Missing `output: "standalone"` in next.config.ts | Docker images ~1.6GB | Enable standalone mode for minimal Docker images |
| Mutating state without Server Actions | Unnecessary client-side API calls | Use `"use server"` functions for mutations |
*Sources: dev.to/thekarlesi, Jonathan Sharpe blog, Next.js docs*

### Performance Tips
- **Standalone output** for Docker reduces image size dramatically (cuts `node_modules` to runtime deps only)
- **Turbopack** (Next.js 15.5+/16.x) provides 400% faster dev server rebuilds
- **Streaming** with `loading.tsx` and `Suspense` for chapter page content
- **Prefetch** next chapter via `<link rel="prefetch">` or TanStack Query prefetch
- Lazy load reader components that aren't immediately visible
*Sources: Tech Insider Next.js 16.2 Tutorial, Next.js docs*

---

## 3. Docker + Prisma + PostgreSQL

### Best Practices — Multi-Stage Docker Build

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```
*Sources: Jonathan Sharpe, OneUptime, Rootstrap*

### Docker Compose for Development

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/rhixe_scans
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: rhixe_scans
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d rhixe_scans"]
      interval: 10s
      timeout: 5s
      retries: 5
```
*Sources: OneUptime, Rootstrap*

### Critical Docker Details for Prisma
1. **`npx prisma generate`** must run during build — the Prisma query engine binary must be compatible with Alpine (musl libc)
2. **Copy `prisma/` directory** into final stage — needed for migrations at startup
3. **Standalone mode** — enable `output: "standalone"` in `next.config.ts` to ship a minimal production image
4. **`.dockerignore`** — exclude `node_modules/`, `.next/`, `.git/`, `*.md`, `.env*.local`
5. **`host.docker.internal`** — use instead of `localhost` when connecting from container to host database
*Sources: Jonathan Sharpe, Stack Overflow, OneUptime*

### Pitfalls
- Alpine can have build issues with native modules — if `libc6-compat` needed, add `RUN apk add --no-cache libc6-compat`
- Running `npx prisma migrate deploy` in the app container causes race conditions with multiple replicas — use init containers instead
- Node Alpine doesn't include `bash` or other common tools — use `sh` / `ash` in entrypoint scripts
*Source: Jonathan Sharpe*

---

## 4. Stripe Integration

### Best Practices

#### Webhook Handler (App Router)
The golden pattern for Stripe webhooks in Next.js 15:

```typescript
// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // CRITICAL: Use req.text() — NOT req.json()
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature')!;
    
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed':
        // Grant access
        break;
      case 'invoice.paid':
        // Renew subscription
        break;
      case 'customer.subscription.updated':
        // Sync plan changes
        break;
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
```
*Sources: dev.to/thekarlesi, DesignRevision, HashBuilds*

#### Project Structure for Dual Payments
```
app/
  api/
    webhooks/
      stripe/route.ts
      paypal/route.ts
    create-checkout/route.ts
    create-portal/route.ts
lib/
  stripe.ts              # Server-side Stripe instance
  stripe-client.ts       # Client-side loader
  stripe-helpers.ts      # Shared utilities
```
*Source: DesignRevision*

#### Architecture Principles
- **Server-only secrets**: `STRIPE_SECRET_KEY` stays in `lib/stripe.ts` — never in client code
- **Client-side**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` only for `@stripe/stripe-js` initialization
- **Data flow**: User Action → Route Handler → Stripe API → Webhook → Database → UI Update
- **Idempotency**: Use database event ID dedup before processing webhook events
*Source: DesignRevision, RESEARCH_REPORT.md*

### Common Pitfalls
1. **Webhook signature failure** — always use `req.text()` (raw body) before parsing, never `req.json()`
2. **Missing webhook path exclusion** — ensure middleware doesn't require authentication on `/api/webhooks/*`
3. **Multiple `loadStripe()` calls** — use singleton promise pattern to avoid loading Stripe.js more than once
4. **No idempotency** — webhooks can be delivered multiple times; use database transaction dedup
*Sources: dev.to/thekarlesi, DesignRevision*

---

## 5. PayPal Integration

### Best Practices

#### Orders v2 API Pattern
PayPal's recommended modern integration uses the Orders v2 REST API with a server-side capture flow:

1. **Client**: Render PayPal buttons via `@paypal/react-paypal-js` or PayPal JS SDK
2. **Client → PayPal**: Buyer approves payment via PayPal popup
3. **Client → Your Server**: Send order ID to your backend
4. **Server → PayPal**: `POST /v2/checkout/orders/{order_id}/capture` to authorize and capture
5. **Server → Database**: Record completed transaction

#### Server-Side Order Capture
```typescript
// Server Action or Route Handler
export async function capturePayPalOrder(orderId: string) {
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        // PayPal-Request-Id for idempotency (stored 6 hours)
        'PayPal-Request-Id': crypto.randomUUID(),
      },
    }
  );
  
  const data = await response.json();
  
  if (data.status === 'COMPLETED') {
    // Record in database, grant access
    return { success: true, data };
  }
  
  throw new Error(`PayPal capture failed: ${data.message}`);
}
```
*Source: PayPal Orders v2 API Reference*

#### Getting an Access Token
```typescript
async function getPayPalAccessToken(): Promise<string> {
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    }
  );
  const data = await response.json();
  return data.access_token;
}
```
*Source: PayPal API docs*

### Pitfalls
- **Sandbox vs Live URLs**: Use `https://api-m.sandbox.paypal.com` during development, `https://api-m.paypal.com` in production
- **Idempotency**: Use `PayPal-Request-Id` header to prevent duplicate captures (stored for 6 hours)
- **Order status validation**: Always verify `status === 'COMPLETED'` on the server — never trust the client
- **Error handling**: PayPal v2 API returns 400/422 errors with structured JSON — parse and handle gracefully
- **Webhook verification**: PayPal sends webhooks with `PAYPAL-AUTH-ALGO` headers; verify using PayPal's certificate chain
*Sources: PayPal API Reference, RESEARCH_REPORT.md*

---

## 6. Security (Platform-Wide)

### Critical Security Layers

#### Webhook Security
- **Stripe**: `stripe.webhooks.constructEvent(rawBody, signature, secret)` — uses raw body text, never pre-parsed JSON
- **PayPal**: Verify webhooks using `PAYPAL-AUTH-ALGO` / `PAYPAL-CERT-URL` headers and PayPal's public certificate
- Both: Idempotency keys stored in database transactions prevent duplicate processing

#### Authentication & Authorization (NextAuth v5)
- 🔴 **Never trust client-side auth state** — always verify session on the server
- **Route protection**: Use Next.js middleware for page-level access control; use server-side session checks in API routes
- **CSRF protection**: NextAuth v5 has built-in CSRF protection; do not disable it
- **Rate limit auth endpoints** with middleware or a library to prevent brute force
*Source: TurboStarter Security Guide*

#### API Route Protection
- **Input validation**: Use Zod schemas on ALL API inputs — both on the client side and server side
- **Injection prevention**: Prisma parameterizes queries, but watch for raw SQL via `$queryRawUnsafe`
- **Error messages**: Don't leak internal details — return generic error messages in production
- **Rate limiting**: Implement rate limiting on payment APIs and auth endpoints
*Source: TurboStarter Security Guide*

#### Comic/Content Security
- **Paywalled content access**: Always verify subscription status on the server before serving chapter pages or API responses
- **Signed image URLs**: Use UploadThing's secure URL tokens for paywalled comic pages so direct URL access doesn't bypass payment
- **Preview vs full**: Serve only preview pages (first N pages) to unauthenticated/non-subscribed users via server-side filtering
- **Download protection**: Don't expose full-resolution images in the browser if download prevention is desired; use CDN with referrer checking
*Source: Hackmamba paywall guide, UploadThing docs*

#### Environment Variable Security
- Use Zod or a validation library to validate all environment variables at startup (fail fast if missing)
- Never commit `.env` files — use `.env.example` as template
- For Docker: pass secrets via environment variables or Docker secrets, never hardcode in compose files
*Source: TurboStarter "Envin" pattern*

### Dependency Security
- Run `npm audit` or `bun audit` regularly
- Use Dependabot or Renovate for automated dependency updates
- The JavaScript ecosystem has supply chain risks — vet new dependencies before adding them
*Source: TurboStarter Security Guide*

---

## 7. Performance Optimization

### Database Layer
- **Prisma JOIN strategy**: Use `relationLoadStrategy: "join"` for fetching comic chapters with metadata
- **Composite indexes**: Create `@@index([comicId, chapterNumber])` for chapter listing queries
- **Prepared statements**: Prisma uses prepared statements by default — beneficial for repeated chapter queries
- **Monitor slow queries**: Log queries that take >1s using Prisma's `log: ['warn', 'error']` in production
*Source: Digital Applied*

### Application Layer
- **TanStack Query caching**: Cache comic listings and chapter lists; invalidate on new releases
- **Image optimization**: UploadThing CDN for comic page images with responsive `<Image>` component
- **Prefetch**: Preload next chapter data via TanStack Query's `prefetchQuery` or `<link rel="prefetch">`
- **SSE over WebSocket**: Server-Sent Events for real-time notifications when targeting serverless deployment — lower overhead and works on Vercel
- **Streaming**: Use `loading.tsx` and `Suspense` boundaries for chapter page sections (header, content, comments)
*Sources: RESEARCH_REPORT.md, Next.js docs*

### Docker/Deployment
- **Standalone output**: Reduces Docker image from ~1.6GB to ~200MB
- **CDN for static assets**: Serve `public/` and `.next/static/` from a CDN, not the Node server
- **Multi-stage builds**: Keep production images minimal — runtime deps only
- **Init containers**: Run Prisma migrations in a separate container to avoid race conditions
*Sources: Jonathan Sharpe, OneUptime*

---

## 8. Dual Payment Provider Strategy

### Architecture Pattern
- **Stripe (primary)**: Stripe Checkout for subscriptions + one-time payments
- **PayPal (secondary)**: PayPal Orders v2 API as an alternative at checkout
- **Database model**: Store both provider's identifiers on the User model (`stripeCustomerId`, `paypalPayerId`)
- **Subscription map**: Keep a `subscriptions` table that tracks which provider + plan + status

```prisma
model Subscription {
  id              String   @id @default(cuid())
  userId          String
  provider        String   // "stripe" | "paypal"
  providerId      String   // Stripe subscription ID or PayPal billing agreement ID
  status          String   // "active" | "canceled" | "past_due"
  planId          String
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  user            User     @relation(fields: [userId], references: [id])

  @@unique([provider, providerId])
  @@index([userId])
}
```

### Webhook Separation
- Separate webhook endpoints: `/api/webhooks/stripe` + `/api/webhooks/paypal`
- Both update the same `Subscription` table via idempotent handlers
- Use database transactions to ensure atomic updates
*Source: RESEARCH_REPORT.md*

---

## 9. Reference Projects & Similar Implementations

| Project | Stack | Relevance |
|---------|-------|-----------|
| **MangaReader** (GitHub: siwachs/Manga-Reader) | Next.js 14, Tailwind, NextAuth, MongoDB | Similar domain, client-side reader patterns |
| **Mangaverse** (Open Source) | Next.js 14 | Modern manga/manhwa/comic reading platform |
| **Teemii** | Vue.js (but same domain) | Open-source manga reader app architecture |
| **comicwise** (workspace sibling) | Next.js, Stripe, NextAuth, Tailwind | Shared comic reader patterns; Stripe + auth reference |
| **university-libary-jsm** (workspace sibling) | Next.js, Prisma, PostgreSQL | Catalog + database patterns |
*Sources: GitHub, Facebook groups, workspace context*

---

## 10. Tools & Resources Quick Reference

| Topic | Resource | URL |
|-------|----------|-----|
| Next.js 15 Docs | App Router documentation | https://nextjs.org/docs |
| Prisma 6 Docs | ORM documentation | https://www.prisma.io/docs |
| Stripe Webhooks | Webhook integration guide | https://docs.stripe.com/webhooks |
| PayPal Orders v2 API | Payment processing | https://developer.paypal.com/docs/api/orders/v2 |
| Docker + Node.js Best Practices | Official Docker guide | https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md |
| Next.js Docker Example | Official Docker example | https://github.com/vercel/next.js/tree/canary/examples/with-docker |
| Zod Validation | Schema validation library | https://zod.dev |
| UploadThing | File uploads for Next.js | https://docs.uploadthing.com |
| TanStack Query | Server state management | https://tanstack.com/query |
| NextAuth v5 | Authentication | https://next-auth.js.org |

---

## 11. Confidence Assessment

- **Source Diversity:** 5/5 — Mix of official docs, engineering blogs, community discussions, and reference projects
- **Recency:** 5/5 — Sources range from 2024-2026; topic-specific content verified as current for Next.js 15 + Prisma 6
- **Factual Foundation:** 5/5 — Direct extracts from official documentation and production-oriented engineering blogs
- **Overall Confidence:** High — Patterns and practices are well-established across multiple authoritative sources

## 12. Research Methodology

- **Web Search:** 7 targeted queries covering each major stack component
- **Content Extraction:** Full-page extraction from 8 authoritative sources
- **Documentation:** Official Stripe, PayPal, PayPal Orders v2 API references
- **Community Validation:** GitHub discussions, Reddit threads for real-world pitfalls
- **Cross-Reference:** Findings validated against existing RESEARCH_REPORT.md and workspace context
- **Last verified:** 2026-07-16
