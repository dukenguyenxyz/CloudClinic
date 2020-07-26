import axios from 'axios';
import faker from 'faker';

const email = () => faker.internet.email();
const newEmailClient = email();
const newEmailDoctor = email();

export const url = 'http://localhost:5000';

export const request = axios.create({
  baseURL: `${url}/api/`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: localStorage.getItem('cloudclinicJWT'),
  },
});

// // Standard call like this
// const METHOD = async () => {
//   await request.httpVerb('endpoint/foo/bar', {
//     body,
//   });
// };

export const JWTHeader = {
  headers: {
    Authorization: localStorage.getItem('cloudclinicJWT'),
  },
};

export const JSONHeader = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

export const newUserClient = {
  firstName: 'Hasadfasdi',
  lastName: 'Doctorson',
  title: 'Sir',
  sex: 'male',
  weight: '55',
  dateOfBirth: '05/11/1999',
  phoneNumber: '04104820594',
  email: newEmailClient,
  password: '123456789',
  confirmPassword: '123456789',
  isDoctor: 'false',
  address: {
    number: '4',
    street: 'Beamish Street',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    postcode: '2149',
  },
  doctorInfo: {
    licence: 'MIT',
    accreditations: ['USyd', 'UNSW'],
    specialtyField: 'Dentistry',
    subSpecialtyField: 'Prosthodontics',
    education: ['ANU', 'Macquarie University'],
    yearsExperience: '10',
    tags: ['Orthodontics', 'Prosthodontics'],
    languagesSpoken: ['Cantonese', 'Mandarin', 'Japanese', 'English'],
  },
  clientInfo: {
    medicalHistory: [
      {
        startDate: '03/05/2005',
        condition: 'High Blood Pressure',
        notes: 'Due to old age',
      },
      {
        startDate: '11/11/2003',
        condition: 'Pneumonia',
        notes: 'Due to travel to Africa',
      },
    ],
    allergies: [
      {
        name: 'Dust allergy',
        severity: '3',
      },
      {
        name: 'Pollen allergy',
        severity: '2',
      },
    ],
    medication: [
      {
        name: 'Magic mushroom',
        dosage: '200',
        manufacturer: 'Brazil',
      },
      {
        name: 'Cannabis',
        dosage: '100',
        manufacturer: 'Australia',
      },
    ],
    bloodType: 'A+',
  },
};

export const newUserDoctor = {
  firstName: 'Lisa',
  lastName: 'asdfsdf',
  title: 'Ms',
  sex: 'female',
  weight: '55',
  dateOfBirth: '05/11/1999',
  phoneNumber: '0410734821',
  email: newEmailDoctor,
  password: '123456789',
  confirmPassword: '123456789',
  isDoctor: 'true',
  address: {
    number: '4',
    street: 'Beamish Street',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    postcode: '2149',
  },
  doctorInfo: {
    licence: 'MIT',
    accreditations: ['USyd', 'UNSW'],
    specialtyField: 'Dentistry',
    subSpecialtyField: 'Hello',
    education: ['ANU', 'Macquarie University'],
    yearsExperience: '10',
    tags: ['Orthodontics', 'Prosthodontics'],
    languagesSpoken: ['Cantonese', 'Mandarin', 'Japanese', 'English'],
  },
};
