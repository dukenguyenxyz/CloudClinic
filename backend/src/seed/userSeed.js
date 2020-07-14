const seeder = require('mongoose-seed');

// // Data array containing seed data - documents organized by Model
const data = [
  {
    model: 'User',
    documents: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        password: 'password',
      },
    ],
  },
];

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://127.0.0.1:27017/cloudclinic', function () {
  // Load Mongoose models
  seeder.loadModels(['../models/User.js']);

  // Clear specified collections
  seeder.clearModels(['User'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});
