const mongoose = require('mongoose');
const calendarSchema = require('./Calendar');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
  },
  title: {
    type: String,
    min: 6,
    max: 255,
    trim: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: null,
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
    min: 10,
    max: 12,
    trim: true,
  },
  address: {
    number: { type: Number, min: 1, max: 5000 },
    street: { type: String, min: 1, max: 255, trim: true },
    city: { type: String, min: 1, max: 255, trim: true },
    state: { type: String, min: 1, max: 255, trim: true },
    country: { type: String, min: 1, max: 255, trim: true },
    postcode: { type: Number, min: 1, max: 10000 },
  },
  email: {
    type: String,
    required: true,
    min: 255,
    max: 6,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 1024,
    max: 6,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isDoctor: {
    type: Boolean,
    required: true,
  },
  doctorInfo: {
    specialtyField: { type: String, min: 1, max: 255, trim: true },
    subSpecialtyField: { type: String, min: 1, max: 255, trim: true },
    education: { type: String },
    calendar: { calendarSchema },
  },
  clientInfo: {
    medicalHistory: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        startDate: { type: Date },
        condition: { type: String, min: 1, max: 255, trim: true },
        notes: { type: String, min: 1, max: 1000 },
      },
    ],
    allergies: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        name: { type: String, min: 1, max: 255, trim: true },
        severity: { type: Number, min: 1, max: 5, default: 1 },
      },
    ],
    medication: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        drugName: { type: String, min: 1, max: 255, trim: true },
        dosage: { type: Number, min: 1, max: 10000 },
        manufacturer: { type: String, min: 1, max: 255, trim: true },
      },
    ],
    createDate: {
      type: Date,
      default: Date.now,
    },
    modifiedDate: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model('User', userSchema);
