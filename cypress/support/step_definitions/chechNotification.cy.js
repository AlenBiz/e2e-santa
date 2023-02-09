const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");
import { newBoxName } from "../step_definitions/createBox.cy";

Then("user checking Notifications", function () {

    cy.contains("Уведомления").click({ force: true });
    cy.contains(newBoxName).should("exist");
    cy.clearCookies();

  });