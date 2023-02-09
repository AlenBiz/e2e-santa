const { Given } = require("@badeball/cypress-cucumber-preprocessor");
const { When } = require("@badeball/cypress-cucumber-preprocessor");
// const userAdmin = require("../../fixtures/useradminbox.json");

Given("user on secret santa login page", function () {
  cy.visit("/login");
});

Given("user logs in as {string} and {string}", function (string, string2) {
  cy.login(string, string2);
});
