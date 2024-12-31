import { Given, When, Then } from '../../../fixtures';
import { expect } from 'playwright/test';
import { chromium, Browser, Page } from 'playwright';
import path from 'path';
// import { LoginManufacturerPage } from '../pages/loginManufacturerPage';



const filePath = ('c:/Users/shanna/OneDrive - Data Computer Corporation of America (DCCA)/Documents/demo-1.txt');


// Given('I login with a valid User', async ({}) => {

//     const browser: Browser = await chromium.launch();
//    const context = await browser.newContext();
//    const page: Page = await context.newPage();
//    const url = 'https://demoqa.com/forms';

//     async function switchTabs() {

       
//         // Open the first page
//         await page.goto(url);

//     }

// });

Given('verify the page title', async () => {
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    const firstTabTitle = await page.title();
    console.log('Title After Clicking Second Tab:', firstTabTitle);
  
    // Verify The Title
    expect(firstTabTitle).toBe("DEMOQA");
  
    const alertsWindows = "//*[text()='Alerts, Frame & Windows']";
    const browserWindows = "//*[text()='Browser Windows']";
    const newTab = '#tabButton';
  
    await page.click(alertsWindows);
    await page.click(browserWindows);
    await page.click(newTab);

   // Open the Second page
//    await switchTabs();


});


Given('verify the new tab', async ({}) => {
 // Verify The URL
 const browser: Browser = await chromium.launch();
const context = await browser.newContext();
 const page: Page = await context.newPage();
  const currentURL = page.url();
  
  expect(currentURL).toBe("https://demoqa.com/sample"); 

});

Given('upload file', async ({}) => {
    const browser: Browser = await chromium.launch();
const context = await browser.newContext();
 const page: Page = await context.newPage();

    const url = 'https://demoqa.com/forms';
    // Upload File
  await page.goto(url);

  // Select the file input element
  const Elements = await page.locator("//*[text()='Elements']").click();
  const Upload_Download = await page.locator("//span[text()='Upload and Download']").click();
  const chooseFile = await page.locator("uploadFile").click();
  
  const fileInputSelector = ("uploadFile");
  
  await page.locator(fileInputSelector).setInputFiles(filePath);

  await browser.close();

});