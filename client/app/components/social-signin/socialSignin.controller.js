

class SocialSigninController {
  constructor(Auth, $state, $scope, toastr, $translate) {
    'ngInject';


    this._Auth = Auth;
    this._$state = $state;
    this._toastr = toastr;
    this._$translate = $translate;

    this._$scope = $scope;
  }

  authSocial(provider) {
    this._Auth.authenticate(provider)
      .then((res) => {
        this._toastr.success(
          this._$translate.instant(
            'Welcome back, {{displayName}}!',
            res.user
          )
        );
        this._$state.go('app.profile');
      }).catch((err) => {
        console.error("Social login error", err);
        this._toastr.error( this._$translate.instant('Login Error'));
      });
  }
}

export default SocialSigninController;
