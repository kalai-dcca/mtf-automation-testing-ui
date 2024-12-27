import { Page } from 'playwright/test';

// --- Element Locators --- //
const loc_username = "//input[@name='username']";


export class CommonPage {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   /**
    * Validates that the login was successful by checking for the dashboard element.
    */
   async clickByText(buttonName: string) {
      await this.page.click("//*[text()='"+buttonName+"']");
   }
}
