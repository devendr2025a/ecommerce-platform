# ShopEasy — Full-Stack E-Commerce Platform

A complete, production-ready single-vendor e-commerce web application.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT (Access + Refresh tokens)
- **Payments**: Razorpay

---

## Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, upload, error handler
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   ├── uploads/        # Product images (auto-created)
│   │   └── utils/          # Token helpers
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # Navbar, Footer, ProductCard, AdminLayout
    │   ├── context/        # AuthContext, CartContext
    │   ├── pages/          # All user + admin pages
    │   └── services/       # Axios API layer
    ├── index.html
    ├── .env.example
    └── package.json
```

---

## Quick Setup

### Step 1: Clone and install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Configure environment variables

```bash
# Backend
cp .env.example .env
# Edit .env and fill in your values

# Frontend
cp .env.example .env
# Edit .env and fill in your values
```

### Step 3: Add Razorpay Keys

In `backend/.env`:
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

In `frontend/.env`:
```
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
```

### Step 4: Start the servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

### Step 5: Create Admin User

After registration, manually update a user's role in MongoDB:
```js
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

Then login and navigate to `/admin`.

---

## API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/refresh | Public |
| POST | /api/auth/logout | Private |
| GET | /api/auth/me | Private |

### Products
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/products | Public |
| GET | /api/products/:id | Public |
| POST | /api/products | Admin |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |
| POST | /api/products/:id/reviews | Private |

### Cart
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/cart | Private |
| POST | /api/cart | Private |
| PUT | /api/cart/:productId | Private |
| DELETE | /api/cart/:productId | Private |
| DELETE | /api/cart/clear | Private |

### Orders
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/orders | Private |
| GET | /api/orders/my | Private |
| GET | /api/orders/:id | Private |
| GET | /api/orders | Admin |
| PUT | /api/orders/:id/status | Admin |

### Addresses
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/addresses | Private |
| POST | /api/addresses | Private |
| PUT | /api/addresses/:id | Private |
| DELETE | /api/addresses/:id | Private |
| PUT | /api/addresses/:id/default | Private |

### Payments
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/payments/create-order | Private |
| POST | /api/payments/verify | Private |
| GET | /api/payments/stats | Admin |

### Admin
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/admin/stats | Admin |
| GET | /api/admin/users | Admin |
| GET | /api/admin/users/:id | Admin |
| PUT | /api/admin/users/:id/toggle | Admin |

---

## Features Implemented

### User
- ✅ Register / Login / Logout with JWT
- ✅ Access + Refresh token rotation
- ✅ Profile management (name, phone)
- ✅ Password change
- ✅ Multiple address management (add, edit, delete, set default)
- ✅ Product browsing with search, filters, sort, pagination
- ✅ Product details with images, reviews
- ✅ Cart (add, update qty, remove, persist in DB)
- ✅ Checkout with address selection
- ✅ Razorpay payment integration
- ✅ Order placement after payment verification
- ✅ Order history with status tracking

### Admin
- ✅ Admin-only protected routes
- ✅ Dashboard stats (revenue, orders, products, users)
- ✅ Product CRUD with image upload
- ✅ Order management with status updates
- ✅ User management (view, activate/deactivate)
- ✅ Low stock alerts
- ✅ Payment tracking

---

## Notes
- Free shipping on orders above ₹500
- GST: 18% applied on all orders
- Product images stored locally in `backend/src/uploads/`
- For production: replace local image storage with Cloudinary




## Note Create Admin 
cd backend
ADMIN_EMAIL=admin@shopeasy.com ADMIN_PASSWORD=Admin@123 npm run create-admin

