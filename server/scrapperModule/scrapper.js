const cheerio = require("cheerio");
const fetch = require("node-fetch");
const isReachable = require("is-reachable");
const Utility = require("../utility/utility");
const ResponseManager = require("../responseManager/responseManager");
const UrlDbManager = require("../DatabaseManager/urlDbManager");

class Scrapper {
  constructor() {
    this.urlDbManager = new UrlDbManager();
  }

  async scrapInfo(response, url) {
    try {
      let urlDetails = await this.urlDbManager.urlExists(url);
      if (!Utility.isNullOrEmpty(urlDetails)) {
        urlDetails = typeof urlDetails === "string" ? JSON.parse(urlDetails) : urlDetails;
        ResponseManager.returnSuccessStatus(response, urlDetails, 200);
        return false;
      }
      fetch(url)
        .then((res) => res.text())
        .then(async (body) => {
          let $ = cheerio.load(body);
          let title = $("title").text();
          let payload = {};
          /*
          selector using regex :
          https://stackoverflow.com/questions/190253/jquery-selector-regular-expressions/193787#193787
          */
          let description = $("meta[name*= 'description']").attr("content");
          let link = url;
          let imgUrl = $("head link[rel*= 'icon']").prop("href");
          let generatedUrl = Utility.generateValidImageUrl(imgUrl, link);
          generatedUrl = isReachable(generatedUrl) ? generatedUrl : "";

          payload = { ...payload, link: link, title: title, description: description, imgUrl: generatedUrl };
          await this.urlDbManager.insertUrlDetails(link, payload);
          ResponseManager.returnSuccessStatus(response, payload, 200);
        });
    } catch (_excp) {
      console.log(_excp);
      ResponseManager.returnSuccessStatus(response, "Internal Server error", 500);
    }
  }
}

module.exports = Scrapper;
