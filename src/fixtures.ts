import { test as base, createBdd } from 'playwright-bdd';

// -- List of Page Object Class -- //
import { Login } from './pages/login';
import { Home } from './pages/home';

type pageObjFixtures = {
   loginPage: Login;
   homePage: Home;
};

// -- Page Object Fixtures -- //
export const test = base.extend<pageObjFixtures>({
   loginPage: async ({ page }, use) => {
      await use(new Login(page));
   },
   homePage: async ({ page }, use) => {
      await use(new Home(page));
   },
});

// -- BDD Keyword Fixtures -- //
export const { Given, When, Then } = createBdd(test);
