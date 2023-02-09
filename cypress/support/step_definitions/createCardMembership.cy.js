const { Given, When } = require("@badeball/cypress-cucumber-preprocessor");
import { inviteLink } from "./getInvantin.cy";
const generalElements = require("../../fixtures/pages/general.json");
Given("user invantin link", function () {
  cy.visit(inviteLink);
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click();
});

Given("users logs in as {string} and {string}", function (string, string2) {

  cy.login(string, string2);

});
Given("create card membership", function () {
  cy.contains("Создать карточку участника").should("exist");
  cy.createCardMembership();
  cy.clearCookies();
});
