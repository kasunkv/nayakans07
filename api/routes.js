(function(){
	'use strict';


	module.exports = function (app) {
		app.get('*', function (req, res) {
			res.sendFile('index.html', { root: __dirname + '../public/' });
		})		
	};

})();
