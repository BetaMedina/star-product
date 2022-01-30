const Joi = require('joi')

exports.updateUserSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': '"name" deve ser uma "string"',
    'string.empty': '"name" não pode ser vazio',
    'any.required': '"name" é obrigatório'
  })
})
