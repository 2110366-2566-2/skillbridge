// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsStudent', (email, password) => {
    // cy.session([email, password], () => {
    cy.visit('http://localhost:3000/login');
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type(password);
    cy.get('[type="submit"]').click();
    cy.get('#hamburgerButton').click();
    cy.get('#logoutButton').should('exist');
    // })
})