/// <reference types="cypress" />

import 'cypress-file-upload'
import { When, Then, And } from "cypress-cucumber-preprocessor/steps";

const jobId = '02f2c362-0548-41f8-b3b9-c9b24c0e43c6'
const jobId2 = '893eddbc-4681-4feb-85e6-009dbdff003c'
const jobId3 = '59348134-a869-43e2-b0d8-7ba964f4e9de'
const userId = '41eb9848-68de-4fbd-a4f1-ceaae052aac3'
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


// Scenario: Verify Offering Form Submission (without uploaded file)
When("I input the offer price as a number", () => {
  cy.get('[name="bid"]').type(1500)
})

And("I submit the offer", () => {
  cy.get("#primaryButton").click()
})

Then("the offered price should be displayed on the page", () => {
  cy.wait(5000)
  cy.get('#noIncludedFile').should('contain.text', 'ไม่ได้แนบไฟล์สัญญา');
  cy.get('[name="bid"]').should('have.value', 1500)
})


// Scenario: Exceed File Size Limit on TOR File Input
Given("I am on the job offering page2", () => {
  cy.visit("http://localhost:3000/offer/" + jobId2)
})

When("I input the offer price as a number2", () => {
  cy.get('[name="bid"]').type(1500)
})

And("I attempt to upload a TOR file in PDF format exceeding 5 MB in size", () => {
  cy.get('#exceedMaxSize').should('be.visible').not()
  cy.get('#dropzone-file-0').attachFile('Pittinan.pdf')
})

Then("the TOR file input should not accept the file and warn the user", () => {
  cy.wait(1000)
  cy.get('#exceedMaxSize').should('be.visible')
})


// Scenario: Verify Offering Form Submission (with file uploaded)
And("I upload a TOR file in PDF format, up to 5 MB in size", () => {
  cy.get('#dropzone-file-0').attachFile('BG3.pdf')
})

And("I submit the offer", () => {
  cy.get("#primaryButton").click()
})

Then("the uploaded TOR file and offered price should be displayed on the page", () => {
  cy.wait(5000)
  cy.get('#includedFile').should('contain.text', 'ไฟล์สัญญาที่แนบไว้');
  cy.get('[name="bid"]').should('have.value', 1500)
})


// Scenario: Offer Price is Missing
Given("I am on the job offering page3", () => {
  cy.visit("http://localhost:3000/offer/" + jobId3)
})

When("I attempt to submit an offer without specifying the offer price", () => {
  cy.get("#primaryButton").click()
})

Then("the offering form should not allow submission and warn the user", () => {
  cy.get("#primaryButton").should('be.visible')
})


// Scenario: Input String on Offer Price Input
When("I input a string in the offer price field", () => {
  cy.get('[name="bid"]').type('พันห้าจ้า')
})

Then("there should be no change to the input", () => {
  cy.wait(1000)
  cy.get('[name="bid"]').should('be.empty')
  cy.get("#primaryButton").should('be.visible')
})


// Scenario: Input Negative Number on Offer Price Input
When("I input a negative number in the offer price field", () => {
  cy.get('[name="bid"]').type(-1500)
})

And("I submit the offer", () => {
  cy.get("#primaryButton").click()
})

Then("the offering form should not allow submission and warn the user", () => {
  cy.get("#primaryButton").should('be.visible')
})


// Scenario: Attempt to Offer a Job Already Offered
Given("I am on the job offering page for a job I have already offered", () => {
  cy.visit("http://localhost:3000/offer/" + jobId)
})

Then("the offering form should not be displayed", () => {
  cy.get("#primaryButton").should('not.exist')
})


