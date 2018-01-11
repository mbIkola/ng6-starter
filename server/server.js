'use strict';
const path = require('path');
const lodash = require('lodash');
const passport = require('passport');



class PoolFrontendApplication {
    constructor(config) {
        this.config = require('./config.js');


        this.setupExpress();


        this.setupRouter();


        this.setupDatasource()
            .then((db) => this.registerModels(db))

    }

    setupExpress() {
        const express = require('express');
        const bodyParser = require('body-parser');

        const cors = require('cors');

        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(require('shrink-ray')());

        this.app.set('jwt-secret', this.config.jwtSecret);
        this.setupPassport();

        this.errorHandler();
    }

    setupPassport() {
        this.app.use(passport.initialize());
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        const localStrategy = require('./services/localAuthStrategy');
        passport.use('local-login', localStrategy.login);
        passport.use('local-register', localStrategy.register);
    }

    setupDatasource() {
        const mongoose = require('mongoose');
        const mongoDbUrl = this.config.mongo.dsn
            ? this.config.mongo.dsn
            : this.config.mongo.dsn = 'mongodb://' + this.config.mongo.host + ':' + this.config.mongo.port + "/" + this.config.mongo.db;

        mongoose.Promise = global.Promise;

        this.app.set('datasource-uri', mongoDbUrl);

        return mongoose.connect(mongoDbUrl)
            .catch((err) => {
                console.error("Mogoose unable to connect: ", err);
                throw new Error("Database Connection Failure: " + err);
            });
    }

    registerModels(db) {
        console.info("Mongoose connected to `" + this.app.get('datasource-uri') + "'");
        this.app.set('db', db);
        require('./models')(this.app);
    }

    setupRouter() {
        const Router = require('./lib/router');
        const router = new Router(this.config.base_url, path.join(__dirname, 'controllers'));
        router.load(this.app);
        this.router = router;
    }

    errorHandler() {
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }

    listen() {
        this.config.listen = Array.isArray(this.config.listen) ? this.config.listen : [this.config.listen];

        this.config.listen.forEach((listenInterface) => {
            var server = this.app.listen(listenInterface.port, listenInterface.host, () => {

                let addr = server.address();
                console.log("HTTP Server created at http://" + addr.address + ":" + addr.port + "/" + this.config.base_url);
            });
        });
    }

    getExpress() {
        return this.app;
    }
}


module.exports = PoolFrontendApplication;

if (require.main === module) {
    var appInstance = new PoolFrontendApplication(require('./config'));
    appInstance.listen();
}
