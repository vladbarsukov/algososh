import {BUTTON, CIRCLE, INPUT} from "../constants";
describe('should fibonacci page work correctly', function() {
  beforeEach(function() {
    cy.visit('/fibonacci');
  });

  it('should button be disabled', function() {
    cy.get(INPUT).first().should('have.value', '');
    cy.get(BUTTON).contains("Рассчитать").parent().should('be.disabled');
  });

  it('should fibonacci sequence work correctly', function() {
    cy.clock();
    cy.get(INPUT).type('4');
    cy.get(BUTTON).contains("Рассчитать").parent().should('not.be.disabled').click();
    cy.get(CIRCLE).eq(0).contains('1');

    cy.tick(1000);

    cy.get(CIRCLE).eq(1).contains('1');

    cy.tick(1000);

    cy.get(CIRCLE).eq(2).contains('2');

    cy.tick(1000);

    cy.get(CIRCLE).eq(3).contains('3');

    cy.tick(1000);

    cy.get(CIRCLE).eq(4).contains('5');
  });
});