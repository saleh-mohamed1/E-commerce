
import Joi from "joi"
export const ReviewValidation = Joi.object({
    comment:Joi.string().min(10).max(300).required(),
    user:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Valid ObjectId format
    product:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Valid ObjectId format
    rate:Joi.number().min(0).max(1).required()
})