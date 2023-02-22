const Joi = require('joi');

module.exports.updateUserProfileValidator = (body) => {
    const JoiSchema = Joi.object({
        firstname: Joi.string().trim().min(2).max(40).optional(),
        lastname: Joi.string().trim().min(2).max(40).optional(),
        bio: Joi.string().trim().max(300).allow('').optional(),
        phone: Joi.string()
            .pattern(/^\d{10}$/) // only allow 10 digit numeric strings
            .allow('')
            .optional(),
        personalMail: Joi.string()
            .email({ tlds: { allow: false } }) // only allow non-TLD email addresses
            .allow('')
            .optional(),
        collegeMail: Joi.string()
            .email()
            .allow('')
            .optional(),
        workMail: Joi.string()
            .email()
            .allow('')
            .optional(),
        whatsapp: Joi.string()
            .pattern(/^(\+\d{1,3}\s?)?\d{10}$/) // allow +<country-code> <number> or <number> format
            .allow('')
            .optional(),
        telegram: Joi.string()
            .alphanum() // only allow alphanumeric characters
            .min(3)
            .max(32)
            .allow('')
            .optional(),
        instagram: Joi.string()
            .alphanum() // only allow alphanumeric characters
            .min(3)
            .max(32)
            .allow('')
            .optional(),
        facebook: Joi.string()
            .pattern(/^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{1,}$/i)
            .allow('')
            .optional(),
        twitter: Joi.string()
            .alphanum() // only allow alphanumeric characters
            .min(3)
            .max(32)
            .allow('')
            .optional(),
        linkedin: Joi.string()
            .pattern(/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{5,30}\/?$/i)
            .allow('')
            .optional(),
        linktree: Joi.string()
            .uri({ scheme: [/https?/] })
            .allow('')
            .optional(),
        website: Joi.string()
            .uri({ scheme: [/https?/] })
            .allow('')
            .optional(),
    });
    return JoiSchema.validate(body)
}