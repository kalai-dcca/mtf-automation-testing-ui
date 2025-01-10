
Feature: Login Functionality
  @login @valid_login @regression_all
  Scenario: Login with valid credentials
    Given I navigate to the login page
    When I login with valid credentials
    Then I should see the dashboard

  @login @negative_login @regression_all
  Scenario Outline: Login negative tests
    Given I navigate to the login page
    When I login with "<username>" username and "<password>" password
    Then I validate that "<expected_result>" is displayed on the page
    Examples:
      | username | password | expected_result     |
      | invalid  | invalid  | Invalid credentials |
      | Admin    |          | Required            |
      |          | admin123 | Required            |