### 2025-08-27
- Added Swagger setup:
  - Installed `swagger-ui-express` and `swagger-jsdoc`
  - Created `src/config/swagger.ts` with OpenAPI 3 and JWT bearer
  - Wired docs at `/docs` and `/docs.json` in `src/app.ts`
  - Protected docs in production with optional Basic Auth via `DOCS_USER`/`DOCS_PASS`
  - Added JSDoc annotations for `auth` and `users` routes, and health check
  - Updated `README.md` with docs usage and env flags

#### Discovered During Work
- Consider adding global schemas for common responses and `User` model
- Optionally add tags description and externalDocs
# Project Timeline

## Completed

- Removed monorepo references and fixed imports/types
- Updated package.json scripts and dependencies
- Replaced tsconfig with standalone Node TS config
- Added env config loader/validator
- Enhanced middleware: helmet, compression, rate-limit, morgan
- Added /health and 404 handler
- Hardened logger and ensured logs directory
- Added Express Request typing for req.user
- Refactored server boot: connect Mongo first, graceful shutdown

## Discovered During Work

- Add Jest config and sample test suite
- Expand README with API endpoint docs

## Next

- Jest config and sample test
- Documentation: endpoints and contribution guide


