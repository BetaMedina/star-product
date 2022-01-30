const { listProductController } = require('../../../../src/modules/product/controllers/list-product-controller')
const { CONSTANTS } = require('../../../../src/modules/product/constants')
const { successResponse } = require('../../../../src/utils/http/status.http')
const { NotFoundError } = require('../../../../src/core/errors/not-found-request')
const { ProductRepositoryMock } = require('../../../mocks/infra/db/product-repository-mock')

const makeSut = () => {
  const repositoryMock = new ProductRepositoryMock()
  const sut = listProductController({ repository: repositoryMock })
  return {
    repositoryMock,
    sut
  }
}

let payload = {}
describe('List product controller', () => {
  beforeEach(() => {
    payload = {
      query: {
        page: 1
      },
      userId: 10
    }
  })
  it('Should expected return error when list not found', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'listByUserId').mockReturnValueOnce(null)
    expect(sut.listProducts(payload)).rejects.toThrowError(new NotFoundError(CONSTANTS.LIST.LIST_NOT_FOUND))
  })
  it('Should expected to called repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'listByUserId')
    await sut.listProducts(payload)
    expect(spy).toHaveBeenLastCalledWith({ userId: payload.userId, page: payload.query.page })
  })
  it('Should expected return success', async () => {
    const { sut, repositoryMock } = makeSut()
    const httpResponse = await sut.listProducts(payload)
    expect(httpResponse).toStrictEqual(successResponse({ productList: repositoryMock.productList }))
  })
})
