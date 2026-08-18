# ============================================================
# Stage 1: Build Storefront Application
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies if needed
RUN apk add --no-cache libc6-compat

# Copy workspace package manifests
COPY package.json package-lock.json turbo.json tsconfig.base.json ./
COPY packages/ ./packages/
COPY apps/storefront/ ./apps/storefront/

# Install dependencies (frozen lockfile)
RUN npm ci

# Build storefront and its package dependencies
ENV NODE_ENV=production
RUN npx turbo run build --filter=@emc/storefront...

# ============================================================
# Stage 2: Production Nginx Runner
# ============================================================
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder stage
COPY --from=builder /app/apps/storefront/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:80/health || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
