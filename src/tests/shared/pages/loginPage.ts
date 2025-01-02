import { Page } from 'playwright/test';
import { UIActionUtilities } from '../../../utilities/UIActionUtilities';

// --- Element Locators --- //
const loc_username = "//input[@name='username']";
const loc_password = "//input[@name='password']";
const loc_signinBttn = "//button[@type='submit']";
import { softAssertUI } from '../../../utilities/SoftAssertUI';

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

      await softAssertUI.assertElementPresent(this.page,loc_username,"Username is missing");

      await uiau.inputElement(loc_username, user);

      await softAssertUI.assertElementPresent(this.page,loc_password,"Username is missing");

      await uiau.inputElement(loc_password, pass);

      await softAssertUI.assertElementPresent(this.page,loc_signinBttn,"Username is missing");

      await uiau.findElementClick(loc_signinBttn);
   }

}
