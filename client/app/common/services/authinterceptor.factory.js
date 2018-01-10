let authInterceptor = function($injector, $q) {
  'ngInject';
  return {
    request: (config) => {
      let token = $injector.get('$auth').getToken();
      if ( token ) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },

    response : (response) => response,

    responseError : (rejection) => {
      if ( rejection.status === 401 ) {
        console.info("Unauthorized. Forcing logout.")
        $injector.get('$auth').removeToken();
      }
      return $q.reject(rejection);
    }
  }

};

export default authInterceptor;
