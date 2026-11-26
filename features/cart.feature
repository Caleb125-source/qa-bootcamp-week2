Feature: Shopping cart
  A shopper collects the products they want in a cart before checking out.

  Scenario: A shopper adds a product to an empty cart
    Given the shopper has an empty cart
    When the shopper adds 2 "Combination Pliers" to the cart
    Then the cart holds 2 "Combination Pliers" and nothing else
