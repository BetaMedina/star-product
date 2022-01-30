const { Pool } = require('pg')
const { postgresConfig } = require('./constants')

class PgConnection {
  constructor () {
    this.poolInstance = new Pool(postgresConfig)
    this.poolInstance.on('error', (error) => {
      console.error(`[POSTGRES] ${error.message}`)
    })
    this.logDatabaseMessages()
  }

  logDatabaseMessages () {
    if (this.poolInstance) {
      if (!this.poolInstance.options.database) {
        return console.error('\x1b[31m** POSTGRES ALERT ** | Disconnected database, check the env file \x1b[0m')
      }
      return console.info(`\x1b[32mPOSTGRES | ${this.poolInstance.options.database} INFO on ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}: \x1b[0m`)
    }
  }

  async query ({ query, values }) {
    let connection
    try {
      connection = await this.poolInstance.connect()
      const { rows: result } = await connection.query(query, values)
      return result
    } catch (e) {
      if (e.constraint) {
        throw new Error({
          constraint: e.constraint,
          message: e.message
        })
      }

      throw new Error({ message: e.message })
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
}

module.exports = new PgConnection()
