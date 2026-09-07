import { expect,Page } from "@playwright/test";

export async function addProduct(page: Page,productName: string){
    const product = page.getByText(productName);
    //console.log('product:', await product.evaluate(el => el.outerHTML));
    const parentParent = product.locator('..').locator('..');
    //console.log('parentParent:', await parentParent.evaluate(el => el.outerHTML));
    const sibling = parentParent.locator('+div')
    //console.log('sibling:', await sibling.evaluate(el => el.outerHTML));
    const addButton = sibling.getByText('Add to cart');
    //console.log('button:', await addButton.evaluate(el => el.outerHTML));

     await addButton.click();
}







