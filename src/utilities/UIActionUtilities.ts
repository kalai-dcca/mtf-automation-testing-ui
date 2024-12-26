import { error } from 'console';
import { stat } from 'fs';
import { Page, Locator, expect } from 'playwright/test';

export enum FunctionType{
    FIND_ELEMENT_CLICK,
    INPUT_TEXT_FIELD,
    VERIFY_ELEMENT_TEXT_VALUE,
    VERIFY_ELEMENT_VISIBILITY,
    WAIT_FOR_VISIBILITY,
    DROPDOWN_SELECT,
    DROPDOWN_SELECT_IGNORE_CASE,
    SCROLL_TO_ELEMENT
} 


export class UIActionUtilities{
    constructor(private page: Page){}

    private static print(
        functionType: FunctionType,
        status: boolean,
        locator: Locator,
        text: string | null = null
        ): void { 
       const element = locator.toString(); const timestamp = new Date().toISOString();
        console.log(
        `[${timestamp}] [${functionType}] Element: ${element}, Status: ${status}, Text: ${text ?? 'N/A'}`
        ); 
       } 
       private static error(
        functionType: FunctionType,
        status: boolean,
        locator: Locator,
        error: Error
        ): void { 
       const element = locator.toString(); 
       const timestamp = new Date().toISOString(); 
       console.error( 
       `[${timestamp}] [${functionType}] Element: ${element}, Status: ${status}, Error:`,
        error
        );
        } 
    

    /**
     * Function to find an element and click
     * @param Locator
     * @returns 
     */    
    async findElementClick(Locator: Locator): Promise<boolean>{
        try{
            await expect(Locator).toBeVisible({timeout:30,visible:true});
            await Locator.click();
            UIActionUtilities.print(FunctionType.FIND_ELEMENT_CLICK,true,Locator);
            return true;
        }catch (error){
            UIActionUtilities.error(FunctionType.FIND_ELEMENT_CLICK,false,Locator,error);
            return false;
        }
    }


    /**
     * Function to check if element is Displayed
     * @param Locator 
     * @returns 
     */
    async isElementVisible(Locator: Locator): Promise<boolean>{
        try{
            await expect(Locator).toBeVisible({timeout:30,visible:true});
            UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_VISIBILITY,true,Locator);
            return true;
        }catch (error){
            UIActionUtilities.error(FunctionType.VERIFY_ELEMENT_VISIBILITY,false,Locator,error);
            return false;
        }
    }


    /**
     * Function to Input text into Field element
     * @param Locator 
     * @param text 
     * @returns 
     */
    async inputElement(Locator: Locator, text: string): Promise<boolean>{
        try{
            await expect(Locator).toBeVisible({timeout:30,visible:true});
            await Locator.fill(text);
            UIActionUtilities.print(FunctionType.INPUT_TEXT_FIELD,true,Locator,text);
            return true;
        }catch (error){
            UIActionUtilities.error(FunctionType.INPUT_TEXT_FIELD,false,Locator,error);
            return false;
        }
    }


    /**
     * Function to verify element text value
     * @param Locator 
     * @param expected 
     * @returns 
     */
    async verifyElementText(Locator: Locator, expected: string): Promise<boolean>{
        try{
            await expect(Locator).toBeVisible({timeout:30,visible:true});
            await expect(Locator).toHaveText(expected);
            UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_TEXT_VALUE,true,Locator,expected);
            return true;
        }catch (error){
            UIActionUtilities.error(FunctionType.VERIFY_ELEMENT_TEXT_VALUE,false,Locator,error);
            return false;
        }
    }


    /**
     * Function to Scroll to an Element
     * @param Locator 
     */
    async scrollToElement(Locator: Locator ) : Promise<boolean>{
        try{
            await expect(Locator).toBeVisible({timeout:30,visible:true});
            await Locator.scrollIntoViewIfNeeded();
            UIActionUtilities.print(FunctionType.SCROLL_TO_ELEMENT,true,Locator);
            return true; 
        } catch (error){
            UIActionUtilities.error(FunctionType.SCROLL_TO_ELEMENT,false,Locator,error);
            return false;
        }
    }


    /**
     * Function to Wait for Visibility of the Element
     * @param Locator 
     * @param timeout 
     * @returns 
     */
    async waitForVisibility(Locator: Locator, timeout: number = 30000): Promise<boolean>{
        try{
            await Locator.waitFor({state: 'visible',timeout})
            UIActionUtilities.print(FunctionType.WAIT_FOR_VISIBILITY,true,Locator);
            return true; 
        } catch (error){
            UIActionUtilities.error(FunctionType.WAIT_FOR_VISIBILITY,false,Locator,error);
            return false;
        }
    }

    /**
     * Log the status of an action
     * @param actionName The name of the action being logged
     * @param locator The Playwright locator used for the action
     * @param status Whether the action succeeded or failed
     * @param message Optional additional information
     */
    private log(actionName: string, locator: Locator, status: boolean, message: string = ''): void {
        console.log(`[${actionName}] Locator: ${locator.toString()}, Status: ${status}, Message: ${message}`);
    }

    /**
     * Handle errors during actions
     * @param actionName The name of the action being logged
     * @param locator The Playwright locator used for the action
     * @param error The error that occurred
     */
    private handleError(actionName: string, locator: Locator, error: any): void {
        console.error(`[${actionName}] Locator: ${locator.toString()}, Error: ${error.message}`);
        throw error; // Re-throw error to fail the test
    }

     /**
     * Select an option from a dropdown, with optional case-insensitivity
     * @param locator Playwright Locator for the dropdown
     * @param value Value to select
     * @param ignoreCase Whether to ignore case sensitivity (default: false)
     */
     async dropdownSelect(locator: Locator, value: string, ignoreCase: boolean = false): Promise<void> {
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
    async selectDropdownOptionByPartialText(locator: Locator, partialText: string): Promise<void> {
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
    async toggleCheckbox(locator: Locator, shouldCheck: boolean): Promise<void> {
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
    async selectRadioButton(locator: Locator, value: string): Promise<void> {
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
    async getTableData(tableLocator: Locator): Promise<string[][]> {
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
    async closeModal(locator: Locator): Promise<void> {
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
     * @param action Accept or dismiss the alert
     * @param expectedText Expected alert text
     */
    async handleAlert(action: 'accept' | 'dismiss', expectedText?: string): Promise<void> {
        this.page.on('dialog', async dialog => {
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
    async uploadFile(locator: Locator, filePath: string): Promise<void> {
        try {
            await expect(locator).toBeVisible();
            await locator.setInputFiles(filePath);
            this.log('uploadFile', locator, true, `File: ${filePath}`);
        } catch (error) {
            this.handleError('uploadFile', locator, error);
        }
    }


}