const redis = require("redis");
const Dbconstants = require("../constants/DbConstans.js");

class CacheDbConnectionManager {
  constructor() {}

  createConnection() {
    return new Promise((resolve, reject) => {
      const client = redis.createClient({
        port: Dbconstants.REDIS_PORT,
        host: Dbconstants.REDIS_HOST,
        password: Dbconstants.REDIS_PASSWORD,
      });
      resolve(client);
    });
  }
}

module.exports = CacheDbConnectionManager;
