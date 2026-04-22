Feature: Goal Management
  As an administrator
  I want to manage learning goals
  So that I can use them when evaluating students

  Background:
    Given I am logged in as the admin
    And I navigate to the goals page

  Scenario: Goals from the seed are listed in the table
    Then I should see "Requisitos" in the goals table

  Scenario: Creating a goal with a valid name adds it to the table
    When I open the new goal dialog
    And I fill in the goal name with "Objetivo Cucumber Teste"
    And I submit the goal form
    Then I should see "Objetivo Cucumber Teste" in the goals table

  Scenario: Trying to create a goal with an empty name shows a validation error
    When I open the new goal dialog
    And I submit the goal form
    Then I should see a validation error in the goal form

  Scenario: Deleting a goal removes it from the table
    When I open the new goal dialog
    And I fill in the goal name with "Objetivo Para Deletar"
    And I submit the goal form
    And I click the delete button for goal "Objetivo Para Deletar"
    And I confirm the deletion
    Then I should not see "Objetivo Para Deletar" in the goals table
