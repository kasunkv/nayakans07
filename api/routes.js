(function(){
	'use strict';

	var facebookHandler = require('./modules/facebookAuthHandler.js');
	var subscribeHandler = require('./modules/subscribeHandler.js');

	module.exports = function (app) {
		app.get('*', function (req, res) {
			res.sendFile('index.html', { root: __dirname + '../public/' });
		});

		app.post('/api/auth/facebook', facebookHandler);
		app.post('/api/subscribe', subscribeHandler);
	};

})();
