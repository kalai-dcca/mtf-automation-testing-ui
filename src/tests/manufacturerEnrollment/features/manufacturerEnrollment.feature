@manufacturer
Feature: Main menu Search functionality
  As a user
  I want to search for items in the main menu
  So that I can quickly find relevant results

  @search
  Scenario Outline: Search test
    Given I login with a valid User
    When I enter "<keyword>" in the search box
    Then I should see the matching results having "<keyword>"
    Examples:
    |keyword|
    |Leave|
    |Admin|
