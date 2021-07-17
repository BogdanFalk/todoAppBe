var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var { setAPIs } = require(__dirname + '/serverAPIs.js');

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000/"],
  optionsSuccessStatus: 200,
  credentials: true,
};

var port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));
app.options('*', cors()) 
setAPIs(app);

app.listen(port);
console.log('App Started on port ' + port);

module.exports = app;
