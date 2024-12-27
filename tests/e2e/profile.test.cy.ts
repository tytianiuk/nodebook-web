describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('/auth')

    cy.get('#login-email').type('tytianiuk@gmail.com')
    cy.get('#login-password').type('11111111')
    cy.get('[data-testid=login-submit]').click()

    cy.wait(500)

    cy.visit('/profile')
    cy.wait(500)
  })

  it('should display user information', () => {
    cy.contains('Титянюк Артем').should('be.visible')
    cy.contains('tytianiuk@gmail.com').should('be.visible')
  })

  it('should open security form', () => {
    cy.contains('Безпека').click()
    cy.get('form[role="form"]').should('be.visible')
  })

  it('should change password successfully', () => {
    cy.contains('Безпека').click()
    cy.wait(100)
    cy.get('#Новий\\ пароль').type('11111111')
    cy.wait(100)
    cy.get('#Підтвердження\\ нового\\ пароля').type('11111111')
    cy.wait(100)
    cy.contains('Змінити пароль').click()

    cy.wait(500)

    cy.contains('Ваш пароль було змінено').should('be.visible')
  })

  it('should display favorite books', () => {
    cy.contains('Вподобані книжки').click()
    cy.wait(200)
    cy.get('[data-testid=title]').should('have.length', 3)
  })

  it('should logout successfully', () => {
    cy.contains('Вийти з профілю').click()
    cy.get('[data-testid=confirm]').click()
    cy.wait(100)

    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Увійти')
  })
})
