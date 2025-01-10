export class TestScenarioContext {
    private static testCaseData: { [key: string]: string } = {};
    private static testCaseID: string = '';
    private static sheet: string = '';

    static setTestCaseData(data: { [key: string]: string }): void {
        this.testCaseData = data;
    }

    static getTestCaseData(): { [key: string]: string } {
        return this.testCaseData;
    }

    static setTestCaseID(testCaseID: string): void {
        this.testCaseID = testCaseID;
    }

    static getTestCaseID(): string {
        return this.testCaseID;
    }

    static setSheet(sheet: string): void {
        this.sheet = sheet;
    }

    static getSheet(): string {
        return this.sheet;
    }
}
