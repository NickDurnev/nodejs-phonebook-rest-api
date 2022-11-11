const Joi = require("joi");

const validationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(16).pattern(
      // eslint-disable-next-line prefer-regex-literals
      new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$")
    ),

    name: Joi.string().alphanum().min(3).max(25).trim(true),

    email: Joi.string().email(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `missing required name field ${validation.error.message}`,
    });
  }
  next();
};

module.exports = validationMiddleware;
