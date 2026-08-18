# Frontend Architecture for a Large-Scale E-Commerce System

**Technology Stack:** React + TypeScript + Tailwind CSS
**Architecture:** Feature-Sliced Design (FSD) within a Monorepo managed by Turborepo or Nx

---

## Table of Contents

1. [Core Architectural Principles](#1-core-architectural-principles)
2. [Monorepo Structure](#2-monorepo-structure)
3. [FSD Layers in Detail](#3-fsd-layers-in-detail)
   - 3.1 [app/](#31-app)
   - 3.2 [processes/](#32-processes)
   - 3.3 [pages/](#33-pages)
   - 3.4 [widgets/](#34-widgets)
   - 3.5 [features/](#35-features)
   - 3.6 [entities/](#36-entities)
   - 3.7 [shared/](#37-shared)
4. [Business Domains and Bounded Contexts](#4-business-domains-and-bounded-contexts)
5. [State and Data Management](#5-state-and-data-management)
6. [Design System](#6-design-system)
7. [Testing and CI/CD](#7-testing-and-cicd)
8. [Recommended Backend Architecture](#8-recommended-backend-architecture)
9. [Example Data Flow: Add to Cart](#9-example-data-flow-add-to-cart)

---

## 1. Core Architectural Principles

- **Dependencies must follow a controlled direction:** higher-level layers compose lower-level layers. A lower-level layer must never import from a higher-level layer.

- **Features must not depend directly on other features.** If two features need shared business logic or UI, extract the reusable part into an appropriate lower-level slice, typically `entities` or `shared`.

- **Each slice exposes a public API.** Export only the intended contract through `index.ts`. Avoid deep imports into another slice's internal structure, for example:

  ```typescript
  // ❌ Avoid
  import { internalHelper } from "features/cart/model/internal-helper";
  ```

- **Separate rendering from business logic.** UI components should primarily handle presentation. Business rules, orchestration, and state transitions belong in hooks, models, stores, or dedicated services.

- **Maintain end-to-end type safety.** Share API contracts through OpenAPI-based code generation or another contract-first approach. Avoid manually duplicating API response types.

- **Start modular, not distributed.** Prefer a well-structured modular monolith and extract services only when independent scaling, deployment, ownership, or operational constraints justify the added complexity.

- **Respect domain boundaries.** Folder structure should reflect business capabilities rather than only technical categories.

> [!IMPORTANT]
> The exact dependency graph should be enforced by tooling rather than relying only on developer discipline. ESLint import restrictions, `dependency-cruiser`, Nx module boundaries, or similar mechanisms should prevent architectural violations in CI.

---

## 2. Monorepo Structure

Use a monorepo when multiple applications need to share code, tooling, API contracts, or UI components.

```
apps/
├── storefront/              # Customer-facing application
├── admin/                   # Administration dashboard
└── seller-portal/           # Seller portal, if the platform supports a marketplace

packages/
├── ui/                      # Shared design system and reusable UI primitives
├── api-client/              # Generated API SDK / typed HTTP client
├── contracts/               # API contracts and generated shared types
├── config/                  # Shared ESLint, TypeScript, Tailwind, and tooling config
└── utils/                   # Pure reusable utilities
```

### Recommendations

- Use **Turborepo** when the repository primarily needs fast task orchestration and caching.
- Use **Nx** when you need stronger project graph analysis, dependency constraints, generators, affected-project workflows, and large-scale workspace governance.
- CI should build and test only **affected projects** whenever possible instead of rebuilding the entire repository on every change.
- Keep application-specific code inside `apps/` and reusable, dependency-safe code inside `packages/`.

---

## 3. FSD Layers in Detail

### 3.1 `app/`

**Responsibility:** Application bootstrap and global configuration. This layer should not contain domain-specific business logic.

```
app/
├── providers/
│   ├── QueryProvider.tsx
│   ├── RouterProvider.tsx
│   ├── ThemeProvider.tsx
│   └── index.tsx
├── router/
│   ├── routes.tsx
│   └── protected-route.tsx
├── store/
│   └── root-store.ts         # Only if a global Redux store is actually required
├── styles/
│   └── globals.css
└── App.tsx
```

**Typical responsibilities:**

- Application initialization
- Global providers
- Routing
- Global error boundaries
- Application-wide styles
- Runtime configuration

> **Rule:** `app` is the composition root. Lower-level layers must not import `app`.

---

### 3.2 `processes/`

**Use this layer for:** Long-running or multi-step business workflows that coordinate multiple features and entities.

Typical e-commerce examples include:

- Checkout
- Seller onboarding
- Multi-step account verification

```
processes/
└── checkout/
    ├── model/
    │   └── checkout-store.ts
    ├── ui/
    │   └── CheckoutStepper.tsx
    ├── lib/
    │   └── checkout-validation.ts
    └── index.ts
```

A process differs from a feature because it coordinates multiple use cases in a defined workflow, for example:

```
Cart → Address → Shipping → Payment → Order Confirmation
```

For complex workflows, model explicit states and transitions. Consider a **state machine** when the workflow has many transitions, failure states, retries, cancellations, or resumable steps.

> [!NOTE]
> **FSD version note:** `processes` is not always included in newer or stricter FSD implementations. Keep this layer only when it provides a clear architectural benefit. Otherwise, workflow orchestration can be implemented through pages, dedicated workflow modules, or application-level composition.

---

### 3.3 `pages/`

**Responsibility:** Compose widgets and features into route-level screens.

Pages should remain thin and primarily handle:

- Route parameters
- Page-level composition
- Page metadata
- Page-specific layout

```
pages/
├── home/
│   └── ui/HomePage.tsx
├── product-detail/
│   └── ui/ProductDetailPage.tsx
├── cart/
│   └── ui/CartPage.tsx
└── checkout/
    └── ui/CheckoutPage.tsx
```

> A page should avoid becoming a second business-logic layer. Complex workflows should be delegated to appropriate features, entities, or workflow orchestration modules.

---

### 3.4 `widgets/`

**Responsibility:** Large, self-contained UI blocks composed from multiple features and entities.

```
widgets/
├── header/
│   ├── ui/Header.tsx
│   └── index.ts
├── product-gallery/
│   ├── ui/ProductGallery.tsx
│   └── index.ts
└── related-products/
    ├── ui/RelatedProducts.tsx
    └── index.ts
```

**Typical examples:**

- Header
- Footer
- Product Grid
- Product Gallery
- Checkout Summary Sidebar
- Account Navigation

> A widget should represent a meaningful UI composition rather than becoming a generic dumping ground for large components.

---

### 3.5 `features/`

**Responsibility:** A specific user-driven business capability or use case.

Features are typically expressed as **actions:**

```
features/
├── add-to-cart/
│   ├── ui/
│   │   └── AddToCartButton.tsx
│   ├── model/
│   │   └── use-add-to-cart.ts
│   ├── api/
│   │   └── add-to-cart.api.ts
│   └── index.ts
├── apply-coupon/
├── search-product/
├── filter-products/
├── write-review/
└── toggle-wishlist/
```

**Typical e-commerce features:**

- `add-to-cart`
- `apply-coupon`
- `search-product`
- `filter-products`
- `sort-products`
- `write-review`
- `toggle-wishlist`
- `select-variant`
- `login`
- `reset-password`

> [!IMPORTANT]
> A feature should not directly import another feature. If two features need the same domain behavior, extract that behavior into an appropriate shared domain abstraction.

---

### 3.6 `entities/`

**Responsibility:** Business entities and reusable representations of domain concepts.

Entities are typically **nouns:**

```
entities/
├── product/
│   ├── ui/
│   │   ├── ProductCard.tsx
│   │   └── ProductPrice.tsx
│   ├── model/
│   │   └── types.ts
│   ├── api/
│   │   └── product.api.ts
│   └── index.ts
├── cart/
│   ├── ui/
│   │   └── CartItem.tsx
│   ├── model/
│   │   └── types.ts
│   └── index.ts
├── order/
├── user/
└── review/
```

#### `entities` vs `features`

| | Question Answered |
|---|---|
| `entities/product` | *What is a product and how can it be represented?* |
| `features/add-to-cart` | *How does a user add a product to the cart?* |

> An entity layer should provide reusable domain-level types, queries, selectors, and basic UI representations without becoming responsible for every possible user action involving that entity.

---

### 3.7 `shared/`

**Responsibility:** Generic reusable code that does not depend on a specific business domain.

```
shared/
├── ui/                     # Button, Input, Modal, Badge, etc.
├── hooks/                  # useDebounce, useLocalStorage, useMediaQuery
├── lib/                    # Pure helpers
├── api/
│   └── api-client.ts       # Base HTTP client and transport configuration
├── config/
│   └── env.ts
└── types/
    └── common.ts           # Pagination<T>, ApiResponse<T>, etc.
```

> **Rule:** If a module needs to understand what a `Product`, `Cart`, or `Order` is, it probably does not belong in `shared`.

> `shared` should not become a miscellaneous folder. Every shared subdirectory should have a clear ownership and purpose.

---

## 4. Business Domains and Bounded Contexts

Large business domains should have explicit boundaries. These boundaries should guide both frontend module organization and backend modularization.

| Domain | Related Entities | Typical Features |
|--------|-----------------|------------------|
| **Catalog** | `product`, `category`, `brand` | `search-product`, `filter-products`, `sort-products` |
| **Cart & Checkout** | `cart`, `address`, `shipping-method` | `add-to-cart`, `apply-coupon`, `select-shipping` |
| **Order** | `order`, `order-item` | `track-order`, `cancel-order`, `reorder` |
| **Payment** | `payment`, `invoice` | `select-payment-method`, `confirm-payment` |
| **Identity & Access** | `user`, `session` | `login`, `register`, `reset-password` |
| **Promotion** | `coupon`, `campaign` | `apply-coupon`, `view-flash-sale` |
| **Review** | `review`, `rating` | `write-review`, `upvote-review` |
| **Notification** | `notification` | `mark-as-read`, `subscribe-notification` |

These boundaries should be treated as **architectural constraints**, not merely folder names.

> A module should not freely reach into another domain's internal state. Cross-domain communication should occur through explicit contracts, public APIs, events, or well-defined application workflows.

---

## 5. State and Data Management

Different kinds of state require different ownership models.

### Server State

Use **TanStack Query** for data owned by the server:

- Fetching
- Caching
- Background refetching
- Invalidation
- Pagination
- Optimistic updates
- Mutation lifecycle handling

> Do not duplicate server state into a client store unless there is a specific requirement.

### Client State

Use a client-state solution such as **Zustand** for state that is genuinely client-owned:

- UI preferences
- Temporary workflow state
- Local interaction state
- Client-only session state where appropriate

> Avoid creating one large global store. Prefer small stores with clear domain ownership.

### Forms

Use **React Hook Form + Zod** for complex forms, especially for:

- Address management
- Checkout
- Authentication
- Payment-related input

> [!WARNING]
> Validation must exist at the backend boundary as well. Frontend validation improves UX but must not be treated as a security boundary.

### API Contracts

For REST APIs:

```
OpenAPI Specification
        ↓
Code Generation
        ↓
TypeScript Types + Typed API Client
```

Possible tools include `orval` or `openapi-typescript`.

> The API specification should be the **source of truth**. Avoid manually duplicating response and request models across frontend and backend.

> [!CAUTION]
> Do not assume generated frontend types eliminate backend validation. Generated types provide compile-time safety, while runtime validation and authorization remain backend responsibilities.

---

## 6. Design System

Build a shared design system inside `packages/ui`.

### Recommended Approach

- **Tailwind CSS** for styling primitives and tokens
- Reusable accessible components
- A documented component API
- **Storybook** for isolated development and visual testing

A component in `packages/ui` should generally be **domain-agnostic:**

| ✅ Good | ❌ Not suitable for the generic UI package |
|---------|-------------------------------------------|
| `Button` | `ProductPurchaseButton` |
| `Input` | `CheckoutPaymentSummary` |
| `Dialog` | `OrderCancellationDialog` |
| `Badge` | |
| `DataTable` | |

> Domain-aware UI should remain closer to the relevant entity, feature, or widget.

### For a Large System, Define:

- Design tokens
- Typography scale
- Spacing scale
- Color semantics
- Component states
- Accessibility requirements

---

## 7. Testing and CI/CD

Use a testing strategy based on architectural and business risk.

| Layer / Area | Primary Test Type | Suggested Tools |
|-------------|-------------------|-----------------|
| `shared`, pure domain logic | Unit tests | Vitest / Jest |
| `entities`, selectors, domain models | Unit and integration tests | Vitest / Jest |
| `features` | Component and integration tests | React Testing Library |
| Critical workflows | End-to-end tests | Playwright |
| API contracts | Contract / schema validation | OpenAPI-based tooling |

**Critical e-commerce workflows** should have strong end-to-end coverage:

- Login
- Cart operations
- Checkout
- Payment
- Order confirmation

### CI Recommendations

A typical pipeline should include:

```
Install → Lint → Type Check → Unit / Integration Tests → Build → E2E Tests
```

Additional quality gates for a large production system may include:

- Dependency graph validation
- Architecture import-rule validation
- API contract compatibility checks
- Bundle-size monitoring
- Security and dependency scanning

> Use **affected-project execution** in Turborepo or Nx to avoid rebuilding and retesting the entire monorepo unnecessarily.

> [!WARNING]
> Payment and checkout changes should receive stricter CI gates because they affect revenue, financial correctness, and customer trust.

---

## 8. Recommended Backend Architecture

The frontend and backend do not need identical folder structures, but both should respect clear domain boundaries.

A corresponding backend can be organized as a **modular monolith:**

```
src/
├── modules/
│   ├── product/
│   ├── cart/
│   ├── order/
│   ├── payment/
│   ├── user/
│   └── promotion/
└── shared/
```

Possible technology choices depend on the team's expertise and existing ecosystem. For example:

- **Framework:** NestJS when TypeScript, dependency injection, and modular application structure are desired.
- **Database:** PostgreSQL.
- **Data access:** Prisma or another ORM/query layer chosen according to performance, migration, and team requirements.
- **Complex domains:** Apply CQRS selectively to modules with genuinely different read/write concerns, such as high-complexity order or payment workflows.

### Scaling Strategy

Start with: **Modular Monolith**

Then extract a service only when there is a measurable reason, such as:

- Independent scaling requirements
- Independent deployment requirements
- Clear domain ownership by separate teams
- Different reliability or security boundaries
- Operational isolation requirements

> Avoid introducing microservices solely because the system is expected to become large.

---

## 9. Example Data Flow: Add to Cart

### Standard Flow

```
User clicks "Add to Cart"
        ↓
ProductDetailPage (pages/)
        ↓
Relevant feature composition
        ↓
features/add-to-cart
        ↓
useAddToCart mutation logic
        ↓
Typed API client
        ↓
Backend
        ↓
Mutation succeeds
        ↓
Invalidate or update relevant cart queries
        ↓
Cart-related UI re-renders from the updated source of truth
```

### Optimistic Update Flow

```
User clicks "Add to Cart"
        ↓
Apply optimistic cart update
        ↓
Send mutation request
        ↓
├── ✅ Success → reconcile / confirm server state
└── ❌ Failure → rollback optimistic update and show an error
```

> The important principle is to define a **clear source of truth** and explicit synchronization behavior. Avoid maintaining the same cart state independently in multiple stores without a reconciliation strategy.

---

## Architecture Checklist

Before introducing a new module, ask:

- [ ] Is this a business entity, a user capability, a large UI composition, or a route-level composition?
- [ ] Which layer owns this module?
- [ ] Does the module respect the allowed dependency direction?
- [ ] Does it expose a clear public API?
- [ ] Is it importing another slice's internals?
- [ ] Does the code belong to a business domain or to `shared`?
- [ ] Is server state being unnecessarily duplicated in a client store?
- [ ] Does the API contract come from a defined source of truth?
- [ ] Are critical business workflows covered by appropriate tests?
- [ ] Is the architectural rule enforced automatically in CI?

---

## Final Summary

This architecture is designed around **clear dependency boundaries**, **domain ownership**, **explicit public APIs**, and **scalable composition**.

The primary principles are:

1. Keep dependencies directional.
2. Organize code around business capabilities and domain concepts.
3. Keep pages and UI composition thin.
4. Separate server state from client-owned state.
5. Use generated API contracts instead of manually duplicated types.
6. Prevent architectural violations through automated tooling.
7. Start with a modular monolith and introduce distributed architecture only when justified.
8. Apply the strongest testing and CI controls to high-risk workflows such as checkout and payment.

> A well-enforced architecture is more valuable than a visually clean folder structure. The goal is not simply to follow FSD terminology, but to make module boundaries, ownership, dependencies, testing, and future scaling predictable as the system grows.