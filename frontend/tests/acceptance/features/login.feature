Feature: Authentication
  As a system administrator
  I want to log in to the system
  So that I can access the management dashboard

  Scenario: Successful login redirects to dashboard
    Given I am on the login page
    When I fill in the email field with "admin@sistema-provas.edu"
    And I fill in the password field with "admin123"
    And I click the submit button
    Then I should be redirected to the dashboard

  Scenario: Login fails with wrong credentials
    Given I am on the login page
    When I fill in the email field with "admin@sistema-provas.edu"
    And I fill in the password field with "wrongpassword"
    And I click the submit button
    Then I should remain on the login page
    And I should see an error message

  Scenario: Submitting with an invalid email shows a field validation error
    Given I am on the login page
    When I fill in the email field with "notanemail"
    And I fill in the password field with "admin123"
    And I click the submit button
    Then I should see an email validation error

  Scenario: Submitting with an empty password shows a field validation error
    Given I am on the login page
    When I fill in the email field with "admin@sistema-provas.edu"
    And I fill in the password field with ""
    And I click the submit button
    Then I should see a password validation error
