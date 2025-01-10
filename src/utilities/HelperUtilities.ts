import { randomInt } from "crypto";

export class HelperUtilities{

    /**
     * Funciton to generate a random address
     * @returns 
     */
    static generateRandomAddress(): {
        street1: string;
        street2: string;
        city: string;
        state: string;
        zip: string;
        zipExt: string;
    }{
        const randomint = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const street1 = `${randomInt(100,9999)} Random St`;
        const street2 = randomInt(1,100) % 2 === 0 ? `${randomInt(100,999)} Apt ${randomInt(1,99)}` : '';
        const city = `City${randomInt(1,100)}`;
        const state = HelperUtilities.getRandomState().code;
        const zip = `${randomInt(10000,99999)}`;
        const zipExt = `${randomInt(1000,9999)}`;

        return {street1,street2,city,state,zip,zipExt};
    }

    /**
     * Function to generate random alphanumeric
     * @param length 
     * @returns 
     */
    static generateRandomAlphanumeric(length: number): string{
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({length},() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }


    /**
     * Function to generate random string
     * @returns 
     */
    static getRandomState(): {name: string, code: string} {
        const states = [
            {name: 'Alabama', code: 'AL'},
            {name: 'Alaska', code: 'AK'},
            {name: 'Arizona', code: 'AZ'},
            {name: 'Arkansas', code: 'AR'},
            {name: 'California', code: 'CA'},
            {name: 'Colorado', code: 'CO'},
            {name: 'Connecticut', code: 'CT'},
            {name: 'Delaware', code: 'DE'},
            {name: 'Florida', code: 'FL'},
            {name: 'Georgia', code: 'GA'}
            
        ];

        return states[Math.floor(Math.random() * states.length)]
    }


    /**
     * Function to get state text
     * @param code 
     * @returns 
     */
    static getStateText(code: string): string{
        const states: {[key: string]: string} = {
            AL: 'Alabama',
            AK: 'Alaska',
            AZ: 'Arizona',
            AR: 'Arkansas',
            CA: 'California',
            CO: 'Colorado',
            CT: 'Connecticut',
            DE: 'Delaware',
            FL: 'Florida',
            GA: 'Georgia'
        }
        return states[code.toUpperCase()] || "Invalid state code";
    }


    /**
     * Function to get state code
     * @param name 
     * @returns 
     */
    static getStateCode(name: string): string | null {
        const states = {
            Alabama: 'AL',
            Alaska: 'AK',
            Arizona: 'AZ',
            Arkansas: 'AR',
            California: 'CA',
            Colorado: 'CO',
            Connecticut: 'CT',
            Delaware: 'DE',
            Florida: 'FL',
            Georgia: 'GA'
        }
        return (Object.entries(states).find(([KeyboardEvent,value]) => KeyboardEvent.toLowerCase() === name.toLowerCase())?.[1] || null);
    }


    /**
     * Function to get current date
     * @returns 
     */
    static getCurrentDate(): string {
        return new Date().toISOString();
    }


    /**
     * Function to get past date
     * @param days 
     * @returns 
     */
    static getPastDate(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString();
    }


    /**
     * Function to get future date
     * @param days 
     * @returns 
     */
    static getFutureDate(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString();
    }




}