// IMPORTANT: RENDER THE CORRECT STATUS CODE IN THE CONTROLLER

const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const request = supertest(app);
const User = require('../src/models/User');
const Session = require('../src/models/Session');
// const { doctor1, client1, client2, authDoctor1 } = require('./dbsetup');
const { models, userSignUpGen, setupDB, userGenerator } = require('./dbsetup');

// let models = {};

// beforeEach(async () => {
//   // await User.deleteMany();
//   // await Session.deleteMany();
//   // await new User(authDoctor1).save();
// });

// const doctor1 = userSignUpGen(1, true);
const doctor1 = userGenerator(11, true);
const client1 = userGenerator(2, false);

beforeEach(async () => {
  // await setupDB();

  const SCHEMAS = await setupDB();

  // console.log(SCHEMAS);
});

// Public - Authentication Routes

// DB setup: Model/Schema
test('Auth: should sign up a new doctor', async () => {
  const user = doctor1;

  const response = await request
    .post('/api/users/signup')
    .set('Content-Type', 'application/json')
    .send(user)
    .expect(201);

  expect(response.body.user.isDoctor).toBe(true);
  expect(response.body.user.doctorInfo).toBeTruthy();
  expect(response.body.user.clientInfo).toBeUndefined();
});

// DB setup: Model/Schema
test('Auth: should sign up a new client', async () => {
  const user = client1;

  const response = await request
    .post('/api/users/signup')
    .set('Content-Type', 'application/json')
    .send(user)
    .expect(201);

  expect(response.body.user.isDoctor).toBe(false);
  expect(response.body.user.doctorInfo).toBeUndefined();
  expect(response.body.user.clientInfo).toBeTruthy();
});

// DB setup: Model/Schema
test('Auth: should NOT sign up', async () => {
  const userFail = client1;
  userFail.isDoctor = null;

  await request
    .post('/api/users/signup')
    .set('Content-Type', 'application/json')
    .send(userFail)
    .expect(400);
});

// DB setup: 1 user
test('Auth: should sign in a user', async () => {
  const user = models.doctor[0];

  const response = await request
    .post('/api/users/signin')
    .set('Content-Type', 'application/json')
    .send({ email: user.email, password: user.password })
    .expect(201);

  const verified = jwt.verify(response.body.token, process.env.TOKEN_SECRET);

  const userDB = await User.findOne({
    _id: verified._id,
    'tokens.token': response.body.token,
  });

  expect(userDB).toBeTruthy();
});

// DB setup: 1 user
test('Auth: should NOT sign in a user', async () => {
  const userFail = doctor1;
  userFail.password = 'wrongpassword';

  await request
    .post('/api/users/signin')
    .set('Content-Type', 'application/json')
    .send({ email: userFail.email, password: userFail.password })
    .expect(400);
});

// Public Routes - Doctor Search Routes

// DB setup: many doctors
test('Public: should get all doctors', async () => {
  const response = await request.get('/api/users/').send().expect(200);

  expect(response.body).toBeTruthy();
});

// DB setup: many doctors
test('Public: should get one doctor', async () => {
  const authUser = models.doctor[0];
  // const authUser = authDoctor1;

  const response = await request
    .get(`/api/users/${authUser._id}`)
    .send()
    .expect(200);

  expect(response.body.firstName).toBe(authUser.firstName);
});

test('Public: should NOT get one doctor', async () => {
  await request.get(`/api/users/invaliduser123`).send().expect(404);
});

// User Routes

// DB setup: 1 user
test('Users: should sign out a user', async () => {
  const authUser = models.doctor[0];
  // const authUser = authDoctor1;

  const response = await request
    .patch('/api/users/signout')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .expect(200);

  console.log(response.body);

  expect(response.body).toMatchObject({});
});

test('Users: should NOT sign out a user', async () => {
  const response = await request
    .patch('/api/users/signout')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'fakeToken')
    .expect(400);

  expect(response.error.text).toBe('invalid token');
});

// DB setup: 1 user & many signins/ jwt keys
test('Users: should sign out of all devices for a user', async () => {
  const authUser = models.doctor[0];
  // const authUser = authDoctor1;

  const response = await request
    .patch('/api/users/signoutall')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .expect(200);

  expect(response.body).toMatchObject({});
});

test('Users: should NOT sign out of all devices for a user', async () => {
  const response = await request
    .patch('/api/users/signoutall')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'fakeToken')
    .expect(400);

  expect(response.error.text).toBe('invalid token');
});

// Resign in user for the tasks below or use a different email

// DB setup: 1 user
test("Users: should update a user's account", async () => {
  const authUser = models.doctor[1];

  const firstName = 'New First';
  const lastName = 'New Last';

  const response = await request
    .patch('/api/users/profile')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .send({ firstName, lastName })
    .expect(201);

  expect(response.body.firstName).toBe(firstName);
  expect(response.body.lastName).toBe(lastName);
});

test("Users: should NOT update a user's account", async () => {
  const firstName = 'New First';
  const lastName = 'New Last';

  const response = await request
    .patch('/api/users/profile')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'fakeToken')
    .send({ firstName, lastName })
    .expect(400);

  expect(response.error.text).toBe('invalid token');
});

// DB setup: 1 user
test("Users: should get a user's own profile", async () => {
  const authUser = models.doctor[1];

  const response = await request
    .get('/api/users/profile')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .expect(200);

  expect(response.body.firstName).toBe(authUser.firstName);
});

test("Users: should NOT get a user's own profile", async () => {
  const response = await request
    .get('/api/users/profile')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'fakeToken')
    .expect(400);

  expect(response.error.text).toBe('invalid token');
});

// DB setup: 1 user
test("Users: should delete a user's account", async () => {
  const authUser = models.doctor[1];

  const response = await request
    .delete('/api/users/profile')
    .set('Content-Type', 'application/json')
    .set('Authorization', authUser.tokens[0].token)
    .expect(200);

  expect(response.body.firstName).toBe(authUser.firstName);
});

test("Users: should NOT delete a user's account", async () => {
  const response = await request
    .delete('/api/users/profile')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'fakeToken')
    .expect(400);

  expect(response.error.text).toBe('invalid token');

  // Additional test: no token => expect(response.body).toBe('access denied')
});
