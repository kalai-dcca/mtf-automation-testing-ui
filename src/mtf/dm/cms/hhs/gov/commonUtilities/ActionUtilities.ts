import { Page, Locator, expect } from 'playwright/test';

export class ActionUtilities{

    constructor(private page: Page){
        this.page = page;
    }


    private static log(actionName: string, locator: Locator, status: boolean, message: string = ''): void {
        console.log(`[${actionName}] Locator: ${locator.toString()}, Status: ${status}, Message: ${message}`);
    }

    private static logWithNoElement(actionName: string, status: boolean, message: string = ''): void {
        console.log(`[${actionName}] , Status: ${status}, Message: ${message}`);
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

    private static handleWithNoElementError(actionName: string, error: any): void {
        console.error(`[${actionName}], Error: ${error.message}`);
        throw error; // Re-throw error to fail the test
    }

    /**
     * Presses a key on the keyboard
     * @param locator 
     * @param key 
     */
    static async pressKey(locator: Locator, key: string): Promise<void>{
        try{
            await locator.press(key);
            this.log(`Action: Press on a Key[${key}]`, locator, true);
        }catch (error){
            this.handleError(`Action: Press on a Key[${key}]`, locator, error);
        }
    }

    /**
     * Focuses on an element specified by the locator.
     * @param locator 
     */
    static async focus(locator: Locator): Promise<void>{
        try{
            await locator.focus();
            this.log(`Action: Focus on an element`, locator, true);
        }catch (error){
            this.handleError(`Action: Focus on an element`, locator, error);
        }
    }

    /**
     * Clears the text in an input field specified by the locator
     * @param locator 
     */
    static async clearText(locator: Locator): Promise<void>{
        try{
            await locator.fill('');
            this.log(`Action: Clear element text`, locator, true);
        }catch (error){
            this.handleError(`Action: Clear element text`, locator, error);
        }
    }

    /**
     * Hovers over the element specified by the locator
     * @param locator 
     */
    static async hover(locator: Locator): Promise<void>{
        try{
            await locator.hover();
            this.log(`Action: Hover over the element`, locator, true);
        }catch (error){
            this.handleError(`Action: Hover over the element`, locator, error);
        }
    }


    /**
     * Gets the text content of the element specified by the locator
     * @param locator 
     * @returns 
     */
    static async getTextContext(locator: Locator): Promise<string>{
        try{
            await locator.textContent() != null
            this.log(`Action: Focus on an element`, locator, true);
            return await locator.textContent() || '';
        }catch (error){
            this.handleError(`Action: Hover over the element`, locator, error);
            throw error;
        }
    }

    /**
     * Performs a click and hold action on the element
     * @param page 
     * @param locator 
     */
    static async clickAndHold(page: Page, locator: Locator): Promise<void>{
        try{
            const box = await locator.boundingBox();
            if(box){
                await page.mouse.move(box.x + box.width / 2, box.y + box.height/2);
                await page.mouse.down();
                this.log(`Action: Click and hold the element`, locator, true);
            }
        }catch (error){
            this.handleError(`Action: Click and hold the element`, locator, error);
        }
    }

    /**
     * Performs a drag-and-drop action from source to target element
     * @param sourceLocator 
     * @param targetLocator 
     */
    static async dragAndDrop(sourceLocator: Locator, targetLocator: Locator): Promise<void>{
        try{
            await sourceLocator.dragTo(targetLocator);
            this.log(`Action: Drag and Drop`, targetLocator, true);
        }catch (error){
            this.handleError(`Action: Drag and Drop`, targetLocator, error);
        }
    }

    /**
     * Performs a double-click on an element
     * @param locator 
     */
    static async doubleClick(locator: Locator): Promise<void>{
        try{
            await locator.dblclick();
            this.log(`Action: Double click an element`, locator, true);    
        }catch (error){
            this.handleError(`Action: Double click an element`, locator, error);
        }
    }

    /**
     * Simulates a Key Down action
     * @param page 
     * @param key 
     */
    static async keyDown(page: Page, key: string): Promise<void>{
        try{
            await page.keyboard.down(key);
            this.logWithNoElement(`Action: Key DOWN: [${key}]`, true);
        }catch (error){
            this.handleWithNoElementError(`Action: Key DOWN: [${key}]`, error);
        }
    }

    /**
     * Simulates a Key Up action
     * @param page 
     * @param key 
     */
    static async keyUp(page: Page, key: string): Promise<void>{
        try{
            await page.keyboard.up(key);
            this.logWithNoElement(`Action: Key Up: [${key}]`, true);
        }catch (error){
            this.handleWithNoElementError(`Action: Key UP: [${key}]`, error);
        }
    }

    /**
     * Release the mouse button
     * @param page 
     */
    static async release(page: Page): Promise<void>{
        try{
            await page.mouse.up();
            this.logWithNoElement(`Action: Release mouse`, true);
        }catch (error){
            this.handleWithNoElementError(`Action: Release mouse`, error);
        }
    }


}