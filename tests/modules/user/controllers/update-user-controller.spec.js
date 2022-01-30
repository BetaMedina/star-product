const { updateUserController } = require('../../../../src/modules/user/controllers/update-user-controller')
const { CONSTANTS } = require('../../../../src/modules/user/constants')
const { BadRequestError } = require('../../../../src/core/errors/bad-request')
const { successResponse } = require('../../../../src/utils/http/status.http')
const { UserRepositoryMock } = require('../../../mocks/infra/db/user-repository-mock')

const makeSut = () => {
  const repositoryMock = new UserRepositoryMock()
  const sut = updateUserController({ repository: repositoryMock })
  return {
    repositoryMock,
    sut
  }
}

let payload = {}
describe('Update user controller', () => {
  beforeEach(() => {
    payload = {
      body: {
        name: 'mocked'
      },
      userId: 10
    }
  })
  it('Should expected return error when user not updated', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'updateUserById').mockReturnValueOnce(null)
    expect(sut.update(payload)).rejects.toThrowError(new BadRequestError(CONSTANTS.UPDATE_USER.UPDATE_ERROR))
  })
  it('Should expected call repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'updateUserById')
    await sut.update(payload)
    expect(spy).toHaveBeenCalledWith({ name: payload.body.name, userId: payload.userId })
  })
  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.update(payload)
    expect(httpResponse).toStrictEqual(successResponse({ message: CONSTANTS.UPDATE_USER.USER_UPDATED }))
  })
})
