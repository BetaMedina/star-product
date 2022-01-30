const { refreshTokenController } = require('../../../../src/modules/auth/controllers/refresh-token-controller')
const { CONSTANTS } = require('../../../../src/modules/auth/constants')
const { successResponse } = require('../../../../src/utils/http/status.http')
const { UnauthorizedError } = require('../../../../src/core/errors/unauthorized-error')
const { CredentialsServiceMock } = require('../../../mocks/modules/auth/credentials-mock')
const { TokenAdapterMock } = require('../../../mocks/infra/adapters/token-generate')

const makeSut = () => {
  const tokenAdapterMock = new TokenAdapterMock()
  const credentialsServiceMock = new CredentialsServiceMock()
  const sut = refreshTokenController({ credentialsService: credentialsServiceMock, tokenAdapter: tokenAdapterMock })
  return {
    tokenAdapterMock,
    credentialsServiceMock,
    sut
  }
}

let payload = {}
describe('Refresh token controller', () => {
  beforeEach(() => {
    payload = {
      body: {
        refreshToken: 'refreshValid'
      }
    }
  })
  it('Should expected return error when token is invalid', async () => {
    const { sut, tokenAdapterMock } = makeSut()
    jest.spyOn(tokenAdapterMock, 'verify').mockReturnValueOnce(null)
    expect(sut.generateNewCredentials(payload)).rejects.toThrowError(new UnauthorizedError(CONSTANTS.REFRESH.TOKEN_INVALID))
  })
  it('Should expected call adapter with correct parameters', async () => {
    const { sut, tokenAdapterMock } = makeSut()
    const spy = jest.spyOn(tokenAdapterMock, 'verify')
    await sut.generateNewCredentials(payload)
    expect(spy).toHaveBeenCalledWith({ token: payload.body.refreshToken, key: process.env.REFRESH_KEY_TOKEN })
  })
  it('Should expected throw when service throws', async () => {
    const { sut, credentialsServiceMock } = makeSut()
    jest.spyOn(credentialsServiceMock, 'execute').mockImplementationOnce(() => { throw new Error('any') })
    expect(sut.generateNewCredentials(payload)).rejects.toThrowError(new Error('any'))
  })
  it('Should expected call service with correct parameters', async () => {
    const { sut, credentialsServiceMock, tokenAdapterMock } = makeSut()
    const spy = jest.spyOn(credentialsServiceMock, 'execute')
    await sut.generateNewCredentials(payload)
    expect(spy).toHaveBeenCalledWith({ payload: { userId: tokenAdapterMock.userId } })
  })
  it('Should expected return success', async () => {
    const { sut, credentialsServiceMock } = makeSut()
    const httpResponse = await sut.generateNewCredentials(payload)
    expect(httpResponse).toStrictEqual(successResponse({ credentials: credentialsServiceMock.apiInfos }))
  })
})
