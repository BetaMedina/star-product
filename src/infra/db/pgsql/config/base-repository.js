const dbConnection = require('../config/postgres.config')

class BaseRepository {
  constructor () {
    this.dbConnection = dbConnection
  }

  async formatResponse (row) {
    return row.length ? row[0] : null
  }

  async formatListResponse (row) {
    return row.length ? row : null
  }

  async save (parameters) {
    throw new Error('Not implemented')
  }
}

exports.BaseRepository = BaseRepository
