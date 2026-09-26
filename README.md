# Worabe Municipality — CityCare Portal

**CityCare** is a full-stack MERN web application built as part of an internship at Worabe Municipality (Silti Zone, SNNPR, Ethiopia). It allows citizens to report and track public service complaints digitally, and gives municipality administrators tools to manage, respond to, and resolve those complaints.

> Internship Report: Arba Minch University — School of Computing and Software Engineering  
> Student: Abdilkerim Juhar (NSR/009/15)  
> Duration: September 2025 – December 2025

---

## Live Features

### For Citizens
- Register / Login securely (JWT + HTTP-only cookies)
- Submit complaints with category, description, and optional photo
- Track status of their own complaints in real time
- Receive automatic notifications when complaint status changes
- Participate in the community discussion forum
- Switch UI between **English** and **አማርኛ (Amharic)**
- Light / Dark theme

### For Admins (Municipality Staff)
- View **all citizens' complaints** system-wide
- Filter/search complaints by status, type, location
- Update complaint status (reported → in progress → resolved → closed)
- Send custom messages directly to any citizen via notifications
- View system-wide statistics and monthly trend charts
- Moderate the discussion forum (pin, close threads)
- See all registered users

---

## Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Node.js + Express | REST API |
| Mongoose | MongoDB ODM |
| MongoDB Atlas | Cloud database |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| Cloudinary + Multer | Image uploads |
| Helmet | Security headers |
| express-rate-limit | Brute-force protection |
| express-mongo-sanitize | NoSQL injection protection |
| express-validator | Input validation |

### Frontend
| Package | Purpose |
|---|---|
| React 19 + Vite 7 | UI + build tool |
| React Router v6 | Client-side routing |
| TanStack Query v5 | Server state management |
| Axios | HTTP client |
| Styled-Components | CSS-in-JS |
| Recharts + Chart.js | Data visualization |
| Three.js | 3D landing page background |
| React Toastify | Toast notifications |
| React Icons | Icon library |

---

## Data Models

| Model | Purpose |
|---|---|
| User | Citizens and admin accounts |
| Job (Complaint) | Complaint records with status, category, location, photo, adminRemarks |
| Notification | Real-time alerts for status changes and admin messages |
| Discussion | Community forum threads with nested replies, pinning, closing |

---

## Pages

| Page | Role | Description |
|---|---|---|
| Landing | Public | Hero, features, stats, CTA |
| Login / Register | Public | Auth forms with Amharic support |
| Dashboard (Stats) | Both | Default view — complaint stats + monthly chart |
| All Complaints | Both | Citizen: own complaints. Admin: all citizens |
| Add Complaint | Citizen | Submit new issue with category, location, photo |
| Edit / Manage Complaint | Both | Citizen: edit details. Admin: update status + remarks |
| Notifications | Both | Full notification history, mark read, delete |
| Discussion Forum | Both | Community threads with categories, replies, pin/close |
| Profile | Both | Update name, photo, location |
| Admin Panel | Admin | User count, total complaint count |
| Settings | Both | Language (EN/AM), theme, font size, notifications |

---

## Getting Started

### 1. Clone
```bash
git clone https://github.com/Abduworabe/city-care-.git
cd city-care-
```

### 2. Environment variables
Create a `.env` file in the root:
```
NODE_ENV=development
PORT=5100
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ Never commit `.env`. It is listed in `.gitignore`.

### 3. Install dependencies
```bash
npm run setup-project
```

### 4. Run in development
```bash
npm run dev
```

- Backend → http://localhost:5100
- Frontend → http://localhost:5173

---

## API Routes

| Router | Base Path | Description |
|---|---|---|
| Auth | `/api/v1/auth` | Register, login, logout |
| Users | `/api/v1/users` | Profile, admin stats, all users |
| Jobs | `/api/v1/jobs` | Complaints CRUD + stats |
| Notifications | `/api/v1/notifications` | Get, read, delete, send admin message |
| Discussions | `/api/v1/discussions` | Forum threads, replies, pin/close |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run frontend + backend concurrently |
| `npm run server` | Backend only (nodemon) |
| `npm run client` | Frontend only (Vite) |
| `npm run setup-project` | Install all dependencies |
| `npm run setup-production-app` | Install + build frontend |

---

## Project Structure

```
├── client/                   # React frontend (Vite)
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── context/          # SettingsContext (i18n+theme), NotificationContext
│       ├── pages/            # Route-level pages
│       ├── utils/            # customFetch, nav links
│       └── assets/           # Styled-component wrappers, images, CSS
├── controllers/              # Express controllers
│   ├── authController.js
│   ├── jobController.js
│   ├── userController.js
│   ├── notificationController.js
│   └── discussionController.js
├── middleware/               # Auth, validation, multer, error handler
├── models/                   # Mongoose models
│   ├── UserModel.js
│   ├── JobModel.js
│   ├── NotificationModel.js
│   └── DiscussionModel.js
├── routes/                   # Express routers
├── utils/                    # Constants, token utils, password utils
└── server.js                 # Entry point
```

---

## Notification Triggers

| Event | Who Gets Notified |
|---|---|
| Citizen submits a complaint | All admins |
| Admin updates complaint status | The complaint's citizen |
| Admin sends a direct message | The selected citizen |
| New user registers | All admins |

---

## Languages Supported

| Language | Code | Status |
|---|---|---|
| English | `en` | ✅ Full |
| Amharic (አማርኛ) | `am` | ✅ Full |
| Afaan Oromo | `or` | Selectable |
| Tigrinya | `ti` | Selectable |
| Somali | `so` | Selectable |

---

## Security

- Passwords hashed with **bcryptjs**
- JWTs stored in **HTTP-only cookies** (not localStorage)
- **Helmet** sets secure HTTP headers
- **express-rate-limit** throttles auth endpoints
- **express-mongo-sanitize** prevents NoSQL injection
- **express-validator** validates all inputs server-side
- Role-based access control at both API and UI level

---

## GitHub

**Repository:** https://github.com/Abduworabe/city-care-

---

*Built during internship at Worabe Municipality — Arba Minch University, School of Computing and Software Engineering*
