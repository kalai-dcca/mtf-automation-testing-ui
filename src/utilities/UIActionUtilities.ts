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
    async findElementClick(Locator: Locator | string): Promise<boolean>{
        if(typeof Locator === 'string'){
            Locator = this.page.locator(Locator);
        }
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
    async isElementVisible(Locator: Locator | string): Promise<boolean>{
        if(typeof Locator === 'string'){
            Locator = this.page.locator(Locator);
        }
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
    async inputElement(Locator: Locator | string, text: string): Promise<boolean>{
        if(typeof Locator === 'string'){
            Locator = this.page.locator(Locator);
        }
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
    async verifyElementText(Locator: Locator | string, expected: string): Promise<boolean>{
        if(typeof Locator === 'string'){
            Locator = this.page.locator(Locator);
        }
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
    async waitForVisibility(Locator: Locator | string, timeout: number = 30000): Promise<boolean>{
        if(typeof Locator === 'string'){
            Locator = this.page.locator(Locator);
        }
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
     * Function to select exact value from a dropdown
     * @param Locator 
     * @param expected 
     * @returns 
     */
    async dropdownSelect(Locator: Locator, expected: string): Promise<boolean>{
        try{
            await expect(Locator).toBeVisible({timeout:30,visible:true});
            await Locator.selectOption(expected);
            UIActionUtilities.print(FunctionType.DROPDOWN_SELECT,true,Locator);
            return true;
        } catch (error){
            UIActionUtilities.error(FunctionType.DROPDOWN_SELECT,false,Locator,error);
            return false;
        }
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
                UIActionUtilities.print(FunctionType.DROPDOWN_SELECT_IGNORE_CASE,true,Locator);
                return true;
            }else{
                throw new Error(`No match for: ${expected}`);
            }
        })
        .catch(e => UIActionUtilities.error(FunctionType.DROPDOWN_SELECT_IGNORE_CASE,false,Locator,e));
        return status;
    }



}