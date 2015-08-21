(function () {
	'use strict';

	var Subscriber = require('../models/subscriberModel.js');

	module.exports = function (req, res) {
		var subscriber = req.body;

		Subscriber.findOne({
			email: subscriber.email
		}, function (err, existingSubscriber) {
			if (err) {
				return res.status(500).send({ message: 'Something Went Wrong :(' });
			}

			if (existingSubscriber) {
				return res.status(200).send({ message: 'You are already subscribed!' });	
			} else {
				var newSubscriber = new Subscriber({
					email: subscriber.email
				});

				newSubscriber.save(function (err) {
					if (err) {
						return res.status(500).send({ message: 'Could not subscribe. Please Try Again :(' });
					} 
					return res.status(200).json({message: 'You Are Now Subscribed!. We will contact you soon.'});
				});
			}
		});


	};


})();
