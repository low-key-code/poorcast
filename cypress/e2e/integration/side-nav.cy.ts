describe('Side Nav', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
    cy.loginTestUser()
  })

  it('goes to the app overview page', () => {
    cy.location('pathname').should('eq', '/app/overview')
  })

  it('displays side nav elements', () => {
    cy.get('app-logo').should('exist')
    cy.get('app-side-nav-icon').should('have.length', 5)
    cy.getByData('profile-img').should('exist')
    cy.getByData('profile-email').contains('test@test.com')
  })

  // Lowercase 'page-name' assertions as capitalized by css
  it('navigates to each page', () => {
    cy.get('app-side-nav-icon').eq(1).click()
    cy.get('app-side-nav-icon').eq(1).parent('a').should('have.class', 'side-icon-active')
    cy.location('pathname').should('eq', '/app/paybill')
    cy.getByData('page-name').contains('pay bill')

    cy.get('app-side-nav-icon').eq(2).click()
    cy.get('app-side-nav-icon').eq(2).parent('a').should('have.class', 'side-icon-active')
    cy.location('pathname').should('eq', '/app/accounts')
    cy.getByData('page-name').contains('accounts')

    cy.get('app-side-nav-icon').eq(3).click()
    cy.get('app-side-nav-icon').eq(3).parent('a').should('have.class', 'side-icon-active')
    cy.location('pathname').should('eq', '/app/transfer')
    cy.getByData('page-name').contains('transfer')

    cy.get('app-side-nav-icon').eq(4).click()
    cy.get('app-side-nav-icon').eq(4).parent('a').should('have.class', 'side-icon-active')
    cy.location('pathname').should('eq', '/app/settings')
    cy.getByData('page-name').contains('settings')

    cy.get('app-side-nav-icon').eq(0).click()
    cy.get('app-side-nav-icon').eq(0).parent('a').should('have.class', 'side-icon-active')
    cy.location('pathname').should('eq', '/app/overview')
    cy.getByData('page-name').contains('overview')
  })

  it('opens and closes', () => {
    cy.getByData('profile-email').contains('test@test.com')
    cy.getByData('open-close').click()
    cy.getByData('profile-email').should('not.exist')

    cy.getByData('open-close').click()
    cy.getByData('profile-email').should('exist').contains('test@test.com')
  })
}) 