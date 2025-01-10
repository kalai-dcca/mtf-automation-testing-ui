import { Before, After} from '../../../fixtures'

Before(async ({ testScenarioContext }) => {
   console.log('Before hook: this is from global hooks');
});

After(async ({ testScenarioContext }) => {
   console.log('After hook: this is from global hooks');
});


