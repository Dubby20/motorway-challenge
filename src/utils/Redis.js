import autoBind from 'auto-bind';
import redis from 'redis';
import { promisifyAll } from 'bluebird';

const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

const Redis = promisifyAll(redis);
/**
   * Creates an instance of Redis
   */
class RedisClient {
  /**
   * Creates an instance of RedisClient
   * @param {object} container
   * @memberof RedisClient
   */
  constructor() {
    // create and connect to redis client
    this.client = Redis.createClient({
      url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
    });
    autoBind(this);
  }

  /**
   *@description Returns redis client
   *@returns {object} redis
   */
  getClient() {
    return this.client;
  }

  /**
   *@description Sets object
   *@param  {string} hash
   *@param  {string} key
   *@param  {object} value
   *@param  {number} expiryTime - in seconds
   *@returns {void}
   */
  async setObject(hash, key, value, expiryTime) {
    let stringValue;
    if (typeof value !== 'string') stringValue = JSON.stringify(value);
    else stringValue = value;
    const keySet = await this.client
      .hsetAsync(hash, key, stringValue, 'EX', expiryTime);
    if (keySet === 0) console.log(`Key: ${key} already exists in redis hash`);
    if (keySet === 1) console.log(`Key: ${key} saved to redis`);
  }

  /**
   *@description Gets object
   *@param  {string} hash
   *@param  {string} key
   *@returns {object} - parsed data
   */
  async getObject(hash, key) {
    const value = await this.client.hgetAsync(hash, key);
    if (typeof value === 'string' || !value) return {};
     return JSON.parse(value);
  }

  /**
   *@description Deletes keys
   *@param  {string} key
   *@returns {void}
   */
  async deleteKey(key) {
    await this.client.delAsync(key);
  }

  /**
   *@description Closes redis connection
   *@returns {void}
   */
  async closeInstance() {
    await this.client.quit();
  }
}

export default RedisClient;
