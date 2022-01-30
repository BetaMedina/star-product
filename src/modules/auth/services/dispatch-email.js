const { v4 } = require('uuid')

const dispatchCodeSymbol = Symbol('dispatchCode')
const generateCodeSymbol = Symbol('generateCodeSymbol')
exports.authorizationCode = ({ emailAdapter, authRepository }) => ({
  async [generateCodeSymbol] ({ email, userId }) {
    const code = v4()
    const key = `authorizationcode::${code}`
    await authRepository.savePasswordLessToken({ key, payload: { email, userId } })
    return code
  },
  [dispatchCodeSymbol] ({ email, code }) {
    const emailPayload = {
      from: 'noreply@local.com',
      to: email,
      subject: 'Login link',
      text: 'Here is the link to access your credentials',
      html: `<p>To gain access, simply click on the link below.</p><br><a href="${process.env.API_HOST}/api/auth/login/${code}">YOUR PERSONAL LINK</a></b><p>This link will be expired in 5 minutes`
    }
    return emailAdapter.send({ payload: emailPayload })
  },
  async execute ({ userId, email }) {
    const userCode = await this[generateCodeSymbol]({ userId, email })
    return this[dispatchCodeSymbol]({ email, code: userCode })
  }
})
