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
      // Next.js framework glue & UI presentation widgets carry visual layout logic
      exclude: [
        '**/.next/**',
        '**/public/**',
        '**/next-env.d.ts',
        '**/*.config.ts',
        '**/next.config.ts',
        'src/app/**',
        'src/widgets/**',
        'src/features/**/ui/**',
        'src/shared/ui/**',
        'src/entities/**/ui/**',
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
