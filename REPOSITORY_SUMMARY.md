# REPOSITORY_SUMMARY.md

# rhixe_scans — Comic Reader Platform

**Generated:** 2026-07-25  
**Status:** Active  
**Path:** `projects/rhixe_scans/`

---

## Architecture

| Property      | Value                                                                  |
| ------------- | ---------------------------------------------------------------------- |
| **Type**      | Next.js comic reader platform                                          |
| **Pattern**   | App Router with Prisma, multiple payment providers, real-time features |
| **Reference** | [Workflow Analysis](../docs/Project_Architecture/Workflow_Analysis.md) |

Full-featured comic reader with uploads, WebSocket notifications, subscriptions, and admin dashboard.

---

## Technology Stack

| Layer               | Technology                                                  |
| ------------------- | ----------------------------------------------------------- |
| **Frontend**        | React 19, TypeScript (strict), Tailwind 3 + Radix/shadcn/ui |
| **State**           | Zustand, TanStack Query                                     |
| **Database**        | Prisma 6 / PostgreSQL                                       |
| **Auth**            | NextAuth v5                                                 |
| **Media**           | UploadThing                                                 |
| **Realtime**        | WebSocket                                                   |
| **Payments**        | Stripe, PayPal                                              |
| **Email**           | Resend                                                      |
| **Deploy**          | Vercel or Docker                                            |
| **Package Manager** | npm                                                         |

---

## Project Structure

```
rhixe_scans/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── (auth)/            # Auth pages
│   │   ├── (dashboard)/       # User dashboard
│   │   ├── (reader)/          # Comic reader
│   │   └── (admin)/           # Admin panel
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui base components
│   │   ├── comics/           # Comic-specific components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utilities
│   │   ├── auth.ts           # NextAuth config
│   │   ├── db.ts             # Prisma client
│   │   ├── payments/         # Stripe/PayPal clients
│   │   └── websocket/        # WebSocket server
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand stores
│   └── validations/          # Zod schemas
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Migration history
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── .eslintrc.json
└── .env.example
```

---

## Commands

```bash
# Install
npm install

# Database
cp .env.example .env
npx prisma migrate dev && npm run db:seed

# Development
npm run dev

# Quality
npm run lint && npx prettier --write .

# Database tools
npx prisma generate
npx prisma studio

# Test
npm test
```

---

## Key Features

| Feature                     | Implementation                           |
| --------------------------- | ---------------------------------------- |
| **Comic Upload**            | UploadThing → Prisma media records       |
| **Chapter Reading**         | Next.js Image optimization, lazy loading |
| **Subscriptions**           | Stripe (primary) + PayPal (secondary)    |
| **Real-time Notifications** | WebSocket server + client hooks          |
| **Admin Dashboard**         | Role-based access, analytics             |
| **Search**                  | Full-text via PostgreSQL                 |

---

## Database Schema (Prisma Highlights)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          Role      @default(READER)
  subscription  Subscription?
  library       LibraryItem[]
  notifications Notification[]
}

model Comic {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  coverImage  String?
  chapters    Chapter[]
  genres      Genre[]
  status      Status   @default(ONGOING)
}

model Chapter {
  id        String   @id @default(cuid())
  comicId   String
  comic     Comic    @relation(fields: [comicId], references: [id])
  number    Int
  title     String?
  pages     Page[]
  published Boolean  @default(false)
}

model Subscription {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  provider          Provider @default(STRIPE)
  providerId        String   @unique
  status            Status   @default(ACTIVE)
  currentPeriodEnd  DateTime
}
```

---

## CI/CD

**Workflow:** `.github/workflows/rhixe_scans-ci.yml`  
**Jobs:** TypeScript check → ESLint → Next.js build → Tests

---

## Vulnerabilities (July 2025)

**Status:** Clean — no vulnerabilities found via `bun audit`

---

## Related Projects

- **rhixecompany-comics** — Dual-stack consolidation target (P1)
- **comicwise** — Another comic platform, similar stack
- **selenium_webdriver** — Scraping utility being consolidated
