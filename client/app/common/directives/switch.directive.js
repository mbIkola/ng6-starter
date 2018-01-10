'use strict';


function switchDirective($timeout, $parse) {
  'ngInject';

  return {
    restrict: 'EA',
    replace: true,
    require: 'ngModel',
    scope: {
      ngModel: '=',
      onChange: '&',
      id: '@'
    },
    template: function (el, attrs) {


      let tmpl = '<div class="switch-container ' + (attrs.color || '') + '">' +
        '<input type="checkbox" ng-model="ngModel" ' +
        (attrs.id ? 'id="' + attrs.id + '" ' : '')
        + '  ></div>';

      return tmpl;
    },
    link:  (scope, elem, attr, ctrl) => {
        elem.removeAttr('id');
        var input = $(elem).find('input');
        let settings = {
          size: attr.size || 'small',
          onColor: attr.color,
        };

        input.bootstrapSwitch(settings);

        scope.$watch(  () => {
          input.bootstrapSwitch('state', ctrl.$modelValue, true)
        });

        input.on('switchChange.bootstrapSwitch', function (event, state) {
          scope.$apply( () => {
            ctrl.$setViewValue(!!state);
          });
        });


        if (attr.ngChange) {
          ctrl.$viewChangeListeners.push(function (old, newv) {
            scope.$eval(attr.ngChange);
          });
        }

        //scope.on('$destroy', () => input.bootstrapSwitch('destroy') );

    }
  }

}

export default switchDirective;


