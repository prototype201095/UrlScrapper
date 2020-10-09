const Utility = require("../utility/utility");
const Scrapper = require("../scrapperModule/scrapper.js");
const ResponseManager = require("../responseManager/responseManager");

class ScrapperService {
  constructor() {
    this.scrapper = new Scrapper();
  }

  scrapInfoAgainstUrl(req, res) {
    let url = req.query.url;
    if (Utility.isNullOrEmpty(url)) {
      ResponseManager.returnErrorResponse(res, "Request parameters are missing", 400);
      return false;
    }
    this.scrapper.scrapInfo(res, url);
  }
}

module.exports = ScrapperService;
