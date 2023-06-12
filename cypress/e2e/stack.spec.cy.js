import {BUTTON, CIRCLE, CIRCLE_HEAD, COLOR_DEFAULT, COLOR_MODIFIED, INPUT} from "../constants";
describe('should stack page work correctly', function() {
  beforeEach(function() {
    cy.visit('/stack');
  });

  it('should add button be disabled', function() {
    cy.get(INPUT).first().should('have.value', '');
    cy.get(BUTTON).contains("Добавить").parent().should('be.disabled');
  });

  it('should stack work correctly', function() {
    cy.get(BUTTON).contains("Добавить").parent().as('addButton');
    cy.get(BUTTON).contains("Удалить").parent().as('DeleteButton');
    cy.get(BUTTON).contains("Очистить").parent().as('CleanButton');

    cy.clock();

    cy.get(INPUT).type('1');
    cy.get('@addButton').should('not.be.disabled').click();
    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_MODIFIED).contains('1');
    cy.get(CIRCLE_HEAD).eq(0).contains('top');

    cy.tick(1000);

    cy.get(CIRCLE).eq(0).should("have.css", "border", COLOR_DEFAULT);
    cy.get(INPUT).type('2');
    cy.get('@addButton').click();
    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_MODIFIED).contains('2');
    cy.get(CIRCLE).eq(1).get(CIRCLE_HEAD).contains('top');

    cy.tick(1000);

    cy.get(CIRCLE).eq(1).should("have.css", "border", COLOR_DEFAULT);
    cy.get(INPUT).type('3');
    cy.get('@addButton').click();
    cy.get(CIRCLE).eq(2).should("have.css", "border", COLOR_MODIFIED).contains('3');
    cy.get(CIRCLE).eq(2).get(CIRCLE_HEAD).contains('top');

    cy.tick(1000);

    cy.get('@DeleteButton').click();
    cy.get(CIRCLE).eq(0).should("exist");
    cy.get(CIRCLE).eq(1).should("exist");
    cy.get(CIRCLE).eq(2).should('not.exist');

    cy.tick(1000);

    cy.get('@CleanButton').click();
    cy.get(CIRCLE).should('not.exist');
  });
});