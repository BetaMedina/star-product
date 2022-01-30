const { schemaValidateMiddlewareFactory } = require('../../modules/@shared/factories/middlewares/validate-schema')
const { authMiddlewareFactory } = require('../../modules/@shared/factories/middlewares/auth-middleware')
const { adaptRoute, adaptMiddleware } = require('../adapters')
const { createUserSchema, updateUserSchema } = require('../../infra/adapters/validator/joi/schemas/user')
const { createUserControllerFactory, deleteUserControllerFactory, readUserControllerFactory, updateUserControllerFactory } = require('../../modules/user/factories/controllers')

module.exports = (route) => {
  route.post('/user', adaptMiddleware({ middleware: schemaValidateMiddlewareFactory({ schemaValidate: createUserSchema }) }), adaptRoute({ controller: createUserControllerFactory(), method: 'create' }))
  route.get('/user', adaptMiddleware({ middleware: authMiddlewareFactory() }), adaptRoute({ controller: readUserControllerFactory(), method: 'read' }))
  route.patch('/user', adaptMiddleware({ middleware: authMiddlewareFactory() }), adaptMiddleware({ middleware: schemaValidateMiddlewareFactory({ schemaValidate: updateUserSchema }) }), adaptRoute({ controller: updateUserControllerFactory(), method: 'update' }))
  route.delete('/user', adaptMiddleware({ middleware: authMiddlewareFactory() }), adaptRoute({ controller: deleteUserControllerFactory(), method: 'delete' }))
}
