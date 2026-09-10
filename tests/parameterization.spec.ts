import {test,expect} from '@playwright/test'
import { loginData } from './test-data/loginData'

for ( const data of loginData){

    test.only(`login for ${data.username} `, async ({page})=> {
     await page.goto('/');
     await page.getByTestId('username').fill(data.username);
     await page.getByTestId('password').fill(data.password);
     await page.getByRole('button', {name:'Login'}).click();
     
     if (data.expectedResult==='success'){
         await expect(page).toHaveURL(/inventory/);
     }
     else if (data.expectedResult==='locked'){
        await expect (page.getByTestId('error')).toContainText("Epic sadface: Sorry, this user has been locked out.");
    
     }
    })
};