const Joi = require('joi');

module.exports.addUserMinInfoValidator = function addUserMinInfoValidator(body) {
    const JoiSchema = Joi.object({
        firstname: Joi.string().trim().min(2).max(40).required(),
        lastname: Joi.string().trim().min(2).max(40).optional(),
        username: Joi.string().lowercase().trim().min(2).max(40).optional(),
    });
    return JoiSchema.validate(body)
}