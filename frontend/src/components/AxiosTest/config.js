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

const link = faker.image.imageUrl();

export const newUserClient = {
  profileImage: link,
  firstName: 'Harry',
  lastName: 'Buisman',
  title: 'Sir',
  sex: 'male',
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
    weight: '55',
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
        name: 'Augmentin',
        dosage: '200',
        manufacturer: 'GlaxoSmithKline',
      },
      {
        name: 'Entresto',
        dosage: '100',
        manufacturer: 'Novartis',
      },
    ],
    bloodType: 'A+',
  },
};

export const newUserDoctor = {
  profileImage: link,
  firstName: 'Lisa',
  lastName: 'asdfsdf',
  title: 'Dr',
  sex: 'female',
  dateOfBirth: '05/11/1999',
  phoneNumber: '0410734821',
  email: newEmailDoctor,
  password: '123456789',
  confirmPassword: '123456789',
  isDoctor: true,
  address: {
    number: '4',
    street: 'Beamish Street',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    postcode: '2149',
  },
  doctorInfo: {
    workSchedule: {
      openingTime: '2020-07-30T08:00:53+10:00',
      closingTime: '2020-07-30T21:00:53+10:00',
      lunchBreakStart: '2020-07-30T13:00:53+10:00',
      lunchBreakEnd: '2020-07-30T14:00:53+10:00',
      unavailableDateTimes: [
        {
          startDateTime: '2020-07-30T15:00:53+10:00',
          endDateTime: '2020-07-30T17:00:53+10:00',
          modifier: 2,
        },
      ],
    },
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
