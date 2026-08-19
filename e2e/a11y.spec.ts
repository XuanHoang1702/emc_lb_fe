/**
 * E2E Test: Accessibility (a11y)
 *
 * Sử dụng @axe-core/playwright để kiểm tra WCAG 2.1 AA compliance.
 * Tag @a11y: CI sẽ fail nếu có vi phạm mức critical/serious.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { requireRoute } from './helpers/route-guard';

test.describe('@a11y Accessibility Audit', () => {
  test('@a11y homepage should have no critical a11y violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Filter for critical and serious violations only
    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    if (criticalViolations.length > 0) {
      console.error('A11y violations found:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toHaveLength(0);
  });

  test('@a11y login page should have no critical a11y violations', async ({ page }) => {
    await requireRoute(page, '/login');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    expect(criticalViolations).toHaveLength(0);
  });
});
