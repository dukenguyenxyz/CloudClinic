/* eslint-disable no-continue */
/* eslint-disable radix */
const seeder = require('mongoose-seed');
const faker = require('faker');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');
require('colors');

// // userDocs array containing seed userDocs - documents organized by Model
const schemaDocs = (modelName) => {
  return [
    {
      model: modelName,
      documents: [],
    },
  ];
};

const userDocs = schemaDocs('User');
const sessionDocs = schemaDocs('Session');

// const userDocs = [
//   {
//     model: 'User',
//     documents: [],
//   },
// ];
// const sessionDocs = [
//   {
//     model: 'Session',
//     documents: [],
//   },
// ];

const generateUser = () => {
  const sexes = ['male', 'female'];
  const _id = new mongoose.Types.ObjectId();

  return {
    _id,
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

// Seed tags
// Seed multiple languages not just one
const seedDoctors = (numDoctors) => {
  const doctors = [];

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
    const doctorInfoGen = {
      title: 'Dr',
      isDoctor: true,
      doctorInfo: {
        licence: 'AustDocL'.concat(_.random(1, 50)).toString(),
        accreditation: ['Doctor of Medicine'],
        specialtyField: _.sample(doctorInfo.specialtyFields),
        subSpecialtyField: _.sample(doctorInfo.specialtyFields),
        education: [_.sample(doctorInfo.educations)],
        yearsExperience: _.random(1, 50),
        languagesSpoken: [_.sample(doctorInfo.languages)],
        rating: Math.floor(Math.random() * 5) + 1,
      },
    };

    const newDoctor = Object.assign(generateUser(), doctorInfoGen);

    // userDocs[0].documents.push(newDoctor);
    doctors.push(newDoctor);
  }

  userDocs[0].documents.push(...doctors);

  return doctors;
};

const seedFreeSessions = (doctorsP) => {
  const setHour = (momentObj, hour) => {
    return momentObj
      .set({ hour, minute: 0, second: 0, millisecond: 0 })
      .valueOf();
  };

  const startDate = moment().add(1, 'days');
  const endDate = moment().add(1, 'months');
  const numDays = endDate.diff(startDate, 'days');

  const range = {
    morning: [8, 9],
    afternoon: [12, 14],
  };

  const freeSessionGen = (
    startSession,
    endSession,
    doctor,
    duration = 30,
    restMin = 5
  ) => {
    const sessions = [];

    let startTime = startSession;
    let endTime = moment(0);

    // While endTime is before endSession
    while (endTime.isBefore(endSession)) {
      endTime = moment(startTime).add(duration, 'minutes');

      const session = {
        startTime: moment(startTime).valueOf(),
        endTime: moment(endTime).valueOf(),
        doctor: doctor._id,
      };

      sessions.push(session);

      // Free time bewteen sessions: 5 mins
      startTime = endTime.add(restMin, 'minutes');
    }

    return sessions;
  };

  doctorsP.forEach((doctor) => {
    const sessionBluePrint = (day, rangeP) => {
      return {
        startTime: setHour(day, rangeP[0]),
        endTime: setHour(day, range.morning[1]),
        doctor: doctor._id,
      };
    };

    for (
      let day = moment(startDate);
      day.isBefore(endDate, 'days');
      day.add(1, 'days')
    ) {
      // Skip if Sunday
      if (day.day() === 0) {
        continue;
      }

      // // Create morning Sessions
      // const morningSessions = {
      //   startTime: setHour(day, range.morning[0]),
      //   endTime: setHour(day, range.morning[1]),
      //   doctor: doctor._id,
      // };

      // // Create afternoon Sessions
      // const afternoonSessions = {
      //   startTime: setHour(day, range.afternoon[0]),
      //   endTime: setHour(day, range.afternoon[1]),
      //   doctor: doctor._id,
      // };

      const morningSessions = sessionBluePrint(day, range.morning);
      const afternoonSessions = sessionBluePrint(day, range.afternoon);

      [morningSessions, afternoonSessions].forEach((period) => {
        const freeSessions = freeSessionGen(
          period.startTime,
          period.endTime,
          doctor
        );
        sessionDocs[0].documents.push(freeSessions);

        console.log(freeSessions);
      });
    }
  });
};

const doctors = seedDoctors(10);
seedFreeSessions(doctors);
