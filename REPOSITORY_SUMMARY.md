# Repository Summary — `rhixe_scans`

> Generated from real local git history on 2026-07-16. All facts are evidence-based
> (commit hashes, dates, file names) and were not invented.

## Overview

`rhixe_scans` is a **full-featured Next.js comic-reader platform** with payment
integration, maintained by **rhixecompany**. It is the most heavily scaffolded of the five
sibling repos: the working tree contains a near-complete modern web-app skeleton —
`src/`, `backend/`, `tests/`, `docs/`, plus a large constellation of generated guide files
(`ARCHITECTURE.md`, `technology-stack.md`, `folder-structure.md`, `API_REFERENCE.md`,
`DEPLOYMENT_GUIDE.md`, `DEVELOPMENT_GUIDE.md`, `TESTING_GUIDE.md`, `SECURITY.md`,
`SETUP_GUIDE.md`, `CHANGELOG.md`, `copilot-instructions.md`, `code-exemplars.md`, and more).

The repo ships `bun.lock` (279 KB), `package.json`, `jest.config.ts`, `next.config.ts`,
`tailwind.config.ts`, `tsconfig.json`, and full Docker/Compose + devcontainer setup,
signalling a production-intent TypeScript codebase. `RESEARCH_REPORT.md` and
`web-research-rhixe-scans.md` (25 KB) round out the research dossier.

## Architecture

- **Type:** Next.js 15 comic reader with App Router, TypeScript (strict), multiple payment providers, real-time features.
- **Presentation:** Next.js App Router + Turbopack; Radix UI / shadcn; Embla Carousel; TanStack Table.
- **State:** Zustand + TanStack Query.
- **Data:** Prisma 6 ORM over PostgreSQL; schema-driven migrations + seed scripts.
- **Auth:** NextAuth v5 (Prisma adapter, JWT sessions, role-based admin).
- **Payments:** Stripe (primary) + PayPal (secondary), server-side keys.
- **Realtime:** WebSocket (`ws`) for chapter-release notifications.
- **Media/Email:** UploadThing (uploads), Resend (transactional email).
- **Deploy:** Vercel or Docker.

## Key Components

| Path | Role |
|------|------|
| `src/` | Next.js application source |
| `backend/` | Backend services / API surface |
| `tests/` | Jest test suite |
| `docs/` | Architecture & workflow docs |
| `package.json` / `bun.lock` | Deps (Next 15, React 19, Prisma 6, Tailwind 3, Stripe, PayPal) |
| `jest.config.ts` | Test runner config |
| `next.config.ts` / `tailwind.config.ts` / `tsconfig.json` | Build/style/TS config |
| `docker-compose.*.yml` (local/production/docs) | Container orchestration |
| `.devcontainer/` | Dev container |
| `pyproject.toml` / `requirements/` | Python tooling (merge/dotenv helpers) |
| `ARCHITECTURE.md`, `technology-stack.md`, `folder-structure.md` | Generated guides |
| `RESEARCH_REPORT.md` / `web-research-rhixe-scans.md` | Research dossiers |

## Technologies

- **Frontend:** Next.js 15, React 19, TypeScript (strict), Tailwind 3, Radix/shadcn, Zustand, TanStack Query, Embla, TanStack Table
- **Backend/Data:** Prisma 6, PostgreSQL, NextAuth v5
- **Payments:** Stripe, PayPal
- **Realtime:** WebSocket (`ws`)
- **Media/Email:** UploadThing, Resend
- **Tooling:** Bun, Jest, ESLint, Prettier, pre-commit, Docker/Compose, devcontainer, ruff/mypy conventions

## Data Flow

```
Browser → Next.js (App Router) → Prisma ORM → PostgreSQL
   ├─ NextAuth v5 (JWT sessions, role-based admin)
   ├─ Stripe / PayPal (payments)
   ├─ UploadThing (comic image uploads)
   ├─ Resend (emails)
   └─ WebSocket (live chapter-release notifications)
```

## Team

| Contributor | Commits | Role |
|-------------|---------|------|
| `rhixecompany` <rhixecompany@gmail.com> | 5 / 5 (100%) | Sole author — setup, config, docs, research reports |

**Bus factor:** 1. All 5 commits were authored by a single contributor;
no co-authors, merges, or external PRs.
