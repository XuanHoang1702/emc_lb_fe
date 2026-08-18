# EMC E-Commerce Frontend

Monorepo chứa các ứng dụng frontend cho hệ thống thương mại điện tử EMC, được xây dựng theo kiến trúc **Feature-Sliced Design (FSD)**.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Monorepo:** Turborepo
- **State Management:** TanStack Query (server) + Zustand (client)
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest + React Testing Library

## Cấu trúc dự án

```
apps/
├── storefront/     → App khách hàng (port 3000)
└── admin/          → Admin dashboard (port 3001)

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

# Chạy riêng admin
npx turbo dev --filter=@emc/admin

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
├── app/           → Bootstrap, providers, routing
├── processes/     → Multi-step workflows
├── pages/         → Route-level compositions
├── widgets/       → Large UI blocks
├── features/      → User-driven capabilities
├── entities/      → Business domain objects
└── shared/        → Generic reusable code
```

> Xem chi tiết tại [docs/large-scale-ecommerce-frontend-architecture.md](./docs/large-scale-ecommerce-frontend-architecture.md)