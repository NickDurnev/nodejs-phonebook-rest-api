const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().max(30).alphanum().required(),

  phone: Joi.string().max(12).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = { schema };
