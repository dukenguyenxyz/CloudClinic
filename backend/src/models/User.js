const mongoose = require('mongoose');
const calendarSchema = require('./Calendar');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name can not be blank'],
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'last name can not be blank'],
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  sex: {
    type: String,
    lowercase: true,
    enum: ['male', 'female'],
  },
  weight: {
    type: Number,
    min: 1,
    max: 442,
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 24,
    trim: true,
  },
  address: {
    number: {
      type: Number,
      min: 1,
      max: 5000,
    },
    street: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    city: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    state: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    country: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    postcode: {
      type: Number,
      min: 1,
      max: 1000000,
    },
  },
  email: {
    type: String,
    required: [true, 'email name can not be blank'],
    minlength: 6,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password can not be blank'],
    minlength: 6,
    maxlength: 1024,
    trim: true,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  doctorInfo: {
    licence: {
      type: String,
      min: 6,
      max: 12,
    },
    accreditation: [{
      type: String,
      minlength: 1,
      maxlength: 255,
    }, ],
    specialtyField: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    subSpecialtyField: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    education: [{
      type: String,
      minlength: 1,
      maxlength: 255,
    }, ],
    yearsExperience: {
      type: Number,
      min: 0,
      max: 100,
    },
    tags: [{
      type: String,
      minlength: 1,
      maxlength: 255,
    }, ],
    languagesSpoken: [{
      type: String,
      minlength: 1,
      maxlength: 255,
    }, ],
    calendar: {
      calendarSchema
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  clientInfo: {
    medicalHistory: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        auto: true,
      },
      startDate: {
        type: Date
      },
      condition: {
        type: String,
        minlength: 1,
        maxlength: 255,
        trim: true,
      },
      notes: {
        type: String,
        minlength: 1,
        maxlength: 1000,
        trim: true,
      },
    }, ],
    allergies: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        auto: true,
      },
      name: {
        type: String,
        minlength: 1,
        maxlength: 255,
        trim: true,
      },
      severity: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
      },
    }, ],
    medication: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        auto: true,
      },
      name: {
        type: String,
        minlength: 1,
        maxlength: 255,
        trim: true,
      },
      dosage: {
        type: Number,
        min: 1,
        max: 10000,
      },
      manufacturer: {
        type: String,
        minlength: 1,
        maxlength: 255,
        trim: true,
      },
    }, ],
    bloodType: {
      type: String,
      uppercase: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model('User', userSchema);