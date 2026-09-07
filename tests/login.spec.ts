import {expect} from "@playwright/test"
import {test} from "../utils/fixtures"
import {login} from "../utils/login" 

 

test ('valid login',async({loggedInPage})=>{
   // await login(page,'standard_user','secret_sauce');
    await expect(loggedInPage).toHaveURL(/inventory/);
})

test('invalid login',async ({page})=>{
    await login(page,'standard_user','not_so_secret_sauce');
    await expect (page.getByTestId('error')
    .filter({hasText:"Epic sadface: Username and password do not match any user in this service"}))
    .toBeVisible();
})




