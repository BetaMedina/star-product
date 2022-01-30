const { successNoContent } = require('../../../utils/http/status.http')

exports.deleteUserController = ({ repository }) => ({
  async delete ({ userId }) {
    await repository.deleteById({ userId })
    return successNoContent()
  }
})
