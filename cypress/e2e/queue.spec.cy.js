import {BUTTON, CIRCLE, CIRCLE_HEAD, CIRCLE_TAIL, COLOR_DEFAULT, COLOR_MODIFIED, INPUT} from "../constants";
describe('should queue page work correctly', function() {
  beforeEach(function() {
    cy.visit('/queue');
  });

  it('should button be disabled', function() {
    cy.get(INPUT).first().should('have.value', '');
    cy.get(BUTTON).contains("Добавить").parent().should('be.disabled');
  });

  it('should queue work correctly', function() {
    cy.get(BUTTON).contains("Добавить").parent().as('addButton');
    cy.get(BUTTON).contains("Удалить").parent().as('deleteButton');
    cy.get(BUTTON).contains("Очистить").parent().as('cleanButton');

    cy.clock();

    cy.get(INPUT).type('0');
    cy.get("@addButton").click();
    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_MODIFIED).contains('0');
    cy.get(CIRCLE).eq(0).get(CIRCLE_HEAD).contains('head')
    cy.get(CIRCLE).eq(0).get(CIRCLE_TAIL).contains('tail')

    cy.tick(1000);

    cy.get(INPUT).type('1');
    cy.get("@addButton").click()
    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_DEFAULT);
    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_MODIFIED).contains('1');
    cy.get(CIRCLE).eq(1).get(CIRCLE_TAIL).contains('tail')
    cy.get(CIRCLE).eq(0).get(CIRCLE_HEAD).contains('head')

    cy.tick(1000);

    cy.get(INPUT).type('2');
    cy.get("@addButton").click();
    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_DEFAULT);
    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_DEFAULT);
    cy.get(CIRCLE).eq(2).should("have.css", "border", COLOR_MODIFIED).contains('2');
    cy.get(CIRCLE).eq(2).get(CIRCLE_TAIL).contains('tail')
    cy.get(CIRCLE).eq(0).get(CIRCLE_HEAD).contains('head')

    cy.tick(1000);

    cy.get("@deleteButton").click();
    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_MODIFIED);

    cy.tick(1000);

    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_DEFAULT);
    cy.get(CIRCLE).eq(1).get(CIRCLE_HEAD).contains('head')

    cy.tick(1000);

    cy.get("@cleanButton").click();
    cy.get(CIRCLE).eq(1).should('have.text', '');
    cy.get(CIRCLE).eq(2).should('have.text', '');
    cy.get(CIRCLE).eq(2).should('have.text', '');
  });
});