import { Page } from "@playwright/test";

export async function login(page: Page,uName: string,pswd: string) {
     await page.goto('/');
     await page.getByTestId('username').fill(uName);
     await page.getByTestId('password').fill(pswd);
    // await  page.getByTestId('login-button').click();
     await page.getByRole('button', {name:'Login'}).click();
//      const productsText = page.getByText('Products');

// console.log('Count:', await productsText.count());
}



