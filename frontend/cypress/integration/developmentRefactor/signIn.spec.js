describe('User sign in', () => {
  const faker = require('faker');
  const invalidUser = faker.internet.email();

  it('Navigate to CloudClinic home page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').contains('Sign in').click();
    cy.url().should('include', '/authentication');

    // page contains sign in toggle
    cy.get('button').contains('Sign up');

    // form stage 1 - has both doctor and client options
    cy.get('[data-cy=email]')
      .type(invalidUser)
      .should('have.value', invalidUser);
    cy.get('[data-cy=password]')
      .type('password')
      .should('have.value', 'password');

    cy.get('button').contains('Previous');
    cy.get('button').contains('Next').click();
  });
});
