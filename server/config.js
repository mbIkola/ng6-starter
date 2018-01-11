'use strict';
const lodash = require('lodash');
const env = process.env;

const defaultConfig = {
    mongo: {
        host: "127.0.0.1",
        port: 27017,
        db: "pool",
        dsn: null
    },
    smtp: {
        host: "smtp.develmail.com",
        user: "CESYZ7KRJVEOY",
        pass: "5CQXLTCGIFTC2",
        from: "NoOne <noreply@nowhere.com>",
    },
    listen: [
        {host: "0.0.0.0", port: 3002}
    ],
    base_url: "",
    jwtSecret: "secret key so nobody could guess it",
    emailPassphrase: "Another secret passphrase so nobody could guess it too. An number 42. For security",

    auth: require('./config/auth')
};


const envconfig = {
    mongo: {
        host: env.MONGO_HOST,
        port: env.MONGO_PORT,
        db:   env.MONGO_DB,
        dsn:  env.MONGO_DSN
    },
    smtp : {
        host: env.SMTP_HOST,
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        from: env.SMTP_FROM,
    },
    listen: [
        { host: env.HOST, port: env.PORT}
    ],
    base_url: "",


    jwtSecret: env.JWT_SECRET,
    emailPassphrase : env.EMAIL_PASSPHRASE
};

// here will be user values from environment, for non-existing or undefined - default configuration.
// todo: process.argv ??

module.exports = lodash.defaultsDeep({}, envconfig, defaultConfig);

