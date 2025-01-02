import { expect, Locator, Page } from '@playwright/test';

class SoftAssertUI {

    private failures: string[] = [];

    async assertElementPresent(locator: Locator, message: string): Promise<void> {
        try{
            await expect(locator).toBeAttached();
        }catch (error) {
            this.failures.push(`Element not present: ${message}`);
            console.warn(`Soft Assert Failed: Element not present - ${message}`);
        }
    }

    async assertElementText(locator: Locator, expectedText: string, message: string): Promise<void>{
        try{
            await expect(locator).toHaveText(expectedText);
        }catch(error){
            this.failures.push(`Text mismatch - ${message} (Expected: "${expectedText}")`);
            console.warn(`Soft Assert Failed: Text mismatch - ${message}`);
        }
        
    }
    async assertElementVisible(locator: Locator, expectedText: string, message: string): Promise<void>{
        try{
            await expect(locator).toBeVisible();
        }catch(error){
            this.failures.push(`Element not visible: ${message}")`);
            console.warn(`Soft Assert Failed: Element not visible - ${message}`);
        }
    }

    async assertElementChecked(locator: Locator, message: string): Promise<void>{
        try{
            await expect(locator).toBeChecked();
        }catch(error){
            this.failures.push(`Element not checked: ${message}")`);
            console.warn(`Soft Assert Failed: Element not checked - ${message}`);
        }
    }

    async assertElementDisabled(locator: Locator, message: string): Promise<void>{
        try{
            await expect(locator).toBeDisabled();
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
export const softAssertUI = new SoftAssertUI();