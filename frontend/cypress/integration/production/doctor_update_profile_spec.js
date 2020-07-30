const faker = require('faker');
const newEmail = faker.internet.email();

//REPLACE WITH SIGNIN AND CREDENTIALS ONCE OPERATIONAL
// describe('Doctor Sign Up', () => {
describe('Doctor Signup + Update Doctor Profile', () => {
  it('Visits CloudClinic', () => {
    cy.visit('https://cloudclinic00.herokuapp.com/home');

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
    cy.contains('Previous');
    cy.contains('Submit').click();

    cy.wait(2000);
    cy.url().should('include', '/profile');
    //   });
    // });

    //ISSUE WHEN PUTTING IN SEPARATE DESCRIBE BLOCKS
    // describe('Doctor Update Profile', () => {
    //   it('Visits CloudClinic Account Settings', () => {
    cy.visit('https://cloudclinic00.herokuapp.com/settings');
    cy.url().should('include', '/setting');

    //Check that correct html elements are present
    cy.contains('Settings');
    cy.contains('Update Profile');
    cy.contains('Login Details');
    cy.contains('Basic Information');
    cy.contains('Address');
    cy.contains('Medical Licencing & Accreditation');

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

    //Doctor Info
    cy.get('input[name="Licence"]')
      .clear()
      .type('TIM')
      .should('have.value', 'TIM');
    cy.get('input[name="Accreditation"]')
      .first()
      .clear()
      .type('Doctor of Surgery')
      .should('have.value', 'Doctor of Surgery');
    //Workaround for when there are two Accreditation fields
    //Comment out otherwise
    // cy.get('input[name="Accreditation"]')
    //   .last()
    //   .clear()
    //   .type('Doctor of Psychology')
    //   .should('have.value', 'Doctor of Psychology');

    cy.get('input[name="Specialty Field"]')
      .clear()
      .type('General Practitioner')
      .should('have.value', 'General Practitioner');
    cy.get('input[name="Sub Specialty Field"]')
      .clear()
      .type('Cardiology')
      .should('have.value', 'Cardiology');
    cy.get('input[name="Education"]')
      .first()
      .clear()
      .type('University of Technology Sydney')
      .should('have.value', 'University of Technology Sydney');
    //Comment out if necessary
    // cy.get('input[name="Education"]')
    //   .last()
    //   .clear()
    //   .type('University of Sydney')
    //   .should('have.value', 'University of Sydney');

    cy.get('input[name="Years of Experience"]')
      .clear()
      .type(11)
      .should('have.value', 11);
    cy.get('select[name="Language"]')
      .first()
      .select('Spanish')
      .should('have.value', 'Spanish');

    //Submit Update Button
    cy.get('button').contains('Update').click();

    cy.wait(2000);
    cy.url().should('include', '/profile');
  });
});
