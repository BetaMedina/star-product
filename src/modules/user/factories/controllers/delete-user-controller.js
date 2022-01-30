const { deleteUserController } = require('../../controllers/delete-user-controller')
const { UserRepository } = require('../../../../infra/db/pgsql/repositories/user-repository')

exports.deleteUserControllerFactory = () => {
  return deleteUserController({
    repository: UserRepository
  })
}
