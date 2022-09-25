const Joi = require("joi");

module.exports = {
  validationMiddleware: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(25).trim(true).required(),

      surname: Joi.string().alphanum().min(3).max(25).trim(true).required(),

      phone: Joi.string().max(20).required(),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
};
