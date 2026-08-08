# Copilot Instructions

Project-wide guidance for Rhixescans.

## Source of truth

- `projects/rhixe_scans/AGENTS.md`
- `README.md`
- `src/`
- `tests/`
- `docs/`

## Commands

Run from the project root:

```bash
bun install
bunx prisma migrate dev
bun run db:seed
bun run dev
bun run lint
bunx prettier --write .
bun run test
bun run test:watch
bunx prisma studio
bun run build
```

## Architecture

- Next.js 15 App Router frontend with Prisma-backed PostgreSQL data access.
- Auth uses NextAuth v5 with a Prisma adapter.
- Payments, uploads, email, and realtime features are separate integration areas.

## Conventions

- Keep TypeScript strict and component code shadcn/ui-compatible.
- Prefer Prisma schema changes plus migrations for data model work.
- Keep route, component, and utility naming aligned with the repo structure.
- Use environment variables for all secrets and provider credentials.
