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

    private static print(functionType: FunctionType, locator: Locator, status: boolean, text: string | null = null): void{
        const element = locator.toString();
        console.log(`[${functionType}] Element: ${element}, Status: ${status}, Text: ${text ?? 'N/A'}`);
    }

    private static error(functionType: FunctionType, locator: Locator, status: boolean, error: any): void{
        const element = locator.toString();
        console.log(`[${functionType}] Element: ${element}, Status: ${status}, Error: ${error.message}`);
    }

   
    

    /**
     * Function to find an element and click
     * @param Locator
     * @returns 
     */    
    async findElementClick(Locator: Locator): Promise<boolean>{
        let status = false;
        await expect(Locator).toBeVisible()
            .then(() => Locator.click())
            .then(() => status = true)
            .then(() => UIActionUtilities.print(FunctionType.FIND_ELEMENT_CLICK,Locator,status))
            .catch(e => UIActionUtilities.error(FunctionType.FIND_ELEMENT_CLICK,Locator,status,e));
        return status;
    }


    /**
     * Function to check if element is Displayed
     * @param Locator 
     * @returns 
     */
    async isElementVisible(Locator: Locator): Promise<boolean>{
        let status = false;
        await expect(Locator).toBeVisible()
            .then(() => status = true)
            .then(() => UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_VISIBILITY,Locator,status))
            .catch(e => UIActionUtilities.error(FunctionType.VERIFY_ELEMENT_VISIBILITY,Locator,status,e));
        return status;
    }


    /**
     * Function to Input text into Field element
     * @param Locator 
     * @param text 
     * @returns 
     */
    async inputElement(Locator: Locator, text: string): Promise<boolean>{
        let status = false;
        await expect(Locator).toBeVisible()
            .then(() => Locator.fill(text))
            .then(() => status = true)
            .then(() => UIActionUtilities.print(FunctionType.INPUT_TEXT_FIELD,Locator,status))
            .catch(e => UIActionUtilities.error(FunctionType.INPUT_TEXT_FIELD,Locator,status,e));
        return status;
    }


    /**
     * Function to verify element text value
     * @param Locator 
     * @param expected 
     * @returns 
     */
    async verifyElementText(Locator: Locator, expected: string): Promise<boolean>{
        let status = false;
        await expect(Locator).toHaveText(expected)
            .then(() => status = true)
            .then(() => UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_TEXT_VALUE,Locator,status))
            .catch(e => UIActionUtilities.error(FunctionType.VERIFY_ELEMENT_TEXT_VALUE,Locator,status,e));
        return status;
    }


    /**
     * Function to Scroll to an Element
     * @param Locator 
     */
    async scrollToElement(Locator: Locator): Promise<boolean>{
        let status = false;
        await expect(Locator).toBeVisible()
            .then(() => Locator.scrollIntoViewIfNeeded())
            .then(() => UIActionUtilities.print(FunctionType.SCROLL_TO_ELEMENT,Locator,status))
            .catch(e => UIActionUtilities.error(FunctionType.SCROLL_TO_ELEMENT,Locator,e,status));
        return status;
    }


    /**
     * Function to Wait for Visibility of the Element
     * @param Locator 
     * @param timeout 
     * @returns 
     */
    async waitForVisibility(Locator: Locator, timeout: number = 30000): Promise<boolean>{
        let status = false;
        await Locator.waitFor({state: 'visible',timeout})
            .then(() => status = true)
            .then(() => UIActionUtilities.print(FunctionType.WAIT_FOR_VISIBILITY,Locator,status))
            .catch(e => UIActionUtilities.error(FunctionType.WAIT_FOR_VISIBILITY,Locator,e,status));
        return status;
    }


    /**
     * Function to select exact value from a dropdown
     * @param Locator 
     * @param expected 
     * @returns 
     */
    async dropdownSelect(Locator: Locator, expected: string): Promise<boolean>{
        let status = false;
        await expect(Locator).toBeVisible()
        .then(() => Locator.selectOption(expected))
        .then(() => status = true)
        .then(() => UIActionUtilities.print(FunctionType.DROPDOWN_SELECT,Locator,status))
        .catch(e => UIActionUtilities.error(FunctionType.DROPDOWN_SELECT,Locator,e,status));
        return status;
    }


    /**
     * Function to select value from dropdown ignore case
     * @param Locator 
     * @param expected 
     * @returns 
     */
    async dropdownSelectIgnoreCase(Locator: Locator, expected: string): Promise<boolean>{
        let status = false;

        await expect(Locator).toBeVisible()
        .then(async () => {
            const options = await Locator.locator('option').allTextContents();
            const match = options.find(o => o.toLowerCase() === expected.toLowerCase());
            if(match){
                await Locator.selectOption({label: match});
                status = true;
                UIActionUtilities.print(FunctionType.DROPDOWN_SELECT_IGNORE_CASE,Locator,status);
            }else{
                throw new Error(`No match for: ${expected}`);
            }
        })
        .catch(e => UIActionUtilities.error(FunctionType.DROPDOWN_SELECT_IGNORE_CASE,Locator,e,status));
        return status;
    }



}