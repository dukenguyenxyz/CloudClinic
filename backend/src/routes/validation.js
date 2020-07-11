// Hapi update: https://github.com/hapijs/joi/issues/2145

const Joi = require('@hapi/joi'); // Validation

const signUpValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
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
