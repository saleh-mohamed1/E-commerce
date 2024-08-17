import Joi from 'joi'
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const ProductValidation = Joi.object({
    title: Joi.string()
    .trim()
    .required()
    .messages({
        'string.base': `"title" should be a type of 'text'`,
        'any.required': `"title" is a required field`
    }),
    description: Joi.string()
        .required()
        .min(30)
        .max(2000)
        .messages({
            'string.base': `"description" should be a type of 'text'`,
            'string.min': `"description" should have a minimum length of {#limit}`,
            'string.max': `"description" should have a maximum length of {#limit}`,
            'any.required': `"description" is a required field`
        }),

    imageCover: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(), encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif','image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })
        .optional()
        .messages({
            'string.base': `"imageCover" should be a type of 'text'`
        }),

    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(), encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif','image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }))
        .messages({
            'array.base': `"images" should be an array of strings`
        }),

    priceAfterDiscount: Joi.number()
        .required()
        .min(0)
        .messages({
            'number.base': `"priceAfterDiscount" should be a type of 'number'`,
            'number.min': `"priceAfterDiscount" should be at least {#limit}`,
            'any.required': `"priceAfterDiscount" is a required field`
        }),

    sold: Joi.number()
        .optional()
        .messages({
            'number.base': `"sold" should be a type of 'number'`
        }),

    stock: Joi.number()
        .min(0)
        .optional()
        .messages({
            'number.base': `"stock" should be a type of 'number'`,
            'number.min': `"stock" should be at least {#limit}`
        }),

    category: objectId
        .required()
        .messages({
            'string.pattern.base': `"category" should be a valid ObjectId`,
            'any.required': `"category" is a required field`
        }),

    subCategory: objectId
        .optional()
        .messages({
            'string.pattern.base': `"subCategory" should be a valid ObjectId`
        }),

    brand: objectId
        .optional()
        .messages({
            'string.pattern.base': `"brand" should be a valid ObjectId`
        }),

    rateAVG: Joi.number()
        .min(0)
        .max(5)
        .optional()
        .messages({
            'number.base': `"rateAVG" should be a type of 'number'`,
            'number.min': `"rateAVG" should be at least {#limit}`,
            'number.max': `"rateAVG" should be at most {#limit}`
        }),

    rateCount: Joi.number()
        .optional()
        .messages({
            'number.base': `"rateCount" should be a type of 'number'`
        }),

    createdBy: objectId
        .required()
        .messages({
            'string.pattern.base': `"createdBy" should be a valid ObjectId`,
            'any.required': `"createdBy" is a required field`
        }),
        price:Joi.number()    
        .min(0)
        .required()


})