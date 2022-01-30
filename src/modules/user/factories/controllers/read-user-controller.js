const { readUserController } = require('../../controllers/read-user-controller')
const { UserRepository } = require('../../../../infra/db/pgsql/repositories/user-repository')

exports.readUserControllerFactory = () => {
  return readUserController({
    repository: UserRepository
  })
}
