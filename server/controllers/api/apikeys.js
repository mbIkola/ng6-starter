const apikeysService = require('../../services/apikeys');
const accessMiddleware = require('../../middlewares/accessMiddleware');


class ApiKeysController {


  constructor(router, app) {
    const authorizedOnlyAllowed = accessMiddleware(app);
    router.get('/apikeys', authorizedOnlyAllowed, (req, res) => this.getKeys(req, res));
    router.delete('/apikeys/:key', authorizedOnlyAllowed, (req, res) => this.deleteKey(req, res));
    router.put('/apikeys', authorizedOnlyAllowed, (req, res) => this.createKey(req, res));
    router.post('/apikeys/:key', authorizedOnlyAllowed, (req, res) => this.updateKey(req, res));

    this.app = app;
  }


  updateKey(req, res) {
    // only one thing allowed to update: key title
    apikeysService.getKey(req.user, req.params.key)
      .then( (apikey) => {
        if ( ! apikey ) {
          res.status(404).json({message: "Key Not Found"});
        } else {
          res.title = req.body.title;
          return res.save();
        }
      }).then( (updatedDoc) => {
          res.status(200).json(updatedDoc);
      }).catch ( (err) => {
        console.error("Model update error:", err);
        res.status(500).json({message: "Internal Server Error"});
      });
  }

  getKeys(req, res) {
    apikeysService.getUserKeys(req.user)
      .then((keys) => {
        res.status(200).json(keys);
      }).catch(err => res.status(500).json({message: err}));
  }

  createKey(req, res) {
    console.log("Create request", req.body);
    apikeysService.createNew(req.user, req.body.title)
      .save()
      .then((created) => res.status(201).json(created.toJSON()))
      .catch(err => {
        console.error("Could not create new API Key:", err);
        res.status(500).json({message: "Internal Server Error"});
      });
  }

  deleteKey(req, res) {
    console.log("Removing API Key: ", req.params.key);
    apikeysService.softDelete(req.user, req.params.key)
      .then(() => {

        res.status(200).json({message: "ok"});
      }).catch(err => {
        console.error("Could not update apiKey (mark as deleted)", err);
        res.status(200).json({message: "ok"});
        //res.status(500).json({message: "Internal Server Error"});
      });
  }

}


module.exports = ApiKeysController;
