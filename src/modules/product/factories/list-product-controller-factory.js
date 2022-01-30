const { listProductController } = require('../controllers/list-product-controller')
const { UserProductRepository } = require('../../../infra/db/pgsql/repositories/user-product-repository')

exports.listProductControllerFactory = () => {
  return listProductController({
    repository: UserProductRepository
  })
}
