const Joi = require("joi");

module.exports = {
  validationMiddleware: (req, res, next) => {
    const schema = Joi.object({
      avatarIRL: Joi.string(),
      userID: Joi.string(),
      name: Joi.string().alphanum().min(3).max(20).trim(true).required(),

      surname: Joi.string().alphanum().max(20).trim(true).allow(null, ""),

      phone: Joi.string().max(20).required(),

      email: Joi.string().email().allow(null, ""),

      favorite: Joi.bool(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      console.log(validation.error);
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
};
