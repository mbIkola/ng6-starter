'use strict';

/**
 * @ngdoc directive
 * @name validate-equals
 * @description
 * # sameAs
 */
 function validateEquals () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, ngModelCtrl) {
        function validateEquals(value) {
          let linkedValue =  scope.$eval(attrs.validateEquals);
          let valid = (value === linkedValue);
          ngModelCtrl.$setValidity('equal', valid);
          return valid ? value : undefined;
        }

        ngModelCtrl.$parsers.push(validateEquals);
        ngModelCtrl.$formatters.push(validateEquals);

        scope.$watch(attrs.validateEquals, function() {
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });

      }
    };
}

export default validateEquals;
