const CacheDbConnectionManager = require("../config/cacheDbConnectionManager");
const Utility = require("../utility/utility");

class UrlDbManager {
  constructor() {
    this.cacheDbConnectionManager = new CacheDbConnectionManager().createConnection();
  }

  insertUrlDetails(url, urlDetails) {
    return new Promise((resolve, reject) => {
      let stringifiedDetails = typeof urlDetails === "string" ? urlDetails : JSON.stringify(urlDetails);
      this.cacheDbConnectionManager.then((redisClient) => {
        redisClient.hset("url_details_mapping", url, stringifiedDetails, (err, response) => {
          resolve(response);
        });
      });
    });
  }

  urlExists(url) {
    return new Promise((resolve, reject) => {
      this.cacheDbConnectionManager.then((redisClient) => {
        redisClient.hget("url_details_mapping", url, (err, response) => {
          if (err) reject(err);
          if (!Utility.isNullOrEmpty(response)) {
            resolve(response);
          }
        });
      });
    });
  }
}

module.exports = UrlDbManager;
