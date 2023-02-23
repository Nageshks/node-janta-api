const Joi = require('joi');

module.exports.validateUpdateProfilePictureUrl = (body) => {
    const JoiSchema = Joi.object({
        filename: Joi.string().trim().required()
    });
    return JoiSchema.validate(body)
}