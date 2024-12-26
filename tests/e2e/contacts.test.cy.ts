describe('Contacts Form and Auth', () => {
  beforeEach(() => {
    cy.visit('/auth')

    cy.get('input[placeholder="your@email.com"]').type('tytianiuk@gmail.com')
    cy.get('input[placeholder="••••••••"]').type('11111111')
    cy.get('[data-testid="login-submit"]').click()
    cy.wait(500)
    cy.visit('/contacts')
    cy.wait(500)
  })

  it('should display the contact form', () => {
    cy.get('[data-testid=subject]').should('be.visible')
    cy.get('[data-testid=message]').should('be.visible')
    cy.get('[data-testid=submit-form]').should('be.visible')
  })

  it('should enable submit button when form is filled correctly', () => {
    cy.get('[data-testid=subject]').type('Тестова тема')
    cy.get('[data-testid=message]').type(
      'Це тестове повідомлення для перевірки форми',
    )
    cy.get('[data-testid=submit-form]').should('not.be.disabled')
  })

  it('should submit form successfully', () => {
    cy.get('[data-testid=subject]').type('Тестова тема')
    cy.wait(100)
    cy.get('[data-testid=message]').type(
      'Це тестове повідомлення для перевірки форми',
    )
    cy.wait(100)
    cy.get('[data-testid=submit-form]').click()

    cy.wait(1000)
    cy.contains('Успішно відправлено!').should('be.visible')
    cy.url().should('include', '/')
  })
})

describe('Contacts Form and NoAuth', () => {
  beforeEach(() => {
    cy.visit('/contacts')
  })

  it('should open auth dialog for unauthenticated user', () => {
    cy.get('[data-testid=subject]').focus()
    cy.contains('Увійдіть або створіть обліковий запис').should('be.visible')
  })
})
