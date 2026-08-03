# Sangee Sri Aari Works — Premium Business Platform

> Luxury 3D business website + e-commerce + admin CMS for Sangee Sri Aari Works (Kaveripakkam, Ranipet)

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-orange)](https://threejs.org)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)

### 1. Clone & Install
```bash
git clone <repo>
cd sangee-sri-aari-works
pnpm install
```

### 2. Setup Environment
```bash
# Client
cp apps/client/.env.example apps/client/.env.local

# Server
cp apps/server/.env.example apps/server/.env
```

Fill in your credentials (see "Environment Variables" section below).

### 3. Database Setup
```bash
# Generate Prisma client
cd database
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

### 4. Run Development
```bash
# Client only (port 3000)
pnpm dev:client

# Server only (port 4000)
pnpm dev:server

# Both (using Turborepo)
pnpm dev
```

---

## 📁 Project Structure

```
sangee-sri-aari-works/
├── apps/
│   ├── client/              ← Next.js 16 public website
│   │   ├── src/app/         ← App Router pages
│   │   ├── src/components/  ← React components
│   │   ├── src/store/       ← Zustand state
│   │   └── src/lib/         ← Utilities
│   ├── admin/               ← Next.js admin CMS
│   └── server/              ← Express API server
├── database/
│   └── prisma/              ← Prisma schema (27 tables)
└── packages/
    ├── ui/                  ← Shared components
    └── types/               ← Shared TypeScript types
```

---

## 🌐 Pages

### Public Website (`/`)
| Route | Description |
|-------|-------------|
| `/` | Home — 3D hero, stats, services, gallery, shop preview, reviews |
| `/gallery` | Masonry gallery with lightbox, filters |
| `/shop` | Aari materials store (needles, thread, frames, kits) |
| `/shop/[slug]` | Product detail with multi-image viewer |
| `/cart` | Cart page |
| `/checkout` | 3-step checkout (Razorpay) |
| `/collections` | Bridal, Designer, Traditional, Modern collections |
| `/collections/[slug]` | Individual collection |
| `/quotation` | Design quotation request form |
| `/book-appointment` | Appointment booking with calendar |
| `/about` | About the studio |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/faq` | FAQ accordion |
| `/contact` | Map + contact form |
| `/account/orders` | Customer order tracking |
| `/account/wishlist` | Customer wishlist |

### Admin (`/admin`) — Protected
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard overview |
| `/admin/products` | Product CRUD + image manager |
| `/admin/orders` | Order management |
| `/admin/gallery` | Gallery manager |
| `/admin/quotations` | Quotation management |
| `/admin/appointments` | Calendar + slot manager |
| `/admin/blog` | Blog editor (TipTap) |
| `/admin/analytics` | Custom analytics |
| `/admin/settings` | Site settings CMS |

---

## 🗄️ Database (PostgreSQL via Prisma)

27 models including:
- Users, Admins, Roles
- Products, ProductImages, ProductCategories
- Orders, OrderItems, PaymentTransactions
- Cart, CartItems, Coupons, WishlistItems
- Gallery, Collections, ThreeDModels
- Quotations, Appointments, Enquiries
- Testimonials, ProductReviews
- BlogPosts, BlogComments
- FAQ, Counter, SiteSettings
- AnalyticsEvents, Notifications
- ChatbotConversations, InstagramCache
- ActivityLogs, MediaLibrary

---

## 💰 E-Commerce Features

### User Side
- Product listing with filters (category, price, rating, stock)
- Multi-image product cards with hover carousel
- MRP / Sale price / Discount % display
- Quick Add to Cart + Wishlist
- Slide-in Cart Drawer with quantity controls
- 3-step Checkout: Address → Order → Razorpay Payment
- Order tracking: Placed → Confirmed → Packed → Shipped → Delivered
- Download invoice PDF
- Product reviews with verified purchase badge

### Admin Side
- Product CRUD with **2–8 images** per product (Cloudinary)
- MRP, sale price, discount %, GST % management
- Stock count, SKU, low-stock alerts
- Coupon manager (flat / %, expiry, per-user limit, flash sales)
- Order manager with status updates + tracking number
- Invoice PDF generation → email + WhatsApp
- Store analytics: revenue, best sellers, abandoned carts

---

## 🔑 Environment Variables

### Client (`apps/client/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXX
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
```

### Server (`apps/server/.env`)
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
RESEND_API_KEY=...
OPENAI_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy — zero config for Next.js

### Backend (Railway)
1. Create Railway project
2. Add PostgreSQL + Redis services
3. Deploy `apps/server` with environment variables
4. Copy `DATABASE_URL` from Railway to Prisma

### Media (Cloudinary)
1. Sign up at cloudinary.com (free tier: 25GB)
2. Create upload presets
3. Add credentials to env vars

---

## 🏗️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 3, ShadCN UI |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | Framer Motion, GSAP, Lenis |
| State | Zustand, TanStack Query |
| Backend | Express 5, Prisma 5, PostgreSQL |
| Auth | JWT, Google OAuth |
| Payments | Razorpay (UPI, Cards, COD) |
| Media | Cloudinary |
| Email | Resend |
| AI Chat | OpenAI GPT-4o-mini |
| Analytics | GA4, Meta Pixel, Custom |

---

## 📞 Business Info

**Sangee Sri Aari Works**  
Banavaram Road, Kaveripakkam  
Ranipet District — 632508  
WhatsApp / Call: +91 76048 87356

---

*Built with ❤️ for premium craftsmanship*
