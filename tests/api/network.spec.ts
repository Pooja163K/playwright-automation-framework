import { test, expect } from '@playwright/test';

test('Mock API response', async ({ page }) => {

    await page.route(
        'https://jsonplaceholder.typicode.com/posts/1',
        async route => {

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    userId: 1,
                    id: 1,
                    title: 'Pooja Mocked Title',
                    body: 'This response came from Playwright'
                })
            });

        }
    );

    await page.goto(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    await expect(page.locator('body')).toContainText('Pooja Mocked Title');

});


test('Mock 500 API response', async ({ page }) => {

    await page.route(
        'https://jsonplaceholder.typicode.com/posts/1',
        async route => {

            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'something went wrong'
                })
            });

        }
    );

    await page.goto(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

   // await expect(page.locator('body')).toContainText('something went wrong');

});