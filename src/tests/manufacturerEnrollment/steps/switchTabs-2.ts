import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test';


When('verify the first page title', async ({ page }) => {
    const firstTabTitle = await page.title();
    console.log('Title Before Clicking Second Tab: ', firstTabTitle);
  
    // Verify The Title
    expect(firstTabTitle).toBe("OrangeHRM");

});

When('switch to the new tab', async ({ page, context }) => {
    
    // OrangeHRM Element
    const OrangeHRM = "//*[text()='OrangeHRM, Inc']"

     // Start waiting for a new page before clicking the link.
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator(OrangeHRM).click(),
    
 ])
 const header = await newPage.textContent('h1');
    console.log('Header ', header);
    expect (header?.trim()).toBe('Peace of mind is just a few clicks away!');

});

Then('verify the second page title', async ({ page, context }) => {

const secondTabTitle = await page.title();
console.log('Title After Clicking Second Tab: ', secondTabTitle);
await page.waitForTimeout(5000), 

// Verify The Title
expect(secondTabTitle).toBe('OrangeHRM');

// Close the new tab
await page.close();
});


