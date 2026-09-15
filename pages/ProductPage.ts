import { Page } from "@playwright/test"

export class ProductPage {

    constructor(private page: Page) {

    }

    getProduct(product: string) {
        return this.page.getByTestId('inventory-item-name').filter({ hasText: product });
    }

    async addProduct(productName: string) {
        const product = this.page.getByText(productName);
        const parentParent = product.locator('..').locator('..');
        const sibling = parentParent.locator('+div')
        const addButton = sibling.getByText('Add to cart');
        await addButton.click();
    }
}