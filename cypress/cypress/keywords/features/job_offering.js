/// <reference types="cypress" />

import { When, Then, And } from "cypress-cucumber-preprocessor/steps";

const jobId = '02f2c362-0548-41f8-b3b9-c9b24c0e43c6'
beforeEach(() => {
  cy.loginAsStudent("yugioh@student.chula.ac.th", "root1234")
})

// Scenario: Cancel the Offer
Given("I am on the job offering page", () => {
  cy.visit("http://localhost:3000/offer/" + jobId)
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

