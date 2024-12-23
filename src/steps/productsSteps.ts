import { Given, When, Then } from '../fixtures';

When('I add {string} to cart', async ({ productsPage }, productName: string) => {
    await productsPage.addToCart(productName);
});

When('I checkout Products', async ({ productsPage }) => {
    await productsPage.checkoutProducts();
});