const { deleteProductController } = require('../../../../src/modules/product/controllers/delete-product-controller')
const { successNoContent } = require('../../../../src/utils/http/status.http')
const { ProductRepositoryMock } = require('../../../mocks/infra/db/product-repository-mock')

const makeSut = () => {
  const repositoryMock = new ProductRepositoryMock()
  const sut = deleteProductController({ repository: repositoryMock })
  return {
    repositoryMock,
    sut
  }
}

let payload = {}
describe('delete product controller', () => {
  beforeEach(() => {
    payload = {
      params: {
        id: 1
      },
      userId: 10
    }
  })
  it('Should expected return error when delete throws', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'deleteProductById').mockImplementationOnce(() => { throw new Error('any') })
    expect(sut.deleteProduct(payload)).rejects.toThrowError(new Error('any'))
  })
  it('Should expected to called repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'deleteProductById')
    await sut.deleteProduct(payload)
    expect(spy).toHaveBeenLastCalledWith({ userId: payload.userId, id: payload.params.id })
  })
  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.deleteProduct(payload)
    expect(httpResponse).toStrictEqual(successNoContent())
  })
})
