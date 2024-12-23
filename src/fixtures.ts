import { test as base, createBdd } from 'playwright-bdd';

// -- List of Page Object Class -- //
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Products } from './pages/products'

type pageObjFixtures = {
   loginPage: Login;
   homePage: Home;
   productsPage: Products;
};

// -- Page Object Fixtures -- //
export const test = base.extend<pageObjFixtures>({
   loginPage: async ({ page }, use) => {
      await use(new Login(page));
   },
   homePage: async ({ page }, use) => {
      await use(new Home(page));
   },
   productsPage: async ({ page }, use) => {
      await use(new Products(page));
   },
});

// -- BDD Keyword Fixtures -- //
export const { Given, When, Then } = createBdd(test);
