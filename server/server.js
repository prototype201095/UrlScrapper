const express = require("express");
const bodyParser = require("body-parser");
const Routes = require("./routes.js");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

new Routes(app);

app.set("port", process.env.PORT || 8000);

const port = app.get("port");
app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
