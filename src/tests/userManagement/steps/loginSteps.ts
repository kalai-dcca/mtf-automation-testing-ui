import { Given, When, Then } from '../../../fixtures';

Given('I navigate to the login page', async ({ loginPage }) => {
   await loginPage.open();
});

When('I enter valid credentials', async ({ loginPage }) => {
   await loginPage.processLogin();
});

Then('I should see the dashboard', async ({ homePage }) => {
   await homePage.verifyDashboardVisible();
});