import {BUTTON, CIRCLE, COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED, INPUT} from "../constants";
describe('should string page work correctly', function() {
  beforeEach(function() {
    cy.visit('/recursion');
  });

  it('should button be disabled', function() {
    cy.get(INPUT).first().should('have.value', '');
    cy.get(BUTTON).contains("Развернуть").parent().should('be.disabled');
  });

  it('should reverse string work correctly', function() {
    cy.clock();
    cy.get(INPUT).type('test');
    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_DEFAULT);
    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_DEFAULT);
    cy.get(CIRCLE).eq(2).should("have.css", "border", COLOR_DEFAULT);
    cy.get(CIRCLE).eq(3).should("have.css", "border", COLOR_DEFAULT);

    cy.get(BUTTON).contains("Развернуть").parent().should('not.be.disabled').click();
    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_CHANGING).contains('t');
    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_DEFAULT).contains('e');
    cy.get(CIRCLE).eq(2).should("have.css", "border", COLOR_DEFAULT).contains('s');
    cy.get(CIRCLE).eq(3).should("have.css", "border", COLOR_CHANGING).contains('t');

    cy.tick(1000);

    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_MODIFIED).contains('t');
    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_CHANGING).contains('e');
    cy.get(CIRCLE).eq(2).should("have.css", "border", COLOR_CHANGING).contains('s');
    cy.get(CIRCLE).eq(3).should("have.css", "border", COLOR_MODIFIED).contains('t');

    cy.tick(1000);

    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_MODIFIED).contains('t');
    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_MODIFIED).contains('s');
    cy.get(CIRCLE).eq(2).should("have.css", "border", COLOR_MODIFIED).contains('e');
    cy.get(CIRCLE).eq(3).should("have.css", "border", COLOR_MODIFIED).contains('t');

    cy.get(INPUT).clear();
    cy.get(BUTTON).contains("Развернуть").parent().should('be.disabled');
  });
});