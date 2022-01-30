const { createProductController } = require('../controllers/create-product-controller')
const { createApikey } = require('../services/verify-product-exists')
const { RequestAdapter } = require('../../../infra/adapters/request/axios.adapter')
const { UserProductRepository } = require('../../../infra/db/pgsql/repositories/user-product-repository')

exports.createProductControllerFactory = () => {
  const verifyProductService = createApikey({ requestAdapter: RequestAdapter })
  return createProductController({
    repository: UserProductRepository, verifyProductExistsService: verifyProductService
  })
}
