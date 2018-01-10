import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import commonSevices from '../../common/services/';
import signinComponent from './signin.component';

let signinModule = angular.module('signin', [
  commonSevices,
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.signin', {
        url: '/signin',
        component: 'signin',
        data: {
          requiresGuest: true
        }
      });
  })
  .component('signin', signinComponent)

  .name;

export default signinModule;
