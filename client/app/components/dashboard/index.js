import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import dashboardComponent from './dashboard.component';

let dashboardModule = angular.module('dashboard', [
  uiRouter
])
  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        component: 'dashboard',
        requiresAuth: true
      });
  })
  .component('dashboard', dashboardComponent)

  .name;

export default dashboardModule;
