import angular from 'angular';

import AuthService from './auth.service';

import PostService from './post.service';
import UserFactory from './user.factory';
import authInterceptor from "./authinterceptor.factory";
import ProfileService from './profile.service';

let commonServicesModule = angular.module('app.common.services', [])

  .service('Auth', AuthService)
  .service('Post', PostService)
  .service('Profile', ProfileService)
  .factory('User', UserFactory)
  .factory('authInterceptor', authInterceptor)
  .name;

export default commonServicesModule;
