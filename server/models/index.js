

module.exports = function(app) {
    // var db = app.get('db');
    // if (! db ) {
    //     throw new Error("Database instance is required to bootstrap models");
    // }
    app.User = require('./user');

};
