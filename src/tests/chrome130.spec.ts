import { test, expect } from '@playwright/test';

test.describe('Chrome 130+ 호환성', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Fetch API로 ConnectRPC를 호출할 수 있다', async ({ page }) => {
    let hasFetchCall = false;

    page.on('request', (request) => {
      if (request.url().includes('EventService')) {
        hasFetchCall = true;
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    expect(hasFetchCall).toBe(true);
  });

  test('react-datepicker 캘린더가 렌더링된다', async ({ page }) => {
    await page.locator('button:has-text("Custom")').click();
    await page.waitForTimeout(300);

    await page.locator('input[type="text"]').first().click();
    await page.waitForTimeout(200);

    await expect(page.locator('.react-datepicker')).toBeVisible();
  });

  test('전체 플로우가 정상 동작한다', async ({ page }) => {
    const select = page.locator('select').first();
    await expect(select).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();

    await page.locator('button:has-text("Yesterday")').click();
    await page.waitForTimeout(500);
    await expect(table).toBeVisible();
  });
});
