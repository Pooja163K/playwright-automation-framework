import {test as setup,expect} from "@playwright/test"

setup('authenticate',async ({page})=>{
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByRole('button', {name:'Login'}).click();
    await expect (page.getByText('Products')).toBeVisible();
    await page.waitForTimeout(3000);
    await page.context().storageState({
        path:'playwright/.auth/user.json'
    })
})

