import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test';
import { chromium, Browser, Page } from 'playwright';




const filePath = ('c:/Users/shanna/OneDrive - Data Computer Corporation of America (DCCA)/Documents/demo-1.txt');


Given('navigate to the app main page', async ({ page }) => {

    const browser: Browser = await chromium.launch();
    const context = await browser.newContext();
    // const page: Page = await context.newPage();
  
   const testSite = process.env.SITE || 'https://demoqa.com/forms';

   // Open the first page
   await page.goto(testSite);


    const firstTabTitle = await page.title();
    console.log('Title After Clicking Second Tab: ', firstTabTitle);
  
    // Verify The Title
    expect(firstTabTitle).toBe("DEMOQA");

});

When('verify the page title', async ({ page, context }) => {

    const alertsWindows = "//div[text()='Alerts, Frame & Windows']";
    const browserWindows = "//span[text()='Browser Windows']";
    const newTab = '#tabButton';

    await page.locator(alertsWindows).click();
    await page.locator(browserWindows).click();
    await page.locator(newTab).click();
    await page.waitForTimeout(5000);

 // Start waiting for a new page before clicking the link
 const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#sampleHeading').click(),

 ])
 const header = await newPage.textContent('h1');
 console.log(header);
 expect (header?.trim()).toBe('This is a sample page');


//   const newTabHeader = '#sampleHeading';
//   await newPage.locator(newTabHeader).click();
   
 
   // Interact with the new page
   await newPage.waitForLoadState();

  await newPage.waitForTimeout(2000);
  await newPage.reload();
  await newPage.waitForTimeout(2000);

  

  // Verify the URL of the new page
//  expect(newPage.url()).toBe('https://demoqa.com/sample'); 
  await newPage.waitForTimeout(5000);

   // Close the new tab
   await newPage.close();
});


