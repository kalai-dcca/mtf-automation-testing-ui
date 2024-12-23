import { BasePage } from './basePage';

export class Products extends BasePage {
    
    private locators = {
        addToCartButton: (productName: string) => `//div[text()='${productName}']//ancestor::div[@class='inventory_item']//button`,
        shoppingCartButton: 'a.shopping_cart_link',
        checkOutButton: 'a.checkout_button'
    };
    
    async addToCart(productName: string): Promise<void> {
        const locator = this.locators.addToCartButton(productName);
        await this.clickElement(`xpath=${locator}`);
    }

    async checkoutProducts(): Promise<void> {
        //const locator = this.locators.shoppingCartButton;
        await this.clickElement(this.locators.shoppingCartButton);
        await this.clickElement(this.locators.checkOutButton);
    }

    // When('I fill the checkout details with the following information', async (dataTable) => {
    //     const data = dataTable.rowsHash();
    //     await checkoutPage.fillCheckoutDetails({
    //         firstName: data.FirstName,
    //         lastName: data.LastName,
    //         postalCode: data.PostalCode,
    //     });
    // });
}