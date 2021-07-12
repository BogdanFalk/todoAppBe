var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var { setAPIs } = require(__dirname + '/serverAPIs.js');

const app = express();

var port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

setAPIs(app);

app.listen(port);
console.log('App Started on port ' + port);

module.exports = app;
