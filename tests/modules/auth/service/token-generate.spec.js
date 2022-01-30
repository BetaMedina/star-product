const { createApikey } = require('../../../../src/modules/auth/services/generate-credentials')
const { TokenAdapterMock } = require('../../../mocks/infra/adapters/token-generate')
const makeSut = () => {
  const tokenAdapterMock = new TokenAdapterMock()
  const sut = createApikey({ TokenAdapter: tokenAdapterMock })
  return {
    tokenAdapterMock,
    sut
  }
}

let payload = {}
describe('token service', () => {
  beforeEach(() => {
    payload = {
      userId: 10
    }
  })
  it('Should expected called tokenAdapter with correct parameters', async () => {
    const { sut, tokenAdapterMock } = makeSut()
    const spy = jest.spyOn(tokenAdapterMock, 'generate')
    await sut.execute({ payload })
    expect(spy).toHaveBeenNthCalledWith(1, { expiresIn: 172800, key: process.env.REFRESH_KEY_TOKEN, payload: payload })
    expect(spy).toHaveBeenNthCalledWith(2, { expiresIn: 86400, payload: payload })
  })
})
