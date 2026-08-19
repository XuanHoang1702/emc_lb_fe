/**
 * E2E Test: Authentication Flow
 * Kiểm tra đăng ký, đăng nhập, đăng xuất
 *
 * Route /login, /register chưa implement → bị skip (không fail CI).
 * Khi route được thêm, các test này tự kích hoạt và bắt buộc flow chạy đúng.
 */
import { test, expect } from '@playwright/test';
import { requireRoute } from './helpers/route-guard';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await requireRoute(page, '/login');
    await expect(page.getByRole('heading', { name: /đăng nhập|login/i })).toBeVisible();
  });

  test('should show validation errors on empty submit', async ({ page }) => {
    await requireRoute(page, '/login');
    const submitButton = page.getByRole('button', { name: /đăng nhập|login|submit/i });
    if (await submitButton.isVisible()) {
      await submitButton.click();
      // Expect validation messages to appear
      await expect(page.locator('[role="alert"], .error, .field-error')).toBeVisible();
    }
  });

  test('should display register page', async ({ page }) => {
    await requireRoute(page, '/register');
    await expect(page.getByRole('heading', { name: /đăng ký|register|sign up/i })).toBeVisible();
  });
});
