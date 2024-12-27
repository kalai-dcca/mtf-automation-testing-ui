import { Page } from 'playwright/test';
import { UIActionUtilities } from '../../../utilities/UIActionUtilities';

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
      const usernameLocator = this.page.locator(loc_username);
      await UIActionUtilities.inputElement(usernameLocator, user);
      const passwordLocator = this.page.locator(loc_password);
      await UIActionUtilities.inputElement(passwordLocator, pass);
      const signinButtonLocator = this.page.locator(loc_signinBttn);
      await UIActionUtilities.findElementClick(signinButtonLocator);
   }

   /**
    * Validates that the login was successful by checking for the dashboard element.
    */
   async validateDashboard() {
      const dashboardLocator = this.page.locator(loc_dashboard);
      await UIActionUtilities.waitForVisibility(dashboardLocator);
   }
}
