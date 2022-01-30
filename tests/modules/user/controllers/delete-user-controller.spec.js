const { deleteUserController } = require('../../../../src/modules/user/controllers/delete-user-controller')
const { successNoContent } = require('../../../../src/utils/http/status.http')
const { UserRepositoryMock } = require('../../../mocks/infra/db/user-repository-mock')

const makeSut = () => {
  const repositoryMock = new UserRepositoryMock()
  const sut = deleteUserController({ repository: repositoryMock })
  return {
    repositoryMock,
    sut
  }
}

let payload = {}
describe('Delete user controller', () => {
  beforeEach(() => {
    payload = {
      userId: 10
    }
  })
  it('Should expected call repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'deleteById')
    await sut.delete(payload)
    expect(spy).toHaveBeenCalledWith({ userId: payload.userId })
  })
  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.delete(payload)
    expect(httpResponse).toStrictEqual(successNoContent())
  })
})
