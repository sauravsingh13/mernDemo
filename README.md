# SAV MERN Starter — Pro (Realtime Kanban)

**MERN:** Next.js 14 (App Router) · Express + TypeScript · MongoDB/Mongoose · JWT (HttpOnly) · Socket.IO (rooms) · Docker (Mongo) · GitHub Actions CI

[![CI](https://github.com/your-username/sav-mern-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/sav-mern-starter/actions)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Express](https://img.shields.io/badge/Express.js-4-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6-brightgreen)
![Socket.io](https://img.shields.io/badge/Socket.io-realtime-blue)

## Quickstart
```bash
docker compose up -d

# API
cd api && cp .env.example .env && npm i && npm run dev   # http://localhost:4000

# Web
cd ../web && cp .env.example .env.local && npm i && npm run dev   # http://localhost:3000
```

## Architecture
```mermaid
graph TD
  A[User] --> B[Next.js (App Router)]
  B -->|REST + cookies| C[Express API]
  C --> D[Auth Middleware (JWT HttpOnly)]
  C --> E[Socket.IO Rooms - project:{id}]
  C --> F[(MongoDB)]
  E --> C
```

## Repo
```
sav-mern-starter/
├─ api/         # Express + TS + Mongoose + Socket.IO + tests
├─ web/         # Next.js (App Router) + Kanban + socket.io-client
├─ .github/     # GitHub Actions CI
├─ docker-compose.yml
└─ Dockerfiles  # /api and /web
```
