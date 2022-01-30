const { BaseRepository } = require('../config/base-repository')

class UserRepository extends BaseRepository {
  constructor () {
    super()
    this.table = 'public.user'
  }

  async findUserByMail ({ email }) {
    const columns = [
      'id'
    ]
    const values = [email]
    const response = await this.dbConnection.query(
      {
        query: `SELECT ${columns.join(',')} FROM ${this.table} WHERE email = $1`, values
      }
    )
    return this.formatResponse(response)
  }

  async save ({ name, email }) {
    const columns = [
      'name',
      'email'
    ]
    const values = [name, email]
    const response = await this.dbConnection.query(
      {
        query: `INSERT INTO ${this.table} (${columns.join(',')}) values ($1,$2) ON CONFLICT (email) DO NOTHING RETURNING id`, values
      }
    )
    return this.formatResponse(response)
  }

  async deleteById ({ userId }) {
    const values = [userId]
    const response = await this.dbConnection.query(
      {
        query: `DELETE FROM ${this.table} WHERE id = $1`, values
      }
    )
    return this.formatResponse(response)
  }

  async findById ({ userId }) {
    const columns = [
      'id',
      'name',
      'email'
    ]
    const values = [userId]
    const response = await this.dbConnection.query(
      {
        query: `SELECT ${columns.join(',')} FROM ${this.table} WHERE id = $1`, values
      }
    )
    return this.formatResponse(response)
  }

  async updateUserById ({ userId, name }) {
    const values = [userId, name]
    const response = await this.dbConnection.query(
      {
        query: `UPDATE ${this.table} set name = $2 WHERE id = $1 RETURNING id`, values
      }
    )
    return this.formatResponse(response)
  }
}

exports.UserRepository = new UserRepository()
