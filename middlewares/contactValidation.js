const Joi = require("joi");

module.exports = {
  validationMiddleware: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().max(30).alphanum().required(),

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
