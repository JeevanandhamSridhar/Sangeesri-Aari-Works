# 📌 SangeeSri Aari Works - Project Master Status & Session Handoff Guide

## 🔑 Project & Conversation Identifiers
- **Project Name:** `sangee-sri-aari-works`
- **Monorepo Project Path:** `C:\Users\jeeva\.gemini\antigravity-ide\scratch\sangee-sri-aari-works`
- **Workspace Path:** `C:\Users\jeeva\Downloads\SangeeSri Aari Works`
- **Current Conversation ID:** `3d4d5160-cd3a-405f-8ceb-bad12f8e652f`
- **App Data Directory:** `C:\Users\jeeva\.gemini\antigravity-ide`
- **Artifacts & Brain Path:** `C:\Users\jeeva\.gemini\antigravity-ide\brain\3d4d5160-cd3a-405f-8ceb-bad12f8e652f\`
- **Full Conversation Log:** `C:\Users\jeeva\.gemini\antigravity-ide\brain\3d4d5160-cd3a-405f-8ceb-bad12f8e652f\.system_generated\logs\transcript.jsonl`

---

## 🚀 Live Services & Development Servers

| App | Directory | Local Dev URL | Command |
| :--- | :--- | :--- | :--- |
| **Client Web App** | `apps/client` | [http://localhost:3000](http://localhost:3000) | `npm run dev --port 3000` |
| **Admin Portal** | `apps/admin` | [http://localhost:3001](http://localhost:3001) | `npm run dev --port 3001` |
| **Backend Server** | `apps/server` | `http://localhost:4000` | `pnpm --filter=server dev` |

---

## 🛠️ Key Features & Catalog Architecture

### 1. 🛍️ Centralized Product Database (`apps/client/src/data/products.ts`)
- Contains full TypeScript interfaces and product catalog data.
- **Categories Included:**
  - `Bridal Blouses`: Royal Peacock Motif Heavy Work, Kundan & Zardosi Sleeve Customization.
  - `Masterclasses & Courses`: Complete Aari Online Course with free starter kit, Advanced Zardosi & Bridal Blouse Designing Workshop.
  - `Needles & Tools`: 12-piece High-Carbon Steel Aari Needle Set, Ergonomic Hook Tools.
  - `Threads & Zari`: 100% Pure Mulberry Silk Gold Threads, 5-Color Zari Metallic Combos.
  - `Frames & Fabrics`: 12" Wooden Frame with brass tension screw, Kanchipuram Raw Silk Fabric.
  - `Kits & Accessories`: 18-piece All-in-One Beginner Aari Kit.

### 2. 🏪 Client App Routes (`apps/client/src/app`)
- **Homepage:** `http://localhost:3000/` ([app/page.tsx](file:///C:/Users/jeeva/.gemini/antigravity-ide/scratch/sangee-sri-aari-works/apps/client/src/app/page.tsx))
- **Shop Catalog:** `http://localhost:3000/shop` ([app/shop/page.tsx](file:///C:/Users/jeeva/.gemini/antigravity-ide/scratch/sangee-sri-aari-works/apps/client/src/app/shop/page.tsx))
- **Product Details:** `http://localhost:3000/shop/[slug]` ([app/shop/[slug]/page.tsx](file:///C:/Users/jeeva/.gemini/antigravity-ide/scratch/sangee-sri-aari-works/apps/client/src/app/shop/%5Bslug%5D/page.tsx))
- **Cart & Checkout:** `http://localhost:3000/cart` & `http://localhost:3000/checkout`

### 3. ⚙️ Admin Portal Routes (`apps/admin/src/app`)
- **Dashboard:** `http://localhost:3001/` ([apps/admin/src/app/page.tsx](file:///C:/Users/jeeva/.gemini/antigravity-ide/scratch/sangee-sri-aari-works/apps/admin/src/app/page.tsx))
- **Product Management:** `http://localhost:3001/products`
- **Orders & Tracking:** `http://localhost:3001/orders`
- **Bridal Quotations:** `http://localhost:3001/quotations`
- **Bridal Consultations:** `http://localhost:3001/appointments`
- **Academy Enrollees:** `http://localhost:3001/academy`
- **Design Gallery:** `http://localhost:3001/gallery`
- **Settings & Payment Gateways:** `http://localhost:3001/settings`
