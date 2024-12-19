import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
   features: 'src/features/',
   steps: 'src/steps/',
   importTestFrom: 'src/fixtures.ts',
});

export default defineConfig({
   testDir,
   timeout: 30_000,
   use: {
      viewport: { width: 1980, height: 1080 },
      trace: 'on',
      screenshot: 'on',
      launchOptions: {
         slowMo: 1000,
      },
   },
   reporter: [['html', { outputFolder: 'reports' }]],
});
