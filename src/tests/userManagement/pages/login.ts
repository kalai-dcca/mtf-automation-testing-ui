import { Page } from 'playwright/test';

// --- Element Locators --- //
const loc_username = 'input#user-name';
const loc_password = 'input#password';
const loc_signinBttn = 'input#login-button';

// --- User Actions --- //
export class Login {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   /**
    * Given the url of test site, it navigates to the test site.  Please make sure to provide the test site url
    * via command line when you invoking the test, env value for the url is SITE.
    *
    * @example
    *   await loginPage.open();
    */
   async open() {
      const testSite = process.env.SITE || 'https://www.saucedemo.com/v1/';
      await this.page.goto(testSite);
   }

   /**
    * Given the username and password, it process user for the site login.  Please ensure to provide the vaue
    * for both user and password via command line where corresponding env values are ( TESTUSER, PASSWORD )
    *
    * @example
    *   await loginPage.processLogin();
    *
    * @param user username
    * @param pass password
    */
   async processLogin(user?: string, pass?: string) {
      const username = process.env.TESTUSER || user || 'standard_user';
      const password = process.env.PASSWORD || pass || 'secret_sauce';

      // enter username, password and click Sign In button
      await this.page.locator(loc_username).fill(username);
      await this.page.locator(loc_password).fill(password);
      await this.page.locator(loc_signinBttn).click();
   }
} //end::Login
