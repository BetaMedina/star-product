const { readUserController } = require('../../../../src/modules/user/controllers/read-user-controller')
const { CONSTANTS } = require('../../../../src/modules/user/constants')
const { successResponse } = require('../../../../src/utils/http/status.http')
const { UserRepositoryMock } = require('../../../mocks/infra/db/user-repository-mock')
const { NotFoundError } = require('../../../../src/core/errors/not-found-request')

const makeSut = () => {
  const repositoryMock = new UserRepositoryMock()
  const sut = readUserController({ repository: repositoryMock })
  return {
    repositoryMock,
    sut
  }
}

let payload = {}
describe('Read user controller', () => {
  beforeEach(() => {
    payload = {
      userId: 10
    }
  })
  it('Should expected return error when user not found', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'findById').mockReturnValueOnce(null)
    expect(sut.read(payload)).rejects.toThrowError(new NotFoundError(CONSTANTS.READ_USER.USER_NOT_FOUND))
  })
  it('Should expected call repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'findById')
    await sut.read(payload)
    expect(spy).toHaveBeenCalledWith({ userId: payload.userId })
  })
  it('Should expected return success', async () => {
    const { sut, repositoryMock } = makeSut()
    const httpResponse = await sut.read(payload)
    expect(httpResponse).toStrictEqual(successResponse({
      user: {
        name: repositoryMock.name,
        email: repositoryMock.email
      } 
    }))
  })
})
