/// <reference types='cypress' />

// import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Given("I am on empty home page", () => {
//   cy.visit("/");
// });

// When("I type and submit in the board name", () => {
//   cy.get("[data-cy=first-board]").type("new board{enter}");
// });

// Then("I should be redirected to the board detail", () => {
//   cy.location("pathname").should("match", /\/board\/\d/);
// });

//First Scenario
// Scenario: Navigate to Job Offering Page
// Given I open the search page
// When I click on a job card
// Then I should be redirected to the job offering page

const jobId = '02f2c362-0548-41f8-b3b9-c9b24c0e43c6'
beforeEach(() => {
    cy.loginAsStudent("yugioh@student.chula.ac.th", "root1234")
})

// Scenario: Cancel the Offer
Given("I am on the job offering page", () => {
    cy.visit("/offer/" + jobId)
})

When("I click on the cancel button", () => {
    cy.get("#cancelButton").click()
})

And("I click on the confirm button within the confirmation modal", () => {
    cy.get("#dangerButton").click()
})

Then("the page should be closed", () => {
    return
})

// Scenario: Close the Confirmation Modal
And("I click on the cancel button within the confirmation modal", () => {
    cy.get("#dangerButton").click()
})

Then("the modal should be closed without making any changes to the job offering page", () => {
    cy.get('#closeModal').should('not.be.visible');
})

