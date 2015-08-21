(function () {
    'use strict';

    var jwt = require('jwt-simple');
    var moment = require('moment');
    var config = require('../config/configuration.js');

    var TokenHelper = function () {
        return {
            createToken: function (member, req, res) {
                var payload = {
                    iss: req.hostname,
                    sub: member.id,
                    exp: moment().add(10, 'days').unix()
                };

                return jwt.encode(payload, config.GMAIL_SECRET);
            },
            getJwtPayload: function (req) {
                var token = req.headers.authorization.split(' ')[1];
                return jwt.decode(token, config.GMAIL_SECRET);
            }
        };
    };

    module.exports = new TokenHelper();
})();
