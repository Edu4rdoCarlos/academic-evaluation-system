@classes
Feature: Class Management
  As an administrator
  I want to manage classes
  So that I can organise students into groups

  Background:
    Given I am logged in as the admin
    And I navigate to the classes page

  Scenario: Classes from the seed are listed in the table
    Then I should see "Tópicos Avançados de LP1" in the classes table

  Scenario: Creating a class with valid data adds it to the table
    When I open the new class dialog
    And I fill in the class topic with "Turma Cucumber Teste"
    And I submit the class form
    Then I should see "Turma Cucumber Teste" in the classes table

  Scenario: Editing a class updates its topic in the table
    When I open the new class dialog
    And I fill in the class topic with "Turma Para Editar"
    And I submit the class form
    And I click the edit button for class "Turma Para Editar"
    And I clear the class topic field and type "Turma Editada"
    And I save the class form
    Then I should see "Turma Editada" in the classes table

  Scenario: Deleting a class removes it from the table
    When I open the new class dialog
    And I fill in the class topic with "Turma Para Deletar"
    And I submit the class form
    And I click the delete button for class "Turma Para Deletar"
    And I confirm the deletion
    Then I should not see "Turma Para Deletar" in the classes table
