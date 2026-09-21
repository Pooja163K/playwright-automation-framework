import { Page } from "@playwright/test";

export class CartPage {
    readonly cart;


    constructor(private page: Page) {
        this.cart = this.page.locator('.cart_item');

    }


    getProduct(productName: string) {
        return this.cart.filter({ hasText: productName });
    }

    getPrice(productName: string) {
        return this.getProduct(productName).getByTestId('inventory-item-price');
    }

    getItemQuantity(productName: string) {
        return this.getProduct(productName).getByTestId('item-quantity');
    }
  
    async openCart() {
        await this.page.getByTestId('shopping-cart-link').click();
    }

    async cartValue() {
        return this.page.getByTestId('shopping-cart-link').locator('span').textContent();
    }

    async checkout(fName: string, lName: string, zip: string) {
        await this.page.getByRole('button', { name: 'checkout' }).click();
        await this.page.getByPlaceholder('First Name').fill(fName);
        await this.page.getByPlaceholder('Last Name').fill(lName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(zip);
        await this.page.getByTestId('continue').click();
        await this.page.getByRole('button', { name: 'finish' }).click();
    }
}