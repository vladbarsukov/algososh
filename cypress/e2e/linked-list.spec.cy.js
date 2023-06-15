import {BUTTON, CIRCLE, CIRCLE_TAIL, INPUT, SMALL_CIRCLE} from "../constants";
describe('should linked list page work correctly', function() {
  beforeEach(function() {
    cy.visit('/list');
  });

  it('should button be disabled', function() {
    cy.get(INPUT).eq(0).should('have.value', '');
    cy.get(INPUT).eq(1).should('have.value', '');
    cy.get(BUTTON).contains("Добавить в head").parent().should('be.disabled');
    cy.get(BUTTON).contains("Добавить в tail").parent().should('be.disabled');
    cy.get(BUTTON).contains("Добавить по индексу").parent().should('be.disabled');
    cy.get(BUTTON).contains("Удалить по индексу").parent().should('be.disabled');
  });

  it('should have default list', function() {
    cy.get(CIRCLE).eq(0).should('have.text', '12');
    cy.get(CIRCLE).eq(1).should('have.text', '22');
    cy.get(CIRCLE).eq(2).should('have.text', '43');
    cy.get(CIRCLE).eq(3).should('have.text', '32');

  });

  it('should linked list work correctly', function() {
    cy.get(BUTTON).contains("Добавить в head").parent().as('addInHeadButton');
    cy.get(BUTTON).contains("Добавить в tail").parent().as('addInTailButton');
    cy.get(BUTTON).contains("Добавить по индексу").parent().as('addByIndexButton');
    cy.get(BUTTON).contains("Удалить по индексу").parent().as('deleteByIndexButton');
    cy.get(BUTTON).contains("Удалить из head").parent().as('deleteInHeadButton');
    cy.get(BUTTON).contains("Удалить из tail").parent().as('deleteInTailButton');
    cy.get(INPUT).eq(0).as('addInput');
    cy.get(INPUT).eq(1).as('addByIndexInput');


    cy.get("@addInput").type('0');
    cy.get('@addInHeadButton').click();
    cy.get(SMALL_CIRCLE).contains('0');

    cy.wait(1000);

    cy.get(CIRCLE).eq(0).contains('0');
    cy.get("@addInput").type('1');

    cy.get('@addInTailButton').click();
    cy.get(SMALL_CIRCLE).contains('1');

    cy.wait(1000);

    cy.get(CIRCLE).eq(5).contains('1');
    cy.get(CIRCLE).eq(5).get(CIRCLE_TAIL).contains('tail')
    cy.get('@deleteInHeadButton').click();
    cy.get(SMALL_CIRCLE).contains('0');

    cy.wait(1000);

    cy.get(CIRCLE).eq(0).contains('12');
    cy.get('@deleteInTailButton').click();
    cy.get(SMALL_CIRCLE).contains('1');

    cy.wait(1000);

    cy.get(CIRCLE).eq(3).contains('32');
    cy.get("@addInput").type('0');
    cy.get('@addByIndexInput').type('1');
    cy.get('@addByIndexButton').click();
    cy.get(SMALL_CIRCLE).contains('0');

    cy.wait(1500);

    cy.get(CIRCLE).eq(1).contains('0');
    cy.get('@addByIndexInput').type('1');
    cy.get('@deleteByIndexButton').click();

    cy.wait(1000);

    cy.get(SMALL_CIRCLE).contains('0');
    cy.get(CIRCLE).eq(1).contains('22');

  });
});