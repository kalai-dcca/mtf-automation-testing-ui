import { Page } from '@playwright/test';

export class HomePageSidePanel {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private searchBox = "//input[@placeholder='Search']"; 
  private searchResults = "//a[contains(@class,'oxd-main-menu-item')]//span";

  // Methods
  async enterSearchQuery(query: string) {
    await this.page.fill(this.searchBox, query);
    await this.page.press(this.searchBox, 'Enter'); // Simulates pressing 'Enter' after entering text
  }

  async getSearchResults() {
    const results = await this.page.$$eval(this.searchResults, (elements) =>
      elements.map((el) => el.textContent || '')
    );
    return results;
  }

  async navigateTo(option: string) {
    await this.page.click("//*[text()='"+option+"']");
  }
}
