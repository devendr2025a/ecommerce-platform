# ShopEasy — Complete Setup & Deployment Guide

## Architecture
- **Frontend** → Vercel (React/Vite)
- **Backend** → Vercel (Express as serverless functions)
- **Database** → MongoDB Atlas (free tier)
- **Images** → Cloudinary (free tier)
- **Payments** → Razorpay

---

## PART 1 — PREREQUISITES (One-time setup)

### 1.1 Create MongoDB Atlas Database

1. Go to https://www.mongodb.com/atlas and sign up (free)
2. Create a new project → **Build a Database** → choose **M0 Free tier**
3. Select a cloud region close to you → Create Cluster
4. **Create Database User**:
   - Security → Database Access → Add New Database User
   - Username: `shopeasy_user`, Password: (generate strong password — save it)
   - Role: **Read and write to any database** → Add User
5. **Whitelist all IPs** (required for Vercel):
   - Security → Network Access → Add IP Address
   - Click **Allow Access from Anywhere** → `0.0.0.0/0` → Confirm
6. **Get connection string**:
   - Deployment → Database → Connect → Drivers
   - Copy the string: `mongodb+srv://shopeasy_user:<password>@cluster0.xxxxx.mongodb.net/`
   - Replace `<password>` with your actual password
   - Append the DB name: `...mongodb.net/ecommerce?retryWrites=true&w=majority`

---

### 1.2 Create Cloudinary Account

1. Go to https://cloudinary.com and sign up (free)
2. From the **Dashboard**, copy these 3 values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

### 1.3 Get Razorpay API Keys

1. Go to https://dashboard.razorpay.com and sign up
2. Complete KYC (or use Test mode — no KYC needed for testing)
3. Settings → API Keys → Generate Test Key
4. Copy **Key ID** (`rzp_test_...`) and **Key Secret**

---

### 1.4 Install Tools

```bash
# Install Node.js (v18+) from https://nodejs.org
node -v   # should show v18+

# Install Vercel CLI
npm install -g vercel

# Install Git (if not installed)
git --version
```

---

## PART 2 — LOCAL DEVELOPMENT SETUP

### 2.1 Clone / Setup the project

```bash
cd ecommerce-platform
```

### 2.2 Configure Backend environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://shopeasy_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority

JWT_ACCESS_SECRET=your_64_char_random_string_here
JWT_REFRESH_SECRET=another_64_char_random_string_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

> **Tip**: Generate secure JWT secrets:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### 2.3 Configure Frontend environment

```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
```

### 2.4 Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2.5 Create Admin User

```bash
cd backend
npm run create-admin
# Creates: admin@shopeasy.com / Admin@123
# Change these in src/scripts/createAdmin.js or set ADMIN_EMAIL and ADMIN_PASSWORD in .env
```

### 2.6 Start development servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# Runs on http://localhost:5000

# Terminal 2 — Frontend
cd frontend && npm run dev
# Runs on http://localhost:5173
```

### 2.7 Test the app

- Open http://localhost:5173
- Register a new user
- Login as admin: `admin@shopeasy.com` / `Admin@123`
- Go to `/admin` to manage products

---

## PART 3 — DEPLOY TO VERCEL

### 3.1 Push code to GitHub

```bash
cd ecommerce-platform

# Initialize git at the root
git init
git add .
git commit -m "Initial commit — ShopEasy e-commerce platform"

# Create repo on GitHub: https://github.com/new (name: ecommerce-platform)
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-platform.git
git branch -M main
git push -u origin main
```

---

### 3.2 Deploy Backend to Vercel

```bash
cd backend

# Login to Vercel
vercel login

# Deploy
vercel

# Answer the prompts:
# Set up and deploy "backend"? → Y
# Which scope? → Your account
# Link to existing project? → N
# Project name? → shopeasy-backend
# In which directory is your code located? → ./
# Want to override the settings? → N

# After deploy, note your backend URL:
# e.g. https://shopeasy-backend.vercel.app
```

#### Add Backend Environment Variables on Vercel

Go to https://vercel.com → shopeasy-backend → Settings → Environment Variables

Add ALL variables from your `.env` file:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `MONGO_URI` | `mongodb+srv://...` |
| `JWT_ACCESS_SECRET` | `your_secret` |
| `JWT_REFRESH_SECRET` | `your_secret` |
| `JWT_ACCESS_EXPIRY` | `15m` |
| `JWT_REFRESH_EXPIRY` | `7d` |
| `RAZORPAY_KEY_ID` | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | `your_secret` |
| `CLOUDINARY_CLOUD_NAME` | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | `your_api_key` |
| `CLOUDINARY_API_SECRET` | `your_api_secret` |
| `CLIENT_URL` | *(set after frontend deploy, e.g. https://shopeasy.vercel.app)* |

After adding variables:
```bash
vercel --prod   # redeploy with env vars applied
```

Test the backend:
```bash
curl https://shopeasy-backend.vercel.app/api/health
# Should return: {"status":"OK","message":"ShopEasy API is running"}
```

---

### 3.3 Deploy Frontend to Vercel

First update the frontend `.env` with your live backend URL:
```env
VITE_API_URL=https://shopeasy-backend.vercel.app/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
```

```bash
cd ../frontend

vercel

# Prompts:
# Project name? → shopeasy-frontend
# Directory? → ./
# Override settings? → N

# Note your frontend URL:
# e.g. https://shopeasy-frontend.vercel.app
```

#### Add Frontend Environment Variables on Vercel

Go to https://vercel.com → shopeasy-frontend → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://shopeasy-backend.vercel.app/api` |
| `VITE_RAZORPAY_KEY_ID` | `rzp_test_xxxxxxxxxxxxxx` |

```bash
vercel --prod   # redeploy
```

---

### 3.4 Update Backend CORS with Frontend URL

Go to Vercel → shopeasy-backend → Settings → Environment Variables

Update `CLIENT_URL`:
```
CLIENT_URL=https://shopeasy-frontend.vercel.app
```

Redeploy backend:
```bash
cd backend && vercel --prod
```

---

### 3.5 Create Admin User in Production

```bash
# From backend/ folder with production .env pointing to Atlas
ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=YourSecurePass123 npm run create-admin
```

Or set `ADMIN_EMAIL` and `ADMIN_PASSWORD` temporarily in `backend/.env` then run the script.

---

## PART 4 — CONNECT GITHUB FOR AUTO-DEPLOY (Optional but recommended)

1. Go to https://vercel.com → shopeasy-backend → Settings → Git
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Do the same for shopeasy-frontend with Root Directory `frontend`

From now on, every `git push` to `main` will auto-deploy both.

---

## PART 5 — CUSTOM DOMAIN (Optional)

1. Vercel → shopeasy-frontend → Settings → Domains
2. Add your domain (e.g. `www.shopeasy.com`)
3. Update DNS records at your registrar as instructed
4. Update `CLIENT_URL` in backend to match your custom domain
5. Redeploy backend

---

## PART 6 — GO LIVE WITH RAZORPAY

When ready for real payments:

1. Complete Razorpay KYC at https://dashboard.razorpay.com
2. Generate **Live Keys** (Settings → API Keys → Live Mode)
3. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` on Vercel (backend)
4. Update `VITE_RAZORPAY_KEY_ID` on Vercel (frontend)
5. Redeploy both

---

## QUICK REFERENCE

| | Local | Production |
|--|-------|------------|
| Frontend | http://localhost:5173 | https://shopeasy-frontend.vercel.app |
| Backend | http://localhost:5000 | https://shopeasy-backend.vercel.app |
| API Health | http://localhost:5000/api/health | https://shopeasy-backend.vercel.app/api/health |
| Admin Panel | http://localhost:5173/admin | https://shopeasy-frontend.vercel.app/admin |

## Default Admin Credentials
```
Email:    admin@shopeasy.com
Password: Admin@123
```
> Change these immediately after first login via Dashboard → Security tab.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| CORS error in prod | Make sure `CLIENT_URL` on Vercel backend matches your exact frontend URL |
| Images not uploading | Verify `CLOUDINARY_*` env vars are set correctly on Vercel backend |
| Payment not working | Check `RAZORPAY_KEY_ID` in both backend and frontend env vars |
| MongoDB timeout | Check Atlas → Network Access — must have `0.0.0.0/0` allowed |
| 404 on page refresh | Confirm `frontend/vercel.json` exists with the SPA rewrite rule |
| Admin page says "Access denied" | Run `npm run create-admin` to set role or check user's role in Atlas |
