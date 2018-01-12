const ApiKey = require('../models/apikeys');
const faker = require('faker');

function makeSalt() {
  return (Math.random() * ( + new Date())).toString(16);
}


class ApiKeysService {


    constructor() {
    }

    findUserByKey( api_key ) {
      return ApiKey.findOne( {key: api_key})
        .populate('accountId')
        .exec()
        .then( key => key.accountId );
    }
    getUserKeys( user ) {
      return ApiKey.find( { accountId : user._id, deleted: false });
    }
    getKey(user, apiKey) {
      return ApiKey.findOne( { key: apiKey, accountId: user._id, deleted: false });
    }

    softDelete(user, apiKey) {
      return ApiKey.findOne( { key: apiKey, accountId: user._id })
        .then( (apikey) => {
          if ( apikey ) {
            apikey.deleted = true;
            apikey.deletedAt = Date.now()
            return apikey.save();
          } else {
            return Promise.resolve;
          }
        });
    }

    createNew(user, keyTitle) {
      let res = new ApiKey();
      res.title = keyTitle || faker.fake('{{hacker.adjective}} {{hacker.noun}}');
      res.salt = makeSalt();
      res.key = ApiKey.encode( user._id, res.salt);
      res.accountId = user._id;
      console.log("Creating new:", res);
      return res;
    };
}


module.exports = new ApiKeysService();
