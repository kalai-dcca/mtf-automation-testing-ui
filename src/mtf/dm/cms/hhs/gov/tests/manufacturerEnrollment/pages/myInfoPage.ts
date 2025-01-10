import { Page } from '@playwright/test';

export class MyInformationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private listOptions = "//*[@role='tablist']//a";

  // Methods
  async getListOptions() {
    const results = await this.page.locator(this.listOptions).allTextContents();
    return results;
  }

}