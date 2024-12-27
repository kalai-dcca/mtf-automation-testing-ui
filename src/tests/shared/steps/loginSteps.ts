import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test'; // Import expect

import { LoginPage } from '../pages/loginPage';

Given('I navigate to the login page', async ({ page }) => {
    const testSite = process.env.SITE || 'https://opensource-demo.orangehrmlive.com/';
    await page.goto(testSite);
});

When('I login with valid credentials', async ({ loginPage }) => {
    await loginPage.login(); // Uses default credentials: Admin/admin123
});

When('I login with {string} username and {string} password', async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password); // Uses default credentials: Admin/admin123
});

Then('I should see the dashboard', async ({ page }) => {
    const dashboardHeader = "//h6[text()='Dashboard']"; // Update with your actual locator
    await expect(page.locator(dashboardHeader)).toBeVisible(); // Assertion for successful login
});
