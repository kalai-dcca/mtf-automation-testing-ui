Feature: Verify The Swich Tabs Function

  @wip3
  Scenario: Verify The Swich Tabs Function
     Given I navigate to the login page
     And  verify the first page title
     When switch to the new tab
     Then verify the second page title
 