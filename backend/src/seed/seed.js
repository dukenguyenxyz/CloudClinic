/* eslint-disable radix */
const seeder = require('mongoose-seed');
const faker = require('faker');
const _ = require('lodash');
const moment = require('moment');
require('colors');

// // Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'User',
    documents: [],
  },
];

const generateUser = () => {
  const sexes = ['male', 'female'];

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sex: _.sample(sexes),
    dateOfBirth: faker.date.past(),
    phoneNumber: faker.phone.phoneNumber(),
    address: {
      number: _.random(1, 250),
      street: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      postcode: parseInt(faker.address.zipCode()),
    },
    email: faker.internet.email(),
    password: '123456789',
  };
};

const seedClients = (numClients) => {
  const clientInfo = {
    titles: ['Dr', 'Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Rev', 'Sir'],
    bloodTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    medications: [
      'penicilin',
      'prednisone',
      'metformin',
      'ibuprofen',
      'paracetamol',
    ],
    conditions: [
      'asthma',
      'hypertension',
      'arthritis',
      'diabetes',
      'bronchitis',
      'influenza',
    ],
    allergies: [
      'eggs',
      'milk',
      'peanuts',
      'soy',
      'wheat',
      'shellfish',
      'sesame',
    ],
  };

  for (let i = 0; i < numClients; i += 1) {
    const clientInfoGen = {
      title: _.sample(clientInfo.titles),
      isDoctor: false,
      clientInfo: {
        weight: _.random(40, 100),
        medicalHistory: [
          {
            startDate: faker.date.recent(),
            condition: _.sample(clientInfo.conditions),
            notes: 'Lorem Ipsum',
          },
        ],
        allergies: [
          {
            name: _.sample(clientInfo.allergies),
            severity: _.random(1, 5),
          },
        ],
        medication: [
          {
            name: _.sample(clientInfo.medications),
            dosage: _.random(1, 5),
            manufacturer: faker.company.companyName(),
          },
        ],
        bloodType: _.sample(clientInfo.bloodType),
      },
    };

    const newClient = Object.assign(generateUser(), clientInfoGen);

    data[0].documents.push(newClient);
  }
};

const seedDoctors = (numDoctors) => {
  const doctorInfo = {
    specialtyFields: [
      'General Practitioner',
      'Cardiology',
      'Paediatrics',
      'Dermatology',
      'Ophthalmology',
      'Endocrinology',
      'Gastroenterology',
      'Oncology',
      'Urology',
      'Gynecology',
    ],
    educations: [
      'University of Sydney',
      'University of New South Wales',
      'University of Newcastle',
      'Western Sydney University',
      'University of Technology Sydney',
      'University of Queensland',
      'University of Melbourne',
      'Monash University',
      'Australian National University',
      'University of Western Australia',
      'University of Wollongong',
    ],
    languages: [
      'English',
      'Mandarin',
      'Spanish',
      'French',
      'Vietnamese',
      'Arabic',
      'Indonesian',
      'Cantonese',
      'Portuguese',
      'German',
    ],
  };

  for (let i = 0; i < numDoctors; i += 1) {
    const doctorInfoGen = {
      title: 'Dr',
      isDoctor: true,
      doctorInfo: {
        licence: 'AustDocL'.concat(_.random(1, 50)).toString(),
        accreditation: 'Doctor of Medicine',
        specialtyField: _.sample(doctorInfo.specialtyFields),
        subSpecialtyField: _.sample(doctorInfo.specialtyFields),
        education: [_.sample(doctorInfo.educations)],
        yearsExperience: _.random(1, 50),
        languagesSpoken: [_.sample(doctorInfo.languages)],
        rating: Math.floor(Math.random() * 5) + 1,
      },
    };

    const newDoctor = Object.assign(generateUser(), doctorInfoGen);

    data[0].documents.push(newDoctor);
  }
};

const seedNewSessions = (endDate) => {
  const startDate = Date.now();
  console.log(startDate, endDate);
};

const seedBookings = (rate) => {
  console.log(rate);
};

const runSeeds = () => {
  seedClients(30);
  seedDoctors(10);
  seedNewSessions('12/12/2021');
  seedBookings(60);
};

runSeeds();

seeder.connect('mongodb://127.0.0.1:27017/cloudclinic', function () {
  // Load Mongoose models
  seeder.loadModels([
    '../models/User.js',
    // '../models/Session.js',
  ]);

  // Clear specified collections
  seeder.clearModels(['User'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

console.log(`Seeding starts`.green.bold);
