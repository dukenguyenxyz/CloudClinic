/* eslint-disable radix */
/* eslint-disable no-undef */

// Data Blueprint

const data = [
  {
    model: 'User',
    documents: [
      {
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
              condition: 'Asthma',
              notes: 'Lorem Ipsum',
            },
          ],
          allergies: [
            {
              name: 'peanut',
              severity: Math.floor(Math.random() * 5) + 1,
            },
          ],
          medication: [
            {
              name: 'penicillin',
              dosage: Math.floor(Math.random() * 5) + 1,
              manufacturer: faker.company.companyName(),
            },
          ],
          bloodType: 'O+',
        },
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        title: 'Dr',
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
        isDoctor: true,
        doctorInfo: {
          licence: 'AustDocL123',
          accreditation: 'Doctor of Medicine',
          specialtyField: 'General Practitioner',
          subSpecialtyField: 'Paediatrics',
          education: ['University of Sydney'],
          yearsExperience: Math.floor(Math.random() * 50) + 1,
          tags: ['Sydney', 'Paediatrics'],
          languagesSpoken: ['English', 'Spanish'],
          rating: Math.floor(Math.random() * 5) + 1,
        },
      },
    ],
  },
];
