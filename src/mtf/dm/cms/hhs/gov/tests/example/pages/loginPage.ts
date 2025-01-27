import { Page } from 'playwright/test';
import { UIActionUtilities } from '../../../commonUtilities/UIActionUtilities';
import SoftAssertUI from "../../../commonUtilities/SoftAssertUI"

// --- Element Locators --- //
const loc_username = "//input[@name='username']";
const loc_password = "//input[@name='password']";
const loc_signinBttn = "//button[@type='submit']";


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
      const uiau = new UIActionUtilities(this.page);
      const softAssertUI = new SoftAssertUI(this.page);
      
      await this.page.waitForSelector(loc_username);
      await this.page.waitForSelector(loc_password);

      await softAssertUI.assertElementPresent(loc_username,"Username is missing");

      await UIActionUtilities.inputElement(this.page.locator(loc_username), user);

      await softAssertUI.assertElementPresent(loc_password,"Password is missing");

      await UIActionUtilities.inputElement(this.page.locator(loc_password), pass);

      await softAssertUI.assertElementPresent(loc_signinBttn,"Signin button is missing");

      await UIActionUtilities.clickElement(this.page.locator(loc_signinBttn));

      softAssertUI.checkFailures();
   }

}
