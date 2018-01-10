let authInterceptor = function($injector, $q) {
  'ngInject';
  return {
    request: (config) => {
      let token = $injector.get('$auth').getToken();
      if ( token ) {
        // console.log("TOKEN: HERE IT IS : ---------", token);
        config.headers.Authorization = 'Bearer ' + token;
      } else {
        console.error("Unauthorized?");
      }
      return config;
    },

    response : (response) => response,

    responseError : (rejection) => {
      if ( rejection.status === 401 ) {
        console.info("Unauthorized. Forcing logout.??? ")
        //$injector.get('$auth').removeToken(); //@todo: ensure you are doing it correctly
      }
      return $q.reject(rejection);
    }
  }

};

export default authInterceptor;
