## Backend (Node.js + TypeScript)

### Prerequisites

- Node.js >= 18 (recommended 20+)

### Setup

```bash
cp .env.example .env
npm install
```

### Common Scripts

- `npm run dev`: Start server in watch mode with tsx
- `npm run build`: Type-check and emit to `dist/`
- `npm start`: Run compiled app from `dist/`
- `npm test`: Run Jest tests
- `npm run lint`: Run ESLint (flat config)
- `npm run format`: Prettier write

### Endpoints

- `GET /healthz` → `{ status: "ok", uptime, timestamp }`

### Docker

```bash
docker build -t backend .
docker run --rm -p 3000:3000 --env-file .env backend
```
