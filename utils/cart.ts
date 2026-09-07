    import { Page } from "@playwright/test";

    export async function openCart(page:Page){
        await page.getByTestId('shopping-cart-link').click();
    }

    export async function cartValue(page:Page){
      return  page.getByTestId('shopping-cart-link').locator('span').textContent();
    }

    export async function checkout(page:Page,fName:string,lName:string,zip:string){
        await page.getByRole('button',{name:'checkout'}).click();
        await page.getByPlaceholder('First Name').fill(fName);
        await page.getByPlaceholder('Last Name').fill(lName);
        await page.getByPlaceholder('Zip/Postal Code').fill(zip);
        await page.getByTestId('continue').click();
        await page.getByRole('button',{name:'finish'}).click();
    }