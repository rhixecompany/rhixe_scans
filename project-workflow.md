# Project Workflow — rhixe_scans

## Development Workflow

```bash
# Setup
bun install
cp .env.example .env
bunx prisma migrate dev
bun run db:seed

# Development
bun run dev                    # Turbopack dev server
bun run lint                   # ESLint
bunx prettier --write .         # Format

# Database Changes
# Edit prisma schema → bunx prisma migrate dev --name desc
bun run db:seed                # Re-seed

# Testing
bun run test                       # Jest tests
bun run test:watch             # Watch mode

# Build
bun run clean
bun run build
bun run start
```

## Adding a Feature

1. Update Prisma schema → 2. Generate migration → 3. Create server action → 4. Build component
