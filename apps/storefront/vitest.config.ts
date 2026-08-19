import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      // Next.js framework glue: build config, metadata/route handlers and
      // thin App Router boundary files carry no testable business logic.
      exclude: [
        '**/.next/**',
        '**/public/**',
        '**/next-env.d.ts',
        '**/*.config.ts',
        '**/next.config.ts',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/app/not-found.tsx',
        'src/app/robots.ts',
        'src/app/sitemap.ts',
        'src/app/opengraph-image.tsx',
        'src/app/health/route.ts',
        'src/app/providers/index.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
