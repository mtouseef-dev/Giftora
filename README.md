# 🎁 Giftora Shop | Luxury Gifts, Joyful Toys & Bespoke Keepsakes

![Giftora Banner](https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1200&auto=format&fit=crop)

Giftora is a full-featured, modern E-Commerce web application built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**. It provides a luxury shopping experience for personalized keepsakes, artisan hampers, soft toys, and STEM robotics kits, alongside an enterprise-grade Store Owner & Admin Control Panel.

---

## 🌟 Executive Summary & Features

### 🛍️ Customer Storefront Experience
- **Interactive Gift Finder Wizard**: 3-step AI-assisted finder matching recipient, occasion, and budget.
- **Live Personalization Studio**: Real-time laser engraving preview on wooden keepsakes (custom names, dates, fonts, and wood finishes).
- **Curated Catalog & Filtering**: Filter by category, occasion, age group, price range, stock availability, and rating.
- **Search Modal**: Instant predictive search across product names, descriptions, tags, and categories with keyboard shortcuts.
- **Responsive Cart Drawer & Free Shipping Meter**: Slide-over cart drawer featuring live progress meter toward Free Express Shipping (threshold: ₹999).
- **Seamless 1-Click Checkout**: Supports **Razorpay Sandbox Simulation (UPI, Cards, NetBanking)** and **Cash on Delivery (COD)** with standard or express flight dispatch choices.
- **Live Shipment Tracker & Tax Invoice**: Interactive order tracking timeline (Order Placed ➔ Payment Verified ➔ Packaging ➔ Shipped ➔ Delivered) with printable tax invoices and simulated WhatsApp updates.
- **Occasion Reminders**: Never miss a birthday or anniversary with automated 7-day advance reminders and 15% promo coupons.

### 🛡️ Store Owner & Admin Portal (`/admin`)
- **Executive Analytics Dashboard**: Live KPIs tracking Gross Revenue, Orders Processed, Active Catalog Items, and Low-Stock Warnings, plus past 7-day revenue trend bar chart.
- **MongoDB & Database Explorer**: Live interactive inspector for raw BSON/JSON collections, schema records, export capability (`.json`), and document copying.
- **Product & Gallery Manager**: Add and edit products with multi-image gallery management (supports **Device File Uploads**, **Direct Image URLs**, and **Curated Stock Asset Library**).
- **Inventory Replenishment Monitor**: Instant stock adjustment and low-inventory restock alerts.
- **Category & Coupon Management**: Create categories with slugs and generate active promotional coupon codes (e.g. `WELCOME10`, `FESTIVE15`).
- **Order Fulfillment Center**: Transition order states (`PENDING` ➔ `CONFIRMED` ➔ `PROCESSING` ➔ `SHIPPED` ➔ `DELIVERED`).

---

## 🛠️ Tech Stack & Technologies

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Hooks) |
| **UI Library** | [React 18](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with custom Glassmorphism & Color System |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Icons** | [Lucide React Icons](https://lucide.dev/) |
| **State & Persistence** | React Context API + Client `localStorage` Fallback Engine |

---

## 🚀 Quick Start - Running Locally

Follow these step-by-step instructions to run Giftora on your local machine:

### Prerequisites
Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.
- Check Node version: `node -v`
- Check npm version: `npm -v`

### Step 1: Open Terminal in Project Directory
Navigate to the project root folder:
```bash
cd "c:\Users\Lenovo\Desktop\Giftora shop"
```

### Step 2: Install Dependencies (If needed)
Dependencies are pre-configured. To re-install or update:
```bash
npm install
```

### Step 3: Start Development Server
Run the local Next.js development server:
```bash
npm run dev
```

### Step 4: Access Localhost Links
Once the terminal displays `Ready in ...`, open your browser and access:

| Page | Localhost URL | Description |
| :--- | :--- | :--- |
| 🏠 **Home Page** | [`http://localhost:3000`](http://localhost:3000) | Customer Storefront, Hero Banner, & Gift Finder |
| 🛍️ **Shop Catalog** | [`http://localhost:3000/shop`](http://localhost:3000/shop) | Complete Product Catalog & Refine Filters |
| 🛒 **Cart Bag** | [`http://localhost:3000/cart`](http://localhost:3000/cart) | Full Shopping Bag, Coupon Apply & Shipping Meter |
| 💳 **Checkout** | [`http://localhost:3000/checkout`](http://localhost:3000/checkout) | Secure Payment Gateway & Shipping Address |
| 👤 **User Account** | [`http://localhost:3000/account`](http://localhost:3000/account) | Orders History, Wishlist, Addresses, & Reminders |
| 🔑 **Admin Portal** | [`http://localhost:3000/admin`](http://localhost:3000/admin) | Owner Analytics, Database Explorer & Product Manager |
| 🔐 **Admin Login** | [`http://localhost:3000/admin/login`](http://localhost:3000/admin/login) | Authorized Master Login Portal |

---

## 🔑 Demo Access & Login Credentials

### 1. Store Owner / Admin Login
- **Login Portal**: [`http://localhost:3000/admin/login`](http://localhost:3000/admin/login)
- **Admin Email**: `admin@giftora.com`
- **Admin Password**: `admin123`
- *(Or click the **1-Click Owner Master Bypass** button on the login page)*

### 2. Demo Customer Login
- **Login Portal**: [`http://localhost:3000/login`](http://localhost:3000/login)
- **Customer Email**: `aarav.singhania@example.com`
- *(Or use the **1-Click Demo Customer Sign In** button)*

---

## 🌐 Step-by-Step Deployment Guide

You can easily deploy Giftora to any modern web hosting cloud platform. Here are the 3 best deployment options:

### Option A: Deploying on Vercel (Recommended - 2 Minutes)

Vercel is the creator of Next.js and provides zero-configuration deployment.

1. **Push Code to GitHub**:
   Initialize a git repository and push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Deploy Giftora Shop"
   git remote add origin https://github.com/YOUR_USERNAME/giftora-shop.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel.com](https://vercel.com) and log in.
   - Click **"Add New" ➔ "Project"**.
   - Import your `giftora-shop` repository from GitHub.
   - Keep default settings:
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
   - Click **Deploy**.

3. **Live Web App**:
   Vercel will generate your live production URL (e.g. `https://giftora-shop.vercel.app`).

---

### Option B: Deploying on Netlify

1. Go to [Netlify.com](https://netlify.com) and log in.
2. Click **"Add new site" ➔ "Import an existing project"**.
3. Connect your GitHub repository.
4. Set Build command: `npm run build` and Publish directory: `.next`.
5. Click **Deploy Site**.

---

### Option C: Production Node.js Server Deployment

To run a production bundle locally or on a VPS (AWS EC2, DigitalOcean, Hetzner):

1. **Build Production Application**:
   ```bash
   npm run build
   ```

2. **Start Production Server**:
   ```bash
   npm start
   ```
   The application will run in production mode on `http://localhost:3000`.

---

## 📂 Project Directory Structure

```
Giftora shop/
├── public/                     # Static public assets
├── src/
│   ├── app/                    # Next.js App Router Routes
│   │   ├── account/            # Customer profile, orders, wishlist & reminders
│   │   ├── admin/              # Store Owner Control Panel
│   │   │   ├── categories/     # Category Manager
│   │   │   ├── coupons/        # Promo Code Creator
│   │   │   ├── customers/      # Customer Directory
│   │   │   ├── database/       # MongoDB BSON Explorer & Export
│   │   │   ├── inventory/      # Stock Warehouse Monitor
│   │   │   ├── login/          # Dedicated Admin Master Login
│   │   │   ├── orders/         # Orders & Fulfillment Manager
│   │   │   └── products/       # Products & Gallery Upload Manager
│   │   ├── api/                # Next.js Server API Endpoints
│   │   ├── cart/               # Full Shopping Bag Page
│   │   ├── checkout/           # Checkout & Payment Gateway Page
│   │   ├── login/              # Customer Login Page
│   │   ├── order-success/      # Live Shipment Tracking & Invoice
│   │   ├── product/[slug]/     # Product Detail & Personalization Page
│   │   ├── register/           # Customer Account Registration Page
│   │   ├── shop/               # Shop Catalog & Filtering Page
│   │   ├── globals.css         # Tailwind & Custom Design System
│   │   ├── layout.tsx          # Root Layout & Store Providers
│   │   └── page.tsx            # Main Homepage
│   ├── components/             # Reusable UI Components
│   │   ├── cart/               # Cart Drawer Component
│   │   ├── footer/             # Luxury Footer Component
│   │   ├── hero/               # Hero Banner & Occasion Carousel
│   │   ├── home/               # Testimonials, Why Choose Us & Reminders
│   │   ├── navbar/             # Sticky Header, TopBar & Search Modal
│   │   ├── product/            # Product Card, Gift Finder & Personalization Studio
│   │   └── ui/                 # Toast Notifications Container
│   ├── context/
│   │   └── StoreContext.tsx    # Central React Context State Engine
│   ├── data/
│   │   └── mockData.ts         # Initial Catalog, Categories & Coupons
│   ├── lib/
│   │   └── utils.ts            # Helper functions (currency format, discount calc, slugify)
│   └── types/
│       └── index.ts            # TypeScript Models & Interfaces
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📜 Available NPM Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the development server on `http://localhost:3000` |
| `npm run build` | Builds the optimized Next.js production build |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint syntax and code quality checks |

---

## 📄 License & Credits

Designed and developed for **Giftora Shop Inc.**. All rights reserved.
