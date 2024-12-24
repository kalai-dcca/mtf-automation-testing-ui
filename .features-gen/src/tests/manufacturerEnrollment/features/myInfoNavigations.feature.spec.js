// Generated from: src\tests\manufacturerEnrollment\features\myInfoNavigations.feature
import { test } from "../../../../../src/fixtures.ts";

test.describe('Verify navigation options under My Info', () => {

  test('Verify navigation options under My Info', { tag: ['@myInfo'] }, async ({ Given, page, homePage, And, Then }) => { 
    await Given('I login with a valid User', null, { page, homePage }); 
    await And('I navigate to the "My Info" section', null, { page }); 
    await Then('the following navigation options should be displayed:', {"dataTable":{"rows":[{"cells":[{"value":"Option Name"}]},{"cells":[{"value":"Personal Details"}]},{"cells":[{"value":"Contact Details"}]},{"cells":[{"value":"Emergency Contacts"}]},{"cells":[{"value":"Dependents"}]},{"cells":[{"value":"Immigration"}]},{"cells":[{"value":"Job"}]},{"cells":[{"value":"Salary"}]},{"cells":[{"value":"Report-to"}]},{"cells":[{"value":"Qualifications"}]},{"cells":[{"value":"Memberships"}]}]}}, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('src\\tests\\manufacturerEnrollment\\features\\myInfoNavigations.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@myInfo"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordOrig":"Given ","keywordType":"Context","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordOrig":"And ","keywordType":"Context","stepMatchArguments":[{"group":{"start":18,"value":"\"My Info\"","children":[{"start":19,"value":"My Info","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":10,"keywordOrig":"Then ","keywordType":"Outcome","stepMatchArguments":[]}]},
]; // bdd-data-end