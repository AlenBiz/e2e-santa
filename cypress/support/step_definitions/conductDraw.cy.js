const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");
import { newBoxName } from "../step_definitions/createBox.cy";

Given("user as conduct a draw", function () {
    cy.contains("Коробки").click({ force: true });
    cy.contains(newBoxName).click();
    cy.contains("Перейти к жеребьевке").click({ force: true });
    cy.contains("Жеребьевка").should("exist");
    cy.get(".btn-main").click({ force: true });
    cy.contains("Проведение жеребьевки").should("exist");
    cy.get(".santa-modal_content_buttons > .btn-main").click({ force: true });
    cy.contains("Жеребьевка проведена").should("exist");
    cy.clearCookies();

  });