import { Given } from '../../../fixtures'; // Using fixtures for BDD integration
import { TestScenarioContext } from '../context/TestScenarioContext';
import { ExcelUtils } from '../utils/excelUtils';

Given(
    'TestCaseDataSetup-{string}, File-{string}, Sheet-{string}, TestCase-{string}',
    async ({}, dir: string, file: string, sheet: string, testCase: string) => {
        console.log('Received Parameters:', { dir, file, sheet, testCase });
  
        // Directly use the received parameters for setup
        const testCaseFile = `src/mtf/dm/cms/hhs/gov/tests/dispensingEntityEnrollment/${dir}/${file}`;
        const excelUtils = new ExcelUtils(testCaseFile, sheet);
        const testCaseData = await excelUtils.getAllDataFromRow(testCase);
  
        // Manually update the test scenario context
        TestScenarioContext.setTestCaseData(testCaseData);
        TestScenarioContext.setTestCaseID(testCase);
        TestScenarioContext.setSheet(sheet);
        // Log setup completion
        console.log('Test case data setup complete.');
    }
  );