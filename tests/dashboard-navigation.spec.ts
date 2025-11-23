import { test, expect } from '@playwright/test';

test.describe('Dashboard navigation', () => {
  test('switches sections via sidebar interactions', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByTestId('dashboard-heading')).toContainText('Dashboard');
    await expect(page.getByTestId('section-overview')).toBeVisible();

    await page.getByTestId('sidebar-item-engagement').click();
    await expect(page.getByTestId('section-engagement')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Email' })).toBeVisible();

    await page.getByTestId('sidebar-item-automation').click();
    await expect(page.getByTestId('section-automation')).toBeVisible();
    await expect(page.getByTestId('automation-status-winback')).toContainText('Needs review');
  });
});
