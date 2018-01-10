import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import commonSevices from '../../common/services/';
import socialSinginComponent from "./socialSignin.component";


let socialSigninModule = angular.module('socialSignin', [
  commonSevices,
  uiRouter,

])
  .config(() => {
    "ngInject";

  })
  .component('socialSignin', socialSinginComponent)
  .name;

export default socialSigninModule ;
