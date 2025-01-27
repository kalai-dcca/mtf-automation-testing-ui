import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Define BDD configuration
const testDir = defineBddConfig({
  features: 'src/mtf/dm/cms/hhs/gov/tests/**/features/', // Path to feature files
  steps: ['src/mtf/dm/cms/hhs/gov/tests/**/steps/', 'src/mtf/dm/cms/hhs/gov/commonUtilities/globalHooks.ts', 'src/mtf/dm/cms/hhs/gov/tests/**/util/hooks.ts'], // Path to step definition files
  importTestFrom: 'src/mtf/dm/cms/hhs/gov/fixtures.ts', // Optional: Shared fixtures
});

export default defineConfig({
   testDir,
   timeout: 60*1000, // Set maximum test run time to 60 seconds
   expect: {
      timeout: 10*1000, // Expected condition wait times set to 10 seconds
   },

   // Parallel test execution
   fullyParallel: false,
   workers: 1, // Number of parallel workers

   // Retries for flaky tests
   retries: 1, // Retries tests up to 2 times if they fail

   // Shared test configuration
   use: {
      headless: false, // Run tests in headless mode
      viewport: { width: 1980, height: 1080 }, // Define screen resolution
      actionTimeout: 10000, // Action timeouts: 10 seconds
      navigationTimeout: 30000, // Navigation timeouts: 30 seconds
      trace: 'retain-on-failure', // Collect traces on failures
      screenshot: 'only-on-failure', // Capture screenshots for failed tests
      video: 'retain-on-failure', // Record video on failures
      ignoreHTTPSErrors: true, // Ignore HTTPS errors
      launchOptions: {
         slowMo: 100, // Add a delay for debugging (optional)
      },

   },


   // Cross-browser testing
   projects: [
      {
        name: 'Claims Tests',
        testMatch: 'claimsManagement/features/**/*', // Match only .feature files in the claims/features folder
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'Data Exchange Tests',
        testMatch: 'deIDR/features/**/*', // Match tests in the Data Exchange folder
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'Dispensing Entity Enrollment Tests',
        testMatch: 'tpseEnrollment/features/**/*', // Match tests in the Dispensing Entity Enrollment folder
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'Manufacturer Enrollment Tests',
        testMatch: 'manufacturer/features/**/*', // Match tests in the Manufacturer Enrollment folder
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'Reports Tests',
        testMatch: 'reports/features/**/*', // Match tests files in the Reports folder
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'Shared Tests',
        testMatch: 'example/features/**/*', // Match tests files in the Shared folder
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'User Management Tests',
        testMatch: 'userManagement/features/**/*', // Match tests files in the User Management folder
        use: { ...devices['Desktop Chrome'] },
      },
    ],
   

   // Reporters
   reporter: [
      ['list', { printSteps: true}], // Console output
      ['html', { outputFolder: 'reports/html-report', open: 'never' }], // HTML report
      ['json', { outputFile: 'reports/report.json' }], // JSON report
      ['junit', { outputFile: 'reports/junit-report.xml' }], // JUnit report
   ],
});
