// Hapi update: https://github.com/hapijs/joi/issues/2145

const Joi = require('@hapi/joi'); // Validation

const schema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(), // Joi.ref('password'),
  title: Joi.string(),
  sex: Joi.string(),
  weight: Joi.number(),
  dateOfBirth: Joi.date(),
  phoneNumber: Joi.number().integer(),
  address: Joi.object(),
  isDoctor: Joi.boolean(),
  doctorInfo: Joi.object({
    licence: Joi.string(),
    accreditations: Joi.array(),
    specialtyField: Joi.string(),
    subSpecialtyField: Joi.string(),
    education: Joi.array(),
    yearsExperience: Joi.number().integer(),
    tags: Joi.array(),
    languagesSpoken: Joi.array(),
  }),
  clientInfo: Joi.object({
    medicalHistory: Joi.array().items(
      Joi.object({
        startDate: Joi.date(),
        condition: Joi.string(),
        notes: Joi.string(),
      })
    ),
    allergies: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        severity: Joi.number().integer(),
      })
    ),
    medication: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        dosage: Joi.number(),
        manufacturer: Joi.string(),
      })
    ),
    bloodType: Joi.string(),
  }),
});

// Add forbidden fields: token & created at & dotorInfo[rating]
const schemaValidation = (data) => {
  return schema.validate(data);
};

const signInValidation = (data) => {
  const signInSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return signInSchema.validate(data);
};

module.exports = {
  schemaValidation,
  signInValidation,
};
