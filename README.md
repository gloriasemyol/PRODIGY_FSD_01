# PRODIGY_FSD_01 — Full-Stack Auth System

A full-stack authentication and role-based access control (RBAC) application built with Next.js, Express, PostgreSQL, and JWT.

## 🏗️ Architecture

- **Frontend:** Next.js (React) + Tailwind CSS — handles UI, forms, and route protection
- **Backend:** Node.js + Express — handles API routes, authentication logic, and RBAC
- **Database:** PostgreSQL — stores user accounts
- **Auth:** JWT (JSON Web Tokens) for stateless authentication, bcryptjs for password hashing

```
PRODIGY_FSD_01/
├── client/          # Next.js frontend
├── server/          # Express backend
│   ├── db/          # Database connection
│   ├── middleware/  # Auth & role-checking middleware
│   └── routes/      # API route handlers
└── README.md
```

## ⚙️ Local Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- npm

### 1. Clone the repository
```
git clone https://github.com/yourusername/PRODIGY_FSD_01.git
cd PRODIGY_FSD_01
```

### 2. Set up the database
1. Create a PostgreSQL database named `prodigy_fsd_01`.
2. Run this SQL to create the users table:
```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Set up the backend
```
cd server
npm install
```
Create a `.env` file in `server/` with:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prodigy_fsd_01
JWT_SECRET=your_long_random_secret
PORT=5000
```
Run the server:
```
npm run dev
```

### 4. Set up the frontend
```
cd ../client
npm install
npm run dev
```

The app will be available at `http://localhost:3000`, with the API at `http://localhost:5000`.

## 🔑 API Endpoints

| Method | Endpoint              | Description                    | Auth Required |
|--------|------------------------|--------------------------------|----------------|
| POST   | /api/auth/register     | Create a new user account      | No             |
| POST   | /api/auth/login        | Log in and receive a JWT       | No             |
| GET    | /api/dashboard          | Protected test route           | Yes            |
| GET    | /api/admin-only         | Admin-only test route          | Yes (admin)    |

## 🚀 Deployment

- Database: [Render PostgreSQL / Supabase / Neon]
- Backend: [Render]
- Frontend: [Vercel]

Live URL: _(add after Day 14 deployment)_

## 🔒 Security Notes
- Passwords are hashed with bcrypt (10 salt rounds) before storage — never stored in plain text.
- JWTs are signed with a secret key and expire after 2 hours.
- Role-based middleware protects sensitive routes on the backend (not just hidden UI elements).