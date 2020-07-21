/* eslint-disable radix */
const seeder = require('mongoose-seed');
const faker = require('faker');

const minWeight = 2;
const maxWeight = 180;
const minAddrNum = 1;
const maxAddrNum = 250;

// // Data array containing seed data - documents organized by Model
const data = [
  {
    model : 'User',
    documents : [
      {
        firstName : faker.name.firstName(),
        lastName : faker.name.lastName(),
        title : 'Mr',
        sex : 'male',
        weight :
            Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
        dateOfBirth : faker.date.past(),
        phoneNumber : faker.phone.phoneNumber(),
        address : {
          number : Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
                       minAddrNum,
          street : faker.address.streetName(),
          city : faker.address.city(),
          state : faker.address.state(),
          country : faker.address.country(),
          postcode : parseInt(faker.address.zipCode()),
        },
        email : faker.internet.email(),
        password : 'password',
        isDoctor : false,
        clientInfo : {
          medicalHistory : [
            {
              startDate : faker.date.recent(),
              condition : 'Asthma',
              notes : 'Lorem Ipsum',
            },
          ],
          allergies : [
            {
              name : 'peanut',
              severity : Math.floor(Math.random() * Math.floor(5)),
            },
          ],
          medication : [
            {
              name : 'penicillin',
              dosage : Math.floor(Math.random() * Math.floor(6)),
              manufacturer : faker.company.companyName(),
            },
          ],
          bloodType : 'O+',
        },
      },
      {
        firstName : faker.name.firstName(),
        lastName : faker.name.lastName(),
        title : 'Dr',
        sex : 'male',
        weight :
            Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
        dateOfBirth : faker.date.past(),
        phoneNumber : faker.phone.phoneNumber(),
        address : {
          number : Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
                       minAddrNum,
          street : faker.address.streetName(),
          city : faker.address.city(),
          state : faker.address.state(),
          country : faker.address.country(),
          postcode : parseInt(faker.address.zipCode()),
        },
        email : faker.internet.email(),
        password : 'password',
        isDoctor : true,
        doctorInfo : {
          licence : 'AustDocL123',
          accreditation : 'Doctor of Medicine',
          specialtyField : 'General Practitioner',
          subSpecialtyField : 'Paediatrics',
          education : [ 'University of Sydney' ],
          yearsExperience : Math.floor(Math.random() * Math.floor(50)),
          tags : [ 'Sydney', 'Paediatrics' ],
          languagesSpoken : [ 'English', 'Spanish' ],
          rating : Math.floor(Math.random() * Math.floor(5)),
        },
      },
    ],
  },
];

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://127.0.0.1:27017/cloudclinic', function() {
  // Load Mongoose models
  seeder.loadModels([ '../models/User.js' ]);

  // Clear specified collections
  seeder.clearModels([ 'User' ], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() { seeder.disconnect(); });
  });
});
