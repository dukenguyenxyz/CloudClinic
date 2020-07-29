const faker = require('faker');
const newEmail = faker.internet.email();

describe('Doctor Sign Up', () => {
  it('Visits CloudClinic', () => {
    cy.visit('http://localhost:3000/home');

    cy.contains('Sign up').click();
    cy.url().should('include', '/authentication');

    //Step Zero - select a Yes to Doctor
    cy.contains('No');
    cy.contains('Yes').click();

    //Step One - Login details signup
    cy.get('input[name="Email"]').type(newEmail).should('have.value', newEmail);

    cy.get('input[name="Password"]')
      .type('password')
      .should('have.value', 'password');

    cy.get('input[name="Confirm"]')
      .type('password')
      .should('have.value', 'password');

    cy.contains('Previous');
    cy.contains('Next').click();

    //Step Two - Basic Information
    cy.get('select[name="Title"]').select('Dr').should('have.value', 'Dr');
    cy.get('input[name="First Name"]')
      .type('Harry')
      .should('have.value', 'Harry');
    cy.get('input[name="Last Name"]')
      .type('Buisman')
      .should('have.value', 'Buisman');
    cy.get('select[name="Sex"]').select('male').should('have.value', 'male');
    cy.get('input[name="Date of Birth"]')
      .type('1995-10-10')
      .should('have.value', '1995-10-10');
    cy.get('input[name="Mobile number"]')
      .clear()
      .type('+61428728937')
      .should('have.value', '+61428728937');
    cy.get('input[name="Street No."]').type(5).should('have.value', 5);
    cy.get('input[name="Street"]')
      .type('Beach Rd')
      .should('have.value', 'Beach Rd');
    cy.get('input[name="City"]').type('Bondi').should('have.value', 'Bondi');
    cy.get('input[name="State"]').type('NSW').should('have.value', 'NSW');
    cy.get('select[name="Country"]')
      .select('Australia')
      .should('have.value', 'Australia');
    cy.get('input[name="Postcode"]').type(2024).should('have.value', 2024);

    cy.contains('Previous');
    cy.contains('Next').click();

    //Step Three - Doctor Info
    cy.get('input[name="Licence"]')
      .type('AUSDOC123')
      .should('have.value', 'AUSDOC123');
    cy.get('input[name="Accreditation"]')
      .type('Doctor of Medicine')
      .should('have.value', 'Doctor of Medicine');
    cy.get('input[name="Specialty Field"]')
      .type('General Practitioner')
      .should('have.value', 'General Practitioner');
    cy.get('input[name="Sub Specialty Field"]')
      .type('Cardiology')
      .should('have.value', 'Cardiology');
    cy.get('input[name="Education"]')
      .type('University of New South Wales')
      .should('have.value', 'University of New South Wales');
    cy.get('input[name="Years of Experience"]').type(5).should('have.value', 5);
    cy.get('select[name="Language"]')
      .select('English')
      .should('have.value', 'English');

    // cy.get('.btn-box .button-wrapper > button').click({ multiple: true });
    // cy.get('input[name="Accreditation"]')
    //   .type('Doctor of Surgery')
    //   .should('have.value', 'Doctor of Surgery');

    cy.contains('Previous');
    cy.contains('Submit').click();

    cy.wait(2000);
    cy.url().should('include', '/profile');
  });
});
