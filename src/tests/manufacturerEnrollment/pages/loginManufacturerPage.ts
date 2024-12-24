import { Page } from 'playwright/test';

// --- Element Locators --- //
const loc_username = "//input[@name='username']";
const loc_password = "//input[@name='password']";
const loc_signinBttn = "//button[@type='submit']";

// --- User Actions --- //
export class LoginManufacturerPage {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   /**
    * Given the url of test site, it navigates to the test site. 
    *
    * @example
    *   await loginPage.open();
    */
   async open() {
      const testSite = process.env.SITE || 'https://opensource-demo.orangehrmlive.com/';
      await this.page.goto(testSite);
   }

   /**
    * Given the username and password, it process user for the site login. 
    *
    * @example
    *   await loginPage.processLogin();
    *
    * @param user username
    * @param pass password
    */
   async processLogin(user?: string, pass?: string) {
      const username = process.env.TESTUSER || user || 'Admin';
      const password = process.env.PASSWORD || pass || 'admin123';

      // enter username, password and click Sign In button
      await this.page.locator(loc_username).fill(username);
      await this.page.locator(loc_password).fill(password);
      await this.page.locator(loc_signinBttn).click();
   }
} 
