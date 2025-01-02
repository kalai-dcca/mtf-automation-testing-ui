Feature: Main menu Search functionality
  As a user
  I want to search for items in the main menu
  So that I can quickly find relevant results

  @search @regression_all
  Scenario Outline: Search test
    Given I navigate to the login page
    And I login with valid credentials
    When I enter "<keyword>" in the search box
    Then I should see the matching results having "<keyword>"

    Examples:
<<<<<<< HEAD
    |keyword|
    |Leave|
    |Admin|

=======
      | keyword |
      | Leave   |
      | Admin   |
>>>>>>> main
