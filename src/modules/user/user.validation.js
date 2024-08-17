const Joi = require('joi');


const UserSignup = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.base': `"name" should be a type of 'text'`,
            'any.required': `"name" is a required field`
        }),

    email: Joi.string()
        .email()
        .pattern(/\w{3,10}@(gmail|yahoo|hotmail|outlook).com$/)
        .required()
        .messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.email': `"email" must be a valid email`,
            'any.required': `"email" is a required field`
        }),

    password: Joi.string()
    .pattern(/^01[0125]\d{8}$/)
        .required()
        .messages({
            'string.base': `"password" should be a type of 'text'`,
            'any.required': `"password" is a required field`
        }),

    isBlocked: Joi.boolean()
        .default(false)
        .messages({
            'boolean.base': `"isBlocked" should be a type of 'boolean'`
        }),

    role: Joi.string()
        .valid('Admin', 'User')
        .default('User')
        .messages({
            'string.base': `"role" should be a type of 'text'`,
            'any.only': `"role" must be one of [Admin, User]`
        })
});
const UserSignin = Joi.object({
   

    email: Joi.string()
        .email()
        .required()
        .pattern(/\w{3,10}@(gmail|yahoo|hotmail|outlook).com$/)
        .messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.email': `"email" must be a valid email`,
            'any.required': `"email" is a required field`
        }),
    password: Joi.string()
        .pattern(/^01[0125]\d{8}$/)
        .required()
        .messages({
            'string.base': `"password" should be a type of 'text'`,
            'any.required': `"password" is a required field`
        }),
});