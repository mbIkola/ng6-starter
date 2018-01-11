const User = require('../models/user');
const request = require('request-promise-native');
const issueTokenAndSendResponse = require('./jwt');
const emailVerificationService = require('./emailVerification');
const config = require('../config.js');


const tokenUrl = "https://accounts.google.com/o/oauth2/token";
const profileUrl = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";


module.exports = function( req, res) {
    const authCode = req.body.code;
// @todo: config
    var params = {
        //"client_id": "304244419104-ije5j2hhi9u46ppcdnmqmdtnt85lpoje.apps.googleusercontent.com",
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: "authorization_code",
        client_secret: config.auth.google.secret /// todo: lookup through auth config and find matching secret per client.id
    };

    var profile = null;
    return request.post(tokenUrl, {json:true, form: params})
        .then((token) => {
            var accessToken = token.access_token;
            var headers = {
                'Authorization': 'Bearer ' + accessToken
            };
            console.log("Chain1: got access token:", token);
            return request.get({ url: profileUrl, headers, json: true });
        }).then((socialProfile) => {
            profile = socialProfile;
            console.log("Chain2: got profile:", profile);

            if ( ! profile.email && ! profile.sub ) {
                console.error("Gould not retrieve user credentials", profile);
                return res.status(500);
            }

            // @todo: You have to fix your mongo query!!!!
            var query = profile.email ?  { $or : [ {googleId: profile.sub}, {email: profile.email}] } : { googleId: profile.sub } ;

            return User.findOne(query);

        }).then( (user) => {
            console.log("Chain3: querying database: ", user);
            if ( user ) {
                console.info("Chain4: User found: ", user.toJSON());
                req.user = user;
                if  ( ! user.googleId ) {
                    user.googleId = profile.sub;
                    user.firstname =  user.firstname  || profile.given_name;
                    user.lastname  =  user.lastname   || profile.family_name;
//                            user.displayName = user.displayName || profile.name ;
                    user.save( (err) => {
                        if ( err ) console.error("User update error:", err)
                    });
                }
                emailVerificationService.send(user);
                return issueTokenAndSendResponse(req, res);

            } else {
                var newUser = new User();
                console.log("Chain4:  new User:", profile);
                newUser.googleId = profile.sub;
//                        newUser.displayName = profile.name;
                newUser.firstname = profile.given_name;
                newUser.lastname = profile.family_name;
                newUser.email = profile.email;

                if ( 0 ) {
                    newUser.setEmailVerified(true, 'google-oauth');
                } else {
                    emailVerificationService.send(newUser);
                }


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
            console.error("Google OAuth Error:", err);
            res.status(500).json(err);
        });

};




/**
 * {
         *      access_token: 'ya29.Gls7Bbx_i6SkMZk7oqLYXPZIRCcL4bCXlnHenWUVXurgoE9OILT3Xp1DO4_lelnhYPHhj0qFE3GsdMQ_r_3MObk-WPC9yywHIrcq3l061DXUu9orZoDDb0gIl6vY',
         *      expires_in: 3600,
         *      id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyMzNkYWFkOTdlNzBmYjljMTJmZDc2NzkxMDA5ZjJjMGRjYzE4NjkifQ.eyJhenAiOiIzMDQyNDQ0MTkxMDQtaWplNWoyaGhpOXU0NnBwY2RubXFtZHRudDg1bHBvamUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMDQyNDQ0MTkxMDQtaWplNWoyaGhpOXU0NnBwY2RubXFtZHRudDg1bHBvamUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU0ODg4MDk2ODc3NDU5Nzc2NTciLCJlbWFpbCI6ImtoYXJjaGV2eW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI4YXZmUUU0QUxHcC1RUG9EYUxEOUd3IiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImlhdCI6MTUxNTM2MzIyMSwiZXhwIjoxNTE1MzY2ODIxfQ.WKyEEqYt71OV0VD_P1CFju6-Vl9FficCR0jihcIYRHG7O4RwcZhFgtsYz5jpU8Z51mdthnPBOXw8SCDOduMXHF6aBCAZGOkBiNgc4qYP6c65i1cgaOC7I0kLZhyPngbgoTiNkFS_vOem5wKv3Kw260tM3h9VYdMtKHUS6c0YdzBukta1lsOrfnFiIV479n8FWONa6r19jAnspTdF6yrZBy0wPLzkMjrNaLI4D-yOwmcgkLzk6UurZVx1205oSdEYNUm85NHMoW4BFHTSE50ziNZ9qJQcEbVN9YC13Q_LMJP9hWaAy2UHYxGvT1o5xJVLZlC1rRuP2WhScY5rBcGvhw',
         *      token_type: 'Bearer'
         * }
 */

