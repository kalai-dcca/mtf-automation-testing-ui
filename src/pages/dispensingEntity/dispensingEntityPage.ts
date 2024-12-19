import { Page, expect } from 'playwright/test';

// --- Element Locators --- //
const loc_username = 'input#user-name';
const loc_password = 'input#password';
const loc_signinBttn = 'input#login-button';

// --- User Actions --- //
export class Home {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   async verifyDashboardVisible() {
      const bannerText = await this.page.locator('.product_label').textContent();
      expect(bannerText).toEqual('Products');
   }
} //end::Login
