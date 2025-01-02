import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test'; // Import expect


Given('I navigate to the login page', async ({ loginPage }) => {
    await loginPage.open(); // Open the login page
});

When('I login with valid credentials', async ({ loginPage }) => {
    await loginPage.login(); // Uses default credentials: Admin/admin123
});

When('I login with {string} username and {string} password', async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password); // Uses default credentials: Admin/admin123
});

Then('I should see the dashboard', async ({ homePage }) => {
    await homePage.validateDashboard(); // Assertion for successful login
});

Then('I validate that {string} is displayed on the page', async ({ page }, text: string) => {
    await expect(page.getByText(text, {exact:true}).first()).toBeVisible(); // Assertion for text
 });
