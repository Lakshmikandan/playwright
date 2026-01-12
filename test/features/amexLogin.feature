@Sanity
Feature: Verify Example Website

  Scenario: Open Example page and verify title
    Given I open the example page
    Then I should see the title "American Express"
    And I click on the Login button