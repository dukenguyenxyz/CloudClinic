describe('User Sign In', () => {
  it('Visits CloudClinic', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Sign in').click();
    cy.url().should('include', '/authentication');

    cy.get('input[name="Email"]')
      .type('harry@gmail.com')
      .should('have.value', 'harry@gmail.com');

    cy.get('input[name="Password"]')
      .type('password')
      .should('have.value', 'password');

    cy.contains('Sign in').click();
  });
});
