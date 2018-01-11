
const passport = require('passport');


const issueTokenAndSendResponse = require('../../../services/jwt');
const facebookAuth = require('../../../services/facebookAuth');
const googleAuth = require('../../../services/googleAuth');
const emailVerificationService = require('../../../services/emailVerification');


class AuthController {

    constructor(router, app) {
        router.post('/login',
            passport.authenticate('local-login'),
            (req, res) => issueTokenAndSendResponse(req, res)
        );
        router.post('/register',
            passport.authenticate('local-register'),
            (req, res) => issueTokenAndSendResponse(req, res)
        );

        router.post('/google',  (req, res) => googleAuth(req,res));
        router.post('/facebook', (req, res) => facebookAuth(req, res));
        router.post('/oauth/:kind',  (req, res) => this.OAuth(req,res));

        router.get('/verifyEmail', (req, res) => this.verifyEmail(req, res));

        this.app = app;
    }

    verifyEmail(req, res) {
        var verificationToken = req.query.token;
        console.log("The Token:", verificationToken);
        emailVerificationService.verifyToken(verificationToken).then(
            (user) =>  {
                console.log("Verified", user);
                res.status(202).json( {message: "ok", user});

            }
        ).catch(
            (err) =>  {
                console.error("Verification failed: ", err) ;
                res.status(500).json( {"message": err});
            }

        )
    }

    OAuth(req, res) {
        res.status(500).json({"message" : "not implemented"});
        //var authCode = req.body.code;
        //var kind = req.params.kind;

    }



}


module.exports = AuthController;
