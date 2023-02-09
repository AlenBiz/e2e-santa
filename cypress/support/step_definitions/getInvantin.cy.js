const { Given, When } = require("@badeball/cypress-cucumber-preprocessor");
import { idBox } from "../step_definitions/createBox.cy";
export let inviteLink;
const invitePage = require("../../fixtures/pages/invitePage.json");
const generalElements = require("../../fixtures/pages/general.json");


Given("user is invantin page", function () {
  cy.visit(`/box/${idBox}`);
});

When("user is get invantin", function () {
  cy.get(generalElements.submitButton).click({ force: true });
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
    });
  cy.clearCookies();
});
