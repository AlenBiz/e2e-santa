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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from "@faker-js/faker";
const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");

Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).clear().type(userName);
  cy.get(loginPage.passwordField).clear().type(password);
  cy.get(generalElements.submitButton).click({ force: true });
});

Cypress.Commands.add("createCardMembership", () => {
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  cy.get(generalElements.submitButton).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
});
Cypress.Commands.add("openWard", ()=> {
cy.get(':nth-child(1) > .notifications-item__button > .btn-service').click();
cy.contains('Жеребьевка проведена и у тебя появился подопечный').should("exist");
cy.get('.btn-main').click();
cy.get('.user-card').should("exist"); 
})