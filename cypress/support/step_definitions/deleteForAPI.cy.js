const { Given, When } = require("@badeball/cypress-cucumber-preprocessor");
import { idBox } from "../step_definitions/createBox.cy";
let cookie_connect_sid;

Given("Get cookie with logs in {string} and {string}", function (string, string2) {
  cy.request({
    url: "/api/login",
    failOnStatusCode: false,
    method: "POST",
    body: {
      email: string,
      password: string2
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
  })
  cy.getCookie("connect.sid").then((cook) => {
    cookie_connect_sid = `${cook.name}=${cook.value}`;
  });
});

When("Delete for API", function () {
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
