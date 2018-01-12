import angular from 'angular';

import AuthService from './auth.service';

import PostService from './post.service';
import authInterceptor from "./authinterceptor.factory";
import ProfileService from './profile.service';
import ApiKeysService from './apikeys.service';

let commonServicesModule = angular.module('app.common.services', [])

  .service('Auth', AuthService)
  .service('Post', PostService)
  .service('Profile', ProfileService)
  .service('ApiKeys', ApiKeysService)
  .factory('authInterceptor', authInterceptor)
  .name;

export default commonServicesModule;
