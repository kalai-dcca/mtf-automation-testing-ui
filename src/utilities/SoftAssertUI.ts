import { Page } from '@playwright/test';

class SoftAssertUI {

    private failures: string[] = [];

    async assertElementPresent(page: Page, selector: string, message: string): Promise<void> {
        const element = await page.$(selector);
        if(!element) {
            this.failures.push(`Element not present: ${message}`);
            console.warn(`Soft Assert Failed: Element not present - ${message}`);
        }
    }

    async assertElementText(page: Page, selector: string, expectedText: string, message: string): Promise<void>{
        const element = await page.$(selector);
        const actualText = element ? await element.textContent() : null;

        if(actualText?.trim() !== expectedText.trim()) {
            this.failures.push(`Text mismatch - ${message} (Expected: "${expectedText}", Found: "${actualText}")`);
            console.warn(`Soft Assert Failed: Text mismatch - ${message} (Expected: "${expectedText}", Found: "${actualText}")`);
        }
    }

    checkFailures(): void{
        if(this.failures.length > 0) {
            throw new Error(`Soft Assert Failures:\n${this.failures.map((msg, i) => `${i + 1}. ${msg}`).join('\n')}`);
        }
    }
}
export const softAssertUI = new SoftAssertUI();