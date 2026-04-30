# 🛒 E-Commerce REST API

A production-ready RESTful backend built with **Node.js**, **Express**, and **TypeScript**, featuring JWT authentication, role-based access control, Khalti payment integration, and Sequelize ORM with MySQL.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Models & Relationships](#database-models--relationships)
- [Payment Integration](#payment-integration)
- [Security](#security)
- [Scripts](#scripts)

---

## 🛠 Tech Stack

| Layer       | Technology                       |
| ----------- | -------------------------------- |
| Runtime     | Node.js                          |
| Language    | TypeScript                       |
| Framework   | Express.js                       |
| ORM         | Sequelize + sequelize-typescript |
| Database    | MySQL                            |
| Auth        | JWT (jsonwebtoken) + bcrypt      |
| File Upload | Multer                           |
| HTTP Client | Axios                            |
| Payment     | Khalti Payment Gateway           |
| Dev Tools   | ts-node, nodemon, @types/\*      |

---

## ✨ Features

- 🔐 **Authentication** — Register, Login, Logout with JWT (cookie-based)
- 🛡 **Role-Based Access Control** — Admin, Customer, Staff middleware guards
- 🧾 **Order Management** — Create, view, cancel orders with full transaction support
- 💳 **Khalti Payment** — Initiate & verify payments via Khalti sandbox/live APIs
- 🛍 **Product Management** — CRUD with image uploads (Multer)
- 🗂 **Categories & Cart** — Full cart controller with product relations
- 🌱 **Admin Seeder** — Guaranteed first-run admin account creation
- ⚠️ **Global Error Handler** — Centralized async error wrapper (no repetitive try/catch)
- 🔗 **CORS** — Configured for frontend integration

---

## 📁 Project Structure

```
src/
├── database/
│   ├── config/
│   │   └── sequelize.ts          # Sequelize connection & sync
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   ├── category.model.ts
│   │   ├── cart.model.ts
│   │   ├── order.model.ts
│   │   ├── orderDetail.model.ts
│   │   └── payment.model.ts
│   └── seeders/
│       └── adminSeeder.ts        # Seeds initial admin user
├── middleware/
│   ├── auth.middleware.ts        # JWT verification
│   └── role.middleware.ts        # Role-based guard
├── controllers/
│   ├── auth/
│   │   └── auth.controller.ts
│   ├── product/
│   │   └── product.controller.ts
│   ├── cart/
│   │   └── cart.controller.ts
│   └── order/
│       └── order.controller.ts
├── routes/
│   └── globals/
│       ├── auth/
│       │   └── auth.route.ts
│       ├── product/
│       │   └── product.route.ts
│       └── order/
│           └── order.route.ts
├── types/
│   └── order.types.ts
├── utils/
│   └── errorHandler.ts           # Async error wrapper
└── app.ts                        # Express app entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MySQL running locally or via a hosted service
- A Khalti merchant account (for payment features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. Install dependencies
npm install

# 3. Copy the environment file and fill in your values
cp .env.example .env

# 4. Run database migrations / sync
npm run dev   # Sequelize will auto-sync on first run

# 5. Seed the admin user
npx ts-node src/database/seeders/adminSeeder.ts
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
JWT_COOKIE_NAME=auth

# Khalti
KHALTI_SECRET_KEY=your_khalti_secret_key
KHALTI_INITIATE_URL=https://a.khalti.com/api/v2/epayment/initiate/
KHALTI_LOOKUP_URL=https://a.khalti.com/api/v2/epayment/lookup/
```

---

## 📡 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint    | Access | Description           |
| ------ | ----------- | ------ | --------------------- |
| POST   | `/register` | Public | Register a new user   |
| POST   | `/login`    | Public | Login and receive JWT |
| POST   | `/logout`   | Auth   | Clear auth cookie     |

### Products — `/api/products`

| Method | Endpoint | Access | Description       |
| ------ | -------- | ------ | ----------------- |
| GET    | `/`      | Public | Get all products  |
| POST   | `/`      | Admin  | Add a new product |
| PUT    | `/:id`   | Admin  | Update a product  |
| DELETE | `/:id`   | Admin  | Delete a product  |

### Orders — `/api/orders`

| Method | Endpoint       | Access   | Description                     |
| ------ | -------------- | -------- | ------------------------------- |
| POST   | `/`            | Customer | Create order + initiate payment |
| GET    | `/my-orders`   | Customer | Get logged-in user's orders     |
| GET    | `/:id/details` | Customer | Get order item details          |
| PATCH  | `/:id/cancel`  | Customer | Cancel an order                 |
| POST   | `/verify`      | Customer | Verify Khalti payment           |

### Cart — `/api/cart`

| Method | Endpoint | Access   | Description           |
| ------ | -------- | -------- | --------------------- |
| GET    | `/`      | Customer | View cart items       |
| POST   | `/`      | Customer | Add item to cart      |
| DELETE | `/:id`   | Customer | Remove item from cart |

---

## 🗄 Database Models & Relationships

```
User ──< Product       (User.hasMany, Product.belongsTo)
User ──< Order         (User.hasMany, Order.belongsTo)
Order ──< OrderDetail  (Order.hasMany, OrderDetail.belongsTo)
Order ──< Payment      (Order.hasOne,  Payment.belongsTo)
Product ──< OrderDetail
```

> ⚠️ **Order matters** — relationships must be defined **before** `sequelize.authenticate()` and `sequelize.sync()`.

---

## 💳 Payment Integration (Khalti)

The Khalti flow is split across two controller actions:

```
Frontend → POST /orders        → createOrder()
  └─ Initiates Khalti payment
  └─ Returns { payment_url, pidx }

User completes payment on Khalti

Frontend → POST /orders/verify  → verifyPayment()
  └─ Sends { pidx }
  └─ Calls Khalti lookup API
  └─ Marks Payment as PAID
```

---

## 🔒 Security

| Concern             | Implementation                                       |
| ------------------- | ---------------------------------------------------- |
| Password storage    | `bcrypt` hashing before DB insert                    |
| Auth tokens         | `httpOnly` cookie (prevents XSS access)              |
| Cross-site requests | `sameSite: "lax"` with `secure: false` in dev        |
| Role protection     | Middleware checks `req.user.role` before controllers |
| Data integrity      | Sequelize transactions on order creation             |
| Input validation    | Controller-level + DB-level (`unique`, `allowNull`)  |

> **Production checklist:** Set `secure: true` and `sameSite: "strict"` on cookies, rotate your JWT secret, and never commit `.env`.

---

## 📦 Scripts

```json
{
  "dev": "nodemon src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js",
  "seed": "ts-node src/database/seeders/adminSeeder.ts"
}
```

---

## 🧠 Key Architecture Decisions

- **Fat Model, Thin Controller** — Validation and uniqueness constraints live at the DB/model layer, not scattered in controllers.
- **Error Handler Wrapper** — A single `errorHandler(fn)` utility replaces repetitive `try/catch` blocks across all async controllers.
- **UUID Primary Keys** — All IDs use UUID v4 format for security and scalability.
- **Bulk Create** — `OrderDetail` records are inserted via `bulkCreate()` inside a transaction for atomicity and performance.
- **Admin Seeder** — Ensures a known admin account exists on every deployment; idempotent by design.

---

## 📄 License

MIT © 2025 Rabi Bhujel
