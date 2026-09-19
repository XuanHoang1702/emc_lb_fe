# EMC E-Commerce Frontend

Monorepo chứa các ứng dụng frontend cho hệ thống thương mại điện tử EMC, được xây dựng theo kiến trúc **Feature-Sliced Design (FSD)**.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Storefront:** Next.js 16 (App Router, SEO-ready: metadata, sitemap, robots, JSON-LD, OG image)
- **Styling:** Tailwind CSS 4
- **Monorepo:** Turborepo
- **State Management:** TanStack Query (server) + Zustand (client)
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest + React Testing Library + Playwright (E2E)
- **SEO checks (CI):** scripts/seo-check.mjs + Lighthouse CI

## Cấu trúc dự án

```
apps/
└── storefront/     → App khách hàng (port 3000)

packages/
├── ui/             → Design system chung
├── api-client/     → HTTP client có type-safe
├── contracts/      → Shared API types
├── config/         → Shared configs (TS, ESLint, Tailwind)
└── utils/          → Pure utilities
```

## Bắt đầu

```bash
# Cài đặt dependencies
npm install

# Chạy tất cả apps
npm run dev

# Chạy riêng storefront
npx turbo dev --filter=@emc/storefront

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

## Kiến trúc FSD (trong mỗi app)

```
src/
├── app/           → Bootstrap, providers, routing (App Router route segments)
├── processes/     → Multi-step workflows
├── widgets/       → Large UI blocks
├── features/      → User-driven capabilities
├── entities/      → Business domain objects
└── shared/        → Generic reusable code
```

> Xem chi tiết tại [docs/large-scale-ecommerce-frontend-architecture.md](./docs/large-scale-ecommerce-frontend-architecture.md)
