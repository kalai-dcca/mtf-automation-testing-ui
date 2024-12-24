import { Page, Locator } from 'playwright/test';

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

   
    

    /**
     * Function to find an element and click
     * @param Locator
     * @returns 
     */    
    async findElementClick(Locator: Locator): Promise<boolean>{
        let status = false;
        try{
            if(await this.isElementVisible(Locator)){
                await Locator.click();
                status = true;
                UIActionUtilities.print(FunctionType.FIND_ELEMENT_CLICK,Locator,status);
                return status;
            }else{
                status = false;
            }
        } catch(error){
            UIActionUtilities.print(FunctionType.FIND_ELEMENT_CLICK,Locator,status);
            console.error(error);
            return status;
        }
        return status;
    }


    /**
     * Function to check if element is Displayed
     * @param Locator 
     * @returns 
     */
    async isElementVisible(Locator: Locator): Promise<boolean>{
        let status = false;
        try{
            await Locator.isVisible();
            status = true;
            UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_VISIBILITY,Locator,status);
            return status;
        } catch(error){
            UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_VISIBILITY,Locator,status);
            console.error(error);
        }
        return status;
    }

    async inputElement(Locator: Locator, text: string): Promise<boolean>{
        let status = false;
        try{
            if(await this.isElementVisible(Locator)){
                await Locator.fill(text);
                status = true;
                UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_VISIBILITY,Locator,status,text);
                return status;
            }else{
                status = false;
            }
        } catch(error){
            UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_VISIBILITY,Locator,status,text);
            console.error(error);
        }
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
        try{
            if(await this.isElementVisible(Locator)){
                const actual = await Locator.textContent();
                if(actual?.includes(expected)){
                    status = true;
                }
                UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_TEXT_VALUE,Locator,status,expected);
                return status;
            }else{
                status = false;
            }
        } catch(error){
            UIActionUtilities.print(FunctionType.VERIFY_ELEMENT_TEXT_VALUE,Locator,status,expected);
            console.error(error);
        }
        return status;
    }


    /**
     * Function to Scroll to an Element
     * @param Locator 
     */
    async scrollToElement(Locator: Locator){
        try{
            await Locator.scrollIntoViewIfNeeded();
            UIActionUtilities.print(FunctionType.SCROLL_TO_ELEMENT,Locator,true);
        }catch (error){
            UIActionUtilities.print(FunctionType.SCROLL_TO_ELEMENT,Locator,false);
            console.error(error);
        }
    }


    /**
     * Function to Wait for Visibility of the Element
     * @param Locator 
     * @param timeout 
     * @returns 
     */
    async waitForVisibility(Locator: Locator, timeout: number = 30000): Promise<boolean>{
        let status = false;
        try{
            await Locator.waitFor({state: 'visible',timeout});
            status = true;
            UIActionUtilities.print(FunctionType.WAIT_FOR_VISIBILITY,Locator,status);
        } catch(error){
            UIActionUtilities.print(FunctionType.WAIT_FOR_VISIBILITY,Locator,status);
            console.error(error);
        }
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
        try{
            await Locator.selectOption(expected);
            status = true;
            UIActionUtilities.print(FunctionType.DROPDOWN_SELECT,Locator,status);
        } catch(error){
            UIActionUtilities.print(FunctionType.DROPDOWN_SELECT,Locator,status);
            console.error(error);
        }
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
        try{
            const options = await Locator.locator('option').allTextContents();
            const match = options.find(o => o.toLowerCase() === expected.toLowerCase());
            if(match){
                await Locator.selectOption({label: match});
                status = true;
            }
            UIActionUtilities.print(FunctionType.DROPDOWN_SELECT_IGNORE_CASE,Locator,status);
        } catch(error){
            UIActionUtilities.print(FunctionType.DROPDOWN_SELECT_IGNORE_CASE,Locator,status);
            console.error(error);
        }
        return status;
    }



}