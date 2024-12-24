import { Given, When, Then } from '../../../fixtures';
import { expect, Page } from '@playwright/test';
import { HomePageSidePanel } from '../pages/sidePanel';
import { MyInformationPage } from '../pages/myInfoPage';

Given('I navigate to the {string} section', async ({page}, pageName: string) => {
  // Navigate to the section page
  const sp = new HomePageSidePanel(page);
  await sp.navigateTo(pageName);
});

Then('the following navigation options should be displayed:', async ({page}, dataTable: { rawTable: string[][] }) => {
  // Extract expected navigation options from the data table
  const expectedOptions = dataTable.rawTable.slice(1).map(row => row[0]); // Remove the header row

  // Locate the navigation options in the sidebar/menu
  const mip = new MyInformationPage(page);

  const actualOptions = await page
    .locator("//*[@role='tablist']//a") // Adjust the selector to match the options in your sidebar
    .allTextContents();

  // Verify that all expected options are present in the actual options
  for (const option of expectedOptions) {
    expect(actualOptions).toContain(option);
  }

  // Verify no unexpected options are present
  expect(actualOptions.sort()).toEqual(expectedOptions.sort());
});
