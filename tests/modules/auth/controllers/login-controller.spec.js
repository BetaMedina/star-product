const { loginController } = require('../../../../src/modules/auth/controllers/login-controller')
const { CONSTANTS } = require('../../../../src/modules/auth/constants')
const { successResponse } = require('../../../../src/utils/http/status.http')
const { UserRepositoryMock } = require('../../../mocks/infra/db/user-repository-mock')
const { UnauthorizedError } = require('../../../../src/core/errors/unauthorized-error')
const { CredentialsServiceMock } = require('../../../mocks/modules/auth/credentials-mock')

const makeSut = () => {
  const serviceApiTokenMock = new CredentialsServiceMock()
  const repositoryMock = new UserRepositoryMock()
  const sut = loginController({ repository: repositoryMock, credentialsService: serviceApiTokenMock })
  return {
    repositoryMock,
    serviceApiTokenMock,
    sut
  }
}

let payload = {}
describe('Login controller', () => {
  beforeEach(() => {
    payload = {
      params: {
        code: 'validCode'
      }
    }
  })
  it('Should expected return error when user not found', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'findAuthByCode').mockReturnValueOnce(null)
    expect(sut.generateLogin(payload)).rejects.toThrowError(new UnauthorizedError(CONSTANTS.LOGIN.INVALID_CODE))
  })
  it('Should expected call repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'findAuthByCode')
    await sut.generateLogin(payload)
    expect(spy).toHaveBeenCalledWith({ code: payload.params.code })
  })
  it('Should expected throw when service throws', async () => {
    const { sut, serviceApiTokenMock } = makeSut()
    jest.spyOn(serviceApiTokenMock, 'execute').mockImplementationOnce(() => { throw new Error('any') })
    expect(sut.generateLogin(payload)).rejects.toThrowError(new Error('any'))
  })
  it('Should expected call service with correct parameters', async () => {
    const { sut, serviceApiTokenMock, repositoryMock } = makeSut()
    const spy = jest.spyOn(serviceApiTokenMock, 'execute')
    await sut.generateLogin(payload)
    expect(spy).toHaveBeenCalledWith({ payload: { userId: repositoryMock.userId } })
  })
  it('Should expected return success', async () => {
    const { sut, serviceApiTokenMock } = makeSut()
    const httpResponse = await sut.generateLogin(payload)
    expect(httpResponse).toStrictEqual(successResponse({ credentials: serviceApiTokenMock.apiInfos }))
  })
})
