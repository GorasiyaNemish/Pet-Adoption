# 🐾 Pet Adoption Management System

A full-stack **MERN** application built with **TypeScript** that allows users to browse pets available for adoption, apply to adopt them, and lets admins manage pets and adoption requests.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Axios, SCSS |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |
| **Validation** | express-validator |

---

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| **Visitor** | Browse pets, view pet details, search & filter |
| **User** | Register/Login, apply to adopt pets, view own application statuses |
| **Admin** | Full pet CRUD, view & manage all adoption applications, update pet status |

---

## ✨ Features

### Public (Visitor)
- Browse available pets with a clean, paginated listing
- Search pets by **name** or **breed**
- Filter by **species**, **breed**, and **age**
- View full pet detail pages

### Authenticated User
- Register and login securely
- Apply to adopt available pets
- View own adoption applications and their current statuses

### Admin
- Add, edit, and delete pet listings
- View all adoption applications across all users
- Approve or reject individual applications
- Pet status updates automatically on approval

---

## 📁 Project Structure

```
pet-adoption/
├── backend/          # Express + TypeScript REST API
│   ├── src/
│   │   ├── config/   # Database & environment config
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/   # Mongoose models
│   │   ├── routes/
│   │   ├── types/    # TypeScript interfaces
│   │   └── utils/
│   ├── .env.example
│   └── package.json
│
└── frontend/         # React + TypeScript SPA
    ├── src/
    │   ├── api/      # Axios instance & API calls
    │   ├── components/
    │   ├── context/  # Auth context
    │   ├── hooks/
    │   ├── pages/
    │   ├── styles/   # SCSS architecture
    │   └── types/
    ├── .env.example
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18.x
- MongoDB (local or Atlas)
- npm >= 9.x

### 1. Clone the repository
```bash
git clone https://github.com/your-username/pet-adoption.git
cd pet-adoption
```

### 2. Set up environment variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Edit .env with your backend API URL
```

### 3. Install dependencies
```bash
# From root
npm run install:all

# Or individually
cd backend && npm install
cd frontend && npm install
```

### 4. Run in development mode

```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

- Backend runs at: `http://localhost:5000`
- Frontend runs at: `http://localhost:5173`

---

## 🔐 Environment Variables

See `backend/.env.example` and `frontend/.env.example` for required variables.

---

## 📡 API Overview

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive JWT |
| `GET` | `/api/pets` | Public | List pets (search, filter, paginate) |
| `GET` | `/api/pets/:id` | Public | Get single pet detail |
| `POST` | `/api/pets` | Admin | Create a new pet |
| `PUT` | `/api/pets/:id` | Admin | Update pet details |
| `DELETE` | `/api/pets/:id` | Admin | Delete a pet |
| `POST` | `/api/adoptions` | User | Apply to adopt a pet |
| `GET` | `/api/adoptions/me` | User | View own applications |
| `GET` | `/api/adoptions` | Admin | View all applications |
| `PUT` | `/api/adoptions/:id/status` | Admin | Approve or reject application |

---

## 🔮 Future Improvements

- [ ] **Image Uploads**: Integrate Cloudinary or AWS S3 for direct pet photo uploads instead of URL strings.
- [ ] **Email Notifications**: Automated emails for application status updates (Approved/Rejected).
- [ ] **User Reviews**: Allow adopted pet owners to leave stories and reviews.
- [ ] **Real-time Chat**: Connect potential adopters directly with shelter admins.

---

## 📄 License

MIT
