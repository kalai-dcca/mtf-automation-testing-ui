Feature: Products

  Scenario: Add to cart
    Given I navigate to the login page
    When I enter valid credentials
    Then I should see the dashboard
    And I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Bolt T-Shirt" to cart
    And I add "Sauce Labs Fleece Jacket" to cart
    And I checkout Products
    