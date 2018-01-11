var request = require('request-promise-native');

const config = require('../config');

var User = require('../models/user');
const issueTokenAndSendResponse = require('./jwt');

const accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
const graphApiUrl = 'https://graph.facebook.com/me';

// COPY-PASTE: todo: extract methods. Same as googleAuth.js

module.exports = function(req, res) {

    // @todo: facebook_config
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.auth.facebook.secret,
        code: req.body.code
    };

    var profile = null;
    request.get({ url: accessTokenUrl, qs: params, json: true})
        .then((accessToken) => {
            console.log("Facebook AccessToken: ", accessToken);
            accessToken.fields= ["first_name", "last_name", "id", "email", "picture"].join(',');

            return request.get({url: graphApiUrl,qs: accessToken, json: true})

        })

        .then((socialProfile) => {
            profile = socialProfile;
            profile = socialProfile;
            console.log("Chain2: got profile:", profile);

            if ( ! profile.email && ! profile.id ) {
                console.error("Gould not retrieve user credentials", profile);
                return res.status(500);
            }

            // @todo: You have to fix your mongo query!!!!
            var query = profile.email ?  { $or : [ {facebookId: profile.id}, {email: profile.email}] } : { facebookId: profile.id } ;

            return User.findOne(query);

        })
        .then( (user) => {
            console.log("Chain3: querying database: ", user);
            if ( user ) {
                console.info("Chain4: User found: ", user.toJSON());
                req.user = user;
                if  ( ! user.googleId ) {
                    user.facebookId = profile.id;
                    user.firstname =  user.firstname || profile.first_name;
                    user.lastname  = user.lastname || profile.last_name;
                    user.save( (err) => {
                        if ( err ) console.error("User update error:", err)
                    });
                }
                return issueTokenAndSendResponse(req, res);

            } else {
                var newUser = new User();
                console.log("Chain4:  new User:", profile);
                newUser.facebookId = profile.id; // actually we are probably can't create user without email and should check this before
//                        newUser.displayName = profile.name;
                newUser.firstname = profile.first_name;
                newUser.lastname  = profile.last_name;
                newUser.email = profile.email;
                newUser.setEmailVerified(true, 'facebook-oauth');

                newUser.save((err) => {
                    if ( err ) {
                        console.error("Model save failed:", err);
                        res.status(500).json(err);
                    } else {
                        req.user = newUser;
                        return issueTokenAndSendResponse(req, res);
                    }
                })

            }


        }).catch((err) => {
            console.error("Facebook OAuth Error:", err);
            res.status(500).json(err);
        });


};
