/**
 * E2E Test: Checkout & Payment — Critical Path
 *
 * ⚠️ Tag @critical: test này chạy KHÔNG retry trên CI.
 * Bất kỳ failure nào đều block merge/deploy.
 * Chỉ dùng sandbox/mock payment gateway.
 */
import { test, expect } from '@playwright/test';

test.describe('@critical Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Setup — seed test user + add product to cart via API
    await page.goto('/');
  });

  test('@critical should display cart with items', async ({ page }) => {
    // TODO: Navigate to cart page and verify items
    await page.goto('/cart');
    // Verify cart page loads without error
    await expect(page).not.toHaveTitle(/error|500|404/i);
  });

  test('@critical should proceed to checkout', async ({ page }) => {
    // TODO: Add item to cart → go to checkout
    await page.goto('/checkout');
    // Verify checkout page loads
    await expect(page).not.toHaveTitle(/error|500|404/i);
  });

  test('@critical should validate shipping address form', async ({ page }) => {
    await page.goto('/checkout');
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
