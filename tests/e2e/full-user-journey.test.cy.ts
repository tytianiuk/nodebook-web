describe('Full User Journey', () => {
  const email = 'userjourney@gmail.com'
  const password = '11111111'
  const newPassword = '11111111'

  it('should complete the full user journey', () => {
    // go to CATALOG
    cy.visit('/')
    cy.wait(100)
    cy.contains('h1', 'Каталог книг').should('be.visible')
    cy.get('#search').type('Дюна')
    cy.wait(300)
    cy.get('a').contains('Детальніше').first().click()
    cy.wait(300)

    // go to BOOK
    cy.url().should('eq', 'http://localhost:3000/676c16bfbacc3dd34717d3c8')
    cy.get('[data-testid=book-name]').should('be.visible')
    cy.wait(100)

    // go to CONTACTS
    cy.visit('/contacts')
    cy.wait(500)
    cy.get('[data-testid=subject]').click({ force: true })
    cy.contains('Увійдіть або створіть обліковий запис').should('be.visible')
    cy.get('[data-testid=login-button]').click()
    cy.wait(100)

    // go to AUTH
    cy.url().should('eq', 'http://localhost:3000/auth')
    cy.get('#login-email').type(email)
    cy.get('#login-password').type(password)
    cy.get('[data-testid=login-submit]').click()
    cy.wait(1000)

    // go to CONTACTS
    cy.visit('/contacts')
    cy.wait(500)
    cy.get('[data-testid=subject]').type('Тестова тема')
    cy.wait(100)
    cy.get('[data-testid=message]').type(
      'Це тестове повідомлення для перевірки форми',
    )
    cy.wait(100)
    cy.get('[data-testid=submit-form]').click()
    cy.wait(1000)

    // go to CATALOG
    cy.contains('Успішно відправлено!').should('be.visible')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('#search').type('Дюна')
    cy.wait(300)
    cy.get('a').contains('Детальніше').first().click()

    // go to BOOK
    cy.url().should('eq', 'http://localhost:3000/676c16bfbacc3dd34717d3c8')
    cy.contains('Поставити вподобайку').click()
    cy.contains('Прибрати вподобайку').should('be.visible')
    cy.get('[data-testid=reviews]').click({ force: true })
    cy.get('[data-testid=review-form]').type(
      'This is a test review user journey',
    )
    cy.get('[data-testid=rating-4]').click()
    cy.contains('Додати відгук').click({ force: true })
    cy.get('[data-testid=review]').should(
      'contain',
      'This is a test review user journey',
    )

    // go to PROFILE
    cy.visit('/profile')
    cy.wait(100)
    cy.contains('Безпека').click()
    cy.get('#Новий\\ пароль').type(password)
    cy.get('#Підтвердження\\ нового\\ пароля').type(newPassword)
    cy.contains('Змінити пароль').click()
    cy.wait(500)
    cy.contains('Ваш пароль було змінено').should('be.visible')
    cy.contains('Вподобані книжки').click()
    cy.get('a').contains('Детальніше').first().click()
    cy.wait(100)

    // go to BOOK
    cy.url().should('eq', 'http://localhost:3000/676c16bfbacc3dd34717d3c8')
    cy.contains('Прибрати вподобайку').click({ force: true })
    cy.wait(100)
    cy.contains('Поставити вподобайку').should('be.visible')

    // go to PROFILE
    cy.visit('/profile')
    cy.wait(100)
    cy.contains('Вийти з профілю').click()
    cy.get('[data-testid=confirm]').click()
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Увійти').should('be.visible')
  })
})
