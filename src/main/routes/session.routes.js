const { adaptRoute, adaptMiddleware } = require('../adapters')
const { authorizationFactory, refreshTokenFactory, loginFactory } = require('../../modules/auth/factories')
const { schemaValidateMiddlewareFactory } = require('../../modules/@shared/factories/middlewares/validate-schema')
const { authorizationCodeSchema, refreshTokenSchema } = require('../../infra/adapters/validator/joi/schemas/auth')

module.exports = (route) => {
  route.post('/auth/code', adaptMiddleware({ middleware: schemaValidateMiddlewareFactory({ schemaValidate: authorizationCodeSchema }) }), adaptRoute({ controller: authorizationFactory(), method: 'generateAuthorizationCode' }))
  route.get('/auth/login/:code', adaptRoute({ controller: loginFactory(), method: 'generateLogin' }))
  route.post('/auth/refresh', adaptMiddleware({ middleware: schemaValidateMiddlewareFactory({ schemaValidate: refreshTokenSchema }) }), adaptRoute({ controller: refreshTokenFactory(), method: 'generateNewCredentials' }))
}
