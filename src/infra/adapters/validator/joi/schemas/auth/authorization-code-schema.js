const Joi = require('joi')

exports.authorizationCodeSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.base': '"email" deve ser uma "string"',
    'string.empty': '"email" não pode ser vazio',
    'any.required': '"email" é obrigatório',
    'string.email': '"email" precisa ser enviado no formato de "email"' 
  })
})
