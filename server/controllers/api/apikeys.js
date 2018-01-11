
const apikeysService = require('../../services/apikeys');
const accessMiddleware = require('../../middlewares/accessMiddleware');
class ApiKeysController {


    constructor(router, app) {
        const authorizedOnlyAllowed = accessMiddleware(app);
        router.post('/apikeys', authorizedOnlyAllowed,  (req, res) => this.updateKeys(req, res));
        router.get('/apikeys', authorizedOnlyAllowed, (req, res) => this.getKeys(req, res));
        this.app = app;
    }


    updateKeys(req, res) {
        res.status(400).json( {message: "TODO"});
    }
    getKeys(req, res) {
        apikeysService.getUserKeys(req.user).then( function(keys) {
            res.status(200).json(keys);
        }).catch(err => res.status(500).json({message: err}));

    }
}




module.exports = ApiKeysController;
