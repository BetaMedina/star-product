const { createProductController } = require('../../../../src/modules/product/controllers/create-product-controller')
const { CONSTANTS } = require('../../../../src/modules/product/constants')
const { createdResponse } = require('../../../../src/utils/http/status.http')
const { NotFoundError } = require('../../../../src/core/errors/not-found-request')
const { BadRequestError } = require('../../../../src/core/errors/bad-request')
const { ProductRepositoryMock } = require('../../../mocks/infra/db/product-repository-mock')
const { VerifyProductExistsServiceMock } = require('../../../mocks/modules/product/verify-product-service-mock')

const makeSut = () => {
  const repositoryMock = new ProductRepositoryMock()
  const serviceMock = new VerifyProductExistsServiceMock()
  const sut = createProductController({ repository: repositoryMock, verifyProductExistsService: serviceMock })
  return {
    repositoryMock,
    serviceMock,
    sut
  }
}

let payload = {}
describe('Create product controller', () => {
  beforeEach(() => {
    payload = {
      body: {
        productId: 'validProductId'
      },
      userId: 10
    }
  })
  it('Should expected return error when product not found', async () => {
    const { sut, serviceMock } = makeSut()
    jest.spyOn(serviceMock, 'verifyProductExists').mockReturnValueOnce(null)
    expect(sut.createProduct(payload)).rejects.toThrowError(new NotFoundError(CONSTANTS.CREATE.PRODUCTS_NOT_fOUND))
  })
  it('Should expected to called service with correct parameters', async () => {
    const { sut, serviceMock } = makeSut()
    const spy = jest.spyOn(serviceMock, 'verifyProductExists')
    await sut.createProduct(payload)
    expect(spy).toHaveBeenLastCalledWith({ productId: payload.body.productId })
  })
  it('Should expected return error when product alredy in list', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'getUserProductById').mockReturnValueOnce(true)
    expect(sut.createProduct(payload)).rejects.toThrowError(new BadRequestError(CONSTANTS.CREATE.PRODUCT_DUPLICATE))
  })
  it('Should expected return error when product alredy in list', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'getUserProductById')
    await sut.createProduct(payload)
    expect(spy).toHaveBeenCalledWith({ userId: payload.userId, productId: payload.body.productId })
  })
  it('Expected to called save with correr parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'save')
    await sut.createProduct(payload)
    expect(spy).toHaveBeenLastCalledWith({ userId: payload.userId, productId: payload.body.productId })
  })
  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.createProduct(payload)
    expect(httpResponse).toStrictEqual(createdResponse({ message: CONSTANTS.CREATE.SUCCESS }))
  })
})
