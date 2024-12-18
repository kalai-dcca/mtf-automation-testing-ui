// Generated from: src\features\userManagment\login.feature
import { test } from "../../../../src/fixtures.ts";

test.describe('Login functionality', () => {

  test('Successful login', async ({ Given, loginPage, When, Then, homePage }) => { 
    await Given('I navigate to the login page', null, { loginPage }); 
    await When('I enter valid credentials', null, { loginPage }); 
    await Then('I should see the dashboard', null, { homePage }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('src\\features\\userManagment\\login.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordOrig":"Given ","keywordType":"Context","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordOrig":"When ","keywordType":"Action","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordOrig":"Then ","keywordType":"Outcome","stepMatchArguments":[]}]},
]; // bdd-data-end