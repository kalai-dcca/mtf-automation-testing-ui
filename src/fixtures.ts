import { test as base, createBdd } from 'playwright-bdd';

// -- List of Page Object Class -- //
import { HomePageSidePanel } from './tests/manufacturerEnrollment/pages/sidePanel';
import { LoginPage } from './tests/shared/pages/loginPage';
import { CommonPage } from './tests/shared/pages/commonPage';

type pageObjFixtures = {
   loginPage: LoginPage;
   commonPage: CommonPage;
   searchPage: HomePageSidePanel;
};

// -- Page Object Fixtures -- //
export const test = base.extend<pageObjFixtures>({

   loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
   },
   commonPage: async ({ page }, use) => {
      await use(new CommonPage(page));
   },
   searchPage: async ({ page }, use) => {
      await use(new HomePageSidePanel(page));
   },

});

// -- BDD Keyword Fixtures -- //
export const { Given, When, Then } = createBdd(test);