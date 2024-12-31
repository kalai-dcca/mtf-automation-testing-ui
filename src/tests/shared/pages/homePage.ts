import { Page } from 'playwright/test';
import { UIActionUtilities } from '../../../utilities/UIActionUtilities';

// --- Element Locators --- //
const loc_dashboard = "//h6[text()='Dashboard']"; // Locator to verify successful login

export class HomePage {
   private readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   /**
    * Navigates to the test site.
    */
   async open() {
      const testSite = process.env.SITE || 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
      await this.page.goto(testSite);
   }

   /**
    * Validates that the login was successful by checking for the dashboard element.
    */
   async validateDashboard() {
      const uiau = new UIActionUtilities(this.page);
      await uiau.waitForVisibility(loc_dashboard);
   }
}
