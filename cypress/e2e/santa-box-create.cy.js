const users = require("../fixtures/users.json");
const userAdmin = require("../fixtures/useradminbox.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {

  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let idBox = faker.word.noun({ length: { min: 5, max: 7 } });
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(userAdmin.user.email, userAdmin.user.password);
    cy.contains("Создать коробку").click();
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

  it("add participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  it("approve as users", () => {
    users.forEach((item) => {
      cy.visit(inviteLink);
      cy.get(generalElements.submitButton).click();
      cy.contains("войдите").click();
      cy.login(item.user.email, item.user.password);
      cy.contains("Создать карточку участника").should("exist");
      cy.createCardMembership();
      cy.clearCookies();
    });
  });
  it("Conduct a draw", () => {
    cy.visit("/login");
    cy.login(userAdmin.user.email, userAdmin.user.password);
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
  it("Checking Notifications", () => {
    users.forEach((item) => {
      cy.visit("/login");
      cy.login(item.user.email, item.user.password);
      cy.contains('Уведомления').click({ force: true });
      cy.contains(newBoxName).should("exist");

      cy.openWard();
      cy.clearCookies();
    });
  

    });

    after("delete box", () => {
      cy.visit("/login");
      cy.login(userAdmin.user.email, userAdmin.user.password);
      cy.get(
        '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
      ).click();
      cy.get(":nth-child(1) > a.base--clickable > .user-card").first().click();
      cy.get(
        ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
      ).click();
      cy.contains("Архивация и удаление").click({ force: true });
      cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
        "Удалить коробку"
      );
      cy.get(".btn-service").click();
    });
  });
