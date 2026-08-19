import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    // Visual regression: chỉ cho phép sai lệch < 0.1% pixel — nghiêm ngặt
    toHaveScreenshot: { maxDiffPixelRatio: 0.001 },
  },

  // Trên CI: không cho phép .only, retry có kiểm soát, chạy song song có giới hạn
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['github'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:4173',
    trace: 'retain-on-failure', // giữ trace khi fail để debug, xoá khi pass để tiết kiệm dung lượng
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Test chậm hơn 1s coi là cảnh báo hiệu năng
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-webkit',
      use: { ...devices['iPhone 14'] },
    },
  ],
});
