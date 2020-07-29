const Joi = require('@hapi/joi');

const schema = Joi.object({
	host: Joi.string().required(),
	port: Joi.string().max(5).required(),
	secure: Joi.boolean().required(),
	authUser: Joi.string().required(),
	authPassword: Joi.string().required(),
	user_email: Joi.string().email().required(),
	dest_email: Joi.string().email().required(),
	subject: Joi.string().min(1).max(200).required(),
	emailBody: Joi.string().min(1).required(),
});

module.exports = schema;