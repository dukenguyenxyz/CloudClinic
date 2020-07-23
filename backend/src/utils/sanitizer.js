/* eslint-disable no-return-assign */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-param-reassign */

const _ = require('lodash');

const deleteField = (obj) => {
  if (Array.isArray(obj)) {
    return obj
      .map((v) => (v && typeof v === 'object' ? deleteField(v) : v))
      .filter((v) => !!v);
  }
  return Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === 'object' ? deleteField(v) : v])
    .reduce((a, [k, v]) => (!v ? a : ((a[k] = v), a)), {});
};

// const obj1 = {
//   firstName: 'Lisa',
//   lastName: 'asdfsdf',
//   title: 'Ms',
//   sex: 'female',
//   weight: '',
//   dateOfBirth: '05/11/1999',
//   phoneNumber: '04104820594',
//   email: 'asdfjasdlfk@gmail.com',
//   password: '123456789',
//   confirmPassword: '123456789',
//   isDoctor: 'true',
//   address: {
//     number: '4',
//     street: 'Beamish Street',
//     city: 'Sydney',
//     state: 'New South Wales',
//     country: '',
//     postcode: '2149',
//   },
//   doctorInfo: {
//     licence: 'MIT',
//     accreditations: ['USyd', 'UNSW'],
//     specialtyField: 'Dentistry',
//     subSpecialtyField: '',
//     education: ['ANU', 'Macquarie University'],
//     yearsExperience: '10',
//     tags: ['Orthodontics', 'Prosthodontics'],
//     languagesSpoken: ['Cantonese', 'Mandarin', 'Japanese', 'English'],
//   },
//   clientInfo: {
//     medicalHistory: [[Object], [Object]],
//     allergies: [[Object], [Object]],
//     medication: [[Object], [Object]],
//     bloodType: 'A+',
//   },
// };

// const newObj1234 = deleteField(obj1);

// console.log(newObj1234);

exports.module = { deleteField };

// const deleteField = (obj) => {
//   const condition = (val) => {
//     if (val) return true;
//   };

//   return _.pick(obj, (value) => {
//     if (value) {
//       return true;
//     }
//     return false;
//   });
// };

// const deleteField = (obj) => {
//   const newObj = {};

//   Object.keys(obj).forEach((key) => {
//     let sanitizedField = obj[key];
//     if (obj[key] && typeof obj[key] === 'string') {
//       sanitizedField = obj[key].trim();
//     }

//     if (obj[key] && typeof obj[key] === 'object') {
//       newObj[key] = deleteField(obj[key]); // recurse
//     } else if (sanitizedField) {
//       newObj[key] = sanitizedField; // copy value
//     }
//   });

//   return newObj;
// };

// // // Sample testing data
// // const obj1 = {
// //   name: 'Duke',
// //   age: '22',
// //   height: '',
// //   brain: { intelligence: 1000, concentration: '' },
// // };
