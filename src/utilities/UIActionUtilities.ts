import { error } from 'console';
import { stat } from 'fs';
import { Page, Locator, expect } from 'playwright/test';

export class UIActionUtilities{
    constructor(private page: Page){}

    /**
     * Log the status of an action
     * @param actionName The name of the action being logged
     * @param locator The Playwright locator used for the action
     * @param status Whether the action succeeded or failed
     * @param message Optional additional information
     */
    private static log(actionName: string, locator: Locator, status: boolean, message: string = ''): void {
        console.log(`[${actionName}] Locator: ${locator.toString()}, Status: ${status}, Message: ${message}`);
    }

    /**
     * Handle errors during actions
     * @param actionName The name of the action being logged
     * @param locator The Playwright locator used for the action
     * @param error The error that occurred
     */
    private static handleError(actionName: string, locator: Locator, error: any): void {
        console.error(`[${actionName}] Locator: ${locator.toString()}, Error: ${error.message}`);
        throw error; // Re-throw error to fail the test
    }
    

    /**
     * Click Element
     * @param locator Playwright Locator for the radio button group
     * 
     */
    static async clickElement(locator: Locator): Promise<void> {
        try {
            await locator.click();
            this.log('clickElement', locator, true);
        } catch (error) {
            this.handleError('clickElement', locator, error);
        }
    }


    /**
     * Function to check if element is Displayed
     * @param locator 
     * @returns 
     */
    static async isElementVisible(locator: Locator): Promise<void>{
        try{
            await expect(locator).toBeVisible({timeout:30000,visible:true});
            this.log('isElementVisible', locator, true);
        }catch (error){
            this.handleError('isElementVisible', locator, error);
        }
    }

    /**
     * Function to Input text into Field element
     * @param locator 
     * @param text 
     * @returns 
     */
    static async inputElement(locator: Locator, text: string): Promise<boolean>{
        try{
            await expect(locator).toBeVisible({timeout:30000,visible:true});
            await locator.fill(text);
            this.log('inputElement', locator, true);
            return true;
        }catch (error){
            this.handleError('inputElement', locator, error);
            return false;
        }
    }


    /**
     * Function to verify element text value
     * @param locator 
     * @param expected 
     * @returns 
     */
    static async verifyElementText(locator: Locator, expected: string): Promise<boolean>{
        try{
            await expect(locator).toBeVisible({timeout:30000,visible:true});
            await expect(locator).toHaveText(expected);
            this.log('verifyElementText', locator, true);
            return true;
        }catch (error){
            this.handleError('verifyElementText', locator, error);
            return false;
        }
    }


    /**
     * Function to Scroll to an Element
     * @param locator 
     */
    static async scrollToElement(locator: Locator ) : Promise<boolean>{
        try{
            await expect(locator).toBeVisible({timeout:30000,visible:true});
            await locator.scrollIntoViewIfNeeded();
            this.log('scrollToElement', locator, true);
            return true; 
        } catch (error){
            this.handleError('scrollToElement', locator, error);
            return false;
        }
    }


    /**
     * Function to Wait for Visibility of the Element
     * @param locator 
     * @param timeout 
     * @returns 
     */
    static async waitForVisibility(locator: Locator, timeout: number = 30000): Promise<boolean>{
        try{
            await locator.waitFor({state: 'visible',timeout})
            this.log('waitForVisibility', locator, true);
            return true; 
        } catch (error){
            this.handleError('waitForVisibility', locator, error);
            return false;
        }
    }

     /**
     * Select an option from a dropdown, with optional case-insensitivity
     * @param locator Playwright Locator for the dropdown
     * @param value Value to select
     * @param ignoreCase Whether to ignore case sensitivity (default: false)
     */
     static async dropdownSelect(locator: Locator, value: string, ignoreCase: boolean = false): Promise<void> {
        try {
            await expect(locator).toBeVisible();

            if (ignoreCase) {
                const options = await locator.locator('option').allTextContents();
                const match = options.find(opt => opt.toLowerCase() === value.toLowerCase());

                if (match) {
                    await locator.selectOption({ label: match });
                } else {
                    throw new Error(`No match found for: ${value}`);
                }
            } else {
                await locator.selectOption(value);
            }

            this.log('dropdownSelect', locator, true, `Value: ${value}, IgnoreCase: ${ignoreCase}`);
        } catch (error) {
            this.handleError('dropdownSelect', locator, error);
        }
    }

    /**
     * Select a dropdown option dynamically
     * @param locator Playwright Locator for the dropdown
     * @param partialText Partial text to match
     */
    static async selectDropdownOptionByPartialText(locator: Locator, partialText: string): Promise<void> {
        try {
            await expect(locator).toBeVisible();
            const options = await locator.locator('option').allTextContents();
            const match = options.find(option => option.includes(partialText));

            if (match) {
                await locator.selectOption({ label: match });
                this.log('selectDropdownOptionByPartialText', locator, true, `Selected: ${match}`);
            } else {
                throw new Error(`No match found for: ${partialText}`);
            }
        } catch (error) {
            this.handleError('selectDropdownOptionByPartialText', locator, error);
        }
    }


    /**
     * Toggle a checkbox based on the desired state
     * @param locator Playwright Locator for the checkbox
     * @param shouldCheck Whether to check or uncheck the checkbox
     */
    static async toggleCheckbox(locator: Locator, shouldCheck: boolean): Promise<void> {
        try {
            await expect(locator).toBeVisible();
            const isChecked = await locator.isChecked();
            if (isChecked !== shouldCheck) {
                await locator.click();
            }
            this.log('toggleCheckbox', locator, true, `Set to: ${shouldCheck}`);
        } catch (error) {
            this.handleError('toggleCheckbox', locator, error);
        }
    }

    /**
     * Select a radio button
     * @param locator Playwright Locator for the radio button group
     * @param value Value of the radio button to select
     */
    static async selectRadioButton(locator: Locator, value: string): Promise<void> {
        try {
            await expect(locator).toBeVisible();
            await locator.locator(`input[value="${value}"]`).click();
            this.log('selectRadioButton', locator, true, `Value: ${value}`);
        } catch (error) {
            this.handleError('selectRadioButton', locator, error);
        }
    }

    /**
     * Extract data from a table
     * @param tableLocator Playwright Locator for the table
     * @returns Array of table rows, where each row is an array of cell values
     */
    static async getTableData(tableLocator: Locator): Promise<string[][]> {
        try {
            const rows = await tableLocator.locator('tr').all();
            const tableData: string[][] = [];

            for (const row of rows) {
                const cells = await row.locator('td, th').allTextContents();
                tableData.push(cells);
            }

            this.log('getTableData', tableLocator, true, `Extracted ${tableData.length} rows`);
            return tableData;
        } catch (error) {
            this.handleError('getTableData', tableLocator, error);
            return [];
        }
    }

    /**
     * Close a modal
     * @param locator Playwright Locator for the close button
     */
    static async closeModal(locator: Locator): Promise<void> {
        try {
            await expect(locator).toBeVisible();
            await locator.click();
            this.log('closeModal', locator, true);
        } catch (error) {
            this.handleError('closeModal', locator, error);
        }
    }

    /**
     * Handle browser alert dialogs
     * @param page Playwright Page instance
     * @param action Accept or dismiss the alert
     * @param expectedText Expected alert text
     */
    static async handleAlert(page: Page, action: 'accept' | 'dismiss', expectedText?: string): Promise<void> {
        page.on('dialog', async dialog => {
            if (expectedText) {
                expect(dialog.message()).toContain(expectedText);
            }
            if (action === 'accept') {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }

    /**
     * Upload a file to a file input
     * @param locator Playwright Locator for the file input
     * @param filePath Path to the file to upload
     */
    static async uploadFile(locator: Locator, filePath: string): Promise<void> {
        try {
            await expect(locator).toBeVisible();
            await locator.setInputFiles(filePath);
            this.log('uploadFile', locator, true, `File: ${filePath}`);
        } catch (error) {
            this.handleError('uploadFile', locator, error);
        }
    }


}