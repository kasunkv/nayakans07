var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./api/config/database.js');

var app = express();
var port = process.env.PORT || 8080;
var appRoutes = require('./api/routes.js');

// mongodb config 
// mongoose.connect(database.url);

// app configs
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// hook the app routes
appRoutes(app);

app.listen(port, function () {
	console.log('App Starting on PORT: ', port);
});