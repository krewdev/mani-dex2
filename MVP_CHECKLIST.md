## MVP Checklist

- **Problem and scope**
  - Define one target persona and primary job-to-be-done
  - List top 3 user outcomes; defer everything else

- **Must-have user stories**
  - As a user, I can see a basic status/health of the service
  - As a user, I can perform the single core action of the product
  - As a user, I get clear errors when something fails

- **API and backend**
  - Health endpoint available and tested (`GET /healthz`)
  - Core endpoint(s) defined with request/response validation (e.g., Zod)
  - CORS configured for the intended client origin(s)
  - Logging enabled for requests and errors

- **Data and state**
  - Define data model for core entities (even if in-memory for MVP)
  - Persistence chosen (in-memory/file/managed DB); backup plan noted
  - Seed script or test data path identified

- **Security and reliability**
  - Input validation on all external inputs
  - Sensible rate limits or basic abuse protection if publicly accessible
  - Secrets and environment variables managed outside of code

- **Observability**
  - Structured logs for key events/actions
  - Basic runtime metrics or request timing (even console for MVP)
  - Error reporting path (console, logs, or a service)

- **Testing**
  - Unit tests for core logic
  - One request test per public endpoint (happy path)
  - Smoke test script/command usable in CI

- **Performance and UX basics**
  - P50 response time target documented for the core flow
  - Timeouts configured for outbound calls (if any)

- **Deployment**
  - Single-command or one-click deploy defined (Vercel/GitHub integration)
  - Environment configuration documented
  - Rollback approach (re-deploy previous commit) noted

- **Compliance and housekeeping**
  - LICENSE present and correct
  - README with setup, run, test, deploy
  - Backlog of post-MVP enhancements tracked

