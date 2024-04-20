Scenario: Navigate to Job Offering Page
    Given I open the search page
    When I click on a job card
    Then I should be redirected to the job offering page

Scenario: Cancel the Offer
    Given I am on the job offering page
    When I click on the cancel button
    And I click on the confirm button within the confirmation modal
    Then the page should be closed

Scenario: Close the Confirmation Modal
    Given I am on the job offering page
    When I click on the cancel button
    And I click on the cancel button within the confirmation modal
    Then the modal should be closed without making any changes to the job offering page

Scenario: Verify Offering Form Submission
    Given I am on the job offering page
    When I input the offer price as a number
    And I upload a TOR file in PDF format, up to 5 MB in size
    And I submit the offer
    Then the uploaded TOR file and offered price should be displayed on the page

Scenario: Offer Price is Missing
    Given I am on the job offering page
    When I attempt to submit an offer without specifying the offer price
    Then the offering form should not allow submission

Scenario: Exceed File Size Limit on TOR File Input
    Given I am on the job offering page
    When I input the offer price as a number
    And I attempt to upload a TOR file in PDF format exceeding 5 MB in size
    Then the TOR file input should not accept the file and warn the user

Scenario: Input String on Offer Price Input
    Given I am on the job offering page
    When I input a string in the offer price field
    Then there should be no change to the input

Scenario: Attempt to Offer a Job Already Offered
    Given I am on the job offering page for a job I have already offered
    Then the offering form should not be displayed
