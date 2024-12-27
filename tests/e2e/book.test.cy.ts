describe('Book Page', () => {
  describe('Authenticated User', () => {
    beforeEach(() => {
      cy.visit('/auth')

      cy.get('input[placeholder="your@email.com"]').type('tytianiuk@gmail.com')
      cy.get('input[placeholder="••••••••"]').type('11111111')
      cy.get('[data-testid="login-submit"]').click()
      cy.wait(500)

      cy.visit('/676c1719bacc3dd34717d3e4')
      cy.wait(100)
    })

    it('should display book information', () => {
      cy.get('[data-testid=book-name]').should('be.visible')
      cy.get('[data-testid=book-author]').should('be.visible')
      cy.get('[data-testid=book-description]').should('be.visible')
    })

    it('should display book rating', () => {
      cy.get('[data-testid=filled-star]').should('exist')
    })

    it('should switch between reviews and comments tabs', () => {
      cy.get('[data-testid=reviews]').click()
      cy.get('[data-testid=review]').should('be.visible')

      cy.get('[data-testid=comments]').click()
      cy.get('[data-testid=comment]').should('be.visible')
    })

    it('should add a review', () => {
      cy.get('[data-testid=reviews]').click()
      cy.get('[data-testid=review-form]').type('This is a test review')
      cy.get('[data-testid=rating-5]').click()
      cy.contains('Додати відгук').click()
      cy.wait(100)
      cy.get('[data-testid=review]').should('contain', 'This is a test review')
    })

    it('should add a comment', () => {
      cy.get('[data-testid=comments]').click()
      cy.wait(200)
      cy.get('textarea[name="content"]').type('This is a test comment')
      cy.contains('Додати коментар').click()
      cy.wait(200)
      cy.get('[data-testid=comment]').should(
        'contain',
        'This is a test comment',
      )
    })

    it('should toggle like button', () => {
      cy.contains('Поставити вподобайку').click()
      cy.wait(200)
      cy.contains('Прибрати вподобайку').should('be.visible')
      cy.contains('Прибрати вподобайку').click()
      cy.wait(200)
      cy.contains('Поставити вподобайку').should('be.visible')
    })

    it('should handle non-existent book', () => {
      cy.visit('/999999')

      cy.contains('Можливо, книга була видалена або її не існує').should(
        'be.visible',
      )
    })
  })

  describe('Unauthenticated User', () => {
    beforeEach(() => {
      cy.visit('/676c1719bacc3dd34717d3e4')
    })

    it('should display book information', () => {
      cy.get('[data-testid=book-name]').should('be.visible')
      cy.get('[data-testid=book-author]').should('be.visible')
      cy.get('[data-testid=book-description]').should('be.visible')
    })

    it('should display book rating', () => {
      cy.get('[data-testid=filled-star]').should('exist')
    })

    it('should not display review form for unauthenticated user', () => {
      cy.get('[data-testid=reviews]').click()
      cy.get('[data-testid=review-form]').should('not.exist')
    })

    it('should not display comment form for unauthenticated user', () => {
      cy.get('[data-testid=comments]').click()
      cy.get('textarea[name="content"]').should('not.exist')
    })

    it('should not display like button for unauthenticated user', () => {
      cy.contains('Поставити вподобайку').should('not.exist')
      cy.contains('Прибрати вподобайку').should('not.exist')
    })

    it('should handle non-existent book', () => {
      cy.visit('/999999')
      cy.contains('Можливо, книга була видалена або її не існує').should(
        'be.visible',
      )
    })
  })
})
