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
    model: 'User',
    documents: [
      // {
      //   firstName: faker.name.firstName(),
      //   lastName: faker.name.lastName(),
      //   title: 'Mr',
      //   sex: 'male',
      //   weight:
      //     Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
      //   dateOfBirth: faker.date.past(),
      //   phoneNumber: faker.phone.phoneNumber(),
      //   address: {
      //     number:
      //       Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
      //       minAddrNum,
      //     street: faker.address.streetName(),
      //     city: faker.address.city(),
      //     state: faker.address.state(),
      //     country: faker.address.country(),
      //     postcode: parseInt(faker.address.zipCode()),
      //   },
      //   email: faker.internet.email(),
      //   password: 'password',
      //   isDoctor: false,
      //   clientInfo: {
      //     medicalHistory: [
      //       {
      //         startDate: faker.date.recent(),
      //         condition: 'Asthma',
      //         notes: 'Lorem Ipsum',
      //       },
      //     ],
      //     allergies: [
      //       {
      //         name: 'peanut',
      //         severity: Math.floor(Math.random() * 5) + 1,
      //       },
      //     ],
      //     medication: [
      //       {
      //         name: 'penicillin',
      //         dosage: Math.floor(Math.random() * 5) + 1,
      //         manufacturer: faker.company.companyName(),
      //       },
      //     ],
      //     bloodType: 'O+',
      //   },
      // },
      // {
      //   firstName: faker.name.firstName(),
      //   lastName: faker.name.lastName(),
      //   title: 'Dr',
      //   sex: 'male',
      //   weight:
      //     Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
      //   dateOfBirth: faker.date.past(),
      //   phoneNumber: faker.phone.phoneNumber(),
      //   address: {
      //     number:
      //       Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
      //       minAddrNum,
      //     street: faker.address.streetName(),
      //     city: faker.address.city(),
      //     state: faker.address.state(),
      //     country: faker.address.country(),
      //     postcode: parseInt(faker.address.zipCode()),
      //   },
      //   email: faker.internet.email(),
      //   password: 'password',
      //   isDoctor: true,
      //   doctorInfo: {
      //     licence: 'AustDocL123',
      //     accreditation: 'Doctor of Medicine',
      //     specialtyField: 'General Practitioner',
      //     subSpecialtyField: 'Paediatrics',
      //     education: ['University of Sydney'],
      //     yearsExperience: Math.floor(Math.random() * 50) + 1,
      //     tags: ['Sydney', 'Paediatrics'],
      //     languagesSpoken: ['English', 'Spanish'],
      //     rating: Math.floor(Math.random() * 5) + 1,
      //   },
      // },
    ],
  },
];

const seedClients = () => {
  const numClients = 30;
  const medicationsArr = [
    'penicilin',
    'prednisone',
    'metformin',
    'ibuprofen',
    'paracetamol',
  ];
  const conditionsArr = [
    'asthma',
    'hypertension',
    'arthritis',
    'diabetes',
    'bronchitis',
    'influenza',
  ];
  const allergiesArr = [
    'eggs',
    'milk',
    'peanuts',
    'soy',
    'wheat',
    'shellfish',
    'sesame',
  ];
  const bloodTypeArr = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  for (let i = 0; i < numClients; i++) {
    data[0].documents.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      title: 'Mr',
      sex: 'male',
      weight:
        Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
      dateOfBirth: faker.date.past(),
      phoneNumber: faker.phone.phoneNumber(),
      address: {
        number:
          Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
          minAddrNum,
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        postcode: parseInt(faker.address.zipCode()),
      },
      email: faker.internet.email(),
      password: 'password',
      isDoctor: false,
      clientInfo: {
        medicalHistory: [
          {
            startDate: faker.date.recent(),
            condition:
              conditionsArr[Math.floor(Math.random() * conditionsArr.length)],
            notes: 'Lorem Ipsum',
          },
        ],
        allergies: [
          {
            name: allergiesArr[Math.floor(Math.random() * allergiesArr.length)],
            severity: Math.floor(Math.random() * 5) + 1,
          },
        ],
        medication: [
          {
            name:
              medicationsArr[Math.floor(Math.random() * medicationsArr.length)],
            dosage: Math.floor(Math.random() * 5) + 1,
            manufacturer: faker.company.companyName(),
          },
        ],
        bloodType:
          bloodTypeArr[Math.floor(Math.random() * bloodTypeArr.length)],
      },
    });
  }
};

const seedDoctors = () => {
  const numDoctors = 10;
  const specialtyFieldArr = [
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
  ];

  const educationArr = [
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
  ];

  const languagesArr = [
    'Mandarin',
    'Spanish',
    'French',
    'Vietnamese',
    'Arabic',
    'Indonesian',
    'Cantonese',
    'Portuguese',
    'German',
  ];

  for (let i = 0; i < numDoctors; i++) {
    data[0].documents.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      title: 'Dr',
      sex: 'female',
      weight:
        Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
      dateOfBirth: faker.date.past(),
      phoneNumber: faker.phone.phoneNumber(),
      address: {
        number:
          Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
          minAddrNum,
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        postcode: parseInt(faker.address.zipCode()),
      },
      email: faker.internet.email(),
      password: 'password',
      isDoctor: true,
      doctorInfo: {
        licence: 'AustDocL'
          .concat(Math.floor(Math.random() * 50) + 1)
          .toString(),
        accreditation: 'Doctor of Medicine',
        specialtyField:
          specialtyFieldArr[
            Math.floor(Math.random() * specialtyFieldArr.length)
          ],
        subSpecialtyField:
          specialtyFieldArr[
            Math.floor(Math.random() * specialtyFieldArr.length)
          ],
        education: [
          specialtyFieldArr[
            Math.floor(Math.random() * specialtyFieldArr.length)
          ],
        ],
        yearsExperience: Math.floor(Math.random() * 50) + 1,
        languagesSpoken: [
          'English',
          languagesArr[Math.floor(Math.random() * languagesArr.length)],
        ],
        rating: Math.floor(Math.random() * 5) + 1,
      },
    });
  }
};

seedClients();
seedDoctors();

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://127.0.0.1:27017/cloudclinic', function () {
  // Load Mongoose models
  seeder.loadModels(['../models/User.js']);

  // Clear specified collections
  seeder.clearModels(['User'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});
