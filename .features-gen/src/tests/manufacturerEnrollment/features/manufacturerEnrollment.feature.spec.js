// Generated from: src\tests\manufacturerEnrollment\features\manufacturerEnrollment.feature
import { test } from "../../../../../src/fixtures.ts";

test.describe('Main menu Search functionality', () => {

  test.describe('Search test', () => {

    test('Example #1', { tag: ['@manufacturer', '@search'] }, async ({ Given, page, homePage, When, searchPage, Then }) => { 
      await Given('I login with a valid User', null, { page, homePage }); 
      await When('I enter "Leave" in the search box', null, { searchPage }); 
      await Then('I should see the matching results having "Leave"', null, { searchPage }); 
    });

    test('Example #2', { tag: ['@manufacturer', '@search'] }, async ({ Given, page, homePage, When, searchPage, Then }) => { 
      await Given('I login with a valid User', null, { page, homePage }); 
      await When('I enter "admin" in the search box', null, { searchPage }); 
      await Then('I should see the matching results having "admin"', null, { searchPage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('src\\tests\\manufacturerEnrollment\\features\\manufacturerEnrollment.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":14,"tags":["@manufacturer","@search"],"steps":[{"pwStepLine":9,"gherkinStepLine":9,"keywordOrig":"Given ","keywordType":"Context","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":10,"keywordOrig":"When ","keywordType":"Action","stepMatchArguments":[{"group":{"start":8,"value":"\"Leave\"","children":[{"start":9,"value":"Leave","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordOrig":"Then ","keywordType":"Outcome","stepMatchArguments":[{"group":{"start":41,"value":"\"Leave\"","children":[{"start":42,"value":"Leave","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":15,"tags":["@manufacturer","@search"],"steps":[{"pwStepLine":15,"gherkinStepLine":9,"keywordOrig":"Given ","keywordType":"Context","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":10,"keywordOrig":"When ","keywordType":"Action","stepMatchArguments":[{"group":{"start":8,"value":"\"admin\"","children":[{"start":9,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":11,"keywordOrig":"Then ","keywordType":"Outcome","stepMatchArguments":[{"group":{"start":41,"value":"\"admin\"","children":[{"start":42,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end