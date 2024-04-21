/// <reference types="cypress" />

import { When, Then, And } from "cypress-cucumber-preprocessor/steps"

// beforeEach(() => {
//   cy.loginAsStudent("yugioh@student.chula.ac.th", "root1234")
// })

// Scenario: Edit Nothing
Given("I am on the profile page", () => {
  cy.visit("http://localhost:3000/profile/41eb9848-68de-4fbd-a4f1-ceaae052aac3")
})

When("I click on the edit button", () => {
  cy.get("#edit-profile-button").click()
})

And("I enter empty string into the description", () => {
  cy.get("#text-area").clear()
})

And("I click on the confirm edit button within the edit modal", () => {
  cy.get('[type="submit"]').click()
})

Then("the page should be closed", () => {
  return
})

// Scenario: Valid profile picture, Valid portfolio file
And("I enter a string1 into the description", () => {
  cy.get("#text-area")
    .clear()
    .type("This is the best scent-smeller in Thailand")
})

And("I try to upload a valid profile picture", () => {
  cy.get("#dropzone-file-0").attachFile("smallprofilepicture.jpg")
})

And("I try to upload a valid portfolio file", () => {
  cy.get("#dropzone-file-1").attachFile("smallportfolio.pdf")
})

And("there must be no error message about portfolio file", () => {
  cy.get("#error-invalid-file-1").should("have.css", "opacity", "0")
})

And("there must be no error message about profile picture", () => {
  cy.get("#error-invalid-file-0").should("have.css", "opacity", "0")
})

// Scenario: Wrong portfolio file type
And("I enter a string2 into the description", () => {
  cy.get("#text-area")
    .clear()
    .type("This is the best freelancer in Thailand")
})

And("I try to upload a portfolio file which is not pdf", () => {
  cy.get("#dropzone-file-1").attachFile("smallprofilepicture.jpg")
})

And("there must an error message about invalid portfolio file", () => {
  cy.get("#error-invalid-file-1").should("have.css", "opacity", "1")
})

// Scenario: Valid profile picture, Portfolio file size exceeding 10MB
And("I try to upload a portfolio file exceeding 10MB", () => {
  cy.get("#dropzone-file-1").attachFile("largeportfolio.pdf")
  cy.wait(3000)
})

// Scenario: Wrong profile picture type
And("I try to upload a profile picture which is neither .jpg nor .png", () => {
  cy.get("#dropzone-file-0").attachFile("smallportfolio.pdf")
})

And("there must an error message about invalid profile picture", () => {
  cy.get("#error-invalid-file-0").should("have.css", "opacity", "1")
})

// Scenario: Profile picture size exceeding 5MB, Valid portfolio file
And("I enter a string3 into the description", () => {
  cy.get("#text-area")
    .clear()
    .type("This is the most beautiful deer owner in Thailand")
})

And("I try to upload a profile picture exceeding 5MB", () => {
  cy.get("#dropzone-file-0").attachFile("largeprofilepicture.jpg")
})
