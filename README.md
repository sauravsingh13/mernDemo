<div align="center">

# ⚡ SAV MERN Starter Pro  
### **Next.js + Express + MongoDB + Socket.IO + Docker + CI**

[![CI](https://github.com/<your-username>/sav-mern-starter-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/<your-username>/sav-mern-starter-pro/actions)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![Express](https://img.shields.io/badge/Express.js-4-green?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6-brightgreen?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-realtime-blue?logo=socketdotio)
![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

A **production-grade MERN starter** showcasing  
**Next.js 14 (App Router)** · **Express + TypeScript** · **MongoDB/Mongoose** · **JWT Auth (HttpOnly)** · **Socket.IO Realtime Rooms**  
Built for **developers who want clean architecture + realtime UX out-of-the-box.**

---

### 🌐 Live Demo  
Coming soon → [your-demo-url.vercel.app](https://your-demo-url.vercel.app)

### 🧭 Features
🚀 Next.js App Router (React 18)  
🔒 JWT Auth with HttpOnly Cookies  
🗄️ MongoDB Models (User / Project / Task)  
⚡ Socket.IO Rooms → Realtime Kanban Updates  
🐳 Docker + GitHub Actions CI/CD  
🧪 Vitest + Supertest (API Tests)  

---

</div>

# SAV MERN Starter — Pro (Realtime Kanban)

**MERN:** Next.js 14 (App Router) · Express + TypeScript · MongoDB/Mongoose · JWT (HttpOnly) · Socket.IO (rooms) · Docker (Mongo) · GitHub Actions CI

[![CI](https://github.com/<your-username>/sav-mern-starter-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/<your-username>/sav-mern-starter-pro/actions)
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
