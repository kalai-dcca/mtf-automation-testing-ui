Feature: Swithing Tabs Functionality
  @swithingTabs @regression_all
Scenario: Swithing Tabs Functionality
    Given I navigate to the login page
    When I click on OrangeHRM, Inc link
    And I verify new tab title is "Human Resources Management Software | OrangeHRM"