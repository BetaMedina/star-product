const { authorizationController } = require('../../../../src/modules/auth/controllers/authorization-code-controller')
const { CONSTANTS } = require('../../../../src/modules/auth/constants')
const { ForbiddenRequestError } = require('../../../../src/core/errors/forbidden-request')
const { successResponse } = require('../../../../src/utils/http/status.http')
const { UserRepositoryMock } = require('../../../mocks/infra/db/user-repository-mock')
const { DispatchMailMock } = require('../../../mocks/modules/auth/dispatch-email-mock')

const makeSut = () => {
  const repositoryMock = new UserRepositoryMock()
  const dispatchMailService = new DispatchMailMock()
  const sut = authorizationController({ repository: repositoryMock, dispatchMail: dispatchMailService })
  return {
    repositoryMock,
    dispatchMailService,
    sut
  }
}

let payload = {}
describe('Authorization code controller', () => {
  beforeEach(() => {
    payload = {
      body: {
        email: 'test@mocked.com'
      },
      userId: 10
    }
  })
  it('Should expected return error when user not found', async () => {
    const { sut, repositoryMock } = makeSut()
    jest.spyOn(repositoryMock, 'findUserByMail').mockReturnValueOnce(null)
    expect(sut.generateAuthorizationCode(payload)).rejects.toThrowError(new ForbiddenRequestError(CONSTANTS.AUTHORIZATION.EMAIL_NOT_FOUND))
  })
  it('Should expected call repository with correct parameters', async () => {
    const { sut, repositoryMock } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'findUserByMail')
    await sut.generateAuthorizationCode(payload)
    expect(spy).toHaveBeenCalledWith(payload.body)
  })
  it('Should expected throw when service throws', async () => {
    const { sut, dispatchMailService } = makeSut()
    jest.spyOn(dispatchMailService, 'execute').mockImplementationOnce(() => { throw new Error('any') })
    expect(sut.generateAuthorizationCode(payload)).rejects.toThrowError(new Error('any'))
  })
  it('Should expected call service with correct parameters', async () => {
    const { sut, dispatchMailService } = makeSut()
    const spy = jest.spyOn(dispatchMailService, 'execute')
    await sut.generateAuthorizationCode(payload)
    expect(spy).toHaveBeenCalledWith({ userId: payload.userId, email: payload.body.email })
  })
  it('Should expected return success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.generateAuthorizationCode(payload)
    expect(httpResponse).toStrictEqual(successResponse({ message: CONSTANTS.AUTHORIZATION.SUCCESS }))
  })
})
