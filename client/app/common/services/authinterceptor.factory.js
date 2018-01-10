let authInterceptor = function(JWT, $q) {
  'ngInject';
  return {
    request: (config) => {
      let token = JWT.get();
      if ( token ) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },

    response : (response) => response,

    responseError : (rejection) => {
      if ( rejection.status === 401 ) {
        console.info("Unauthorized. Forcing logout.")
        JWT.remove();
      }
      return $q.reject(rejection);
    }
  }

};

export default authInterceptor;
