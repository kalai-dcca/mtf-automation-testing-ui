import { Page } from '@playwright/test';
import { UIActionUtilities } from '../../../commonUtilities/UIActionUtilities';

export class NavigationPanelPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private adminMenuOption = "//span[text()='Admin']";

  // Methods
  async navigatetoAdminPage() {
    const adminMenuLocator = this.page.locator(this.adminMenuOption);
    await UIActionUtilities.clickElement(adminMenuLocator);
  }

}