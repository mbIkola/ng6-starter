const config  = require('../config');
const fs = require('fs');
const jwt = require('jwt-simple');
const _ = require('underscore');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const User = require('../models/user');


_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}
const compileTemplate = _.memoize(function(templatePath) {
    return _.template(fs.readFileSync(templatePath, 'utf-8'));
});

const model = {
    verifyUrl: 'http://localhost:3000/api/auth/verifyEmail?token=',
    title: 'Welcommen',
    subTitle: 'Thanks for signing up!',
    body: 'Please verify your email address by clicking the button below'
};
const smtpConfig = {
    host: config.smtp.host,
    auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
    },
    // secure: true
};


class EmailVerificationService {

    constructor() {



    }


    send(user) {

        const payload = {
            sub: user.email,
        }

        const token = jwt.encode(payload, config.emailPassphrase);
        const transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
        console.log(smtpConfig);

        const mailOptions = {
            from: config.smtp.from,
            to: "\"" + user.displayName.replace('"', '')  + "\"" + "<" + user.email + ">",
            subject: '[Service Name] Account Email Verification',
            html: this.getHtmlVerifyTemplate(token, user),
            text: this.getTextVerifyTemplate(token, user)
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.error("Mail Send Error", err);
                return false;
            }
            console.log("Verify email sent successfully: ", info , ' via ', smtpConfig.host);

        });
    }

    verifyToken(verificationToken) {
        return (new Promise(function( resolve, reject) {
                try {

                    let payload = jwt.decode(verificationToken, config.emailPassphrase);
                    console.log("Decoded token:", payload);
                    return User.findOne( { email : payload.sub } , function( err, foundUser) {
                        if ( err ) reject(err);
                        if ( foundUser ) resolve(foundUser);
                        reject(new Error("Invalid/Expired token"));
                    });

                }catch (err ) {
                    reject(err);
                }
            })).then( (user) => {
              user.setEmailVerified(true, "mail-link");
              return user.save();
            });
    }

    getHtmlVerifyTemplate(token, user) {
        var templateParams = this.getTemplateParams(token, user);

        return compileTemplate(config.appRootDir + 'views/email/verification.html')(templateParams);
    }


    getTextVerifyTemplate(token, user) {
        var templateParams = this.getTemplateParams(token, user);
        return compileTemplate(config.appRootDir + '/views/email/verification.txt')(templateParams);
    }
    getTemplateParams(token, user) {
        var templateParams = Object.assign({}, model);
        templateParams.verifyUrl += token;
        templateParams.user = user;
        return templateParams;
    }

}


module.exports = new EmailVerificationService();
