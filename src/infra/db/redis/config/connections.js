const Redis = require('ioredis')

class RedisConnection {
  constructor () {
    const redisConfig = {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_URL,
      password: process.env.REDIS_PASSWORD,
      connectionName: process.env.REDIS_CONNECTION_NAME
    }
    this.redis = new Redis(redisConfig)
  }
}

module.exports = new RedisConnection()
