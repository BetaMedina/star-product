require('dotenv').config()

module.exports = {
  client: 'postgresql',
  connection: {
    port: process.env.DB_PORT,
    host: 'localhost',
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  pool: {
    max: Number(process.env.DB_MAX_POOL_CONNECTIONS)
  },
  migrations: {
    directory: 'src/infra/db/pgsql/migrations/'
  },
  seeds: {
    directory: 'src/infra/db/pgsql/seeds/'
  }
}
