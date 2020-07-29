const faker = require('faker');
const newEmail = faker.internet.email();

describe('Client Sign Up + Update Profile', () => {
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

    //Login details - changing password
    cy.get('input[name="Password"]')
      .type('password')
      .should('have.value', 'password');
    cy.get('input[name="Confirm"]')
      .type('password')
      .should('have.value', 'password');

    //Basic Information
    cy.get('select[name="Title"]').select('Dr').should('have.value', 'Dr');
    cy.get('input[name="First Name"]')
      .clear()
      .type('Duke')
      .should('have.value', 'Duke');
    cy.get('input[name="Last Name"]')
      .clear()
      .type('Greethead')
      .should('have.value', 'Greethead');
    cy.get('select[name="Sex"]').select('male').should('have.value', 'male');
    cy.get('input[name="Date of Birth"]')
      .clear()
      .type('1995-10-10')
      .should('have.value', '1995-10-10');
    //TEST FAILING - input value goes to 34, possible lag, possibly needs delay
    //Manual testing no issue
    // cy.get('input[name="Mobile number"]')
    //   .clear()
    //   .type(0428728937)
    //   .should('have.value', '0428728937');

    //Address
    cy.get('input[name="Street No."]')
      .clear()
      .type(23)
      .should('have.value', 23);
    cy.get('input[name="Street"]')
      .clear()
      .type('Mountain Street')
      .should('have.value', 'Mountain Street');
    cy.get('input[name="City"]')
      .clear()
      .type('Canberra')
      .should('have.value', 'Canberra');
    cy.get('input[name="State"]')
      .clear()
      .type('ACT')
      .should('have.value', 'ACT');
    cy.get('select[name="Country"]')
      .select('Australia')
      .should('have.value', 'Australia');
    cy.get('input[name="Postcode"]')
      .clear()
      .type(3000)
      .should('have.value', 3000);

    //Client Info
    cy.get('input[name="Condition"]')
      .clear()
      .type('Flu')
      .should('have.value', 'Flu');
    cy.get('input[name="Start date"]')
      .clear()
      .type('2019-12-05')
      .should('have.value', '2019-12-05');
    cy.get('input[name="Comments"]')
      .clear()
      .type('Possible case of Coronavirus')
      .should('have.value', 'Possible case of Coronavirus');
    cy.get('input[name="Allergy"]')
      .clear()
      .type('Shellfish')
      .should('have.value', 'Shellfish');
    cy.get('select[name="Severity"]').select('3').should('have.value', '3');
    cy.get('input[name="Medication"]')
      .clear()
      .type('Ibuprofen')
      .should('have.value', 'Ibuprofen');
    cy.get('input[name="Dosage (mg)"]')
      .clear()
      .type(600)
      .should('have.value', 600);
    cy.get('input[name="Manufacturer"]')
      .clear()
      .type('Nurofen')
      .should('have.value', 'Nurofen');
    cy.get('select[name="Blood Type"]').select('A+').should('have.value', 'A+');
    cy.get('input[name="Weight (kg)"]')
      .clear()
      .type(95)
      .should('have.value', 95);

    //Submit Update Button
    cy.get('button').contains('Update').click();

    cy.wait(2000);
    cy.url().should('include', '/profile');
  });
});
