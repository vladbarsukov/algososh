import {FIBONACCI_BUTTON, LIST_BUTTON, QUEUE_BUTTON, SORTING_BUTTON, STACK_BUTTON, STRING_BUTTON} from "../constants";

describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('should open main page by default', function() {
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('should open string page after string button click', function() {
    cy.get(STRING_BUTTON).click();
    cy.contains('Строка');
  });

  it('should open fibonacci page after fibonacci button click', function() {
    cy.get(FIBONACCI_BUTTON).click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open sorting page after sorting button click', function() {
    cy.get(SORTING_BUTTON).click();
    cy.contains('Сортировка массива');
  });

  it('should open stack page after stack button click', function() {
    cy.get(STACK_BUTTON).click();
    cy.contains('Стек');
  });

  it('should open queue page after queue button click', function() {
    cy.get(QUEUE_BUTTON).click();
    cy.contains('Очередь');
  });

  it('should open list page after list button click', function() {
    cy.get(LIST_BUTTON).click();
    cy.contains('Связный список');
  });

});