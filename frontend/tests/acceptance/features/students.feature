Feature: Student Management
  As an administrator
  I want to manage students
  So that I can keep the student registry up to date

  Background:
    Given I am logged in as the admin
    And I navigate to the students page

  Scenario: Students from the seed are listed in the table
    Then I should see "Ana Lima" in the students table

  Scenario: Creating a student with valid data adds them to the table
    When I open the new student dialog
    And I fill in the student name with "Novo Aluno Teste"
    And I fill in the student CPF with a unique value
    And I fill in the student email with "novo.aluno@teste.edu"
    And I submit the student form
    Then I should see "Novo Aluno Teste" in the students table

  Scenario: Trying to create a student with an empty name shows a validation error
    When I open the new student dialog
    And I submit the student form
    Then I should see a validation error in the student form

  Scenario: Editing a student updates their name in the table
    When I open the new student dialog
    And I fill in the student name with "Aluno Para Editar"
    And I fill in the student CPF with a unique value
    And I fill in the student email with "editar@teste.edu"
    And I submit the student form
    And I click the edit button for "Aluno Para Editar"
    And I clear the student name field and type "Aluno Editado"
    And I save the student form
    Then I should see "Aluno Editado" in the students table

  Scenario: Deleting a student removes them from the table
    When I open the new student dialog
    And I fill in the student name with "Aluno Para Deletar"
    And I fill in the student CPF with a unique value
    And I fill in the student email with "deletar@teste.edu"
    And I submit the student form
    And I click the delete button for "Aluno Para Deletar"
    And I confirm the deletion
    Then I should not see "Aluno Para Deletar" in the students table
