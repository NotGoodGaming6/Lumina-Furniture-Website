# LUMINA — Scandinavian Architectural Living 🛋️✨

A high-end e-commerce platform crafted with architectural minimalism, Scandinavian aesthetics, and enterprise scalability.

![Lumina Banner](client/src/assets/hero_banner.png)

---

## 🌟 Key Features

- **🏛️ Scandinavian Aesthetics:** Rich dark/light mode, custom glassmorphism, responsive tilt cards, and Cormorant Garamond typography.
- **🏷️ Multi-Currency Engine:** Instant conversion across **$ USD**, **€ EUR**, and **₼ AZN** with site-wide dynamic formatting.
- **⚖️ Side-by-Side Product Comparison:** Compare up to 4 furniture & lighting pieces across materials, 5-year warranties, and trial periods.
- **⚡ High-Performance Architecture:** Sub-500ms response times, compound MongoDB indexes, RTK Query client caching, and `.lean()` database queries.
- **🛡️ Enterprise Security:** Bcrypt salted passwords, 6-digit OTP verification, strict rate limiting, Helmet security headers, and NoSQL injection sanitizer.
- **📜 Full Legal & GDPR Compliance:** Interactive GDPR Cookie Banner, Privacy Policy, Terms of Service, 30-day Refund Policy, and GDPR One-Click Account Deletion.
- **📊 Real-Time Admin Dashboard:** Order status management, live analytics charts, invoice PDF printing, and product inventory management.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite 8
- **State Management:** Redux Toolkit + RTK Query
- **Styling:** Vanilla CSS + TailwindCSS v4
- **Animations:** Framer Motion
- **Icons:** React Icons (Feather / Flat Icons)
- **Notifications:** React Hot Toast + SweetAlert2

### Backend
- **Runtime:** Node.js + Express
- **Database:** MongoDB (Mongoose with compound indexes)
- **Real-Time:** Socket.io
- **Security:** Helmet, Express Rate Limit, HPP, Express Mongo Sanitize, BcryptJS, JWT
- **Mailing:** Nodemailer (OTP verification)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-username/lumina-website.git
cd lumina-website

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory with your own port, database URI, JWT secret, and email credentials.

### 3. Run Development Servers

```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

Visit **http://localhost:5173** to view the store.

---

## 💾 Database Utilities

```bash
# Backup entire database to timestamped JSON snapshot
npm run db:backup

# Restore database from latest backup snapshot
npm run db:restore
```

---

## 📄 License
MIT License © 2026 LUMINA Studio. All rights reserved.
