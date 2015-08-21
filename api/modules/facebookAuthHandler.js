(function () {
    'use strict';

    var request = require('request');
    var qs = require('querystring');
    var tokenHelper = require('../helpers/tokenHelper.js');
    var config = require('../config/configuration.js');
    var Member = require('../models/memberModel.js');

    module.exports = function (req, res) {
        var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
        var grapApiProfileUrl = 'https://graph.facebook.com/me';
        var graphApiProfileImageUrl = 'https://graph.facebook.com/me/picture?width=250&json=true';

        var params = {
            client_id: req.body.clientId,
            redirect_uri: req.body.redirectUri,
            code: req.body.code,
            client_secret: config.FACEBOOK_SECRET
        };

        request.get({
            url: accessTokenUrl,
            qs: params
        }, function (err, response, accessToken) {
            accessToken = qs.parse(accessToken);
            request.get({
                url: grapApiProfileUrl,
                qs: accessToken,
                json: true
            }, function (err, response, profile) {
                console.log(profile);
                Member.findOne({
                    facebookId: profile.id
                }, function (err, existingMember) {
                    if (existingMember) {
                        return res.status(200).send({
                            user: existingMember,
                            token: tokenHelper.createToken(existingMember, req, res)
                        });
                    } else {
                        request.get({
                            url: graphApiProfileImageUrl,
                            qs: accessToken
                        }, function (err, response, profileImage) {
                            console.log(profileImage);
                            var fbData = {
                                facebookId: profile.id,
                                fullName: profile.name,
                                email: profile.email,
                                profileImage: 'https://graph.facebook.com/' +  profile.id + '/picture?width=300',
                                token: tokenHelper.createToken({ id: profile.id }, req, res)
                            };
                            return res.status(200).send(fbData);
                        });
                    }
                });
            });
        });
    };
    
    
})();

