const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const app = require('../app');

const request = supertest(app);
const User = require('../src/models/User');
const Session = require('../src/models/Session');
const {
  models,
  setupDB,
  freeSessionGen,
  bookedSessionsGen,
} = require('./dbsetup');

// Set up sample seed data
beforeEach(setupDB);

// Doctor Routes

// DB setup: 1 doctor
// test('Doctor: should create sessions', async () => {
//   const authUser = models.doctor[0];
//   const sessions = await freeSessionGen(5);

//   const newSessions = sessions.map((session) => {
//     const { startTime, endTime } = session;
//     return {
//       startTime,
//       endTime,
//     };
//   });

//   const response = await request
//     .post(`/api/sessions`)
//     .set('Content-Type', 'application/json')
//     .set('Authorization', authUser.tokens[0].token)
//     .send(sessions)
//     .expect(201);

//   // console.log(response.body);
//   // const dbSessions = await Session.find();
//   // console.log(dbSessions);

//   expect(response.body).toMatchObject(newSessions);
// });

// // DB setup: 1 doctor & 1 session
// test('Doctor: should delete session', async () => {
//   const sessions = await bookedSessionsGen();
//   const session = sessions[3];
//   const authUser = models.doctor[3];

//   const response = await request
//     .delete(`/api/sessions/${session._id}`)
//     .set('Content-Type', 'application/json')
//     .set('Authorization', authUser.tokens[0].token)
//     .send(session)
//     .expect(200);

//   expect(response.body.startTime).toBeTruthy();
// });

// // DB setup: 1 doctor & many sessions booked by different clients
// test('Doctor: should get sessions', async () => {
//   await bookedSessionsGen();
//   const authUser = models.doctor[3];

//   const response = await request
//     .get('/api/sessions/')
//     .set('Content-Type', 'application/json')
//     .set('Authorization', authUser.tokens[0].token)
//     .expect(200);

//   console.log(response.body);

//   expect(response.body).toBeTruthy();
// });

// // DB setup: 1 doctor & many sessions booked by different clients
// test('Doctor: should get clients', async () => {
//   await bookedSessionsGen();
//   const authUser = models.doctor[3];

//   const response = await request
//     .get('/api/users/clients')
//     .set('Content-Type', 'application/json')
//     .set('Authorization', authUser.tokens[0].token)
//     .expect(200);

//   console.log(response.body);

//   expect(response.body).toBeTruthy();
// });

// // DB setup: 1 doctor & many sessions booked by different clients
// test('Doctor: should get one client', async () => {
//   const sessions = await bookedSessionsGen();
//   const authUser = models.doctor[3];
//   const { client } = sessions[3];

//   const response = await request
//     .get(`/api/users/clients/${client._id}`)
//     .set('Content-Type', 'application/json')
//     .set('Authorization', authUser.tokens[0].token)
//     .expect(200);

//   console.log(response.body._id);
//   console.log(client);

//   expect(String(response.body._id)).toBe(String(client._id));
// });

// // Client Routes

// // DB setup: 1 client & 1 available session by 1 doctor
// test('Client: should book session', async () => {
//   const sessions = await freeSessionGen(4, false);
//   const session = sessions[3];
//   console.log(session);
//   const doctor = models.doctor[3];
//   const authUser = models.client[3];
//   const response = await request
//     .patch(`/api/sessions/${session._id}/book`)
//     .set('Content-Type', 'application/json')
//     .set('Authorization', authUser.tokens[0].token)
//     .send()
//     .expect(201);
//   expect(String(response.body._id)).toBe(String(session._id));
// });

// NOT DONE YET

// // DB setup: 1 client & many sessions booked with different doctors
// test('Client: should get sessions', async () => {
//   const response = await request;
// });

// // DB setup: 1 client & 1 session
// test('Client: should update session', async () => {
//   const session = null;

//   const response = await request
//     .patch(`/api/sessions/${session.id}/update`)
//     .set('Content-Type', 'application/json')
//     .send(session)
//     .expect(200);

//   expect(response.body).toBe(session);
// });

// // DB setup: 1 client & 1 session
// test('Client: should cancel session', async () => {
//   const session = null;

//   const response = await request
//     .patch(`/api/sessions/${session.id}/cancel`)
//     .set('Content-Type', 'application/json')
//     .send()
//     .expect(200);

//   expect(response.body).toBe(session);
// });
