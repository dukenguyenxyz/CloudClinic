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
  weight: '55',
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

// // Doctor 1
// const doctor1 = user;
// doctor1.isDoctor = true;
// doctor1.firstName = 'Doctor No. 1';
// doctor1.email = 'number1@doctor.com';

// // Client 1
// const client1 = user;
// client1.isDoctor = false;
// client1.firstName = 'Client No. 1';
// client1.email = 'number1@client.com';

// // Client 2
// const client2 = user;
// client2.isDoctor = false;
// client2.firstName = 'Client No. 2';
// client2.email = 'number2@client.com';

// // AuthDoctor 1
// const authDoctor1 = user;
// const authDoctor1ID = new mongoose.Types.ObjectId();
// authDoctor1[_id] = authDoctor1ID;
// authDoctor1[tokens] = [
//   { token: jwt.sign({ _id: authDoctor1ID }, process.env.TOKEN_SECRET) },
// ];

// Model Generator
const userGenerator = (uuid, isDoctor, isSignUpForm = false) => {
  const role = isDoctor ? 'doctor' : 'client';

  const newUser = user;
  const newID = new mongoose.Types.ObjectId();

  if (!isSignUpForm) {
    newUser._id = newID;
    newUser.tokens = [
      { token: jwt.sign({ _id: newID }, process.env.TOKEN_SECRET) },
    ];
  }

  newUser.isDoctor = false;
  newUser.firstName = `${_.upperFirst(role)} No. ${uuid}`;
  newUser.email = `no${uuid}.${role}.com`;
};

// User Gen With Auth for Sign In
const usersSetup = () => {
  const models = { doctors: [], clients: [] };

  for (i = 1; i < 10; i++) {
    const role = i < 6;
    const roleName = role ? 'doctors' : 'clients';

    models[roleName].push(userGenerator(i, role));
  }

  return models;
};

const models = usersSetup();

// User Gen Without Auth for Sign Up
const userSignUpGen = (length, isDoctor) => {
  return userGenerator(length + 1, isDoctor, true);
};

const setUpDB = async () => {
  await User.deleteMany();
  await Session.deleteMany();

  models.forEach(async (model) => {
    await new User(model).save();
  });

  // return models;
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const randomDateNowTo2021 = () => randomDate(new Date(), new Date(2021, 0, 1));

const freeSessionGen = (count) => {
  const sessions = [];
  let startTime = moment(randomDateNowTo2021())
    .minute(0)
    .second(0)
    .millisecond(0);

  for (i = 0; i < count; i++) {
    const endTime = startTime.add(30, 'minutes');
    sessions.push({
      startTime: moment(startTime),
      endTime: moment(endTime),
    });

    // Free time bewteen sessions: 5 mins
    startTime = endTime.add(5, 'minutes');
  }

  return sessions;
};

const bookedSessionGen = () => {
  const doctor = models.doctor[3];

  const freeSessions = freeSessionGen(10);
  const bookedSessions = [];

  const clientArray = models.client;

  freeSessions.forEach((session) => {
    const mappedSession = session;

    mappedSession.doctor = doctor._id;
    mappedSession.client =
      clientArray[Math.floor(Math.random() * clientArray.length)];

    bookedSessions.push(mappedSession);
  });

  return bookedSessions;
};

// exports.module = { doctor1, client1, client2, authDoctor1 };
exports.module = {
  models,
  setUpDB,
  userSignUpGen,
  freeSessionGen,
  bookedSessionGen,
};
