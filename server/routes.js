const ScapperService = require("./service/scrapperService.js");

class Routes {
  constructor(app) {
    this.scapperService = new ScapperService();
    this.instantiateRouters(app);
  }

  instantiateRouters(app) {
    app.get("/scrap", (req, res) => {
      this.scapperService.scrapInfoAgainstUrl(req, res);
    });
  }
}

module.exports = Routes;
