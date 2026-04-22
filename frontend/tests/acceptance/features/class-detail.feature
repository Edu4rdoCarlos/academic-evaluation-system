Feature: Class Detail — Enrollment and Evaluation
  As an administrator
  I want to manage enrollments and evaluations within a class
  So that I can track each student's learning progress

  Background:
    Given I am logged in as the admin
    And I navigate to the classes page
    And I open the detail page for class "Estrutura de Dados"

  Scenario: Enrolled students are listed in the class
    Then I should see "Ana Lima" in the enrolled students list

  Scenario: Enrolling a student adds them to the enrolled list
    Given "Diego Ferreira" is not enrolled in the current class
    When I open the enroll student dialog
    And I select the student "Diego Ferreira" to enroll
    And I confirm the enrollment
    Then I should see "Diego Ferreira" in the enrolled students list

  Scenario: Unenrolling a student removes them from the enrolled list
    Given "Bruno Souza" is enrolled in the current class
    When I unenroll the student "Bruno Souza"
    Then I should not see "Bruno Souza" in the enrolled students list

  Scenario: Setting an evaluation concept is reflected in the grid
    When I set the concept "MA" for student "Ana Lima" and goal "Requisitos"
    Then the concept for "Ana Lima" and "Requisitos" should be "MA"
