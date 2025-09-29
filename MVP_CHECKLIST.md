## MVP Checklist

### Product scope
- [ ] Define single core user persona and primary JTBD
- [ ] Write 1-paragraph product narrative and success criteria (X active users, Y% retention)
- [ ] Prioritize 3-5 must-have use cases for MVP; defer everything else

### UX & flows
- [ ] Map the happy path for the core flow end-to-end
- [ ] Create low-fidelity wireframes for core screens
- [ ] Add empty/error/loading states for each screen

### Data & API
- [ ] Define data model (entities, relationships, IDs)
- [ ] Document API endpoints with request/response schemas
- [ ] Add healthcheck: `GET /healthz` returns status ok

### Backend
- [ ] Single process stateless API (Express)
- [ ] Configuration via environment variables (no secrets in code)
- [ ] Basic request logging and CORS
- [ ] Production error handling with safe error responses

### Security
- [ ] Enforce HTTPS (platform-level)
- [ ] Rate limit or basic abuse protection (at least per-IP)
- [ ] Validate inputs at the edge (schema validation)

### Observability
- [ ] Structured logs including request id and latency
- [ ] Basic metrics (uptime, error rate) and alert policy

### Testing
- [ ] Unit tests for critical logic
- [ ] Smoke test script for core API endpoints

### Performance
- [ ] P95 latency defined and measured for core endpoints
- [ ] N+1 and large payloads avoided

### DevEx
- [ ] One-command local run (README instructions)
- [ ] Prettier + ESLint configured and passing
- [ ] Minimal CI: test + lint on push

### Deployment
- [ ] Vercel project linked and environment variables set
- [ ] Preview deployments on pull requests
- [ ] Production deployment checklist and rollback plan

### Documentation
- [ ] README with setup, run, test, deploy
- [ ] Changelog notes for MVP scope

