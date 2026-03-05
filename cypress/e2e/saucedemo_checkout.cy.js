/// <reference types="cypress" />

describe('Sauce Demo Checkout Tests', () => {

  beforeEach(() => {
    // Open Sauce Demo login page
    cy.visit('https://www.saucedemo.com/')

    // Login as standard user
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Confirm we are on inventory page
    cy.url().should('include', '/inventory.html')

    // Add a product to cart for checkout tests
    cy.get('.inventory_item').contains('Sauce Labs Backpack')
      .parents('.inventory_item')
      .find('button')
      .click()
  })

  it('Should navigate to checkout page', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test=checkout]').click()
    cy.url().should('include', '/checkout-step-one.html')
  })

  it('Should allow user to enter checkout information', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test=checkout]').click()

    // Fill in checkout info
    cy.get('[data-test=firstName]').type('Isioma')
    cy.get('[data-test=lastName]').type('Ogbechie')
    cy.get('[data-test=postalCode]').type('10001')
    cy.get('[data-test=continue]').click()

    // Confirm we are on overview page
    cy.url().should('include', '/checkout-step-two.html')
  })

  it('Should complete checkout successfully', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test=checkout]').click()

    cy.get('[data-test=firstName]').type('Isioma')
    cy.get('[data-test=lastName]').type('Ogbechie')
    cy.get('[data-test=postalCode]').type('10001')
    cy.get('[data-test=continue]').click()

    cy.get('[data-test=finish]').click()
    cy.url().should('include', '/checkout-complete.html')

    // Confirm order completion message
    cy.contains('Thank you for your order').should('be.visible')
  })

  it('Should show error if First Name is empty', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test=checkout]').click()

    // Leave First Name blank
    cy.get('[data-test=lastName]').type('Ogbechie')
    cy.get('[data-test=postalCode]').type('10001')
    cy.get('[data-test=continue]').click()

    cy.contains('Error: First Name is required').should('be.visible')
  })

  it('Should show error if Last Name is empty', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test=checkout]').click()

    cy.get('[data-test=firstName]').type('Isioma')
    // Leave Last Name blank
    cy.get('[data-test=postalCode]').type('10001')
    cy.get('[data-test=continue]').click()

    cy.contains('Error: Last Name is required').should('be.visible')
  })

  it('Should show error if Postal Code is empty', () => {
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test=checkout]').click()

    cy.get('[data-test=firstName]').type('Isioma')
    cy.get('[data-test=lastName]').type('Ogbechie')
    // Leave Postal Code blank
    cy.get('[data-test=continue]').click()

    cy.contains('Error: Postal Code is required').should('be.visible')
  })
})