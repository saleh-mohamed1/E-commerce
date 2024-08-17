/* import Joi from "joi";
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const orderValidationSchema = Joi.object({
    user: objectId.required()
        .messages({
            'string.pattern.base': `"user" should be a valid ObjectId`,
            'any.required': `"user" is a required field`
        }),

    orderItems: Joi.array().items(
        Joi.object({
            product: objectId.required()
                .messages({
                    'string.pattern.base': `"product" should be a valid ObjectId`,
                    'any.required': `"product" is a required field`
                }),
            quantity: Joi.number().required()
                .messages({
                    'number.base': `"quantity" should be a type of 'number'`,
                    'any.required': `"quantity" is a required field`
                }),
            price: Joi.number().required()
                .messages({
                    'number.base': `"price" should be a type of 'number'`,
                    'any.required': `"price" is a required field`
                })
        })
    ).required()
        .messages({
            'array.base': `"orderItems" should be an array`,
            'any.required': `"orderItems" is a required field`
        }),

    totalOrderPrice: Joi.number().required()
        .messages({
            'number.base': `"totalOrderPrice" should be a type of 'number'`,
            'any.required': `"totalOrderPrice" is a required field`
        }),

    shippingAddress: Joi.object({
        city: Joi.string().required()
            .messages({
                'string.base': `"city" should be a type of 'text'`,
                'any.required': `"city" is a required field`
            }),
        street: Joi.string().required()
            .messages({
                'string.base': `"street" should be a type of 'text'`,
                'any.required': `"street" is a required field`
            }),
        phone: Joi.string().required()
            .messages({
                'string.base': `"phone" should be a type of 'text'`,
                'any.required': `"phone" is a required field`
            })
    }).required()
        .messages({
            'object.base': `"shippingAddress" should be an object`,
            'any.required': `"shippingAddress" is a required field`
        }),

    paymentType: Joi.string().valid('Cash', 'Card').default('Cash')
        .messages({
            'string.base': `"paymentType" should be a type of 'text'`,
            'any.only': `"paymentType" must be one of [Cash, Card]`
        }),

    isPaid: Joi.boolean().default(false)
        .messages({
            'boolean.base': `"isPaid" should be a type of 'boolean'`
        }),

    paidAt: Joi.date().optional()
        .messages({
            'date.base': `"paidAt" should be a valid date`
        }),

    isDelivered: Joi.boolean().default(false)
        .messages({
            'boolean.base': `"isDelivered" should be a type of 'boolean'`
        }),

    deliveredAt: Joi.date().optional()
        .messages({
            'date.base': `"deliveredAt" should be a valid date`
        })
}); */