describe('Blogs ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('application')
  })

  it('user can login', function() {
    cy.get('input:first').type('and')
    cy.get('input:last').type('topsecret')
    cy.contains('login').click()
    cy.contains('Andreas Schuller logged in')
  })
})
