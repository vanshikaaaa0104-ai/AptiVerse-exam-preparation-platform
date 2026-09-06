# 📜 Universal Prompt Library for Multi-Agent Development Pipeline

Welcome to the **Universal Prompt Library** for the Master_Skills pipeline. This document contains ready-to-use, battle-tested prompt templates designed for every phase of software development—from initial project kickoff to surgical bug fixes, UI overhauls, database migrations, and production cloud deployments.

---

## 📑 Table of Contents

1. [Project Kickoff Prompts (`/startcycle`)](#1-project-kickoff-prompts-startcycle)
2. [Feature Addition Prompts (`/iteratecycle`)](#2-feature-addition-prompts-iteratecycle)
3. [Bug Fixing & Root Cause Analysis Prompts (`/iteratecycle`)](#3-bug-fixing--root-cause-analysis-prompts-iteratecycle)
4. [UI/UX, Styling & Design System Prompts](#4-uiux-styling--design-system-prompts)
5. [Database, Schemas & Migrations Prompts](#5-database-schemas--migrations-prompts)
6. [Security, Performance & Code Hardening Prompts](#6-security-performance--code-hardening-prompts)
7. [Testing & Quality Assurance Prompts](#7-testing--quality-assurance-prompts)
8. [DevOps, Docker & Cloud Deployment Prompts](#8-devops-docker--cloud-deployment-prompts)
9. [Human-in-the-Loop Review & Steering Prompts](#9-human-in-the-loop-review--steering-prompts)

---

## 1. Project Kickoff Prompts (`/startcycle`)

Use `/startcycle` to trigger the end-to-end Greenfield multi-agent sequence (PM ➔ Architect ➔ UI/UX ➔ Engineer ➔ QA/Security ➔ DevOps ➔ Docs).

### A. SaaS Web Application with Auth & Billing
```text
/startcycle Build a modern SaaS Task & Project Management platform featuring:
- User authentication (JWT + email/password + Google OAuth2)
- Multi-tenant workspaces with role-based access control (Owner, Admin, Member, Viewer)
- Interactive Kanban board with drag-and-drop task ordering, labels, and due dates
- Subscription billing tiers (Free, Pro, Enterprise) powered by Stripe
- Clean dark-mode-first responsive UI using Vanilla CSS and vanilla JS / modern frontend
```

### B. High-Performance REST/GraphQL Backend Service
```text
/startcycle Build a modular, high-throughput E-Commerce Backend Service featuring:
- RESTful API endpoints and GraphQL schema for product catalog, orders, and cart management
- Relational database schema with PostgreSQL, foreign key constraints, and indexing
- Redis caching for product search and hot inventory reads
- Structured JSON logging, correlation IDs, health checks (/healthz), and Prometheus metrics
- Rate limiting middleware (100 req/min per IP) and input sanitization
```

### C. AI / LLM Augmented Application
```text
/startcycle Build an AI-Powered Customer Support & Knowledge Base platform featuring:
- Document ingestion pipeline (PDF/Markdown/TXT) with chunking and vector embeddings
- Semantic search and Retrieval-Augmented Generation (RAG) chat assistant
- Agent conversation history with citation references to source documents
- Admin dashboard to inspect token consumption, query latency, and feedback ratings
```

### D. Workflow & Application Tracking Portal
```text
/startcycle Build a Passport & Visa Application Lifecycle Management system featuring:
- Multi-step application submission wizard with file upload validation
- Real-time status tracker (Draft -> Submitted -> Under Review -> Approved/Rejected)
- Role-segregated portals: Applicant Portal, Officer Verification Desk, and System Admin
- Automated email notification triggers and downloadable PDF confirmation receipts
```

---

## 2. Feature Addition Prompts (`/iteratecycle`)

Use `/iteratecycle` to add new functionality without touching or breaking existing working code.

### A. Authentication & User Management Extensions
```text
/iteratecycle Add Google OAuth2 and GitHub social authentication alongside the existing email/password auth flow. Ensure existing users can link social accounts without duplicate email conflicts.
```
```text
/iteratecycle Implement Role-Based Access Control (RBAC) with three roles: SuperAdmin, Editor, and Viewer. Protect all POST/PUT/DELETE endpoints with an authorization middleware checking token roles.
```
```text
/iteratecycle Add Two-Factor Authentication (2FA / TOTP) support with QR code setup, recovery backup codes, and TOTP token verification on login.
```

### B. File Uploads & Asset Processing
```text
/iteratecycle Add user avatar image upload to the profile settings page. Validate that files are PNG/JPEG under 5MB, generate 128x128 thumbnail variants, and store assets securely with unique UUID filenames.
```
```text
/iteratecycle Add a batch CSV/Excel import feature for the bulk import of product items, with schema validation, error row reporting, and transactional database insertion.
```

### C. Search, Filtering & Pagination
```text
/iteratecycle Implement cursor-based pagination and multi-field filtering (by status, date range, tags, and fuzzy keyword search) on the GET /api/v1/items endpoint.
```
```text
/iteratecycle Add a global quick-search command bar (triggered via Cmd+K / Ctrl+K) on the frontend that searches projects, tasks, and users in real time.
```

### D. Billing, Payments & Subscriptions
```text
/iteratecycle Integrate Stripe Checkout for monthly and annual subscription plans. Handle Stripe webhook events (checkout.session.completed, invoice.payment_failed, customer.subscription.deleted) and update user status in the database.
```

### E. Notifications & Real-Time Feeds
```text
/iteratecycle Add real-time in-app notifications using Server-Sent Events (SSE) or WebSockets. Users should see an unread badge counter and receive live toasts when assigned to a task.
```
```text
/iteratecycle Implement transactional email notifications via Resend/SendGrid when an applicant's passport status changes.
```

---

## 3. Bug Fixing & Root Cause Analysis Prompts (`/iteratecycle`)

Use `/iteratecycle` with error details to trigger surgical root cause analysis, automated reproduction tests, and zero-regression fixes.

### A. Backend Crash / HTTP 500 Unhandled Exception
```text
/iteratecycle Fix 500 Internal Server Error on POST /api/v1/orders/checkout.
Error Log:
TypeError: Cannot read properties of undefined (reading 'price')
    at calculateTax (/services/order_service.js:84:22)
    at processCheckout (/services/order_service.js:120:15)
Expected: If an item has no custom tax rate, fallback to the default regional tax rate without throwing an exception.
```

### B. Input Validation / HTTP 422 Unprocessable Entity
```text
/iteratecycle Fix validation failure on PUT /api/v1/users/profile.
Symptom: Submitting the profile form without providing a secondary phone number or website URL fails schema validation.
Expected: Secondary phone and website fields should be strictly optional (nullable/empty string allowed).
```

### C. CORS & Network Misconfigurations
```text
/iteratecycle Fix CORS policy blocking API requests from frontend at http://localhost:5173 to backend at http://localhost:8080.
Error: 'Access-Control-Allow-Origin' header is missing on preflight OPTIONS response.
Expected: Configure CORS middleware to permit credentials, GET/POST/PUT/DELETE/OPTIONS methods, and Authorization headers from approved origins.
```

### D. Frontend State & Infinite Re-render / Blank Screen
```text
/iteratecycle Fix React / Frontend blank screen on navigating to /dashboard/analytics.
Console Error:
Uncaught TypeError: data.map is not a function at AnalyticsChart (AnalyticsChart.js:32)
Expected: Gracefully handle loading states and empty array payloads before data fetching resolves.
```

### E. Database Constraint Violations
```text
/iteratecycle Fix database insertion failure when registering new users:
Error: duplicate key value violates unique constraint "users_email_key"
Expected: If a user with the given email already exists, return a clean HTTP 409 Conflict with message "An account with this email already exists" instead of an unhandled DB exception.
```

---

## 4. UI/UX, Styling & Design System Prompts

Prompts targeting client-side aesthetics, responsiveness, animations, and design tokens without touching backend logic.

### A. Dark Mode / Theme System Implementation
```text
/iteratecycle Implement a polished Dark / Light theme toggle with:
- CSS custom properties (variables) for background, foreground, surface, borders, and primary accents
- Automatic detection of user's OS preference (`prefers-color-scheme`)
- Persistence in `localStorage`
- Smooth 0.2s color transition on theme change
```

### B. Responsive Mobile Layout Polish
```text
/iteratecycle Polish the mobile responsive experience across all pages:
- Replace horizontal navbar with a slide-out hamburger drawer for viewports under 768px
- Ensure all data tables collapse into mobile-friendly stacked cards
- Verify touch targets for all buttons and interactive elements meet the minimum 44x44px standard
```

### C. Glassmorphism & Micro-Animations
```text
/iteratecycle Upgrade the UI aesthetics to a sleek, modern glassmorphism design:
- Add subtle translucent frosted-glass card backgrounds (`backdrop-filter: blur(12px)`)
- Add smooth micro-animations for button hovers, card lift effects, and active modal entrances
- Replace default browser loading spinners with pulsing skeleton placeholders
```

---

## 5. Database, Schemas & Migrations Prompts

Prompts for modifying data models, tables, relationships, and seed data while maintaining zero data loss.

### A. Additive Column & Table Migration
```text
/iteratecycle Add an 'organization_id' UUID foreign key column to the 'projects' table referencing 'organizations(id)'.
Requirements:
- Create an additive SQL migration script in database/migrations/
- Make the column nullable initially for backward compatibility
- Create an index on 'projects(organization_id)' for fast lookups
```

### B. Soft Deletes Implementation
```text
/iteratecycle Implement soft-delete capability across the 'users', 'organizations', and 'documents' tables:
- Add 'deleted_at' TIMESTAMP NULLABLE column
- Update data access queries to filter WHERE deleted_at IS NULL by default
- Add a specialized admin endpoint to restore soft-deleted records
```

### C. Seed Data Generation for Development & Testing
```text
/iteratecycle Create a comprehensive database seed script in database/seeds/ that populates:
- 1 SuperAdmin user, 3 Manager users, and 10 Regular users
- 5 Sample organizations with associated projects and mock activity logs
- Valid bcrypt hashed passwords and realistic timestamps
```

---

## 6. Security, Performance & Code Hardening Prompts

Prompts for hardening application defense, eliminating vulnerabilities, and optimizing query throughput.

### A. OWASP Security Hardening
```text
/iteratecycle Perform security hardening across all backend endpoints:
- Ensure all SQL queries use parameterized prepared statements (zero string concatenation)
- Add Helmet security headers (Content-Security-Policy, X-Frame-Options, HSTS)
- Implement XSS sanitization on all user-submitted markdown and HTML text
- Verify JWT tokens are stored in HttpOnly, Secure, SameSite=Strict cookies
```

### B. Query Optimization & Indexing
```text
/iteratecycle Optimize database performance on the GET /api/v1/analytics/dashboard endpoint:
- Eliminate N+1 queries by replacing iterative single queries with a single SQL JOIN / aggregated query
- Add composite index on (tenant_id, created_at DESC)
- Reduce query latency from 850ms to under 50ms
```

### C. Rate Limiting & Brute Force Protection
```text
/iteratecycle Add IP-based and user-based rate limiting to the /api/v1/auth/login and /api/v1/auth/forgot-password endpoints:
- Maximum 5 failed attempts per 15 minutes per IP before a temporary lockout
- Return standard HTTP 429 Too Many Requests with Retry-After header
```

---

## 7. Testing & Quality Assurance Prompts

Prompts to generate comprehensive test suites and validate critical user paths.

### A. Unit & Integration Test Generation
```text
/iteratecycle Generate automated unit and integration tests covering the authentication service:
- Test successful registration, login, and token refresh
- Test invalid password format, missing fields, and duplicate email attempts
- Test token expiration and tampering scenarios
- Ensure minimum 90% code coverage on auth controllers and domain logic
```

### B. End-to-End (E2E) Flow Validation
```text
/iteratecycle Write end-to-end integration tests in app_build/tests/ for the complete checkout flow:
1. User logs in
2. Adds 2 items to cart
3. Applies discount coupon 'WELCOME10'
4. Completes mock checkout
5. Verifies order is stored in DB with status 'COMPLETED' and cart is cleared
```

---

## 8. DevOps, Docker & Cloud Deployment Prompts

Prompts for containerization, local orchestration, and production deployments.

### A. Production Multi-Stage Dockerfile
```text
/iteratecycle Create an optimized, multi-stage production Dockerfile for the application:
- Stage 1: Build & bundle dependencies
- Stage 2: Minimal distroless or Alpine Linux runtime
- Non-root user execution (`USER node` or `USER appuser`)
- Explicit HEALTHCHECK instruction checking /healthz endpoint
- Image size under 150MB
```

### B. Local Multi-Service Docker Compose
```text
/iteratecycle Generate a production_artifacts/docker-compose.yml file orchestrating:
- Frontend client service (Port 3000)
- Backend API service (Port 8080)
- PostgreSQL 16 database with volume persistence and healthcheck
- Redis 7 caching service
- Automatic environment variable bootstrapping via .env
```

### C. Google Cloud Run Deployment Setup
```text
/iteratecycle Prepare automated deployment for Google Cloud Run:
- Generate cloudbuild.yaml building the container and pushing to Artifact Registry
- Generate deployment script executing `gcloud run deploy` with:
  - Minimum 1 instance (prevent cold starts), max 10 instances
  - Cloud SQL Auth Proxy connection
  - Secrets injected securely from GCP Secret Manager
  - 10% canary traffic splitting for zero-downtime release
```

---

## 9. Human-in-the-Loop Review & Steering Prompts

Prompts to use when responding to approval gates or steering the architecture.

### A. Approving Specification or Architecture
```text
Approved. Proceed with code generation adhering to the API contracts and ERD schema.
```

### B. Directing Architectural Adjustments
```text
Please adjust the architecture plan before writing code:
1. Replace PostgreSQL with SQLite (with WAL mode) so the app runs zero-dependency in local dev.
2. Use JWT bearer tokens in the Authorization header instead of session cookies.
3. Keep all other requirements intact, then show the updated plan.
```

### C. Clarifying Technical Trade-offs
```text
Why did the Systems Architect select WebSockets instead of Server-Sent Events (SSE) for the notifications module? What are the trade-offs in server resource usage and proxy compatibility?
```

---

## 💡 Quick Tips for Maximum Prompt Effectiveness

1. **Be Specific About Outputs**: Mention file formats, status codes, and constraints whenever known.
2. **Always Paste Error Logs**: When reporting a bug, include the exact error message and stack trace.
3. **Use the Right Prefix**:
   - `/startcycle` for **new projects from scratch**.
   - `/iteratecycle` for **features, bug fixes, UI updates, refactors, and deployments**.
4. **Inspect Memory**: Check [`memory/context_index.yaml`](file:///d:/TY-IT/Projects/Master_Skills/memory/context_index.yaml) and [`memory/decision_log.md`](file:///d:/TY-IT/Projects/Master_Skills/memory/decision_log.md) at any time to verify that your instructions are cataloged and preserved across sessions.
