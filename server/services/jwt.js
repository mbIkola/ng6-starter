const moment = require('moment');
const jwt = require('jwt-simple');
const config  = require('../config');


module.exports  = function issueTokenAndSendResponse(req, res) {
    const token = jwt.encode(
        {
            iss: req.hostname,
            sub: req.user.id,
            exp: moment().add(10, 'days' ).unix()  // todo: configuration?
        },
        config.jwtSecret
    );

    res.status(202).json({user: req.user.toJSON(), token});
}
