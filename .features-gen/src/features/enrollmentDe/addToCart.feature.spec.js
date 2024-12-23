// Generated from: src\features\enrollmentDe\addToCart.feature
import { test } from "../../../../src/fixtures.ts";

test.describe('Products', () => {

  test('Add to cart', async ({ Given, loginPage, When, Then, homePage, And, productsPage }) => { 
    await Given('I navigate to the login page', null, { loginPage }); 
    await When('I enter valid credentials', null, { loginPage }); 
    await Then('I should see the dashboard', null, { homePage }); 
    await And('I add "Sauce Labs Backpack" to cart', null, { productsPage }); 
    await And('I add "Sauce Labs Bolt T-Shirt" to cart', null, { productsPage }); 
    await And('I add "Sauce Labs Fleece Jacket" to cart', null, { productsPage }); 
    await And('I checkout Products', null, { productsPage }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('src\\features\\enrollmentDe\\addToCart.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordOrig":"Given ","keywordType":"Context","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordOrig":"When ","keywordType":"Action","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordOrig":"Then ","keywordType":"Outcome","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordOrig":"And ","keywordType":"Outcome","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Backpack\"","children":[{"start":7,"value":"Sauce Labs Backpack","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordOrig":"And ","keywordType":"Outcome","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bolt T-Shirt\"","children":[{"start":7,"value":"Sauce Labs Bolt T-Shirt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":9,"keywordOrig":"And ","keywordType":"Outcome","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Fleece Jacket\"","children":[{"start":7,"value":"Sauce Labs Fleece Jacket","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":10,"keywordOrig":"And ","keywordType":"Outcome","stepMatchArguments":[]}]},
]; // bdd-data-end