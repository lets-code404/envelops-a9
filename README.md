# Niharika Traders — Premium Indian Shagun Cards & Envelopes

> Production-ready Next.js e-commerce platform for wedding cards and shagun envelopes. Built with Next.js 16 (App Router), Tailwind CSS, shadcn/ui, NextAuth, Prisma + MongoDB, and Razorpay.

## Tech Stack

| Layer          | Technology                              |
|----------------|----------------------------------------|
| Framework      | Next.js 16 (App Router)                |
| Language       | TypeScript                              |
| Styling        | Tailwind CSS 4 + shadcn/ui             |
| Authentication | NextAuth v5 (Google OAuth + Credentials)|
| Database       | MongoDB Atlas + Prisma ORM              |
| Payments       | Razorpay                                |
| Animations     | Framer Motion                           |
| Deployment     | Vercel                                  |

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout (SEO metadata)
│   ├── globals.css            # Global styles & theme
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── robots.ts              # Robots.txt config
│   │
│   ├── products/              # Product listing & detail pages
│   ├── categories/            # Category listing & [slug] pages
│   ├── cart/                  # Shopping cart
│   ├── checkout/              # Checkout with Razorpay
│   ├── orders/                # Order history (protected)
│   │
│   ├── login/                 # Authentication
│   ├── signup/
│   ├── account/               # User profile (protected)
│   │
│   ├── admin/                 # Admin panel
│   │   ├── products/          #   Product CRUD
│   │   ├── categories/        #   Category management
│   │   ├── orders/            #   Order management
│   │   ├── customers/         #   Customer management
│   │   ├── analytics/         #   Analytics dashboard
│   │   └── settings/          #   Store settings
│   │
│   ├── blog/                  # Blog & insights
│   ├── gallery/               # Product gallery
│   ├── bulk-orders/           # Bulk order inquiry form
│   ├── about/                 # About page
│   ├── contact/               # Contact page
│   ├── price-list/            # Wholesale pricing
│   │
│   ├── privacy/               # Privacy policy
│   ├── terms/                 # Terms & conditions
│   ├── shipping-policy/       # Shipping policy
│   ├── refund-policy/         # Refund & return policy
│   │
│   └── api/                   # API routes
│       ├── auth/              #   NextAuth handlers
│       ├── products/          #   Products CRUD API
│       ├── categories/        #   Categories API
│       └── orders/            #   Orders + payment verification
│
├── components/                 # React components
│   ├── header.tsx             # Navbar with mega menu
│   ├── footer.tsx             # Site footer
│   ├── site-layout.tsx        # Layout wrapper
│   ├── providers.tsx          # Root providers (Auth, Theme, Cart)
│   ├── theme-provider.tsx     # Dark/light theme
│   ├── home/                  # Homepage sections
│   ├── products/              # Product card, detail, filters
│   └── ui/                    # shadcn/ui primitives
│
├── context/                    # React Context providers
│   ├── auth-context.tsx       # NextAuth SessionProvider
│   └── cart-context.tsx       # Cart state (localStorage)
│
├── lib/                        # Utilities & config
│   ├── auth.ts                # NextAuth v5 configuration
│   ├── db.ts                  # Prisma client singleton
│   ├── razorpay.ts            # Razorpay server utilities
│   ├── products-data.ts       # Static product data (fallback)
│   └── utils.ts               # Utility functions (cn)
│
├── prisma/
│   ├── schema.prisma          # Database schema (MongoDB)
│   └── seed.ts                # Database seeding script
│
├── types/                      # TypeScript type definitions
│   ├── product.ts
│   ├── order.ts
│   └── user.ts
│
├── public/                     # Static assets
└── .env.example                # Environment variable template
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster
- Google OAuth credentials (optional)
- Razorpay merchant account (optional)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Fill in your credentials in .env

# Generate Prisma client
npx prisma generate

# Push schema to MongoDB
npx prisma db push

# Seed the database with sample products
npx tsx prisma/seed.ts

# Start dev server
npm run dev
```

### Environment Variables

See `.env.example` for all required variables:
- `DATABASE_URL` — MongoDB Atlas connection string
- `NEXTAUTH_SECRET` — Random secret for session encryption
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — Razorpay payments
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — Client-side Razorpay key

> **Note**: The app works without external services — product/category APIs fall back to static data when the database is unavailable.

## Features

- **E-commerce**: Product browsing, filtering, search, cart, checkout
- **Payments**: Razorpay integration (UPI, cards, net banking, wallets)
- **Authentication**: Google OAuth + email/password with NextAuth
- **Admin Panel**: Dashboard, product/category/order/customer management
- **Responsive**: Mobile-first design with mega menu and bottom nav
- **SEO**: Dynamic sitemap, robots.txt, OpenGraph, Twitter cards
- **Legal**: Privacy, terms, shipping, refund policy pages

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy --prod
```