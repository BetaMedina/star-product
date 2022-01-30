const generateApiKeySymbol = Symbol('kGenerateExpiresAt')
const generateRefreshTokenSymbol = Symbol('kGenerateExpiresAt')

exports.createApikey = ({ TokenAdapter }) => ({
  [generateRefreshTokenSymbol]: ({ payload }) => {
    const expiresIn = 1 * 60 * 60 * 48
    const token = TokenAdapter.generate({ payload, expiresIn, key: process.env.REFRESH_KEY_TOKEN })
    return {
      expiresIn, 
      token
    }
  },
  [generateApiKeySymbol]: ({ payload }) => {
    const expiresIn = 1 * 60 * 60 * 24
    const token = TokenAdapter.generate({ payload, expiresIn })
    return {
      expiresIn,
      token
    }
  },

  execute ({ payload }) {
    return {
      refreshToken: this[generateRefreshTokenSymbol]({ payload }),
      apiKey: this[generateApiKeySymbol]({ payload })
    }
  }
})
