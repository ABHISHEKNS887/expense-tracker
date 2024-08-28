const redis = require('redis')
const { promisify } = require('util')

const redisInstance = ({ db, prefix, host = process.env.REDIS_HOSTS, port = 6379, ttl = 0 }) => {
  if (!prefix || !db) {
    throw new Error('Mandatory property prefix/ db missing')
  }
  const client = redis.createClient({
    host,
    port,
    prefix,
    db
  })
  const redisAsyncGet = promisify(client.get).bind(client)
  const redisAsyncSetEx = promisify(client.setex).bind(client)
  const redisAsyncSet = promisify(client.set).bind(client)
  const redisAsyncDelete = promisify(client.del).bind(client)

  return {
    get: async (key) => {
      try {
        let data = await redisAsyncGet(key)
        if (data) {
          return { success: true, data: JSON.parse(data) }
        } else {
          return { success: false, message: 'No data found' }
        }
      } catch (err) {
        return { success: false, message: 'Error while retrieving  data' }
      }
    },
    save: async (key, data) => {
      try {
        let saveResp
        if (!ttl) {
          saveResp = await redisAsyncSet(key, JSON.stringify(data))
        } else {
          saveResp = await redisAsyncSetEx(key, ttl, JSON.stringify(data))
        }
        if (saveResp && saveResp.toLowerCase() === 'ok') {
          return { success: true }
        } else {
          return { success: false, message: 'Unable to save data' }
        }
      } catch (err) {
        return { success: false, message: 'Error while saving data' }
      }
    },
    delete: async (key) => {
      try {
        let deleteResp = await redisAsyncDelete(key)
        if (!isNaN(deleteResp) && deleteResp > 0) {
          return { success: true }
        } else {
          return { success: false, message: 'Unable to delete data' }
        }
      } catch (err) {
        return { success: false, message: 'Error while deleting data' }
      }
    }
  }
}

module.exports = redisInstance
