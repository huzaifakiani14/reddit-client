import { test, expect } from '@playwright/test';

test('loads home and can click a filter', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText(/Reddit Client/)).toBeVisible();
	await page.getByRole('button', { name: 'news' }).click();
	await expect(page.getByText(/Loading/)).toBeVisible();
});
