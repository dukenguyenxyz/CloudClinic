// Hapi update: https://github.com/hapijs/joi/issues/2145

const Joi = require('@hapi/joi'); // Validation

const schema = Joi.object({
  profileImage: Joi.string(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(), // Joi.ref('password'),
  title: Joi.string(),
  sex: Joi.string(),
  dateOfBirth: Joi.string(), // Joi.date().format('YYYY-MM-DD'),
  phoneNumber: Joi.string(),
  address: Joi.object(),
  isDoctor: Joi.boolean(),
  doctorInfo: Joi.object({
    licence: Joi.string(),
    accreditations: Joi.array(),
    specialtyField: Joi.string(),
    subSpecialtyField: Joi.string(),
    education: Joi.array(),
    workSchedule: Joi.object({
      openingTime: Joi.string(),
      closingTime: Joi.string(),
      lunchBreakStart: Joi.string(),
      lunchBreakEnd: Joi.string(),
      unavailableDateTimes: Joi.array(),
    }),
    yearsExperience: Joi.number().integer(),
    tags: Joi.array(),
    languagesSpoken: Joi.array(),
  }),
  clientInfo: Joi.object({
    weight: Joi.number(),
    medicalHistory: Joi.array().items(
      Joi.object({
        startDate: Joi.string().allow(''), // Joi.date().format('YYYY-MM-DD'),
        condition: Joi.string().allow(''),
        notes: Joi.string().allow(''),
      })
    ),
    allergies: Joi.array().items(
      Joi.object({
        name: Joi.string().allow(''),
        severity: Joi.number().integer().empty('').allow(null),
      })
    ),
    medication: Joi.array().items(
      Joi.object({
        name: Joi.string().allow(''),
        dosage: Joi.number().empty('').allow(null),
        manufacturer: Joi.string().allow(''),
      })
    ),
    bloodType: Joi.string(),
  }),
});

// Add forbidden fields: token & created at & dotorInfo[rating]
const schemaValidation = (data) => schema.validate(data);

const signInValidation = (data) => {
  const signInSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return signInSchema.validate(data);
};

module.exports = { schemaValidation, signInValidation };
