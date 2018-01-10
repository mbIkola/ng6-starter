import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import apikeysComponent from './apikeys.component';

let apikeysModule = angular.module('apikeys', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.apikeys', {
        url: '/apikeys',
        component: 'apikeys',
        data: {
          requiresAuth: true
        }
      });
  })
.component('apikeys', apikeysComponent)

.name;

export default apikeysModule;
