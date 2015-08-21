(function () {
	'use strict';

	var express = require('express');
	var mongoose = require('mongoose');
	var bodyParser = require('body-parser');
	var cors = require('cors');
	var config = require('./api/config/configuration.js');

	var app = express();
	var port = process.env.PORT || 8080;
	var appRoutes = require('./api/routes.js');

	// setup CORS
	var whitelist = ['http://localhost:8080', 'http://ec2-54-148-6-208.us-west-2.compute.amazonaws.com:8080'];
	app.use(cors({
	    origin: function(origin, callback) {
	        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
	        callback(null, originIsWhitelisted);
	    },
	    credentials: true,
	    allowedHeaders: ['Content-Type', 'Authorization' ]
	}));

	// mongodb config
	mongoose.connect(config.MONGO_URL);

	// app configs
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.json());


	// hook the app routes
	appRoutes(app);

	app.listen(port, function () {
		console.log('App Starting on PORT: ', port);
	});

})();
