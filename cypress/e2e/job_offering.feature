Feature: Job Offering functionality

    Scenario: Navigate to job offering page
        Given open search page
        When click on a job card
        Then rediredcted to the job offering page

    Scenario: verify offering form can be submit
        Given open job offering page
        When input offer price as number
        And input a TOR file in pdf format up to 5 MB size.
        And click submit an offer
        Then the uploaded TOR file and offered price should show on the page

    Scenario: exceed file size on TOR file input
        Given open job offering page
        When input offer price as number
        And input a TOR file in pdf format exceed 5 MB size
        Then the TOR file input should not allow to use the file and warn user

    Scenario: type string on offer price input
        Given open job offering page
        When input offer price as string
        Then nothing should happen to the input