// Hapi update: https://github.com/hapijs/joi/issues/2145

const Joi = require('@hapi/joi'); // Validation

// Add forbidden fields: token & created at & dotorInfo[rating]
const signUpValidation = (data) => {
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
    doctorInfo: Joi.object(),
    clientInfo: Joi.object(),
  });

  return schema.validate(data);
};

const signInValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;
