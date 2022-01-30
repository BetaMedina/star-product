const Joi = require('joi')

exports.createUserSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.base': '"email" deve ser uma "string"',
    'string.empty': '"email" não pode ser vazio',
    'any.required': '"email" é obrigatório',
    'string.email': '"email" precisa ser enviado no formato de "email"' 
  }),
  name: Joi.string().required().messages({
    'string.base': '"name" deve ser uma "string"',
    'string.empty': '"name" não pode ser vazio',
    'any.required': '"name" é obrigatório'
  })
})
