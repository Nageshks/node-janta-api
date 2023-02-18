const Joi = require('joi');

module.exports.updateUserProfileValidator = (body) => {
    const JoiSchema = Joi.object({
        firstname: Joi.string().trim().min(2).max(40).optional(),
        lastname: Joi.string().trim().min(2).max(40).optional(),
        bio: Joi.string().trim().max(300),
        phone: Joi.string()
            .pattern(/^\d{10}$/) // only allow 10 digit numeric strings
            .optional(),
        personalMail: Joi.string()
            .email({ tlds: { allow: false } }) // only allow non-TLD email addresses
            .optional(),
        collegeMail: Joi.string()
            .email()
            .optional(),
        workMail: Joi.string()
            .email()
            .optional(),
        whatsapp: Joi.string()
            .pattern(/^(\+\d{1,3}\s?)?\d{10}$/) // allow +<country-code> <number> or <number> format
            .optional(),
        telegram: Joi.string()
            .alphanum() // only allow alphanumeric characters
            .min(5)
            .max(32)
            .optional(),
        instagram: Joi.string()
            .pattern(/^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_]{1,}$/i)
            .optional(),
        facebook: Joi.string()
            .pattern(/^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{1,}$/i)
            .optional(),
        twitter: Joi.string()
            .pattern(/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/i)
            .optional(),
        linkedin: Joi.string()
            .pattern(/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{5,30}\/?$/i)
            .optional(),
        linktree: Joi.string()
            .uri({ scheme: [/https?/] })
            .optional(),
        website: Joi.string()
            .uri({ scheme: [/https?/] })
            .optional(),
    });
    return JoiSchema.validate(body)
}