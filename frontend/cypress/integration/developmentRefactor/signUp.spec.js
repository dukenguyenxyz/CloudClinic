const populateStep0 = () => {
  const faker = require('faker');
  const newEmail = faker.internet.email();
  cy.get('[data-cy=email]').type(newEmail).should('have.value', newEmail);
  cy.get('[data-cy=password]')
    .type('password')
    .should('have.value', 'password');
  cy.get('[data-cy=confirm]').type('password').should('have.value', 'password');
};

const populateStep1 = () => {
  cy.get('[data-cy=title]').select('Mr').should('have.value', 'Mr');
  cy.get('[data-cy=firstName]').type('John').should('have.value', 'John');
  cy.get('[data-cy=lastName]').type('Doe').should('have.value', 'Doe');
  cy.get('[data-cy=sex]').select('male').should('have.value', 'male');
  cy.get('[data-cy=dob]').type('1998-12-20').should('have.value', '1998-12-20');
  cy.get('[data-cy=phone]')
    .clear()
    .type('+6140999777')
    .should('have.value', '+6140999777');
  cy.get('[data-cy=addressNumber]').type('2/A3').should('have.value', '2/A3');
  cy.get('[data-cy=street]')
    .type('Westwood Avenue')
    .should('have.value', 'Westwood Avenue');
  cy.get('[data-cy=city]').type('Sydney').should('have.value', 'Sydney');
  cy.get('[data-cy=state]').type('NSW').should('have.value', 'NSW');
  cy.get('[data-cy=country]').select('Algeria').should('have.value', 'Algeria');
  cy.get('[data-cy=postcode]').type('2000').should('have.value', '2000');
};

const checkEmptyFieldValidation = () => {
  cy.get('button').contains('Next').click();
  cy.get('.flash-message').should('contain', 'Please fill in all the inputs');
};

const resetTest = user => {
  const directive = user === 'client' ? 'No' : 'Yes';

  cy.visit('http://localhost:3000/');
  cy.get('button').contains('Sign up').click();
  cy.url().should('include', '/authentication');

  cy.get('button').contains('Sign in');

  cy.log('Stage 0 - has both doctor and client options');
  cy.get('.form-container').contains('Yes');
  cy.get('.form-container').contains(directive).click();
};

describe('Client sign up', () => {
  const populateStep2Client = () => {
    cy.get('[data-cy=condition-0]')
      .type('heart disease')
      .should('have.value', 'heart disease');
    cy.get('[data-cy=conditionStartDate-0]')
      .type('2009-12-20')
      .should('have.value', '2009-12-20');
    cy.get('[data-cy=conditionComment-0]')
      .type('lorem ipsum dolor sit, amet consectetur adipisicing elit')
      .should(
        'have.value',
        'lorem ipsum dolor sit, amet consectetur adipisicing elit'
      );
    cy.get('[data-cy=conditionAdd-0]').click();
    cy.get('[data-cy=condition-1]')
      .type('high blood pressure')
      .should('have.value', 'high blood pressure');
    cy.get('[data-cy=conditionStartDate-1]')
      .type('2005-12-20')
      .should('have.value', '2005-12-20');
    cy.get('[data-cy=conditionComment-1]')
      .type('lorem ipsum dolor sit, amet consectetur adipisicing elit')
      .should(
        'have.value',
        'lorem ipsum dolor sit, amet consectetur adipisicing elit'
      );
    cy.get('[data-cy=allergy-0]').type('latex').should('have.value', 'latex');
    cy.get('[data-cy=severity-0]').select('4').should('have.value', '4');
    cy.get('[data-cy=allergyAdd-0]').click();
    cy.get('[data-cy=allergy-1]').type('honey').should('have.value', 'honey');
    cy.get('[data-cy=severity-1]').select('3').should('have.value', '3');
    cy.get('[data-cy=medication-0]')
      .type('elocon')
      .should('have.value', 'elocon');
    cy.get('[data-cy=dosage-0]').type('500').should('have.value', '500');
    cy.get('[data-cy=manufacturer-0]')
      .type('Merck Sharp and Dohme')
      .should('have.value', 'Merck Sharp and Dohme');
    cy.get('[data-cy=medicationAdd-0]').click();
    cy.get('[data-cy=medication-1]')
      .type('augmentin')
      .should('have.value', 'augmentin');
    cy.get('[data-cy=dosage-1]').type('700').should('have.value', '700');
    cy.get('[data-cy=manufacturer-1]')
      .type('Curam Duoa')
      .should('have.value', 'Curam Duoa');
    cy.get('[data-cy=bloodType]').select('A+').should('have.value', 'A+');
    cy.get('[data-cy=weight]').type('90').should('have.value', '90');
  };

  beforeEach(() => {
    resetTest('client');
  });

  it('can complete the form', () => {
    populateStep0();
    cy.get('button').contains('Next').click();

    populateStep1();
    cy.get('button').contains('Next').click();

    populateStep2Client();

    cy.get('button').contains('Previous');
    cy.get('button').contains('Submit').click();

    cy.wait(2000);
    cy.get('.flash-message').should('not.exist');
    cy.url().should('include', '/profile');
  });

  // Validation checks
  it('displays form validation error messages', () => {
    const faker = require('faker');
    const newEmail = faker.internet.email();
    cy.get('[data-cy=email]').type(newEmail);
    cy.get('[data-cy=password]').type('password');
    cy.get('button').contains('Next').click();
    cy.get('.flash-message').should('contain', 'Please fill in all the inputs');
    cy.get('[data-cy=confirm]').type('password');
    cy.get('[data-cy=email]').clear().type('someemail@gm');
    cy.get('button').contains('Next').click();
    cy.get('.flash-message').should(
      'contain',
      'Please enter a valid email address'
    );
    cy.get('[data-cy=confirm]').type('p');
    cy.get('button').contains('Next').click();
    cy.get('.flash-message').should('contain', 'Passwords do not match');

    // Password length error message
    cy.get('[data-cy]').clear();
    cy.get('[data-cy=email]').type(newEmail);
    cy.get('[data-cy=password]').type('pass');
    cy.get('[data-cy=confirm]').type('pass');
    cy.get('button').contains('Next').click();
    cy.get('.flash-message').should(
      'contain',
      'Passwords must be at least 6 characters'
    );

    cy.get('[data-cy]').clear();
    cy.get('[data-cy=email]').type(newEmail);
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=confirm]').type('password');
    cy.get('button').contains('Next').click();
    checkEmptyFieldValidation();
    populateStep1();
    cy.get('[data-cy=city]').clear();
    checkEmptyFieldValidation();
    cy.get('[data-cy=city]').type('Sydney').should('have.value', 'Sydney');
    cy.get('button').contains('Next').click();
    populateStep2Client();
    cy.get('[data-cy=weight]').clear();
    cy.get('button').contains('Submit').click();
    cy.get('.flash-message').should('contain', 'Please include your weight');
    cy.get('[data-cy=weight]').type('75').should('have.value', '75');

    cy.get('button').contains('Previous');
    cy.get('button').contains('Submit').click();

    cy.wait(2000);
    cy.get('.flash-message').should('not.exist');
    cy.url().should('include', '/profile');
  });
});

describe('Doctor sign up', () => {
  const populateStep2Doctor = () => {
    cy.get('[data-cy=licence]')
      .type('AEW29397422')
      .should('have.value', 'AEW29397422');
    cy.get('[data-cy=accreditation-0]')
      .type('Doctor of Medicine')
      .should('have.value', 'Doctor of Medicine');
    cy.get('[data-cy=accreditationAdd-0]').click();
    cy.get('[data-cy=accreditation-1]')
      .type('Doctor of Dental Medicine')
      .should('have.value', 'Doctor of Dental Medicine');
    cy.get('[data-cy=specialtyField]')
      .type('General Practice')
      .should('have.value', 'General Practice');
    cy.get('[data-cy=subSpecialtyField]')
      .type('Forensic odontology')
      .should('have.value', 'Forensic odontology');
    cy.get('[data-cy=education-0]').type('USYD').should('have.value', 'USYD');
    cy.get('[data-cy=educationAdd-0]').click();
    cy.get('[data-cy=education-1]').type('NSW').should('have.value', 'NSW');
    cy.get('[data-cy=yearsExp]').type('10').should('have.value', '10');
    cy.get('[data-cy=languages-0]')
      .select('English')
      .should('have.value', 'English');
    cy.get('[data-cy=languagesAdd-0]').click();
    cy.get('[data-cy=languages-1]')
      .select('Portuguese')
      .should('have.value', 'Portuguese');
  };

  beforeEach(() => {
    resetTest('doctor');
  });

  it('can complete the form', () => {
    populateStep0();
    cy.get('button').contains('Next').click();

    populateStep1();
    cy.get('button').contains('Next').click();

    populateStep2Doctor();
    cy.get('button').contains('Submit').click();

    cy.wait(2000);
    cy.get('.flash-message').should('not.exist');
    cy.url().should('include', '/profile');
  });

  it('can display validation and errors', () => {
    populateStep0();
    cy.get('button').contains('Next').click();

    populateStep1();
    cy.get('button').contains('Next').click();

    populateStep2Doctor();
    cy.get('[data-cy=licence]').clear();
    cy.get('button').contains('Submit').click();
    cy.get('.flash-message').should(
      'contain',
      'Please include a valid licence number'
    );
    cy.get('[data-cy=licence]')
      .type('8328787AEW')
      .should('have.value', '8328787AEW');
    cy.get('button').contains('Submit').click();

    cy.wait(2000);
    cy.get('.flash-message').should('not.exist');
    cy.url().should('include', '/profile');
  });
});
