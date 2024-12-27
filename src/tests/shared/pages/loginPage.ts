import { Page } from 'playwright/test';

// --- Element Locators --- //
const loc_username = "//input[@name='username']";
const loc_password = "//input[@name='password']";
const loc_signinBttn = "//button[@type='submit']";
const loc_dashboard = "//h6[text()='Dashboard']"; // Locator to verify successful login

export class LoginPage {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   /**
    * Navigates to the test site.
    */
   async open() {
      const testSite = process.env.SITE || 'https://opensource-demo.orangehrmlive.com/';
      await this.page.goto(testSite);
   }

   /**
    * Logs in with a given username and password (or defaults to valid credentials).
    * @param user Username (default: Admin)
    * @param pass Password (default: admin123)
    */
   async login(user: string = 'Admin', pass: string = 'admin123') {
      await this.page.locator(loc_username).fill(user);
      await this.page.locator(loc_password).fill(pass);
      await this.page.locator(loc_signinBttn).click();
   }

   /**
    * Validates that the login was successful by checking for the dashboard element.
    */
   async validateDashboard() {
      await this.page.locator(loc_dashboard).waitFor({ state: 'visible', timeout: 5000 });
   }
}
