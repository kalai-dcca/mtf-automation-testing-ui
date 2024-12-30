Feature: Admin User Management
  As a user
  I want to manage users in the Admin page
  So that I can give users admin access

  @wip
  Scenario Outline: Add user
    Given TestCaseDataSetup-"data", File-"demoOrangeHrmTestData.xlsx", Sheet-"Add-User", TestCase-"<TestCaseId>"
    Given I login with a valid User
    When I navigate to the Admin page
    When I add a system user
    Examples:
      | TestCaseId |
      | C-TC001    |

