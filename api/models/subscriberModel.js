(function () {
    'use strict';

    var mongoose = require('mongoose');
    var bCrypt = require('bcrypt-nodejs');

    var Schema = mongoose.Schema;

    var subscriberModel = new Schema({
        email: { type: String }
    });

    module.exports = mongoose.model('Subscriber', subscriberModel);

})();

