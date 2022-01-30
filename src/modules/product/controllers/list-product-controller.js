const { NotFoundError } = require('../../../core/errors/not-found-request')
const { successResponse } = require('../../../utils/http/status.http')
const { CONSTANTS } = require('../constants')
exports.listProductController = ({ repository }) => ({
  async listProducts ({ query, userId }) {
    const { page } = query
    const productFavoriteList = await repository.listByUserId({ userId, page })
    if (!productFavoriteList) throw new NotFoundError(CONSTANTS.LIST.LIST_NOT_FOUND)
    return successResponse({ productList: productFavoriteList })
  }
})
