var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 3000;

app.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app,require("./app/data/friends.js"));