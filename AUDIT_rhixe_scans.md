# AUDIT — rhixe_scans

Read-only repo-management audit (Phases 0, 2, 3). Destructive phases HELD.

## Overview
Full-stack Next.js (App Router, Turbopack) + Prisma manga/comic scan reader (`rhixescans`), with a Django `backend/` (cookiecutter-django style: `compose/`, docker-compose.local/production/docs, pre-commit, readthedocs). Extensive docs (ARCHITECTURE.md, API_REFERENCE.md, DATABASE_SCHEMA.md, DEPLOYMENT_GUIDE.md). Dual-stack: TS/React frontend + Python/Django backend.

## Disk Usage
29M (excluding .git/node_modules/venv/caches/build). Includes committed `bun.lock` (280 KB).

## Entrypoint
- Frontend: `package.json` scripts → `next dev --turbopack` (dev), `next build`/`next start` (prod); Prisma schema at `src/db/schema.prisma`.
- Backend: Django `backend/` with `docker-compose.local.yml` / `docker-compose.production.yml`.

## Gitignore Audit
`.gitignore` present — very large multi-template (Node/Next/Python/Django/React/etc.) plus custom rules.
Covered: node_modules/, .env / .env*, *.pyc, __pycache__/, dist/, build/ (via `/build`), .next/ (`/.next/`), venv/, .DS_Store.
MISSING: none of the required set — all covered. (Redundant/duplicated blocks present but harmless.)

## Dependency Audit
- **Node (bun):** `package.json` + `bun.lock`. Next.js 15-era app with many @radix-ui, @dnd-kit, @hookform, @paypal/react-paypal-js, prisma/@auth. `bun` 1.3.14 available; `bun audit` subcommand available (NOT run — read-only, no network/install). `npm-check-updates` wired via `check-updates` script.
- **Python:** `requirements.txt` → `-r requirements/production.txt` (Heroku-style layered reqs in `requirements/`). `pyproject.toml` present (pytest/coverage/mypy config, targets Python 3.12). `pip` available; `pip-audit` NOT installed (scan not run).
- No known-bad flagged from lockfile names; version currency not verified (read-only).

## Branch State
`git branch`: `* development`, `production`. No `master`/`main`/stray branches. Current = development.

## Destructive Phases HELD
- Phase 1 (branch deletion / push): NOT run.
- Phase 4 (CI creation): NOT run. (Note: `.github/` + `.pre-commit-config.yaml` already exist.)
