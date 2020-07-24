const supertest = require('supertest');
const moment = require('moment');
const app = require('../app');

const request = supertest(app);
const {
  models,
  setupDB,
  freeSessionGen,
  bookedSessionsDocGen,
  bookedSessionsClientGen,
} = require('./dbsetup');

// Set up sample seed data
beforeEach(setupDB);

// Doctor Routes

// DB setup: 1 doctor
test('Doctor: should create sessions', async () => {
  const authUser = models.doctor[0];
  const sessions = await freeSessionGen(5);

  const newSessions = sessions.map((session) => {
    const { startTime, endTime } = session;
    return {
      startTime,
      endTime,
    };
  });

  const response = await request
    .post(`/api/sessions`)
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .send(sessions)
    .expect(201);

  expect(response.body).toMatchObject(newSessions);
});
// Client: should not create sessions (empty JWT)
// Client: should not create sessions (wrong JWT)

// DB setup: 1 doctor & 1 session
test('Doctor: should delete session', async () => {
  const sessions = await bookedSessionsDocGen();
  const session = sessions[3];
  const authUser = models.doctor[3];

  const response = await request
    .delete(`/api/sessions/${session._id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body.startTime).toBeTruthy();
});
// Client: should not delete session (incorrect session ID)
// Client: should not delete session (empty JWT)
// Client: should not delete session (wrong JWT)

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get sessions', async () => {
  await bookedSessionsDocGen();
  const authUser = models.doctor[3];

  const response = await request
    .get('/api/sessions/')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .expect(200);

  expect(response.body).toBeTruthy();
});
// Client: should not get sessions (empty sessions)
// Client: should not get sessions (empty JWT)
// Client: should not get sessions (wrong JWT)

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get clients', async () => {
  await bookedSessionsDocGen();
  const authUser = models.doctor[3];

  const response = await request
    .get('/api/users/clients')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .expect(200);

  console.log(response.body);

  expect(response.body).toBeTruthy();
});
// Client: should not get clients (empty clients)
// Client: should not get clients (empty JWT)
// Client: should not get clients (wrong JWT)

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get one client', async () => {
  const sessions = await bookedSessionsDocGen();
  const authUser = models.doctor[3];
  const { client } = sessions[3];

  const response = await request
    .get(`/api/users/clients/${client._id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .expect(200);

  expect(String(response.body._id)).toBe(String(client._id));
});
// Client: should not get clients (incorrect client ID)
// Client: should not get clients (empty JWT)
// Client: should not get clients (wrong JWT)

// Client Routes

// DB setup: 1 client & 1 available session by 1 doctor
test('Client: should book session', async () => {
  const sessions = await freeSessionGen(4, false);
  const session = sessions[3];
  const doctor = models.doctor[3];
  const authUser = models.client[3];
  const response = await request
    .patch(`/api/sessions/${session._id}/book`)
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .send()
    .expect(200);
  expect(String(response.body._id)).toBe(String(session._id));
});
// Client: should not book session (incorrect session ID)
// Client: should not book session (empty JWT)
// Client: should not book session (wrong JWT)

// DB setup: 1 client & many sessions booked with different doctors
test('Client: should get sessions', async () => {
  const authUser = models.client[3];
  const sessions = await bookedSessionsClientGen();

  const response = await request
    .get('/api/sessions')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body).toBeTruthy();
});
// Client: should not get sessions (empty sessions)
// Client: should not get sessions (empty JWT)
// Client: should not get sessions (wrong JWT)

// DB setup: 1 client & 1 session
test('Client: should update session', async () => {
  const authUser = models.client[3];
  const sessions = await bookedSessionsClientGen();
  const session = sessions[3];
  const newSession = {
    startTime: 3161048400000,
    endTime: 3161050200000,
  };

  const response = await request
    .patch(`/api/sessions/${session.id}/update`)
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .send(newSession)
    .expect(200);

  expect(moment(response.body.startTime).valueOf()).toBe(
    moment(newSession.startTime).valueOf()
  );
});
// Client: should not update session (incorrect session ID)
// Client: should not update session (incorrect startTime & endTime) (many cases)
// Client: should not update session (empty JWT)
// Client: should not update session (wrong JWT)

// DB setup: 1 client & 1 session
test('Client: should cancel session', async () => {
  const authUser = models.client[3];
  const sessions = await bookedSessionsClientGen();
  const session = sessions[3];

  const response = await request
    .patch(`/api/sessions/${session._id}/cancel`)
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .send()
    .expect(200);
  expect(moment(response.body.startTime).valueOf()).toBe(
    moment(session.startTime).valueOf()
  );
});
// Client: should not cancel session (incorrect session ID)
// Client: should not cancel session (empty JWT)
// Client: should not cancel session (wrong JWT)
