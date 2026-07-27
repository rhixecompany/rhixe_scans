# The Story of rhixe_scans

*How a comic reader became a real-time platform*

---

## Prologue: The Personal Scratch

It started with a simple problem: **reading comics on mobile was terrible.**

Existing sites: cluttered, slow, no offline, no progress sync, paywalls that broke chapter flow. The solution: build your own reader. Next.js 15, Prisma, Tailwind. Two weeks to MVP.

Then features crept in:
- "I want to upload my own scans" → UploadThing integration
- "I want notifications when new chapters drop" → WebSocket server
- "I want to support creators" → Stripe + PayPal subscriptions
- "I want an admin panel" → Role-based access, analytics

Six months later: a SaaS.

---

## Chapter 1: The Stack Decision

**Next.js 15 App Router** — Server Components by default. Client Components only when needed (WebSocket, payments, interactive reader).

**Prisma 6** — Type-safe database. `prisma migrate dev` for schema changes. `prisma generate` for client. No raw SQL unless absolutely necessary.

**Zustand + TanStack Query** — Client state (UI, reader position) in Zustand. Server state (comics, chapters, user data) in TanStack Query. Clear separation.

**shadcn/ui + Radix** — Accessible components without the design system baggage. Copy-paste, customize, own.

**NextAuth v5** — Auth is hard. NextAuth handles OAuth, credentials, sessions, callbacks. Edge-compatible.

---

## Chapter 2: The Dual Payment Problem

Stripe for credit cards. PayPal for regions Stripe doesn't cover. Two providers, one subscription model.

```typescript
// Unified interface
interface PaymentProvider {
  createSubscription(user: User, plan: Plan): Promise<Subscription>
  cancelSubscription(subscriptionId: string): Promise<void>
  handleWebhook(payload: any, signature: string): Promise<WebhookResult>
}

// Implementations
class StripeProvider implements PaymentProvider { ... }
class PayPalProvider implements PaymentProvider { ... }

// Factory
function getProvider(user: User): PaymentProvider {
  return user.region === 'US' ? new StripeProvider() : new PayPalProvider()
}
```

Webhooks: Stripe sends `customer.subscription.updated`. PayPal sends `BILLING.SUBSCRIPTION.CANCELLED`. Both normalize to internal `SubscriptionStatus` enum.

**Lesson:** Abstract early. The third provider (MercadoPago, Razorpay) will take 2 hours, not 2 weeks.

---

## Chapter 3: WebSocket — The Real-Time Spine

Not Socket.io. Native `ws` library. Next.js custom server for WebSocket upgrade.

```typescript
// lib/websocket/server.ts
const wss = new WebSocket.Server({ noServer: true })

wss.on('connection', (ws, req, user) => {
  ws.userId = user.id
  ws.on('message', (data) => handleMessage(ws, data))
  ws.on('close', () => removeConnection(user.id))
})

// Broadcast to user
function notify(userId: string, event: string, data: any) {
  const connections = userConnections.get(userId)
  connections?.forEach(ws => ws.send(JSON.stringify({ event, data })))
}
```

Client hook:
```typescript
// hooks/useWebSocket.ts
export function useWebSocket() {
  const [connected, setConnected] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  useEffect(() => {
    const ws = new WebSocket('/api/ws')
    ws.onopen = () => setConnected(true)
    ws.onmessage = (e) => {
      const { event, data } = JSON.parse(e.data)
      if (event === 'notification') setNotifications(n => [data, ...n])
    }
    return () => ws.close()
  }, [])
  
  return { connected, notifications }
}
```

**Use cases:** New chapter alerts, subscription status changes, upload processing updates, admin announcements.

**Scale:** 10k concurrent connections on a single Vercel function (with external WebSocket service) or self-hosted on Railway/Render.

---

## Chapter 4: Prisma — The Migration Discipline

```bash
# Every schema change
npx prisma migrate dev --name descriptive_name
# Creates migration file + applies to dev DB

# Production
npx prisma migrate deploy
# Applies pending migrations only
```

**Rules:**
- Never `db push` in production
- Never edit migration files after commit
- Destructive changes = new migration + manual data migration script
- `prisma studio` for debugging, not production

---

## Chapter 5: The Consolidation Target

`rhixecompany-comics` (Django + Next.js) is the consolidation target (P1 priority). This project contributes:

| Feature | Status | Migration Effort |
|---------|--------|------------------|
| Comic reader | ✅ Complete | Copy components |
| UploadThing | ✅ Complete | Reuse config |
| WebSocket | ✅ Complete | Port server |
| Stripe/PayPal | ✅ Complete | Move services |
| Admin dashboard | ✅ Complete | Rebuild in Django Admin + Next.js |
| Prisma schema | ✅ Complete | Port to Prisma (already shared) |

**The hard part:** NextAuth v5 → Django SimpleJWT + Next.js auth proxy. Session sharing across domains.

---

## Chapter 6: What We'd Do Differently

| Decision | Current | Better |
|----------|---------|--------|
| **Single repo** | Monorepo with `rhixecompany-comics` | Separate repos, shared Prisma schema via npm package |
| **WebSocket** | Custom server | Pusher/Ably (managed) |
| **UploadThing** | Direct integration | S3 + presigned URLs (cost control) |
| **PayPal** | Secondary | Remove (Stripe covers 95% of users) |
| **Admin** | Custom Next.js | Django Admin + Forest Admin |

---

## Epilogue: The Reader That Became a Platform

Started as "I want to read comics on my phone."
Became: real-time, multi-payment, multi-tenant, admin-panelled, webhook-driven platform.

The code is good. The architecture is sound. The consolidation will be clean.

But the *next* personal project? **Managed services first. Custom code last.**

---

*Written by the workspace chronicler, July 25, 2025.  
Filed at `projects/rhixe_scans/THE_STORY_OF_THIS_REPO.md`.*