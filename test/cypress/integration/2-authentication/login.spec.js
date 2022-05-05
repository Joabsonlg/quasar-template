/// <reference types="cypress" />

describe('login', () => {
  it('should login', () => {
    cy.visit('/#/login');
    cy.get('input[name=username]').type('Joabson');
    cy.get('input[name=password]').type('a2d4g6j8');
    cy.get('button[type=submit]').click();
    cy.url().should('not.include', '/login');
  });

  it('should logout', () => {
    cy.get('#logout-button').click();
    cy.url().should('not.include', '/admin');
  });

  it('should fail to login', () => {
    cy.visit('/#/login');
    cy.get('input[name=username]').type('admin');
    cy.get('input[name=password]').type('wrong');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/login');
  });
})
