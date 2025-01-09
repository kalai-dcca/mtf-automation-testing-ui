import { test as base, createBdd } from 'playwright-bdd';
import { TestScenarioContext } from './tests/demoUI/context/TestScenarioContext';

// -- List of Page Object Class -- //
import { HomePageSidePanel } from './tests/manufacturerEnrollment/pages/sidePanel';
import { LoginPage } from './tests/shared/pages/loginPage';
import { HomePage } from './tests/shared/pages/homePage';
import { Page } from '@playwright/test';
import { SwitchingTabsPage } from './tests/manufacturerEnrollment/pages/switchingTabsPage';


// Define custom fixtures interface for test case setup
interface CustomFixtures {
   directory: string;
   fileName: string;
   sheet: string;
   testCase: string;
}

type pageObjFixtures = {
   loginPage: LoginPage;
   homePage: HomePage;
   searchPage: HomePageSidePanel;
   testScenarioContext: TestScenarioContext;
   switchingtabsPage: SwitchingTabsPage;
} & CustomFixtures;

// -- Page Object Fixtures -- //
export const test = base.extend<pageObjFixtures>({

   loginPage: async ({ page }: { page: Page }, use: (page: LoginPage) => Promise<void>) => {
      await use(new LoginPage(page));
   },
  homePage: async ({ page }, use) => {
   await use(new HomePage(page));
   },
   searchPage: async ({ page }, use) => {
      await use(new HomePageSidePanel(page));
   },  
   testScenarioContext: async ({}, use) => {
      const context = new TestScenarioContext(); // Create a new context for each scenario
      await use(context);
   },
   switchingtabsPage: async ({ page }, use) => {
      await use(new SwitchingTabsPage(page));
   },
 
   // Custom fixtures for test case setup
   directory: async ({}, use) => {
      const dir = ''; // Value will be passed from Gherkin step
      console.log('Fixture: directory is set dynamically =', dir);
      await use(dir);
   },
   fileName: async ({}, use) => {
      const file = ''; // Value will be passed from Gherkin step
      console.log('Fixture: fileName is set dynamically =', file);
      await use(file);
   },
   sheet: async ({}, use) => {
      const sheet = ''; // Value will be passed from Gherkin step
      console.log('Fixture: sheet is set dynamically =', sheet);
      await use(sheet);
   },
   testCase: async ({}, use) => {
      const testCase = ''; // Value will be passed from Gherkin step
      console.log('Fixture: testCase is set dynamically =', testCase);
      await use(testCase);
   },
});

// -- BDD Keyword Fixtures -- //
export const { Given, When, Then } = createBdd(test);