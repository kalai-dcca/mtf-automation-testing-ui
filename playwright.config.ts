import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Define BDD configuration
const testDir = defineBddConfig({
   features: 'src/tests/**/features/', // Path to feature files
   steps: 'src/tests/**/steps/', // Path to step definition files
   importTestFrom: 'src/fixtures.ts', // Optional: Shared fixtures
});

export default defineConfig({
   testDir,
   timeout: 60000, // Set maximum test run time to 60 seconds
   expect: {
      timeout: 10000, // Expected condition wait times set to 10 seconds
   },

   // Parallel test execution
   fullyParallel: false,
   workers: 4, // Number of parallel workers

   // Retries for flaky tests
   retries: 2, // Retries tests up to 2 times if they fail

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
         slowMo: 50, // Add a delay for debugging (optional)
      },
   },

   // Cross-browser testing
   projects: [
      {
         name: 'Chromium',
         use: { ...devices['Desktop Chrome'] }, // Desktop Chrome configuration
      },
      // Uncomment these blocks if you want to add more browsers
      // {
      //   name: 'Firefox',
      //   use: { ...devices['Desktop Firefox'] },
      // },
      // {
      //   name: 'Webkit',
      //   use: { ...devices['Desktop Safari'] },
      // },
   ],

   // Reporters
   reporter: [
      ['list'], // Console output
      ['html', { outputFolder: 'reports/html-report', open: 'never' }], // HTML report
      ['json', { outputFile: 'reports/report.json' }], // JSON report
      ['junit', { outputFile: 'reports/junit-report.xml' }], // JUnit report
   ],

   // Optional global setup and teardown (commented out for now)
   // globalSetup: require.resolve('./global-setup'),
   // globalTeardown: require.resolve('./global-teardown'),
});
