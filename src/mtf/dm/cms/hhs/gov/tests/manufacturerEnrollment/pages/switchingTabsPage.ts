import { expect, Page } from '@playwright/test';

export class SwitchingTabsPage { 
    private page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
  
    // Locators
    private OrangeHRMIncLink = "//a[.='OrangeHRM, Inc']"; 
    private promisedNewPageEvent: Promise<Page> = Promise.resolve(null as unknown as Page);
    private newPage!: Page;

    async clickOrangeHRMIncLinkforNewTab() {
      this.promisedNewPageEvent = this.page.waitForEvent('popup');
      await this.page.click(this.OrangeHRMIncLink);
      this.newPage = await this.promisedNewPageEvent;
    }

    async verifyNewTabTitle(query: string) {
      const newPageTitle = await this.newPage.title();
      expect(newPageTitle).toContain(query);
    }

}