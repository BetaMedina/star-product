class CredentialsServiceMock {
  constructor () {
    this.apiInfos = {
      token: 'validToken',
      expiresToken: 'anyTime'
    }
  }

  execute () {
    return this.apiInfos
  }
}

exports.CredentialsServiceMock = CredentialsServiceMock
