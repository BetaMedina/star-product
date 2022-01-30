const { BaseRepository } = require('./base')

class AuthRepository extends BaseRepository {
  savePasswordLessToken ({ key, payload }) {
    const expireTime = 5 * 60
    return this.set({ key, payload: JSON.stringify(payload), expireTime })
  }

  saveApiKey ({ apiKey, auth, expireTime }) {
    return this.set({ key: `authkey::${apiKey}`, payload: JSON.stringify(auth), expireTime })
  }

  async findAuthByCode ({ code }) {
    const response = await this.get({ key: `authorizationcode::${code}` })
    if (response) return JSON.parse(response)
    return null
  }
}

exports.AuthRepository = new AuthRepository()
