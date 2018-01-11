
const User = require('../models/user');
//const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const emailVerificationService = require('./emailVerification');


const localStrategyOptions = {
    usernameField: 'email'
};


exports.login = new LocalStrategy(
    localStrategyOptions,
    (email, password, done) => {
        User.findOne({email})
            .then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: "The email and password combination given do not match."
                    });
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: "The email and password combination given do not match. Lost your password?"
                    });
                }

                return done(null, user);

            }).catch((err) => {
            console.error("User lookup failed: ", err);
            return done(err, false, {message: "Auth service temporarily unavailable, please try again later"});
        });
    });

exports.register = new LocalStrategy(
    localStrategyOptions,
    (email, password, done) => {
        User.findOne({email}).then((user) => {
            if (user) {
                done(null, false, {message: "Such email already registered"});
            } else {

                var newUser = new User({email, password});
                newUser.save(function (err) {

                    if (err) {
                        console.error("User save failed:", err);
                        done(err, false, {message: "Internal Server Error"});
                    } else {
                        emailVerificationService.send(newUser);
                        done(null, newUser);
                    }
                })
            }
        }).catch((err) => {
            console.error("User lookup failed: ", err);
            done({message: "Internal Server Error, please try again later"});
        })
    });

//
// passport.use(new GoogleStrategy({
//     clientID: "304244419104-ije5j2hhi9u46ppcdnmqmdtnt85lpoje.apps.googleusercontent.com",
//     clientSecret: "xjQJ6S-gipuTN8S39kPzvypn",
//     callbackURL: 'http://localhost:3000/login/google/callback'
// }, (accessToken, refreshToken, profile, cb) => {
//     this.app.User.findOne({googleId: profile.id}, (err, user) => {
//         if (z)
//             return cb(err, user);
//     })
// }));
