const Joi = require('joi');

const registerUser = async (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    salt: Joi.string(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  registerUser,
};
