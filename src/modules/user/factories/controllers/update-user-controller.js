const { updateUserController } = require('../../controllers/update-user-controller')
const { UserRepository } = require('../../../../infra/db/pgsql/repositories/user-repository')

exports.updateUserControllerFactory = () => {
  return updateUserController({
    repository: UserRepository
  })
}
