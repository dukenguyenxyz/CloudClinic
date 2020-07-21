const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const request = supertest(app);
const User = require('../src/models/User');
const Session = require('../src/models/Session');
const { models, setUpDB } = require('./dbsetup');

// let models = {};

// beforeEach(async () => {
//   models = setUpDB();
// });

beforeEach(setUpDB);

// Doctor Routes

// DB setup: 1 doctor
test('Doctor: should create sessions', async () => {
  const session = null;

  const response = await request
    .post(`api/sessions`)
    .set('Content-Type', 'application/json')
    .send(session)
    .expect(201);

  expect(response.body).toBe(session);
});

// DB setup: 1 doctor & 1 session
test('Doctor: should delete session', async () => {
  const session = null;
  const user = null;

  const response = await request
    .delete(`api/sessions/${session.id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', user.token)
    .send(user)
    .expect(201);

  expect(response.body.isDoctor).toBe(true);
});

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get sessions', async () => {
  const user = null;

  const response = await request
    .get('/api/sessions/')
    .set('Content-Type', 'application/json')
    .set('Authorization', user.token)
    .expect(200);

  expect(response.body).toBeTruthy();
});

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get clients', async () => {
  const user = null;

  const response = await request
    .get('/api/users/clients')
    .set('Content-Type', 'application/json')
    .set('Authorization', user.token)
    .expect(200);

  expect(response.body).toBeTruthy();
});

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get one client', async () => {
  const user = null;
  const client = null;

  const response = await request
    .get(`/api/users/clients/${client.id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', user.token)
    .expect(200);

  expect(response.body).toBeTruthy();
});

// Client Routes

// DB setup: 1 client
test('Client: should book session', async () => {
  const session = null;

  const response = await request
    .patch(`api/sessions/${session.id}/book`)
    .set('Content-Type', 'application/json')
    .send()
    .expect(200);

  expect(response.body).toBeTruthy();
});

// DB setup: 1 client & many sessions booked with different doctors
test('Client: should get sessions', async () => {
  const response = await request;
});

// DB setup: 1 client & 1 session
test('Client: should update session', async () => {
  const session = null;

  const response = await request
    .patch(`api/sessions/${session.id}/update`)
    .set('Content-Type', 'application/json')
    .send(session)
    .expect(200);

  expect(response.body).toBe(session);
});

// DB setup: 1 client & 1 session
test('Client: should cancel session', async () => {
  const session = null;

  const response = await request
    .patch(`api/sessions/${session.id}/cancel`)
    .set('Content-Type', 'application/json')
    .send()
    .expect(200);

  expect(response.body).toBe(session);
});
