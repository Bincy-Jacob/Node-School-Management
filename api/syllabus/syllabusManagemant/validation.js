const Joi = require('joi');

const addSyllabus = async (req, res, next) => {
  const schema = Joi.object({
    syllabusCode: Joi.string().alphanum().required(),
    courseId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    duration: Joi.number().integer().required(),
    syllabus: Joi.array().items(Joi.string()).required(),
  });
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = { addSyllabus };
