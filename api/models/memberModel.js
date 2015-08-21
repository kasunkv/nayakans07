(function () {
    'use strict';

    var mongoose = require('mongoose');
    var bCrypt = require('bcrypt-nodejs');

    var Schema = mongoose.Schema;

    var memberModel = new Schema({
        profileImage: { type: String },
        fullName: { type: String },
        nameWithInitials: { type: String },
        nickname: { type: String },
        studyStream: { type: String },
        class: { type: String },
        birthday: { type: String },
        nicNo: { type: String },
        email: { type: String },
        mobilePhone: { type: String },
        homePhone: { type: String },
        address: { type: String },
        facebookProfile: { type: String },
        twitterProfile: { type: String },
        linkedInProfile: { type: String },
        companyName: { type: String },
        designation: { type: String },
        companyPhone: { type: String },
        companyAddress: { type: String },
        username: { type: String },
        password: { type: String },
        suggestions: { type: String },
        facebookId: { type: String },
        twitterId: { type: String },
        googleId: { type: String },
        yahooId: { type: String }
    });

    memberModel.pre('save', function (next) {
        var member = this;

        if (!member.isModified('password')) { return next(); }

        bCrypt.genSalt(10, function (err, salt) {
            if (err) { return next(err); }

            bCrypt.hash(member.password, salt, null, function (err, hash) {
                if (err) { return next(err); }

                member.password = hash;
                next();
            });
        });
    });

    memberModel.methods.toJson = function () {
        var member = this.toObject();
        delete  member.password;
        return member;
    };

    module.exports = mongoose.model('Member', memberModel);

})();

