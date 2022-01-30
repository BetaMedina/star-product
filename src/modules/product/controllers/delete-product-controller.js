const { successNoContent } = require('../../../utils/http/status.http')
exports.deleteProductController = ({ repository }) => ({
  async deleteProduct ({ params, userId }) {
    const { id } = params
    await repository.deleteProductById({ userId, id })
    return successNoContent()
  }
})
