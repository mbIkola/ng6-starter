'use strict';

/**
 * @ngdoc directive
 * @name usernameAvailable
 * @description
 * # sameAs
 */
function usernameAvailable(Auth, $timeout, $q) {
  'ngInject';

  var timer = null;

  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ngModelCtrl) {

      ngModelCtrl.$asyncValidators.usernameAvailable = function(value) {
        let d = $q.defer;
        if ( timer ) $timeout.cancel(timer);

        $timeout(() => {
          Auth.usernameExists(value).then( (res) => {
            ngModelCtrl.setValidity('username-available', res.status === 404 ? true : false );
            defer.resolve();
          }).catch( (err) => {
            console.error(err);
            ngModelCtrl.setValidity('username-available', false);
            defer.resolve();
          });
        }, 1000);

        return d.promise;
      }

    }
  };
}

export default usernameAvailable;
