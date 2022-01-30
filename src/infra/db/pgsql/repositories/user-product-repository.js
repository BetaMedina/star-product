const { BaseRepository } = require('../config/base-repository')

class UserProductRepository extends BaseRepository {
  constructor () {
    super()
    this.table = 'public.user_product'
  }

  async save ({ userId, productId }) {
    const columns = [
      'user_id',
      'product_id'
    ]
    const values = [userId, productId]
    const response = await this.dbConnection.query(
      {
        query: `INSERT INTO ${this.table} (${columns.join(',')}) values ($1,$2) RETURNING id`, values
      }
    )
    return this.formatResponse(response)
  }

  async getUserProductById ({ userId, productId }) {
    const columns = [
      'id'
    ]
    const values = [userId, productId]
    const response = await this.dbConnection.query(
      {
        query: `SELECT ${columns.join(',')} FROM ${this.table} WHERE user_id = $1 AND product_id = $2`, values
      }
    )
    return this.formatResponse(response)
  }

  async listByUserId ({ userId, page = 1 }) {
    const LIMITQUANTITY = 50
    const columns = [
      'id',
      'product_id'
    ]
    const values = [userId]
    const response = await this.dbConnection.query(
      {
        query: `SELECT ${columns.join(',')} FROM ${this.table} WHERE user_id = $1 LIMIT ${LIMITQUANTITY} OFFSET ${(page - 1) * LIMITQUANTITY}`, values
      }
    )
    return this.formatListResponse(response)
  }

  async deleteProductById ({ id, productId }) {
    const values = [productId, id]
    await this.dbConnection.query(
      {
        query: `DELETE FROM ${this.table} WHERE user_id = $1 AND product_id = $2`, values
      }
    )
  }
}

exports.UserProductRepository = new UserProductRepository()
