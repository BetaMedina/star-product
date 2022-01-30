const { authorizationCode } = require('../../../../src/modules/auth/services/dispatch-email')
const { UserRepositoryMock } = require('../../../mocks/infra/db/user-repository-mock')
const { EmailMock } = require('../../../mocks/infra/adapters/email-adapter')
const { v4 } = require('uuid')

jest.mock('uuid')

const makeSut = () => {
  const repositoryMock = new UserRepositoryMock()
  const emailMock = new EmailMock()
  const sut = authorizationCode({ authRepository: repositoryMock, emailAdapter: emailMock })
  return {
    repositoryMock,
    emailMock,
    sut
  }
}

let payload = {}
describe('dispatch mail service', () => {
  beforeEach(() => {
    payload = {
      userId: 10, email: 'mocked@mail.com'
    }
  })
  it('Should expected repository with correct parameters', async () => {
    v4.mockReturnValue('testid')
    const { repositoryMock, sut } = makeSut()
    const spy = jest.spyOn(repositoryMock, 'savePasswordLessToken')
    await sut.execute(payload)
    expect(spy).toHaveBeenCalledWith({ key: 'authorizationcode::testid', payload })
  })
  it('Should expected mail with correct parameters', async () => {
    const uuidMocked = 'testid'
    v4.mockReturnValue(uuidMocked)
    
    const emailExpected = {
      from: 'noreply@local.com',
      to: payload.email,
      subject: 'Login link',
      text: 'Here is the link to access your credentials',
      html: `<p>To gain access, simply click on the link below.</p><br><a href="${process.env.API_HOST}/api/auth/login/${uuidMocked}">YOUR PERSONAL LINK</a></b><p>This link will be expired in 5 minutes`
    }
    
    const { emailMock, sut } = makeSut()
    const spy = jest.spyOn(emailMock, 'send')
    await sut.execute(payload)
    expect(spy).toHaveBeenCalledWith({ payload: emailExpected })
  })
})
