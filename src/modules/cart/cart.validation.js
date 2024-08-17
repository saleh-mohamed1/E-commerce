import Joi from "joi";

export const cartValidationSchema = Joi.object({
    user: Joi.string().hex().length(24).required(),  // Assuming ObjectId is 24-character hexadecimal string
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().hex().length(24).required(),
            quantity: Joi.number().integer().min(1).default(1),
            price: Joi.number().positive().required()
        })
    ).required(),
    totalCartPrice: Joi.number().positive().required(),
    discount: Joi.number().min(0).default(0),
    totalCartPriceAfterDiscount: Joi.number().positive().required()
}).required();