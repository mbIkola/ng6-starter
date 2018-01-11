const accessMiddleware = require('../../../middlewares/accessMiddleware');


class AccountController {

    constructor(router, app) {
        var authOnly = accessMiddleware(app);
        router.get('/', authOnly, (req, res) => this.get(req, res));
        router.post('/', authOnly, (req, res) => this.update(req, res));
    }


    get(req, res) {
        res.status(200).json(req.user.toJSON());
    }
    update(req, res) {
        let user = req.user;
        console.log("Update request: ", req.body);
        let allowed_fields = ["firstname", "lastname", "phone"];

        for (let i of allowed_fields) {
            if (typeof req.body[i] !== 'undefined' ) {
                console.log("Updated property:", i);
                user[i] = req.body[i];
            }
        }
        if ( req.body.password ) {
            console.log( "user " + user._id + " aka " + user.email + " just updated password ");
            user.password = req.body.password;
        }

        if (req.body.notifications) {
            for (let notification_type in req.body.notifications) {
                user.notifications = user.notifications || {};
                console.log("Changed notification type: ", notification_type, " to ", req.body.notifications[notification_type])
                user.notifications[notification_type] = req.body.notifications[notification_type];

            }
        }
        delete user.notifications._id;

        user.save().then( () => {
            res.status(202).json(user.toJSON())
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: err.message});
        });

    }
}


module.exports = AccountController;
