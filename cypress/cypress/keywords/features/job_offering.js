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

  // cy.get('.flex.flex-row.gap-1') // Target the parent element
  // .find('.text-[16px].text-[#838383].mt-[10px]') // Find the child element within
  // .should('contain.text', 'ไม่ได้แนบไฟล์สัญญา');

  cy.get('[name="bid"]').should('have.value', 1500)
})


// Scenario: Verify Offering Form Submission (with file uploaded)
Given("I am on the job offering page2", () => {
  cy.visit("http://localhost:3000/offer/" + jobId2)
})

When("I input the offer price as a number2", () => {
  cy.get('[name="bid"]').type(2000)
})

And("I upload a TOR file in PDF format, up to 5 MB in size", () => {
  cy.get('#dropzone-file-0').attachFile('BG3.pdf')
})

And("I submit the offer", () => {
  cy.get("#primaryButton").click()
})

Then("the uploaded TOR file and offered price should be displayed on the page", () => {
  cy.wait(5000)

  // cy.get('.mt-[7px] .w-full.flex.p-3.bg-slate-200.text-slate-500.rounded-md.hover:bg-slate-400.hover:cursor-pointer.hover:shadow-md.hover:text-slate-100') // Target the parent element
  // .find('.text-[14px].font-semibold') // Find the child element with desired class
  // .should('contain.text', 'ไฟล์สัญญาที่แนบไว้');

  cy.get('[name="bid"]').should('have.value', 2000)
  cy.get('div.mt-[7px]').click()
})


// Scenario: Offer Price is Missing
Given("I am on the job offering page3", () => {
  cy.visit("http://localhost:3000/offer/" + jobId3)
})

When("I attempt to submit an offer without specifying the offer price", () => {
  cy.get("#primaryButton").click()
})

Then("the offering form should not allow submission and warn the user", () => {
  cy.get('[name="bid"]').should('be.empty')
  cy.on('[name="bid"]', (message) => {
    expect(message).to.equal('โปรดกรอกฟิลด์นี้');
  });
  cy.get("#primaryButton").click()
})


// Exceed File Size Limit on TOR File Input
And("I attempt to upload a TOR file in PDF format exceeding 5 MB in size", () => {
  cy.get('#dropzone-file-0').attachFile('Pittinan.pdf')
})

Then("the TOR file input should not accept the file and warn the user", () => {
  cy.wait(1000)
  cy.get('.text-[14px].text-red-600').should('be.visible')
})



