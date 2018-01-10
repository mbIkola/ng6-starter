import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import commonSevices from '../../common/services/';
import signupComponent from './signup.component';
import usernameAvailable from './username-available.directive';

let signupModule = angular.module('signup', [
  commonSevices,
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.signup', {
        url: '/signup',
        component: 'signup',
        data: {
          requiresAuth: false
        }
      });
  })
  .component('signup', signupComponent)
  .directive('usernameAvailable', usernameAvailable)

  .name;

export default signupModule;
