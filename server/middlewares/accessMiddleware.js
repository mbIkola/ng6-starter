const jwt = require('jwt-simple');
const User = require('../models/user');


// todo: replace with passport middlewares;
function accessMiddleware(app) {

    return (req, res, next) => {

        if (!req.headers.authorization) {
            console.error("Attempt to access resource without authorization", req.headers);
            return res.status(401).send({message: 'Authorization required to access this resource'})
        }

        var token = req.headers.authorization.split(' ')[1]; /// 'Bearer blabla.....'. Removing 'Bearer word. TODO: bug
        try {
            token = jwt.decode(token, app.get('jwt-secret'));
            if (!token.sub) { // should match with userId
                console.error("no token sub?", token);
                return res.status(403).send({message: 'Forbidden'});
            }

            User.findOne( { _id :  token.sub } ).then( ( user) => {

                if ( ! user ) {
                    console.error("Basically this should not happen. We have received valid token with non-existing user._id", token);
                    return res.status(401).send({message: "Authorization Required (invalid token)"});
                }
                req.user = user;
                next();
            });
        } catch (err) {
            console.error("Token decoding error: ", err);
            return res.status(401).send({message: 'Authorization required. Invalid or Expired token.'});
        }
    }
}

module.exports = accessMiddleware;
