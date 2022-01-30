const { createUserController } = require('../../controllers/create-user-controller')
const { UserRepository } = require('../../../../infra/db/pgsql/repositories/user-repository')

exports.createUserControllerFactory = () => {
  return createUserController({
    repository: UserRepository
  })
}
