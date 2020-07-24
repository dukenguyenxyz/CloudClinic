/* eslint-disable radix */
const faker = require('faker');
const _ = require('lodash');

// // Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'User',
    documents: [],
  },
];

const sexes = ['male', 'female', 'other'];

const generateUser = () => {
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

    const newUser = Object.assign(generateUser(), clientInfoGen);

    data[0].documents.push(newUser);
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
    data[0].documents.push({
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
    });
  }
};

seedClients(30);
seedDoctors(10);
