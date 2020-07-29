const omitDeep = require('omit-deep-lodash');

const data = {
  address: {
    number: 4,
    street: 'Beamish Street',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    postcode: 2149,
  },
  doctorInfo: {
    licence: 'MIT',
    schedule: {
      workingHours: [],
      unavailabilities: [
        {
          _id: '5f20fb1330dedf39d300ddb6',
          duration: 30,
          include: false,
          ruleInstructionText: 'every week until July 29, 2021',
        },
        {
          _id: '5f20fb1330dedf39d300ddb7',
          duration: 30,
          include: false,
          ruleInstructionText: 'every week until July 31, 2021',
        },
      ],
    },
    accreditations: ['USyd', 'UNSW'],
    specialtyField: 'Dentistry',
    subSpecialtyField: 'Prosthodontics',
    education: ['ANU', 'Macquarie University'],
    yearsExperience: 10,
    tags: ['Orthodontics', 'Prosthodontics'],
    languagesSpoken: ['Cantonese', 'Mandarin', 'Japanese', 'English'],
  },
  _id: '5f20f89430dedf39d300dda0',
  firstName: 'asdfasdfasdfasdfasdf',
  lastName: 'Nguyen',
  title: 'sadfasdfsadf',
  sex: 'male',
  dateOfBirth: '05/11/1999',
  phoneNumber: '04104820594',
  email: 'w34234121223asdf@gmail.com',
  isDoctor: true,
  createdAt: '2020-07-29T04:18:28.582Z',
  __v: 1,
};

const sanitizedData = omitDeep(data, ['_id', '__v', 'createdAt']);

console.log(sanitizedData);
