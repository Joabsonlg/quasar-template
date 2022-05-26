/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('init', () => {
  it('should access the home page', () => {
    cy.visit('/')
  })

  it('should enter in login page', () => {
    cy.visit('/login')
  });

  it('should enter in forgot password page', () => {
    cy.visit('/#/forgot-password')
    cy.get('div').contains('Esqueceu a senha?').click();
  });
})
