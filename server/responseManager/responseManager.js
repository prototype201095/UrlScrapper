class ResponseManager {
  static returnSuccessStatus(response, responsePayload, status_code) {
    let payload = {
      header: {
        id: "Header",
        version: "1.0",
      },
      body: {
        status: status_code,
        payload: responsePayload,
      },
    };
    response.send(payload);
  }

  static returnErrorResponse(response, responsePayload, status_code) {
    let payload = {
      header: {
        id: "Header",
        version: "1.0",
      },
      body: {
        status: status_code,
        payload: responsePayload,
      },
    };
    response.send(payload);
  }
}

module.exports = ResponseManager;
