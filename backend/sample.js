const omitDeep = require('omit-deep-lodash');

const data = {
  user: {
    _id: '5f20c405669fd62a9d00e1f5',
    firstName: 'Hasadfasdi',
    lastName: 'Doctorson',
    title: 'Sir',
    sex: 'male',
    dateOfBirth: '1999-05-10T14:00:00.000Z',
    phoneNumber: '04104820594',
    email: 'asdfasd112323@gmail.com',
    isDoctor: false,
    address: {
      number: 4,
      street: 'Beamish Street',
      city: 'Sydney',
      state: 'New South Wales',
      country: 'Australia',
      postcode: 2149,
    },
    clientInfo: {
      weight: 55,
      medicalHistory: [
        {
          _id: '5f20c405669fd62a9d00e1f6',
          startDate: '2005-03-04T13:00:00.000Z',
          condition: 'High Blood Pressure',
          notes: 'Due to old age',
        },
        {
          _id: '5f20c405669fd62a9d00e1f7',
          startDate: '2003-11-10T13:00:00.000Z',
          condition: 'Pneumonia',
          notes: 'Due to travel to Africa',
        },
      ],
      allergies: [
        {
          _id: '5f20c405669fd62a9d00e1f8',
          severity: 3,
          name: 'Dust allergy',
        },
        {
          _id: '5f20c405669fd62a9d00e1f9',
          severity: 2,
          name: 'Pollen allergy',
        },
      ],
      medication: [
        {
          _id: '5f20c405669fd62a9d00e1fa',
          name: 'Magic mushroom',
          dosage: 200,
          manufacturer: 'Brazil',
        },
        {
          _id: '5f20c405669fd62a9d00e1fb',
          name: 'Cannabis',
          dosage: 100,
          manufacturer: 'Australia',
        },
      ],
      bloodType: 'A+',
    },
    createdAt: '2020-07-29T00:34:13.820Z',
    __v: 1,
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjIwYzQwNTY2OWZkNjJhOWQwMGUxZjUiLCJpYXQiOjE1OTU5ODI4NTN9.1bBArclk0qA-po7Ci3yKO4RC2JW9Bu9V-yRIoA857Ck',
};

const sanitizeData = omitDeep(data, ['_id', 'createdAt', '__v']);

console.log(sanitizeData);
