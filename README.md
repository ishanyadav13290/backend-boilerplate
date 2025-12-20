# backend-boilerplate
Boilerplate for backend server using TypeScript, Express, and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file:
   ```env
   NODE_ENV=development
   JWT_SECRET=<your-jwt-secret>
   MONGO_URI=<mongodb-uri>
   PORT=8080
   ```

3. Run in development:
   ```bash
   npm run dev
   ```

## API Docs (Swagger)

- Swagger UI: `/docs` (disabled in production unless `ENABLE_DOCS=true`)
- Swagger JSON: `/docs.json`
- Security: JWT Bearer (`Authorization: Bearer <token>`) for protected routes
- Optional basic auth for docs in production: set `DOCS_USER` and `DOCS_PASS`

### Environment variables for docs

- `ENABLE_DOCS=true` to enable docs in prod
- `DOCS_USER`, `DOCS_PASS` to protect `/docs` with Basic Auth in prod

4. Health check:
   ```bash
   curl http://localhost:8080/health
   ```

5. Build and start:
   ```bash
   npm run build && npm start
   ```

## Scripts
- `dev`: run with nodemon and ts-node
- `build`: compile TypeScript to `dist`
- `start`: run compiled server
- `test`: run Jest tests
- `type-check`: type-check project

## Notes
- Configure `MONGO_URI` as the full connection string, e.g. `mongodb://localhost:27017/yourdb`.
- JWT secret must be strong in non-dev environments.
