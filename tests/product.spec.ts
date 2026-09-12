import { expect } from "@playwright/test";
import { test } from "../utils/fixtures"
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

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

for (const product of products) {

    test(`Add product -${product.name}`, async ({ loggedInPage }) => {

        const productPage = new ProductPage(loggedInPage);
        const cartPage = new CartPage(loggedInPage);
        await productPage.addProduct(product.name);
        await cartPage.openCart();
        await expect(loggedInPage.getByText(product.name)).toBeVisible();
        const priceFetched = cartPage.getPrice(product.name);
        await expect(priceFetched).toHaveText(`$${product.price}`);
        const itemQuantity = cartPage.getItemQuantity(product.name);
        await expect(itemQuantity).toHaveText(product.quantity);
    })
}


const productArray = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
for (const prod of productArray) {
    test(`Add Product-${prod}`, async ({ loggedInPage }) => {
        const productPage = new ProductPage(loggedInPage);
        const cartPage = new CartPage(loggedInPage);
        await productPage.addProduct(prod);
        const cartAfterAdding = await cartPage.cartValue()
        expect(cartAfterAdding).toBe('1');
        await cartPage.openCart();
        await expect(cartPage.getProduct(prod)).toBeVisible();
      //  await expect(loggedInPage.getByTestId('inventory-item-name').filter({ hasText: prod })).toBeVisible();

    })
}

test('Add Single Product', async ({ loggedInPage }) => {
   
    const productPage = new ProductPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    await productPage.addProduct('Sauce Labs Backpack');
    const cartAfterAdding = await cartPage.cartValue()
    expect(cartAfterAdding).toBe('1');
    await cartPage.openCart();
    await expect(loggedInPage.getByText('Sauce Labs Backpackkkkkkkkkkk')).toBeVisible();
})

test('Add multiple products', async ({ loggedInPage }) => {

    const productPage = new ProductPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    for (const prod of productArray) {
        await productPage.addProduct(prod);
    }
    const cartAfterAdding = await cartPage.cartValue()
    expect(Number(cartAfterAdding)).toBe(productArray.length);
    await cartPage.openCart();
    for (const prod of productArray) {
        expect(productPage.getProduct(prod)).toBeVisible();
    }
})



   
    
