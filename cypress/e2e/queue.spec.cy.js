import {BUTTON, CIRCLE, INPUT} from "../constants";
describe('should queue page work correctly', function() {
  beforeEach(function() {
    cy.visit('/queue');
  });

  it('should button be disabled', function() {
    cy.get(INPUT).first().should('have.value', '');
    cy.get(BUTTON).contains("Добавить").parent().should('be.disabled');
  });

  it('should fibonacci sequence work correctly', function() {
    cy.clock();

  });
});