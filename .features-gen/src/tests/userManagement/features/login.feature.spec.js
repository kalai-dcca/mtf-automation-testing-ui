// Generated from: src\tests\userManagement\features\login.feature
import { test } from "../../../../../src/fixtures.ts";

test.describe('Login functionality', () => {

  test('Successful login', { tag: ['@login'] }, async ({ Given, loginPage, When, Then, homePage }) => { 
    await Given('I navigate to the login page', null, { loginPage }); 
    await When('I enter valid credentials', null, { loginPage }); 
    await Then('I should see the dashboard', null, { homePage }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('src\\tests\\userManagement\\features\\login.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@login"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordOrig":"Given ","keywordType":"Context","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordOrig":"When ","keywordType":"Action","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordOrig":"Then ","keywordType":"Outcome","stepMatchArguments":[]}]},
]; // bdd-data-end