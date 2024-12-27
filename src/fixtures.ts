import { test as base, createBdd } from 'playwright-bdd';

// -- List of Page Object Class -- //
import { HomePageSidePanel } from './tests/manufacturerEnrollment/pages/sidePanel';
import { LoginPage } from './tests/shared/pages/loginPage';

type pageObjFixtures = {
   loginPage: LoginPage;
   searchPage: HomePageSidePanel;
};

// -- Page Object Fixtures -- //
export const test = base.extend<pageObjFixtures>({

   loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
   },
   searchPage: async ({ page }, use) => {
      await use(new HomePageSidePanel(page));
   },

});

// -- BDD Keyword Fixtures -- //
export const { Given, When, Then } = createBdd(test);