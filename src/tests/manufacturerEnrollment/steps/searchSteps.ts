import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test';


When('I enter {string} in the search box', async ({searchPage}, query: string) => {
   await searchPage.enterSearchQuery(query);
 });
 
 Then('I should see the matching results having {string}',  async ({searchPage}, query: string) =>  {
   const results = await searchPage.getSearchResults();
   const matchedResults = results.filter((result) => result.includes(query));
   expect(matchedResults.length).toBeGreaterThan(0); // At least one result should match
 });
 