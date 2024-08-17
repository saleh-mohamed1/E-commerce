const Joi = require("joi");

export const SubCategoriesValidation = Joi.object({
    name:Joi.string().min(1).max(40).required(),
    category:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Valid ObjectId format
    createdBy:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Valid ObjectId format
})