const Joi = require('joi')

exports.refreshTokenSchema = Joi.object().keys({
  refreshToken: Joi.string().required().messages({
    'string.base': '"refreshToken" deve ser uma "string"',
    'string.empty': '"refreshToken" não pode ser vazio',
    'any.required': '"refreshToken" é obrigatório'
  })
})
