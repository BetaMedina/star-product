const { createUserController } = require('../../../../src/modules/user/controllers/create-user-controller')
const { CONSTANTS } = require('../../../../src/modules/user/constants')
const { ForbiddenRequestError } = require('../../../../src/core/errors/forbidden-request')
const { createdResponse } = require('../../../../src/utils/http/status.http')
const { UserRepositoryMock } = require('../../../mocks/infra/db/user-repository-mock')

const makeSut = () => {
  const repositoryMock = new UserRepositoryMock()
  const sut = createUserController({ repository: repositoryMock })
  return {
    repositoryMock,
    sut
  }
}

let payload = {}
describe('Create user controller', () => {
  beforeEach(() => {
    payload = {
      body: {
        email: 'test@mocked.com',
        name: 'mocked'
      }
    }
  })
  it('Should expected return error when user not save', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'save').mockReturnValueOnce(null)
    expect(sut.create(payload)).rejects.toThrowError(new ForbiddenRequestError(CONSTANTS.CREATE_USER.SAVE_ERROR))
  })
  it('Should expected call repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'save')
    await sut.create(payload)
    expect(spy).toHaveBeenCalledWith(payload.body)
  })
  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.create(payload)
    expect(httpResponse).toStrictEqual(createdResponse({ message: CONSTANTS.CREATE_USER.USER_CREATED }))
  })
})
