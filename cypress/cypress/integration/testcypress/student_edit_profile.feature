Feature: Student Edit Profile
    
    Scenario: Edit Nothing
        Given I am on the profile page
        When I click on the edit button
        And I enter empty string into the description
        And I click on the confirm edit button within the edit modal
        Then the page should be closed

    Scenario: Valid profile picture, Valid portfolio file
        Given I am on the profile page
        When I click on the edit button
        And I enter a string1 into the description
        And I try to upload a valid profile picture
        And I try to upload a valid portfolio file
        And there must be no error message about portfolio file
        And there must be no error message about profile picture
        And I click on the confirm edit button within the edit modal
        Then the page should be closed

    Scenario: Wrong portfolio file type
        Given I am on the profile page
        When I click on the edit button
        And I enter a string2 into the description
        And I try to upload a portfolio file which is not pdf
        And there must an error message about invalid portfolio file
        And I click on the confirm edit button within the edit modal
        Then the page should be closed

    Scenario: Valid profile picture, Portfolio file size exceeding 10MB
        Given I am on the profile page
        When I click on the edit button
        And I enter empty string into the description
        And I try to upload a valid profile picture
        And I try to upload a portfolio file exceeding 10MB
        And there must an error message about invalid portfolio file
        And I click on the confirm edit button within the edit modal
        Then the page should be closed

    Scenario: Wrong profile picture type
        Given I am on the profile page
        When I click on the edit button
        And I enter empty string into the description
        And I try to upload a profile picture which is neither .jpg nor .png
        And there must an error message about invalid profile picture
        And I click on the confirm edit button within the edit modal
        Then the page should be closed

    Scenario: Profile picture size exceeding 5MB, Valid portfolio file
        Given I am on the profile page
        When I click on the edit button
        And I enter a string3 into the description
        And I try to upload a profile picture exceeding 5MB
        And I try to upload a valid portfolio file
        And there must an error message about invalid profile picture
        And I click on the confirm edit button within the edit modal
        Then the page should be closed

    Scenario: Wrong profile picture type, Wrong portfolio file type
        Given I am on the profile page
        When I click on the edit button
        And I enter a string2 into the description
        And I try to upload a profile picture which is neither .jpg nor .png
        And I try to upload a portfolio file which is not pdf
        And there must an error message about invalid profile picture
        And there must an error message about invalid portfolio file
        And I click on the confirm edit button within the edit modal
        Then the page should be closed

    Scenario: Profile picture size exceeding 5MB, Portfolio file size exceeding 10MB
        Given I am on the profile page
        When I click on the edit button
        And I enter empty string into the description
        And I try to upload a profile picture exceeding 5MB
        And I try to upload a portfolio file exceeding 10MB
        And there must an error message about invalid profile picture
        And there must an error message about invalid portfolio file
        And I click on the confirm edit button within the edit modal
        Then the page should be closed