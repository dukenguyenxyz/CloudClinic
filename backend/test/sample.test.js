const request = require('supertest');
const app = require('../app');
const testDoctor = require('./testDoctor.json');

test('Success Case', () => {});

test('Fail Case', () => {
  // throw new Error('Test failed');
});

test('Async Case', (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});

test('Should return sum of two numbers', () => {
  // Imports
  const add = (num1, num2) => {
    return num1 + num2;
  };
  // Test
  expect(add(2, 3)).toBe(5);
});
