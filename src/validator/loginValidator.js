const Joi = require('joi');
const { ONLY_NUMBERS } = require('../utils/patterns');

module.exports.validateLoginWithPhone = function validateLoginWithPhone(body) {
    const JoiSchema = Joi.object({
        phone: Joi.string().trim().min(10).max(10).pattern(ONLY_NUMBERS).required()
    });
    return JoiSchema.validate(body)
}