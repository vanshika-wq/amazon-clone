# 🛒 Amazon Clone — Full Stack Project

A fully functional Amazon Clone built with React, Node.js, Express, and MongoDB.

---

## 🖥️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 + Vite + Tailwind CSS    |
| State      | Redux Toolkit                     |
| Backend    | Node.js + Express                 |
| Database   | MongoDB Atlas (free)              |
| Auth       | JWT + bcrypt                      |
| Deploy     | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
amazon-clone/
├── client/                 ← React Frontend
│   ├── src/
│   │   ├── components/     ← Header, Footer, ProductCard, Rating, etc.
│   │   ├── pages/          ← HomePage, ProductPage, CartPage, etc.
│   │   ├── redux/          ← store, cartSlice, userSlice
│   │   └── utils/          ← axios API instance
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                 ← Node/Express Backend
    ├── models/             ← User, Product, Order (Mongoose)
    ├── routes/             ← userRoutes, productRoutes, orderRoutes
    ├── middleware/         ← authMiddleware (JWT protect)
    ├── data/               ← seeder.js (sample data)
    └── server.js
```

---

## ✅ STEP-BY-STEP SETUP

### STEP 1 — Prerequisites
Make sure you have installed:
- Node.js v18+ → https://nodejs.org
- VS Code → https://code.visualstudio.com
- Git → https://git-scm.com

### STEP 2 — Get MongoDB Atlas (Free Database)
1. Go to https://mongodb.com/atlas
2. Sign up for free
3. Click "Create a Free Cluster" → choose free tier (M0)
4. Create a database user: username + password (remember these!)
5. Under "Network Access" → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Click "Connect" → "Connect your application"
7. Copy the connection string. It looks like:
   `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
8. Replace `<password>` with your actual password

### STEP 3 — Configure Environment Variables
Open `server/.env` and replace with your real values:
```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/amazonclone?retryWrites=true&w=majority
JWT_SECRET=anyRandomSecretString123
PORT=5000
```

### STEP 4 — Install Dependencies

Open VS Code terminal (Ctrl+` or Terminal → New Terminal):

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### STEP 5 — Seed Sample Products into Database

```bash
cd server
node data/seeder.js
```

You should see: ✅ Data imported successfully!

This creates:
- 2 users: admin@example.com / john@example.com (password: 123456)
- 6 sample products (AirPods, iPhone, PS5, Samsung TV, Nike shoes, Kindle)

### STEP 6 — Run the App (2 terminals)

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```
You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```
You should see:
```
  VITE v5.x  ready in 300ms
  ➜  Local: http://localhost:5173/
```

### STEP 7 — Open in Browser
Go to: http://localhost:5173

---

## 🔑 Test Accounts

| Role  | Email               | Password |
|-------|---------------------|----------|
| Admin | admin@example.com   | 123456   |
| User  | john@example.com    | 123456   |

---

## 🚀 DEPLOY TO PRODUCTION

### Deploy Backend → Render.com (Free)
1. Go to https://render.com → Sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add Environment Variables:
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
   - `PORT` = 5000
6. Click Deploy → copy your live URL (e.g. https://amazon-clone-api.onrender.com)

### Deploy Frontend → Vercel.com (Free)
1. Push your code to GitHub first:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/amazon-clone.git
   git push -u origin main
   ```
2. Go to https://vercel.com → Sign up with GitHub
3. Click "New Project" → Import your repo
4. Settings:
   - Root Directory: `client`
   - Framework: Vite
5. Add Environment Variable:
   - `VITE_API_URL` = https://amazon-clone-api.onrender.com (your Render URL)
6. Click Deploy → your app is LIVE! 🎉

---

## ✨ Features

- 🏠 Homepage with hero banner + product grid
- 🔍 Search products by keyword
- 📦 Product detail page with reviews
- 🛒 Cart with quantity management (persisted in localStorage)
- 🔐 Register / Login with JWT auth
- 📍 Shipping address form
- 🧾 Place order with order summary
- 💳 Mark order as paid (demo)
- 👤 Profile page with order history
- 📱 Fully responsive design

---

## 🆘 Common Issues & Fixes

**"Cannot connect to MongoDB"**
→ Check your MONGO_URI in .env
→ Make sure you allowed 0.0.0.0/0 in Atlas Network Access

**"Module not found"**
→ Run `npm install` in both /server and /client folders

**Products not showing**
→ Run the seeder: `node data/seeder.js`

**CORS error in browser**
→ Make sure server is running on port 5000
→ Vite proxy is configured in vite.config.js

**Port already in use**
→ Kill the process: `npx kill-port 5000` or `npx kill-port 5173`
