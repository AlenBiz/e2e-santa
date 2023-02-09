const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");
import { faker } from "@faker-js/faker";


const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");

export let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
export let idBox = faker.word.noun({ length: { min: 5, max: 7 } });
let maxAmount = 50;
let currency = "Евро";


Given("user is dashboard page", function () {
  cy.contains("Создать коробку").click();
});

Then("user is create box", function () {
  cy.get(boxPage.boxNameField).type(newBoxName);
  cy.log(newBoxName);
  cy.get(boxPage.idBoxField).clear().type(idBox);
  cy.log(idBox);
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.giftPriceToggle).check({ force: true });
  cy.get(boxPage.maxAnount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
  cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Участники");
      expect(text).to.include("Моя карточка");
      expect(text).to.include("Подопечный");
    });
});
