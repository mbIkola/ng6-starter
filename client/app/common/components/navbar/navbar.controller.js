//import uiRouter from '@uirouter/angularjs';

class NavbarController {
  constructor($scope, $auth) {
    'ngInject';
    this._$scope = $scope;
    this.name = 'navbar';
    $scope.isAuthenticated = $auth.isAuthenticated;
  }

  $onInit() {
    console.log("initializing NavbarController...");
  }

  $onDestroy() {
    console.log("destroying NavbarController...");
  }
  onSignin() {
    console.log("on signin...");
    this._$scope.$emit("event:signinRequest");
  }

  onLogout() {
    console.log("on logout...");
    this._$scope.$emit("event:logoutRequest");
  }


  isAuthenticated() {
    return
  }
}

export default NavbarController;
