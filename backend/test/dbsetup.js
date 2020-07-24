/* eslint-disable no-restricted-syntax */
/* eslint-disable node/no-unsupported-features/es-syntax */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');

const User = require('../src/models/User');
const Session = require('../src/models/Session');

const user = {
  firstName: 'Hugh',
  lastName: 'Buisman',
  title: 'Sir',
  sex: 'male',
  dateOfBirth: '05/11/1999',
  phoneNumber: '04104820594',
  email: 'asdfasfdasdfaSd123@gmail.com',
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

// Model Generator
const userGenerator = (uuid, isDoctorBoolean, isSignUpForm = true) => {
  const role = isDoctorBoolean ? 'doctor' : 'client';

  const newUser = { ...user };
  const newID = new mongoose.Types.ObjectId();

  if (!isSignUpForm) {
    newUser._id = newID;
    newUser.tokens = [
      { token: jwt.sign({ _id: newID }, process.env.TOKEN_SECRET) },
    ];
  }

  newUser.isDoctor = isDoctorBoolean;
  newUser.firstName = `${_.upperFirst(role)} No. ${uuid}`;
  newUser.email = `no${uuid}@${role}.com`;

  return newUser;
};
exports.userGenerator = userGenerator;

// User Gen With Auth for Sign In
const usersSetup = () => {
  const models = { doctor: [], client: [] };

  for (i = 1; i < 10; i++) {
    const role = i < 6;
    const roleName = role ? 'doctor' : 'client';

    models[roleName].push(userGenerator(i, role, false));
  }

  return models;
};

const models = usersSetup();
exports.models = models;

// User Gen Without Auth for Sign Up
exports.userSignUpGen = (length, isDoctor) => {
  return userGenerator(length + 1, isDoctor, true);
};

exports.setupDB = async () => {
  await User.deleteMany();
  await Session.deleteMany();

  const usersPromise = [];

  const newModel = [...models.doctor, ...models.client];

  for (i = 0; i < newModel.length; i++) {
    usersPromise.push(new User(newModel[i]).save());
  }

  const promisedModels = await Promise.all(usersPromise);

  return promisedModels;
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const randomDateNowTo2021 = () => randomDate(new Date(), new Date(2021, 0, 1));

const freeSessionGen = async (count, isForm = true) => {
  const sessions = [];
  let startTime = moment(randomDateNowTo2021())
    .minute(0)
    .second(0)
    .millisecond(0)
    .add(7, 'days');

  const doctor = models.doctor[3];

  for (i = 0; i < count; i++) {
    const endTime = moment(startTime).add(30, 'minutes');

    const session = {
      startTime: moment(startTime).valueOf(),
      endTime: moment(endTime).valueOf(),
    };

    if (!isForm) {
      session._id = new mongoose.Types.ObjectId();
      session.doctor = doctor._id;
      sessions.push(new Session(session).save());
    } else {
      sessions.push(session);
    }

    // Free time bewteen sessions: 5 mins
    startTime = endTime.add(5, 'minutes');
  }

  if (!isForm) {
    return Promise.all(sessions);
  }

  return sessions;
};
exports.freeSessionGen = freeSessionGen;

exports.bookedSessionsDocGen = async () => {
  const doctor = models.doctor[3];
  const freeSessions = await freeSessionGen(10);
  const clientArray = models.client;
  const sessionsPromise = [];

  for (session of freeSessions) {
    const mappedSession = session;

    mappedSession.doctor = doctor._id;
    mappedSession.client =
      clientArray[Math.floor(Math.random() * clientArray.length)];

    sessionsPromise.push(new Session(mappedSession).save());
  }

  const bookedSessions = await Promise.all(sessionsPromise);

  return bookedSessions;
};

exports.bookedSessionsClientGen = async () => {
  const client = models.client[3];
  const freeSessions = await freeSessionGen(10);
  const doctorArray = models.doctor;
  const sessionsPromise = [];

  for (session of freeSessions) {
    const mappedSession = session;

    mappedSession.client = client._id;
    mappedSession.doctor =
      doctorArray[Math.floor(Math.random() * doctorArray.length)];

    sessionsPromise.push(new Session(mappedSession).save());
  }

  const bookedSessions = await Promise.all(sessionsPromise);

  return bookedSessions;
};
