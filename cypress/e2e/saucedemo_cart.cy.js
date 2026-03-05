/// <reference types="cypress" />

describe('Sauce Demo Cart Tests', () => {

  beforeEach(() => {
    // Open Sauce Demo login page
    cy.visit('https://www.saucedemo.com/')

    // Login as standard user
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Confirm we are on the inventory page
    cy.url().should('include', '/inventory.html')
  })

  it('Should display Add to Cart button for each product', () => {
    cy.get('.inventory_item').each(($el) => {
      cy.wrap($el).find('button').should('be.visible')
    })
  })

  it('Should allow Add to Cart button to be clicked', () => {
    cy.get('.inventory_item').first().find('button')
      .should('be.visible')
      .click()
  })

  it('Should add a single product to the cart', () => {
    cy.get('.inventory_item').contains('Sauce Labs Backpack')
      .parents('.inventory_item')
      .find('button')
      .should('be.visible')
      .click()

    // Cart badge should update to 1
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  it('Should add multiple products to the cart', () => {
    // Add two products
    cy.get('.inventory_item').contains('Sauce Labs Backpack')
      .parents('.inventory_item')
      .find('button')
      .click()

    cy.get('.inventory_item').contains('Sauce Labs Bike Light')
      .parents('.inventory_item')
      .find('button')
      .click()

    // Cart badge should show 2
    cy.get('.shopping_cart_badge').should('have.text', '2')
  })

  it('Should remove a product and re-add it', () => {
    // Add product
    cy.get('.inventory_item').contains('Sauce Labs Fleece Jacket')
      .parents('.inventory_item')
      .find('button')
      .click()

    // Remove product
    cy.get('.inventory_item').contains('Sauce Labs Fleece Jacket')
      .parents('.inventory_item')
      .find('button')
      .click()

    // Re-add product
    cy.get('.inventory_item').contains('Sauce Labs Fleece Jacket')
      .parents('.inventory_item')
      .find('button')
      .click()

    // Cart badge should show 1
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })
})