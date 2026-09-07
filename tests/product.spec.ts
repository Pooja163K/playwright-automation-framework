import{expect} from "@playwright/test";
import{test} from "../utils/fixtures"
import{cartValue,openCart} from "../utils/cart"
import { addProduct } from "../utils/product";
//import{login} from "../utils/login"


const products = [
    {  
        name: 'Sauce Labs Backpack',
       price: 29.99,
       quantity: '1'
    },
    {
         name: 'Sauce Labs Bike Light',
        price: 9.99,
        quantity: '1'
    }
];

for(const product of products){

    test(`Add product -${product.name}`, async({loggedInPage})=>{
    
       // await login(page,'standard_user','secret_sauce');
         
         await addProduct(loggedInPage,product.name);
       //  const cartAfterAdding = await cartValue(page)
         await openCart(loggedInPage);
         await expect (loggedInPage.getByText(product.name)).toBeVisible();
         const cart = loggedInPage.locator('.cart_item');
         const thisProduct = cart.filter({hasText: product.name});
         const priceFetched = thisProduct.getByTestId('inventory-item-price');
         await expect (priceFetched).toHaveText(`$${product.price}`);
         const itemQuantity = thisProduct.getByTestId('item-quantity');
         await expect (itemQuantity).toHaveText(product.quantity);
    })
    }
    

    const productArray = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt'];
    for (const prod of productArray){
        test (`Add Product-${prod}`, async({loggedInPage})=>{
           // await login(page,'standard_user','secret_sauce');
            await addProduct(loggedInPage,prod);
            const cartAfterAdding = await cartValue(loggedInPage)
            expect(cartAfterAdding).toBe('1');
             await openCart(loggedInPage);           
                await expect(loggedInPage.getByTestId('inventory-item-name').filter({hasText:prod})).toBeVisible();
            
        })
    }

test ('Add Single Product', async({loggedInPage})=>{
   // await login(page,'standard_user','secret_sauce');
  //  const cartBeforeAdding = await cartValue(page)
    await addProduct(loggedInPage,'Sauce Labs Backpack');
    const cartAfterAdding = await cartValue(loggedInPage)
    expect(cartAfterAdding).toBe('1');
     await openCart(loggedInPage);
     await expect (loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();
})

test('Add multiple products',async({loggedInPage})=>{
  //  await login(page,'standard_user','secret_sauce');
    for (const prod of productArray){
        await addProduct(loggedInPage,prod);
    }
    const cartAfterAdding = await cartValue(loggedInPage)
     expect(Number(cartAfterAdding)).toBe(productArray.length);
    await openCart(loggedInPage);
    for (const prod of productArray){
        await expect(loggedInPage.getByTestId('inventory-item-name').filter({hasText:prod})).toBeVisible();
    }
})