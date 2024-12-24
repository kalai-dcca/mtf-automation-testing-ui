import { test as base, createBdd } from 'playwright-bdd';

// -- List of Page Object Class -- //
import { Login } from './tests/userManagement/pages/login';
import { Home } from './tests/userManagement/pages/home';
import { LoginManufacturerPage } from './tests/manufacturerEnrollment/pages/loginManufacturerPage';
import { HomePageSidePanel } from './tests/manufacturerEnrollment/pages/sidePanel';

type pageObjFixtures = {
   loginPage: Login;
   homePage: Home;

   loginManufacturerPage: LoginManufacturerPage;  
   searchPage: HomePageSidePanel;
};

// -- Page Object Fixtures -- //
export const test = base.extend<pageObjFixtures>({
   loginPage: async ({ page }, use) => {
      await use(new Login(page));
   },
   homePage: async ({ page }, use) => {
      await use(new Home(page));
   },

   // loginManufacturerPage: async ({ page }, use) => {
   //    await use(new LoginManufacturer(page));
   // },   
   searchPage: async ({ page }, use) => {
      await use(new HomePageSidePanel(page));
   },  

});

// -- BDD Keyword Fixtures -- //
export const { Given, When, Then } = createBdd(test);