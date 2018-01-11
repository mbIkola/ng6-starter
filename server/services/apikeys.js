


const apikeys = [
    { key: Math.random().toString(16), name: "website1" },
    { key: Math.random().toString(16), name: "website2" },
    { key: Math.random().toString(16), name: "website3" }
];


class ApiKeysService {


    constructor() {


    }

    findUserByKey( api_key ) {


    }
    getUserKeys( user ) {

        return new Promise(function(resolve, reject) {
            resolve(apikeys);
        })
    }
}


module.exports = new ApiKeysService();
