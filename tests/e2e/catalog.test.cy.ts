describe('Catalog Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(300)
  })

  it('should display the catalog title', () => {
    cy.contains('h1', 'Каталог книг').should('be.visible')
  })

  it('should display filters', () => {
    cy.get('[data-testid=filters-container]').should('be.visible')
    cy.contains('Фільтри').should('be.visible')
  })

  it('should display book cards', () => {
    cy.get('[data-testid=title]').should('have.length.gt', 0)
  })

  it('should filter books by search', () => {
    cy.get('#search').type('Дюна')
    cy.get('[data-testid=title]').should('contain', 'Дюна')
  })

  it('should filter books by category', () => {
    cy.get('[data-testid=category-selector]').click({ force: true })
    cy.wait(100)
    cy.get('[data-testid=select-category]')
      .contains('Фентезі')
      .click({ force: true })
    cy.wait(300)
    cy.get('[data-testid=category]').should('contain', 'Фентезі')
  })

  it('should filter books by rating', () => {
    cy.get('[data-testid=rating-selector]').click({ force: true })
    cy.wait(100)
    cy.get('[data-testid=select-rating]').contains('4').click()
    cy.wait(500)
    cy.get('[data-testid=rating]').each(($el) => {
      const rating = parseFloat($el.text().trim())
      cy.wrap(rating).should('be.gt', 4)
    })
  })

  it('should display "No books found" message when no results', () => {
    cy.get('#search').type('NonexistentBook123456789')
    cy.wait(300)
    cy.contains('Книг не знайдено').should('be.visible')
  })

  it('should navigate to book details page', () => {
    cy.get('#search').type('Собака')
    cy.wait(600)
    cy.get('a').contains('Детальніше').first().click()
    cy.url().should('include', '/676c16fdbacc3dd34717d3d4')
  })

  it('should reset filters', () => {
    cy.get('[data-testid=category-selector]').click({ force: true })
    cy.wait(100)
    cy.get('[data-testid=select-category]')
      .contains('Детектив')
      .click({ force: true })
    cy.get('[data-testid=rating-selector]').click({ force: true })
    cy.wait(100)
    cy.get('[data-testid=select-rating]').contains('5').click({ force: true })
    cy.get('#search').type('Собака')
    cy.wait(500)
    cy.get('[data-testid=title]').should('have.length', 1)

    cy.get('[data-testid=category-selector]').click({ force: true })
    cy.wait(100)
    cy.get('[data-testid=select-category]')
      .contains('Всі жанри')
      .click({ force: true })
    cy.get('[data-testid=rating-selector]').click({ force: true })
    cy.wait(100)
    cy.get('[data-testid=select-rating]')
      .contains('Будь-який')
      .click({ force: true })
    cy.get('#search').clear()
    cy.wait(500)
    cy.get('[data-testid=title]').should('have.length.gt', 5)
  })
})
