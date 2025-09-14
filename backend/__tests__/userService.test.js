const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server'); // export app from server.js
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/userdb_test');
});

beforeEach(async () => {
  await User.deleteMany({});
  await new User({
    user_name: 'joe',
    dob: new Date('2000-01-01'),
    email: 'joe@kundabox.com',
    password: 'hashed'
  }).save();
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('Add user with proper values → pass', async () => {
  const res = await request(app).post('/users').send({
    user_name: 'alice123',
    dob: '1990-06-15',
    email: 'alice@example.com',
    password: 'Ab12c'
  });
  expect(res.body).toEqual({ result: true });
});

test('Add user that already exists → fail', async () => {
  const res = await request(app).post('/users').send({
    user_name: 'joe',
    dob: '2000-01-01',
    email: 'joe@kundabox.com',
    password: '12ABCabc'
  });
  expect(res.body).toEqual({ result: false, code: 'USER_ALREADY_REGISTERED' });
});

// Add more tests for invalid name, dob, email, password (same as before)
