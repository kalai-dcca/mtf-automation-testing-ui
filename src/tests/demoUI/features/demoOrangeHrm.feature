Feature: Main menu Search functionality
  As a user
  I want to search for items in the main menu
  So that I can quickly find relevant results

  @wip
  Scenario Outline: Search test
    Given TestCaseDataSetup-"data", File-"demoOrangeHrmTestData.xlsx", Sheet-"Add-User", TestCase-"<TestCaseId>"
    Examples:
      | TestCaseId |
      | C-TC001    |
