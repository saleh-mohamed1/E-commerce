import Joi from"joi"


export const CouponValidation= Joi.object({
code: Joi.string()
.required()
.messages({
    'string.base': `"code" should be a type of 'text'`,
    'any.required': `"code" is a required field`
}),

expires: Joi.date()
.messages({
    'date.base': `"expires" should be a valid date`
}),

disCount: Joi.number()
.messages({
    'number.base': `"disCount" should be a type of 'number'`
})
})