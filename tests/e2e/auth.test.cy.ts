describe('Authentication Page', () => {
  beforeEach(() => {
    cy.visit('/auth')
  })

  describe('Login', () => {
    it('should display login form by default', () => {
      cy.get('[data-testid=login]').should('have.attr', 'aria-selected', 'true')
      cy.get('#login-email').should('be.visible')
      cy.get('#login-password').should('be.visible')
      cy.get('[data-testid=login-submit]').should('be.visible')
    })

    it('should enable submit button when form is filled', () => {
      cy.get('#login-email').type('test@example.com')
      cy.get('#login-password').type('password123')
      cy.get('[data-testid=login-submit]').should('not.be.disabled')
    })

    it('should show error toast on invalid credentials', () => {
      cy.get('#login-email').type('invalid@example.com')
      cy.get('#login-password').type('wrongpassword')
      cy.get('[data-testid=login-submit]').click()

      cy.wait(100)

      cy.contains('Помилка при вході').should('be.visible')
    })

    it('should redirect to catalog page on successful login', () => {
      cy.get('#login-email').type('john_doe@gmail.com')
      cy.get('#login-password').type('SecurePassword123')
      cy.get('[data-testid=login-submit]').click()

      cy.wait(100)

      cy.url().should('eq', 'http://localhost:3000/')
      cy.contains('john_doe').should('be.visible')
    })
  })

  describe('Registration', () => {
    beforeEach(() => {
      cy.get('[data-testid=register]').click()
    })

    it('should display registration form', () => {
      cy.get('#username').should('be.visible')
      cy.get('#email').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#confirm-password').should('be.visible')
      cy.get('[data-testid=register-submit]').should('be.visible')
    })

    it('should enable submit button when form is filled correctly', () => {
      cy.get('#username').type('New User')
      cy.get('#email').type('newuser@example.com')
      cy.get('#password').type('password123')
      cy.get('#confirm-password').type('password123')
      cy.get('[data-testid=register-submit]').should('not.be.disabled')
    })

    it('should show error when passwords do not match', () => {
      cy.get('#username').type('New User')
      cy.get('#email').type('newuser@example.com')
      cy.get('#password').type('password123')
      cy.get('#confirm-password').type('password456')
      cy.get('[data-testid=register-submit]').click()

      cy.wait(100)

      cy.contains('Паролі не співпадають').should('be.visible')
    })

    it('should redirect to catalog page on successful registration', () => {
      const timestamp = Date.now()
      const uniqueEmail = `user${timestamp}@example.com`

      cy.get('#username').type('New User')
      cy.get('#email').type(uniqueEmail)
      cy.get('#password').type('password1234')
      cy.get('#confirm-password').type('password1234')
      cy.get('[data-testid=register-submit]').click()

      cy.wait(100)

      cy.url().should('eq', 'http://localhost:3000/')

      cy.contains('New User').should('be.visible')
    })
  })
})
