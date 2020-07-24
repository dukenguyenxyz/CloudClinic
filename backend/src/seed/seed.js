const seeder = require('mongoose-seed');
require('colors');

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

console.log(`Seeding starts`.green.bold);
