class Utility {
  static isNullOrEmpty(param_val) {
    let excpMsg = "Inside Utility.isNullOrEmpty(): ";
    try {
      if (typeof param_val == "string")
        return param_val == null || param_val == undefined || param_val == "" || param_val.length == 0;
      else return param_val == null || param_val == undefined || param_val.length == 0;
    } catch (_excp) {
      excpMsg += typeof _excp == "string" ? _excp : _excp.message;
      console.log(excpMsg);
    }
    return false;
  }

  static generateValidImageUrl(imgUrl, linkUrl) {
    let trancatedUrl = null;
    if (!imgUrl.includes("http://") || !imgUrl.includes("https://")) {
      if (imgUrl.charAt(0) === "/") {
        if (imgUrl.charAt(1) === "/") {
          imgUrl = imgUrl.replace("//", "");
        } else {
          imgUrl = imgUrl.replace("/", "");
        }

        if (linkUrl.match(/^www/) !== null) {
          trancatedUrl = linkUrl.replace("www.", "");
        } else if (linkUrl.match(/^https/) !== null) {
          trancatedUrl = linkUrl.replace("https://", "");
        } else if (linkUrl.match(/^http/) !== null) {
          trancatedUrl = linkUrl.replace("http://", "");
        }

        if (imgUrl.includes(trancatedUrl)) {
          imgUrl = imgUrl.replace(trancatedUrl, "");
          imgUrl = `${linkUrl}${imgUrl}`;
        } else {
          imgUrl = `${linkUrl}/${imgUrl}`;
        }
      }
      return imgUrl;
    }
  }
}

module.exports = Utility;
