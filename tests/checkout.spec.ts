import {expect} from "@playwright/test"
import{test} from "../utils/fixtures"
import{cartValue,openCart,checkout} from "../utils/cart"
import { addProduct } from "../utils/product";
import{login} from "../utils/login"



const productArray = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt'];
 test ('Multiple Product Checkout', async ({loggedInPage})=>{
 //   await login(page,'standard_user','secret_sauce');
    for (const prod of productArray){
        await addProduct(loggedInPage,prod);
    }
    const cartAfterAdding = await cartValue(loggedInPage)
     expect(Number(cartAfterAdding)).toBe(productArray.length);
    await openCart(loggedInPage);
    for (const prod of productArray){
        await expect(loggedInPage.getByTestId('inventory-item-name').filter({hasText:prod})).toBeVisible();
    } 
    
     await checkout(loggedInPage,'Pooja','Sah','560067');
     await expect(loggedInPage.getByText('Thank you for your order!')).toBeVisible();
 })

 test ('Successful Checkout', async ({loggedInPage})=>{
   // await login(loggedInPage,'standard_user','secret_sauce');
    await addProduct(loggedInPage,'Sauce Labs Backpack');
    const cartAfterAdding = await cartValue(loggedInPage)
    expect(cartAfterAdding).toBe('1');
    await openCart(loggedInPage);
     await expect (loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();
     await checkout(loggedInPage,'Pooja','Sah','560067');
     await expect(loggedInPage.getByText('Thank you for your order!')).toBeVisible();
})

  test.describe('Checkout validation',()=>{
    test.beforeEach( async({loggedInPage})=>{
     //   await login(page,'standard_user','secret_sauce');
        await addProduct(loggedInPage,'Sauce Labs Backpack');
        await openCart(loggedInPage);
         await loggedInPage.getByRole('button',{name:'checkout'}).click();
    })

test ('First Name is required', async ({loggedInPage})=>{
    
     await loggedInPage.getByTestId('continue').click();
     await expect (loggedInPage.getByTestId('error')
     .filter({hasText:'Error: First Name is required'}))
     .toBeVisible();
})

test ('Last Name is required', async ({loggedInPage})=>{
   
     await loggedInPage.getByPlaceholder('First Name').fill('Pooja');
     await loggedInPage.getByPlaceholder('Zip/Postal Code').fill('333333');
     await loggedInPage.getByTestId('continue').click();
     await expect (loggedInPage.getByTestId('error')
     .filter({hasText:'Error: Last Name is required'}))
     .toBeVisible();
})

test ('Postal Code is required', async ({loggedInPage})=>{

     await loggedInPage.getByPlaceholder('First Name').fill('Pooja');
     await loggedInPage.getByPlaceholder('Last Name').fill('Sah');
     await loggedInPage.getByTestId('continue').click();
     await expect (loggedInPage.getByTestId('error')
     .filter({hasText:'Error: Postal Code is required'}))
     .toBeVisible();
})
  })
