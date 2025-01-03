Feature: Admin User Management
  As a user
  I want to manage users in the Admin page
  So that I can give users admin access

  @demo @regression_all
  Scenario Outline: Add user
    Given TestCaseDataSetup-"data", File-"demoOrangeHrmTestData.xlsx", Sheet-"Add-User", TestCase-"<TestCaseId>"
    Given I navigate to the login page
    And I login with valid credentials
    When I navigate to the Admin page
    When I add a system user
    Then I delete the user
    Examples:
      | TestCaseId |
      | C-TC001    |

