const RedisConnection = require('../config/connections')

class BaseRepository {
  constructor () {
    this.connection = RedisConnection
  }

  get ({ key }) {
    return this.connection.redis.get(key)
  }

  set ({ key, payload, expireTime = 1 * 60 * 60 }) {
    this.connection.redis.set(key, payload, 'EX', expireTime)
  }
}
exports.BaseRepository = BaseRepository
