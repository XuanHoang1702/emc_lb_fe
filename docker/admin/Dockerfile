# ============================================================
# Stage 1: Build Admin Dashboard Application
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

# Copy source AFTER install → chỉ layer build bị invalidate khi source đổi.
COPY apps/admin/ ./apps/admin/
COPY packages/ ./packages/

# Build admin dashboard and its package dependencies
ENV NODE_ENV=production
RUN npx turbo run build --filter=@emc/admin...

# ============================================================
# Stage 2: Production Nginx Runner
# ============================================================
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder stage
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:80/health || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
