## Deploying the Backend to Vercel

This repository contains a Node.js + TypeScript backend in the `backend` directory. It is configured to run on Vercel Serverless Functions via the Express app exported through `backend/api/index.ts` and routing in `backend/vercel.json`.

### 1) Prerequisites

- Vercel account
- `vercel` CLI installed (`npm i -g vercel`)
- Node.js 18+

### 2) One-time project link

From the repo root:

```bash
cd backend
vercel link --yes
```

When asked for scope and project name, select appropriately. Vercel will create or link a project based on the `backend` directory.

### 3) Environment variables

The app reads the following variables (with defaults):

- `PORT` (default 3000) – ignored by Vercel serverless
- `HOST` (default `0.0.0.0`) – ignored by Vercel serverless
- `NODE_ENV` – set automatically by Vercel

If you add more vars, set them in Vercel:

```bash
vercel env add VARIABLE_NAME
```

Or via the Vercel dashboard under Project Settings → Environment Variables.

### 4) Deploy

From the `backend` directory:

```bash
vercel --prod --yes
```

This uses `backend/vercel.json`:

- Builds `api/index.ts` with `@vercel/node`
- Routes `/healthz` and `/api/*` to the serverless handler

### 5) Test the deployment

```bash
curl https://<your-project>.vercel.app/healthz
```

### 6) CI/CD (optional)

Connect your Git repository to Vercel. Each push to the default branch will trigger a production deployment; pull requests get preview deployments.

### Notes

- Local dev remains `npm run dev` (Express on a local port). Serverless on Vercel will ignore the explicit host/port and use the platform handler.
- For additional routes, update `backend/api/index.ts` (Express app) and ensure the `routes` in `backend/vercel.json` continue to direct traffic to `api/index.ts`.

