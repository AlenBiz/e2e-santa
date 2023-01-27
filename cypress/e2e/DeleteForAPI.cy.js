const users = require("../fixtures/users.json");
const userAdmin = require("../fixtures/useradminbox.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
import { faker } from "@faker-js/faker";
import "@bahmutov/cy-api";

describe("user can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let idBox = faker.word.noun({ length: { min: 5, max: 7 } });
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;
  let cookie_connect_sid;

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
    cy.visit(`/box/${idBox}`);
    cy.get(generalElements.submitButton).click({ force: true });
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
      cy.contains("Уведомления").click({ force: true });
      cy.contains(newBoxName).should("exist");

      cy.openWard();
      cy.clearCookies();
    });
  });
  after("delete box", () => {
    cy.request({
      url: "/api/login",
      failOnStatusCode: false,
      method: "POST",
      body: {
        email: userAdmin.user.email,
        password: userAdmin.user.password,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
    cy.getCookie("connect.sid").then((cook) => {
      cookie_connect_sid = `${cook.name}=${cook.value}`;
    });

    cy.request({
      metod: "DELETE",
      headers: {
        Cookie: cookie_connect_sid,
      },
      url: `/api/box/${idBox}`,
    }).then((response) => {
      expect(response.status).to.equal(200); // 201
    });
  });
});
