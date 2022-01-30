const { deleteProductController } = require('../controllers/delete-product-controller')
const { UserProductRepository } = require('../../../infra/db/pgsql/repositories/user-product-repository')

exports.deleteProductControllerFactory = () => {
  return deleteProductController({
    repository: UserProductRepository
  })
}
