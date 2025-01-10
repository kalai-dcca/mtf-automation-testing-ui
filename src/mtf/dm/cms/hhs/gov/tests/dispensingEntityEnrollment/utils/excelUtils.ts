import * as XLSX from 'xlsx';

export class ExcelUtils {
    private workbook: XLSX.WorkBook;
    private sheet: XLSX.Sheet;

    constructor(filePath: string, sheetName: string) {
        this.workbook = XLSX.readFile(filePath);
        this.sheet = this.workbook.Sheets[sheetName];
        if (!this.sheet) {
            throw new Error(`Sheet: ${sheetName} does not exist in the file: ${filePath}`);
        }
    }

    async getAllDataFromRow(testCaseId: string): Promise<{ [key: string]: string }> {
        const rows: XLSX.WorkSheet = XLSX.utils.sheet_to_json(this.sheet, { header: 1 });
        const header = rows[0];
        const dataRow = rows.find((row: any[]) => row[0] === testCaseId);

        if (!dataRow) {
            throw new Error(`Row not found for test case: ${testCaseId}`);
        }

        const dataMap: { [key: string]: string } = {};
        header.forEach((key: string, index: number) => {
            dataMap[key] = dataRow[index]?.toString() || '';
        });

        return dataMap;
    }
}
