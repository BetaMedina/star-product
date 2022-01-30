const { listProductControllerFactory } = require('./list-product-controller-factory')
const { createProductControllerFactory } = require('./create-product-controller-factory')
const { deleteProductControllerFactory } = require('./delete-product-controller-factory')

module.exports = {
  listProductControllerFactory,
  createProductControllerFactory,
  deleteProductControllerFactory
}
