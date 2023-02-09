const Joi = require('joi');
const { ONLY_NUMBERS } = require('../utils/patterns');

module.exports.validateOtpValidator = function validateOtpValidator(body) {
    const JoiSchema = Joi.object({
        phone: Joi.string().trim().min(10).max(10).pattern(ONLY_NUMBERS).required(),
        otp: Joi.string().trim().min(4).max(4).pattern(ONLY_NUMBERS).required()
    });
    return JoiSchema.validate(body)
}