const { NotFoundError } = require('../../../core/errors/not-found-request')
const { BadRequestError } = require('../../../core/errors/bad-request')
const { createdResponse } = require('../../../utils/http/status.http')
const { CONSTANTS } = require('../constants')
exports.createProductController = ({ repository, verifyProductExistsService }) => ({
  async createProduct ({ body, userId }) {
    const { productId } = body
    const productInfos = await verifyProductExistsService.verifyProductExists({ productId })
    if (!productInfos) throw new NotFoundError(CONSTANTS.CREATE.PRODUCTS_NOT_fOUND)
    const productIsInList = await repository.getUserProductById({ userId, productId })
    if (productIsInList) throw new BadRequestError(CONSTANTS.CREATE.PRODUCT_DUPLICATE)
    await repository.save({ userId, productId })
    return createdResponse({ message: CONSTANTS.CREATE.SUCCESS })
  }
})
