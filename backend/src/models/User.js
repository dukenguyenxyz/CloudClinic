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
    trim: true,
  },
  sex: {
    type: Boolean,
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
    street: { type: String, min: 1, max: 255 },
    city: { type: String, min: 1, max: 255 },
    state: { type: String, min: 1, max: 255 },
    country: { type: String, min: 1, max: 255 },
    postcode: { type: Number, min: 1, max: 10000 },
  },
  email: {
    type: String,
    required: true,
    min: 255,
    max: 6,
    trim: true,
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
        startDate: { type: Date },
        condition: { type: String, min: 1, max: 255, trim: true },
        notes: { type: String, min: 1, max: 1000 },
      },
    ],
    allergies: { type: String },
    medication: [
      {
        drugName: { type: String, min: 1, max: 255, trim: true },
        dosage: { type: Number, min: 1, max: 10000 },
        manufacturer: { type: String, min: 1, max: 255, trim: true },
      },
    ],
  },
});

module.exports = mongoose.model('User', userSchema);
