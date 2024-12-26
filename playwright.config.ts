import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';



const testDir = defineBddConfig({
   features: 'src/tests/**/features/',      //Path to feature files
   steps: 'src/tests/**/steps/',            //Path to step definition files
   importTestFrom: 'src/fixtures.ts',       //Optional: Shared fictures
});

export default defineConfig({
   testDir: './',  //Path to the root test directory

   // Specify the test files to match - this will include all test files in the specified directories
   testMatch: [
      'tests/claims/**/*.feature',                       // Match all .ts  test files in Claims and its subdirectories                              //Command for running  npx playwright test tests/claims
      'tests/dataExchange/**/*.feature',                 // Match all .ts  test files in Data Exchange and its subdirectories                       //Command for running  npx playwright test tests/dataExchange
      'tests/dispensingEntityEnrollment/**/*.feature',   // Match all .ts  test files in Dispensing Entity Enrollment and its subdirectories        //Command for running  npx playwright test tests/dispensingEntityEnrollment
      'tests/manufacturerEnrollment/**/*.feature',       // Match all .ts  test files in Manufacturer Enrollment and its subdirectories             //Command for running  npx playwright test tests/manufacturerEnrollment
      'tests/userManagement/**/*.feature',               // Match all .ts  test files in User Management and its subdirectories                     //Command for running  npx playwright test tests/userManagement

   ],

   timeout: 60000,      //Set maximum test run time to 60 seconds
   expect: { timeout: 10000,  // Expected condition wait times set to 10 seconds
   },

   //Run tests in parallel 
   fullyParallel: true,

   // Parallel test execution
   workers: 4, // Number of parallel workers

   // Retries for flaky tests
   retries: 2, // Retries tests up to 2 times if they fail

   // Global setup and teardown
  // globalSetup: require.resolve('./global-setup'),
  //  globalTeardown: require.resolve('./global-teardown'), 

   // Shared test configuration
   use: {
   
   headless: false, // Run tests in headless mode
   viewport: { width: 1980, height: 1080 },  //Define screen resolution
   actionTimeout: 10, // Action timeouts: 1 seconds
   navigationTimeout: 30000, // Navigation timeouts: 3 seconds
   trace: 'retain-on-failure', // Collect traces on failures
   screenshot: 'only-on-failure', // Capture screenshots for all tests
   video: 'retain-on-failure', // Record video on failures
   ignoreHTTPSErrors: true, // Ignore HTTPS errors
   launchOptions: {
     slowMo: 50, // Add a delay for debugging (optional)
   },
 },

  // Cross-browser testing
 projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },      // npx playwright test  --project=Chromium      For running only with Chrome
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },     // npx playwright test  --project=Firefox      For running only with Firefox
    // },
    // {
    //   name: 'Webkit',
    //   use: { ...devices['Desktop Safari'] },      // npx playwright test  --project=Safari      For running only with Safari
    // },
 
  ],

   reporter: [
      ['list'], // Console output
      ['html', { outputFolder: 'reports/html-report', open: 'never' }], // HTML report
      ['json', { outputFile: 'reports/report.json' }], // JSON report
      ['junit', { outputFile: 'reports/junit-report.xml' }], // JUnit report
   ]
});
