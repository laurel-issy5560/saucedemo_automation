describe('Sauce Demo Login Tests', () => {

  // Runs before each test
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('TC_SD_URL_001 - Should open the login page successfully', () => {
    cy.get('#user-name').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#login-button').should('be.visible')
    cy.get('.login_logo').should('be.visible')
  })

  it('TC_SD_LG_002 - Should log in with valid credentials', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
  })

  it('TC_SD_LG_003 - Should fail login with invalid username', () => {
    cy.get('#user-name').type('Isioma_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain.text', 
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('TC_SD_LG_004 - Should fail login with incorrect password', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain.text', 
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('TC_SD_LG_005 - Should fail login when username is empty', () => {
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain.text', 
      'Epic sadface: Username is required'
    )
  })

  it('TC_SD_LG_006 - Should fail login when password is empty', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain.text', 
      'Epic sadface: Password is required'
    )
  })

})
