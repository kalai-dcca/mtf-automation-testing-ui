Feature: Verify navigation options under My Info
  As a user,
  I want to verify that all navigation options under "My Info" are displayed correctly
  So that I can ensure the application provides the correct options.

  @myInfo @regression_all
  Scenario: Verify navigation options under My Info
    Given I navigate to the login page
    And I login with valid credentials
    And I navigate to the "My Info" section
    Then the following navigation options should be displayed:
      | Option Name        |
      | Personal Details   |
      | Contact Details    |
      | Emergency Contacts |
      | Dependents         |
      | Immigration        |
      | Job                |
      | Salary             |
      | Report-to          |
      | Qualifications     |
      | Memberships        |
