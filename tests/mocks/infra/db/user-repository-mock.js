class UserRepositoryMock {
  constructor () {
    this.name = 'mocked'
    this.email = 'mocked@mail.com'
    this.userId = 10
  }

  save () { 
    return { id: 1 }
  }

  findById () {
    return {
      name: this.name,
      email: this.email
    }
  }

  deleteById () {
    return true
  }

  updateUserById () {
    return true
  }

  findUserByMail () {
    return {
      id: 10
    }
  }

  findAuthByCode () {
    return {
      userId: this.userId
    }
  }

  savePasswordLessToken () {
    return true
  }
}
exports.UserRepositoryMock = UserRepositoryMock
