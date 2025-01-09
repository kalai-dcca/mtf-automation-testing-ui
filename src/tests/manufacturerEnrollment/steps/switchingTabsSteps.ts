import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test';


When('I click on OrangeHRM, Inc link', async ({switchingtabsPage}) => {
    await switchingtabsPage.clickOrangeHRMIncLinkforNewTab();
  });
  

  
  Then('I verify new tab title is {string}', async ({switchingtabsPage}, query: string) => {
    await switchingtabsPage.verifyNewTabTitle(query);
  });