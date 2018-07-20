'use strict';

var passport = require('passport');
var User = require("./models/user.js");
var GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function () {

   passport.use(new GoogleTokenStrategy({
            clientID: '152284473109-e32t0vivneno2f4qq9hf9dpiko93bcrs.apps.googleusercontent.com',
            clientSecret: '-cJQ8tM_GusEhx1WKn8Cm0FO'
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('inside passport method');
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                console.log('user returned',user);
                return done(err, user);
            });
        }));
};