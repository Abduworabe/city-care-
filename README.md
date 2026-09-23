# Jobify — MERN Stack Job Application Tracker

A full-stack job application tracking system built with the MERN stack. Track, manage, and visualize your job search from a clean dashboard.

---

## Features

- **Authentication** — Secure registration and login using JWT stored in HTTP-only cookies
- **Authorization** — Role-based access control (Admin / User) with a Demo User read-only mode
- **Job CRUD** — Create, read, update, and delete job applications
- **Search & Filter** — Filter jobs by status, type, and sort order with live search
- **Statistics** — Visual bar and area charts showing application trends over time
- **Profile** — Update name, email, and profile picture (Cloudinary integration)
- **Security** — Helmet, rate limiting, mongo sanitization, and input validation built in
- **3D Background** — Three.js animated background on the landing page

---

## Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Express | Web framework |
| Mongoose | MongoDB ODM |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| Cloudinary + Multer | File/image uploads |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| express-mongo-sanitize | NoSQL injection protection |
| express-validator | Input validation |
| Morgan | HTTP request logging |
| Nodemon | Dev auto-restart |

### Frontend
| Package | Purpose |
|---|---|
| React 19 | UI library |
| React Router v6 | Client-side routing |
| TanStack Query v5 | Server state management |
| Axios | HTTP client |
| Recharts + Chart.js | Data visualization |
| Three.js | 3D animated background |
| Styled Components | CSS-in-JS styling |
| React Toastify | Toast notifications |
| React Icons | Icon library |
| Vite | Build tool |

---

## Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/Abduworabe/city-care-.git
cd city-care-
```

### 2. Set up environment variables
Create a `.env` file in the root with the following:
```
NODE_ENV=development
PORT=5100
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### 3. Install dependencies
```bash
npm run setup-project
```

### 4. Run in development
```bash
npm run dev
```

This starts both the Express server (port 5100) and the Vite dev server (port 5173) concurrently.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run frontend + backend concurrently |
| `npm run server` | Run backend only (with nodemon) |
| `npm run client` | Run frontend only (Vite) |
| `npm run setup-project` | Install all dependencies |
| `npm run setup-production-app` | Install deps and build frontend |

---

## Project Structure

```
├── client/               # React frontend (Vite)
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route-level page components
│       ├── hooks/        # Custom React hooks
│       └── utils/        # Axios instance, route links
├── controllers/          # Express route controllers
├── middleware/           # Auth, error handler, validation, multer
├── models/               # Mongoose models (User, Job, LandingStats)
├── routes/               # Express routers
├── utils/                # Constants, token/password utilities
├── errors/               # Custom error classes
└── server.js             # Express app entry point
```

---

## License

ISC
