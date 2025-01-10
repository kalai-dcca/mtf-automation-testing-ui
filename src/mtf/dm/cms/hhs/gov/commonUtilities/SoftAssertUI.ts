import { expect, Locator, Page } from '@playwright/test';

class SoftAssertUI {
    constructor(private page: Page){
        this.page = page;
    }

    private failures: string[] = [];

    async assertElementPresent(locator: string, message: string): Promise<void> {
        const Locator = this.page.locator(locator);
        try{
            await expect(Locator).toBeAttached();
        }catch (error) {
            this.failures.push(`Element not present: ${message}`);
            console.warn(`Soft Assert Failed: Element not present - ${message}`);
        }
    }

    async assertElementText(locator: string, expectedText: string, message: string): Promise<void>{
        const Locator = this.page.locator(locator);
        try{
            await expect(Locator).toHaveText(expectedText);
        }catch(error){
            this.failures.push(`Text mismatch - ${message} (Expected: "${expectedText}")`);
            console.warn(`Soft Assert Failed: Text mismatch - ${message}`);
        }
        
    }
    async assertElementVisible(locator: string, expectedText: string, message: string): Promise<void>{
        const Locator = this.page.locator(locator);
        try{
            await expect(Locator).toBeVisible();
        }catch(error){
            this.failures.push(`Element not visible: ${message}")`);
            console.warn(`Soft Assert Failed: Element not visible - ${message}`);
        }
    }

    async assertElementChecked(locator: string, message: string): Promise<void>{
        const Locator = this.page.locator(locator);
        try{
            await expect(Locator).toBeChecked();
        }catch(error){
            this.failures.push(`Element not checked: ${message}")`);
            console.warn(`Soft Assert Failed: Element not checked - ${message}`);
        }
    }

    async assertElementDisabled(locator: string, message: string): Promise<void>{
        const Locator = this.page.locator(locator);
        try{
            await expect(Locator).toBeDisabled();
        }catch(error){
            this.failures.push(`Element is enabled: ${message}")`);
            console.warn(`Soft Assert Failed: Element is enabled - ${message}`);
        }
    }
    

    checkFailures(): void{
        if(this.failures.length > 0) {
            throw new Error(`Soft Assert Failures:\n${this.failures.map((msg, i) => `${i + 1}. ${msg}`).join('\n')}`);
        }
    }
}
export default SoftAssertUI;