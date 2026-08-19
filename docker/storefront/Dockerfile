# ============================================================
# Stage 1: Build Storefront Application (Next.js)
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies if needed
RUN apk add --no-cache libc6-compat

# Copy workspace manifests ONLY first → `npm ci` layer stays cached across
# source changes (gha cache). Invalued only khi lockfile/manifest đổi.
# (Docker COPY glob không giữ cấu trúc thư mục → phải khai báo từng manifest.)
COPY package.json package-lock.json turbo.json tsconfig.base.json ./
COPY apps/storefront/package.json ./apps/storefront/package.json
COPY apps/admin/package.json ./apps/admin/package.json
COPY packages/config/package.json ./packages/config/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/utils/package.json ./packages/utils/package.json

# Install dependencies (frozen lockfile) — layer cached via type=gha
RUN npm ci

# Copy source AFTER install → chỉ layer build bị invalidate khi source đổi,
# không kéo theo việc cài lại toàn bộ dependencies.
COPY apps/storefront/ ./apps/storefront/
COPY packages/ ./packages/

# Build storefront and its package dependencies
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx turbo run build --filter=@emc/storefront...

# ============================================================
# Stage 2: Production Node Runner (Next.js standalone)
# SSR/SSG/ISR cần một Node server — không còn dùng nginx tĩnh.
# ============================================================
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy standalone server + traced dependencies
COPY --from=builder /app/apps/storefront/.next/standalone ./
# Copy static assets (content-hashed bundles)
COPY --from=builder /app/apps/storefront/.next/static ./apps/storefront/.next/static
# Copy public assets (favicon, og-image, etc.)
COPY --from=builder /app/apps/storefront/public ./apps/storefront/public

# Expose HTTP port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/health || exit 1

# Start Next.js standalone server
CMD ["node", "apps/storefront/server.js"]
