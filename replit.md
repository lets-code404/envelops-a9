# Niharika Traders - Premium Indian Shagun Cards & Envelopes

## Overview
This is a Next.js 16 e-commerce website for Niharika Traders, featuring:
- Heritage branding since 1990
- Product browsing with shagun-specific categories
- Wholesale and retail pricing
- Blog for industry insights
- User authentication (Login/Signup)
- Modern UI with Tailwind CSS and Radix UI components

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with tw-animate-css
- **UI Components**: Radix UI, shadcn/ui components
- **Animations**: Framer Motion
- **Package Manager**: pnpm

## Project Structure
```
├── app/              # Next.js App Router pages
├── components/       # React components (UI + custom)
├── context/          # React context providers
├── lib/              # Utility functions and data
├── public/           # Static assets
└── styles/           # Global styles
```

## Development
- **Dev Server**: `pnpm dev --hostname 0.0.0.0 --port 5000`
- **Build**: `pnpm build`
- **Start**: `pnpm start`

## Configuration
- `next.config.mjs` - Next.js configuration with `allowedDevOrigins: ['*']` for Replit proxy
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS with Tailwind
- `components.json` - shadcn/ui component configuration

## Recent Changes
- 2026-01-23: Initial import to Replit environment
  - Configured Next.js to allow all dev origins for Replit proxy
  - Set up pnpm dependencies
  - Configured deployment for autoscale
