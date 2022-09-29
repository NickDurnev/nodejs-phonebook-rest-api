const Joi = require("joi");

module.exports = {
  validationMiddleware: (req, res, next) => {
    const schema = Joi.object({
      userID: Joi.string(),
      name: Joi.string().alphanum().min(3).max(25).trim(true).required(),

      surname: Joi.string().alphanum().max(25).trim(true).allow(null, ""),

      phone: Joi.string().max(20).required(),

      email: Joi.string().email().allow(null, ""),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
};
