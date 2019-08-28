describe('Blogs ', function() {
  before(function() {
    cy.visit('http://localhost:3000')

    cy.get('input:first').type('and')
    cy.get('input:last').type('topsecret')
    cy.contains('login').click()
    cy.contains('Andreas Schuller logged in')
  })

  it('content provided', function() {
    
    cy.contains('cool title')
  })
})
