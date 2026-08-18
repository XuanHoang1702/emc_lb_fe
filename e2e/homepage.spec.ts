/**
 * E2E Test: Trang chủ Storefront
 * Kiểm tra các luồng cơ bản trên trang chủ
 */
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/EMC/i);
  });

  test('should display navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate to product listing', async ({ page }) => {
    // TODO: implement when product listing page is ready
    const productLink = page.getByRole('link', { name: /sản phẩm|products/i });
    if (await productLink.isVisible()) {
      await productLink.click();
      await expect(page).toHaveURL(/products/);
    }
  });

  test('@visual homepage screenshot', async ({ page }) => {
    // Visual regression test — so sánh pixel-level với screenshot baseline
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
    });
  });
});
