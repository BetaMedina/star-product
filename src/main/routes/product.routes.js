const { adaptRoute, adaptMiddleware } = require('../adapters')
const { createProductControllerFactory, listProductControllerFactory, deleteProductControllerFactory } = require('../../modules/product/factories')
const { authMiddlewareFactory } = require('../../modules/@shared/factories/middlewares/auth-middleware')

module.exports = (route) => {
  route.post('/user/product', adaptMiddleware({ middleware: authMiddlewareFactory() }), adaptRoute({ method: 'createProduct', controller: createProductControllerFactory() }))
  route.get('/user/product', adaptMiddleware({ middleware: authMiddlewareFactory() }), adaptRoute({ method: 'listProducts', controller: listProductControllerFactory() }))
  route.delete('/user/product/:id', adaptMiddleware({ middleware: authMiddlewareFactory() }), adaptRoute({ method: 'deleteProduct', controller: deleteProductControllerFactory() }))
}
