const faker = require('faker');
const newEmail = faker.internet.email();

//CHANGE TO SIGN IN ONCE FUNCTIONAL
describe('Client Sign Up + Delete Profile', () => {
  it('Visits CloudClinic', () => {
    cy.visit('http://localhost:3000/home');

    cy.contains('Sign up').click();
    cy.url().should('include', '/authentication');

    //Step Zero
    cy.contains('Yes');
    cy.contains('No').click();

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
      .type('Hugh')
      .should('have.value', 'Hugh');
    cy.get('input[name="Last Name"]')
      .type('Greethead')
      .should('have.value', 'Greethead');
    cy.get('select[name="Sex"]').select('male').should('have.value', 'male');
    cy.get('input[name="Date of Birth"]')
      .type('1998-12-20')
      .should('have.value', '1998-12-20');
    cy.get('input[name="Mobile number"]')
      .type(428728937)
      .should('have.value', '+61428728937');
    cy.get('input[name="Street No."]').type(3).should('have.value', 3);
    cy.get('input[name="Street"]')
      .type('Beach Rd')
      .should('have.value', 'Beach Rd');
    cy.get('input[name="City"]').type('Coogee').should('have.value', 'Coogee');
    cy.get('input[name="State"]').type('NSW').should('have.value', 'NSW');
    cy.get('select[name="Country"]')
      .select('Australia')
      .should('have.value', 'Australia');
    cy.get('input[name="Postcode"]').type(2020).should('have.value', 2020);

    cy.contains('Previous');
    cy.contains('Next').click();

    //Step Three - Client Info
    cy.get('input[name="Condition"]')
      .type('Sore Knee')
      .should('have.value', 'Sore Knee');
    cy.get('input[name="Start date"]')
      .type('2019-10-10')
      .should('have.value', '2019-10-10');
    cy.get('input[name="Comments"]')
      .type('Swollen')
      .should('have.value', 'Swollen');
    cy.get('input[name="Allergy"]').type('Grass').should('have.value', 'Grass');
    cy.get('select[name="Severity"]').select('1').should('have.value', '1');
    cy.get('input[name="Medication"]')
      .type('Paracetamol')
      .should('have.value', 'Paracetamol');
    cy.get('input[name="Dosage (mg)"]').type(500).should('have.value', 500);
    cy.get('input[name="Manufacturer"]')
      .type('Panadol')
      .should('have.value', 'Panadol');
    cy.get('select[name="Blood Type"]').select('O+').should('have.value', 'O+');
    cy.get('input[name="Weight (kg)"]').type(82).should('have.value', 82);

    cy.contains('Previous');
    cy.contains('Submit').click();

    cy.wait(2000);
    cy.url().should('include', '/profile');

    // describe('Doctor Update Profile', () => {
    //   it('Visits CloudClinic Account Settings', () => {
    cy.visit('http://localhost:3000/settings');
    cy.url().should('include', '/setting');

    //Check that correct html elements are present
    cy.contains('Settings');
    cy.contains('Update Profile');
    cy.contains('Login Details');
    cy.contains('Basic Information');
    cy.contains('Address');

    //Submit Update Button
    cy.get('button').contains('Delete your account').click();

    cy.wait(2000);
    //redirects to root directory
    cy.url().should('include', '/');
  });
});
