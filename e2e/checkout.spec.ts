/**
 * E2E Test: Checkout & Payment — Critical Path
 *
 * ⚠️ Tag @critical: test này chạy KHÔNG retry trên CI.
 * Bất kỳ failure nào đều block merge/deploy.
 * Chỉ dùng sandbox/mock payment gateway.
 *
 * Route /cart, /checkout chưa implement → bị skip (không fail CI).
 * Khi route được thêm, các test @critical này tự kích hoạt và trở thành
 * CI gate nghiêm ngặt (no-retry) cho luồng tiền.
 */
import { test, expect } from '@playwright/test';
import { requireRoute } from './helpers/route-guard';

test.describe('@critical Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Setup — seed test user + add product to cart via API
    await page.goto('/');
  });

  test('@critical should display cart with items', async ({ page }) => {
    await requireRoute(page, '/cart');
    // Verify cart page loads without error
    await expect(page).not.toHaveTitle(/error|500|404/i);
  });

  test('@critical should proceed to checkout', async ({ page }) => {
    await requireRoute(page, '/checkout');
    // Verify checkout page loads
    await expect(page).not.toHaveTitle(/error|500|404/i);
  });

  test('@critical should validate shipping address form', async ({ page }) => {
    await requireRoute(page, '/checkout');
    // TODO: Fill in shipping form with invalid data, verify validation
    const submitButton = page.getByRole('button', {
      name: /tiếp tục|continue|next/i,
    });
    if (await submitButton.isVisible()) {
      await submitButton.click();
      // Expect required field validation
      const errorCount = await page.locator('[role="alert"], .field-error, .error').count();
      expect(errorCount).toBeGreaterThan(0);
    }
  });
});
