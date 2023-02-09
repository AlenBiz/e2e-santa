const userAdmin = require("../../fixtures/useradminbox.json");
const { Given, Then } = require("@badeball/cypress-cucumber-preprocessor");


Given ("Login", () => {
  cy.visit("/login");
    cy.login(userAdmin.user.email, userAdmin.user.password);
})

  Given("Delete box", () => {

  cy.visit("/account/boxes");
    // cy.get(
    //   '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    // ).click();
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
