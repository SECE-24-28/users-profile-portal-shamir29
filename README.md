# Student Profile Portal

A full-stack student profile management portal built with **React**, **Node.js/Express**, and **Prisma** (SQLite).

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- ORM: Prisma v7 (with better-sqlite3 adapter)
- Database: SQLite

## Getting Started

### 1. Start the backend
```bash
cd server
npm install
npm run db:init     # creates and seeds the SQLite database (run once)
npm start           # or: npm run dev (with hot reload)
```
Server runs at `http://localhost:5000`

### 2. Start the frontend
```bash
cd client
npm install
npm run dev
```
App runs at `http://localhost:5173`

## Features
- View all student profiles in a card grid
- Register new students
- View detailed student profile
- Edit student information
- Delete a student

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/students | List all students |
| GET | /api/students/:id | Get student by ID |
| POST | /api/students | Create a student |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |
