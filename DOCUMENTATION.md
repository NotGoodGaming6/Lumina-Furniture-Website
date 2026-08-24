# Lumina E-Commerce Platform Documentation 💎

Lumina is a full-scale e-commerce platform equipped with modern design aesthetics (Premium Glassmorphism), high-performance architecture, and real-time features. This document provides detailed information about the project's architecture, technologies used, and core functionalities.

---

## 🚀 Technology Stack

### Frontend
*   **Core**: [React 19](https://react.dev/) (Vite for lighting-fast builds)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query for data fetching)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth transition effects)
*   **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) (Custom Glassmorphism utilities)
*   **Real-time**: [Socket.io-client](https://socket.io/) (Live notifications)
*   **Charts**: [Recharts](https://recharts.org/) (Admin analytics dashboards)

### Backend
*   **Server**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (HTTP & WebSocket)
*   **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
*   **Security**: JWT (Auth), Bcrypt (Password hashing)
*   **Real-time Engine**: [Socket.io](https://socket.io/) (Server-side events)
*   **E-mail**: Nodemailer (For OTP codes and recovery)

---

## 🏗️ System Architecture

The project is built on a **Client-Server** model (separated frontend and backend).

### Backend Structure (MVC-Service Layer)
The server side is organized modularly:
*   [models/](file:///e:/TapŞırıqlar/React/Lumina-Website/server/models): Mongoose schemas (User, Order, Product, Coupon, Review).
*   [controllers/](file:///e:/TapŞırıqlar/React/Lumina-Website/server/controllers): Logic for handling HTTP requests.
*   [services/](file:///e:/TapŞırıqlar/React/Lumina-Website/server/services): Business logic and heavy database operations (Aggregation, Filtering).
*   [routes/](file:///e:/TapŞırıqlar/React/Lumina-Website/server/routes): Definition of API endpoints.
*   [utils/](file:///e:/TapŞırıqlar/React/Lumina-Website/server/utils): Helper functions (Socket initialization, JWT generation).

### Frontend Structure
The React side is component-based and follow atomic design principles:
*   [pages/](file:///e:/TapŞırıqlar/React/Lumina-Website/client/src/pages): Main pages (Home, Auth, Admin, Products, etc.)
*   [components/layout/](file:///e:/TapŞırıqlar/React/Lumina-Website/client/src/components/layout): Global Navbar, Footer, and Admin sidebars.
*   [redux/api/](file:///e:/TapŞırıqlar/React/Lumina-Website/client/src/redux/api): API Slices (Automatic caching and state management for backend requests).
*   [hooks/](file:///e:/TapŞırıqlar/React/Lumina-Website/client/src/hooks): Custom React hooks (`useSocket`, `useIntersectionObserver`).

---

## 🔥 Key Functional Features

### 1. 🛡️ Security and Authentication (Auth)
*   **OTP Registration**: New users are verified via a 6-digit code sent to their email.
*   **JWT Login**: User sessions are protected via secure tokens.
*   **Role-Based Access**: Permission levels for Admin and Standard User.

### 2. 📊 Admin Analytics (Real-time Dashboard)
A specialized panel for administrators:
*   **Live Metrics**: Real-time Total Revenue, Order counts, and Active User reports using MongoDB Aggregation Pipelines.
*   **Charts**: Monthly revenue trends (AreaChart) and best-selling products (BarChart).
*   **Stock Alerts**: Automatic red warning system for items with less than 5 units in stock.

### 3. 📡 Real-time Notifications (Socket.io)
The platform is synchronized via live communication:
*   **New Order Alert**: Instant sound and toast notification for Admins when a customer places an order.
*   **Order Status Sync**: When an Admin updates an order status (e.g., *Processing* -> *Shipped*), the customer receives an immediate notification while browsing.

### 4. ✨ Premium UI/UX
*   **Glassmorphism**: The entire interface is built with transparent, "frosted glass" effects using Tailwind CSS utilities.
*   **Scroll Animations**: Staggered animations using `IntersectionObserver` trigger as elements enter the viewport.

---

## 🛠️ Installation and Setup

### System Requirements
*   Node.js v18+
*   MongoDB Atlas account or local MongoDB Server.

### Steps
1.  Clone the repository.
2.  **Setup Server**:
    ```bash
    cd server
    npm install
    # Create .env file (Include MONGO_URI, JWT_SECRET, PORT)
    node server.js
    ```
3.  **Setup Client**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

---

## 🔗 API Reference (Core Endpoints)

| Endpoint | Method | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | New user signup / OTP dispatch | Everyone |
| `/api/products` | GET | Product list and filtering | Everyone |
| `/api/admin/analytics` | GET | Global sales and user statistics | Admin Only |
| `/api/orders/mine` | GET | Retrieve user-specific orders | User Only |
| `/api/admin/orders` | GET | Full order management dashboard | Admin Only |

---

> [!TIP]
> **Design Note:** The `brand-500` (#6366f1) color is the primary accent for visual harmony. The `noise-bg` class in `index.css` adds a premium grain effect to the background.
