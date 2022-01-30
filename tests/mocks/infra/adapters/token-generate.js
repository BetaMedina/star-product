class TokenAdapterMock {
  constructor () {
    this.userId = 10
  }

  verify () {
    return {
      userId: this.userId
    }
  }

  generate () {
    return 'validToken'
  }
}

exports.TokenAdapterMock = TokenAdapterMock
