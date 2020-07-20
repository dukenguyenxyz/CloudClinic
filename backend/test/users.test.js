const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const request = supertest(app);
const User = require('../src/models/User');
const Session = require('../src/models/Session');
const { doctor1, client1, client2, authDoctor1 } = require('./dbsetup');

beforeEach(async () => {
  await User.deleteMany();
  await Session.deleteMany();

  await new User(authDoctor1).save();
});

// Public - Authentication Routes

// DB setup: Model/Schema
test('Auth: should sign up a new doctor', async () => {
  const response = await request
    .post('/api/users/signup')
    .set('Content-Type', 'application/json')
    .send(doctor1)
    .expect(201);

  expect(response.body.isDoctor).toBe(true);
  expect(response.body.doctorInfo).toBeTruthy();
  expect(response.body.clientInfo).toBeUndefined();
});

// DB setup: Model/Schema
test('Auth: should sign up a new client', async () => {
  const response = await request
    .post('/api/users/signup')
    .set('Content-Type', 'application/json')
    .send(client1)
    .expect(201);

  expect(response.body.isDoctor).toBe(false);
  expect(response.body.doctorInfo).toBeUndefined();
  expect(response.body.clientInfo).toBeTruthy();
});

// DB setup: Model/Schema
test('Auth: should fail to sign up', async () => {
  const client1fail = client1;
  client1.isDoctor = null;

  await request
    .post('/api/users/signup')
    .set('Content-Type', 'application/json')
    .send(client1fail)
    .expect(400);
});

// DB setup: 1 user
test('Auth: should sign in a user', async () => {
  const user = doctor1;

  const response = await request
    .post('/api/users/signin')
    .set('Content-Type', 'application/json')
    .send({ email: user.email, password: user.password })
    .expect(201);

  const verified = jwt.verify(response.body, process.env.TOKEN_SECRET);

  const userDB = await User.findOne({
    _id: verified._id,
    'tokens.token': response.body,
  });

  expect(userDB).toBeTruthy();
});

// DB setup: 1 user
test('Auth: should fail to sign in a user', async () => {
  const userfail = doctor1;
  userfail.password = 'wrongpassword';

  await request
    .post('/api/users/signin')
    .set('Content-Type', 'application/json')
    .send({ email: userfail.email, password: userfail.password })
    .expect(400);
});

// Public Routes - Doctor Search Routes

// DB setup: many doctors
test('Public: should get all doctors', async () => {
  const response = await request.get('/api/users/').send().expect(200);

  // Change this to equal to the current doctor in the database
  expect(response.body).toBeTruthy();
});

// DB setup: many doctors
test('Public: should get one doctor', async () => {
  const response = await request
    .get(`/api/users/${authDoctor1[_id]}`)
    .send()
    .expect(200);

  // Change this to equal to the current doctor in the database
  expect(response.body.firstName).toBe(authDoctor1.firstName);
});

// DONE

// User Routes

// DB setup: 1 user
test('Users: should sign out a user', async () => {
  const response = await request
    .patch('/api/users/signout')
    .set('Content-Type', 'application/json')
    .set('Authorization', authDoctor1.tokens[0].token)
    .send({ email: authDoctor1.email, password: authDoctor1.password })
    .expect(201);
});

// DB setup: 1 user & many signins/ jwt keys
test('Users: should sign out of all devices for a user', async () => {
  const response = await request
    .patch('/api/users/signoutall')
    .set('Content-Type', 'application/json')
    .set('Authorization', authDoctor1.tokens[0].token)
    .send({ email: authDoctor1.email, password: authDoctor1.password })
    .expect(201);
});

// DB setup: 1 user
test("Users: should update a user's account", async () => {
  const response = await request;
});

// DB setup: 1 user
test("Users: should get a user's own profile", async () => {
  const response = await request;
});

// DB setup: 1 user
test("Users: should delete a user's account", async () => {
  const response = await request;
});
