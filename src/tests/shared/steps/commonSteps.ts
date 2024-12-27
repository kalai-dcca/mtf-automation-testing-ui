import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test'; // Import expect

When('I click {string} button', async ({ commonPage }, buttonName: string) => {
    await commonPage.clickByText(buttonName);
});

Then('I validate that {string} is displayed on the page', async ({ page }, text: string) => {
    await expect(page.getByText(text, {exact:true})).toBeVisible(); // Assertion for text
});
