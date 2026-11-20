# GitHub Actions Job Concurrency

A starter Next.js app used to demonstrate **job concurrency in GitHub Actions**: a newer push cancels a deployment that's still running.

## Workflow (`.github/workflows/main.yml`)

"Deploy Next JS App" runs on every push to `main`. The job uses:

```yaml
concurrency:
  group: deploy
  cancel-in-progress: true
```

Only one run in the `deploy` group runs at a time. When a new push arrives, the run already in progress is cancelled.

Steps: checkout → `npm install` → `npm run build` → a placeholder deploy step (`echo "Deploying APP"`).

More notes: [GitHub-Actions-Documentation.md](GitHub-Actions-Documentation.md) and the `/notes` page in the app (`app/notes/page.tsx`).

## Tech Stack

Next.js · React · TypeScript · Tailwind CSS · GitHub Actions

## Run locally

```bash
git clone https://github.com/KahafSameer/job_concurrency.git
cd job_concurrency
npm install
npm run dev     # http://localhost:3000
```

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
