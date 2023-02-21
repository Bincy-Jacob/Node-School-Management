const Joi = require('joi');

const studentPost = async (req, res, next) => {
  const schema = Joi.object({
    roll_no: Joi.number().integer().required(),
    full_name: Joi.string().required(),
    skills: Joi.array().items(Joi.string()).required(),
    marks: Joi.array().items(Joi.object()).max(5).required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  studentPost,
};
